package org.jefree.security.authentication.user;

//import com.secure.notes.dtos.UserDTO;
//import com.secure.notes.models.AppRole;
//import com.secure.notes.models.PasswordResetToken;
//import com.secure.notes.models.Role;
//import com.secure.notes.models.User;
//import com.secure.notes.repositories.PasswordResetTokenRepository;
//import com.secure.notes.repositories.RoleRepository;
//import com.secure.notes.repositories.UserRepository;
//import com.secure.notes.services.TotpService;
//import com.secure.notes.services.UserService;
//import com.secure.notes.util.EmailService;
//import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;

import jakarta.transaction.Transactional;
import org.jefree.mailer.google.EmailService;
import org.jefree.security.authentication.registration.PasswordResetTokenEntity;
import org.jefree.security.authentication.registration.PasswordResetTokenRepository;
import org.jefree.security.authentication.registration.ResetMailTemplate;
import org.jefree.security.authorization.role.DefaultRole;
import org.jefree.security.authorization.role.Role;
import org.jefree.security.authorization.role.RoleRepository;
import org.jefree.security.authorization.role.UserRoleDecorator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final EmailService emailService;
  private final UserRoleDecorator userRoleDecorator;
  private final PasswordEncoder passwordEncoder;
  private final String frontendUrl;

  public UserService(
    final UserRepository userRepository,
    final RoleRepository roleRepository,
    final PasswordResetTokenRepository passwordResetTokenRepository,
    @Autowired(required = false) final UserRoleDecorator userRoleDecorator,
    final EmailService emailService,
    final PasswordEncoder passwordEncoder,
    @Value("${app.frontend-url}") final String frontendUrl
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordResetTokenRepository = passwordResetTokenRepository;
    this.userRoleDecorator = userRoleDecorator;
    this.emailService = emailService;
    this.passwordEncoder = passwordEncoder;
    this.frontendUrl = frontendUrl;
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public List<User> getUsers() {
    return userRepository.findAll().stream()
      .map(User::builder)
      .map(User.UserBuilder::build)
      .collect(Collectors.toList());
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public Optional<User> getUserByUsername(final String username) {
    return userRepository.findByUsername(username).map(User::builder).map(User.UserBuilder::build);
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public Optional<User> getUserByEmail(final String email) {
    return userRepository.findByEmail(email).map(User::builder).map(User.UserBuilder::build);
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public boolean hasUserWithUsername(final String username) {
    return userRepository.existsByUsername(username);
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public boolean hasUserWithEmail(final String email) {
    return userRepository.existsByEmail(email);
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public boolean hasUserWithId(final Long id) {
    return userRepository.existsById(id);
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public User validateAndGetUserByUsername(final String username) {
    return getUserByUsername(username)
      .orElseThrow(() -> new UserNotFoundException(String.format("User with username %s not found", username)));
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public User validateAndGetUserByEmail(final String email) {
    return getUserByEmail(email)
      .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s not found", email)));
  }

  // TODO: cleanup responsibilities between User and UserEntity
  // TODO: create a general user save method that can be used for both new and existing users
  @Transactional(Transactional.TxType.REQUIRED)
  public User saveNewUser(final User.UserBuilder builder, final String password) {

    builder.password(passwordEncoder.encode(password));
    builder.accountLocked(false);
    builder.accountExpired(false);
    builder.credentialsExpired(false);
    builder.disabled(false);
    builder.mfaEnabled(false);

    return saveNewUser(builder.build());
  }

  // TODO: cleanup responsibilities between User and UserEntity
  // TODO: create a general user save method that can be used for both new and existing users
  @Transactional(Transactional.TxType.REQUIRED)
  public User saveNewUser(final User user) {
    final UserEntity userEntity = convertToUserEntity(user);

    userEntity.setSignUpMethod("email");
    userEntity.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
    userEntity.setAccountExpiryDate(LocalDate.now().plusYears(1));

    return User.builder(userRepository.save(decorateWithRoles(userEntity))).build();
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public Optional<User> validUsernameAndPassword(final String username, final String password) {
    return getUserByUsername(username)
      .filter(user -> passwordEncoder.matches(password, user.getPassword()));
  }

  @Transactional(Transactional.TxType.MANDATORY)
  public UserEntity decorateWithRoles(final UserEntity userEntity) {
    final Set<Role> roles = new HashSet<>(EnumSet.of(DefaultRole.USER));

    Optional.ofNullable(userRoleDecorator)
      .map(decorator -> decorator.getRoles(User.builder(userEntity).build()))
      .ifPresent(roles::addAll);

    roleRepository
      .findByNameIn(roles.stream().map(Role::roleName).collect(Collectors.toSet()))
      .forEach(userEntity::addRole);

    return userRepository.save(userEntity);
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void generatePasswordResetToken(final String email){
    final UserEntity userEntity = userRepository.findByEmail(email)
      .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s not found", email)));

    final PasswordResetTokenEntity resetToken = createNewToken(userEntity);
    passwordResetTokenRepository.save(resetToken);

    final String resetUrl = frontendUrl + "/reset-password?token=" + resetToken.getToken();
    emailService.sendEmail(ResetMailTemplate.compose(userEntity.getEmail(), resetUrl));
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public void resetPassword(final String token, final String newPassword) {
    final PasswordResetTokenEntity resetToken = passwordResetTokenRepository.findByToken(token)
      .orElseThrow(() -> new RuntimeException("Invalid password reset token"));

    if (resetToken.isUsed()) {
      throw new RuntimeException("Password reset token has already been used");
    }

    if (resetToken.getExpiryDate().isBefore(Instant.now())) {
      throw new RuntimeException("Password reset token has expired");
    }

    final UserEntity user = resetToken.getUser();
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);

    resetToken.setUsed(true);
    passwordResetTokenRepository.save(resetToken);
  }

  private PasswordResetTokenEntity createNewToken(final UserEntity userEntity) {
    final PasswordResetTokenEntity resetToken = new PasswordResetTokenEntity();

    resetToken.setToken(UUID.randomUUID().toString());
    resetToken.setExpiryDate( Instant.now().plus(24, ChronoUnit.HOURS) );
    resetToken.setUsed(false);
    resetToken.setUser(userEntity);

    return resetToken;
  }

  private UserEntity convertToUserEntity(final User user) {
    final UserEntity entity = new UserEntity();

    entity.setName(user.getName());
    entity.setEmail(user.getEmail());
    entity.setUsername(user.getUsername());
    entity.setPassword(user.getPassword());
    entity.setEnabled(user.isEnabled());
    entity.setAccountNonLocked(user.isAccountNonLocked());
    entity.setAccountNonExpired(user.isAccountNonExpired());
    entity.setCredentialsNonExpired(user.isCredentialsNonExpired());
    entity.setMfaEnabled(user.isMfaEnabled());

    final List<String> userRoles = user.getRoles();
    roleRepository.findAll().stream()
      .filter(role -> userRoles.contains(role.getName()))
      .forEach(entity::addRole);

    return entity;
  }


//
//    @Autowired
//    TotpService totpService;


//    @Override
//    public void updateAccountLockStatus(Long userId, boolean lock) {
//        User user = userRepository.findById(userId).orElseThrow(()
//                -> new RuntimeException("User not found"));
//        user.setAccountNonLocked(!lock);
//        userRepository.save(user);
//    }
//
//    @Override
//    public void updateAccountExpiryStatus(Long userId, boolean expire) {
//        User user = userRepository.findById(userId).orElseThrow(()
//                -> new RuntimeException("User not found"));
//        user.setAccountNonExpired(!expire);
//        userRepository.save(user);
//    }
//
//    @Override
//    public void updateAccountEnabledStatus(Long userId, boolean enabled) {
//        User user = userRepository.findById(userId).orElseThrow(()
//                -> new RuntimeException("User not found"));
//        user.setEnabled(enabled);
//        userRepository.save(user);
//    }
//
//    @Override
//    public void updateCredentialsExpiryStatus(Long userId, boolean expire) {
//        User user = userRepository.findById(userId).orElseThrow(()
//                -> new RuntimeException("User not found"));
//        user.setCredentialsNonExpired(!expire);
//        userRepository.save(user);
//    }
//
//
//    @Override
//    public void updatePassword(Long userId, String password) {
//        try {
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//            user.setPassword(passwordEncoder.encode(password));
//            userRepository.save(user);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to update password");
//        }
//    }
//
//    @Override
//    public Optional<User> findByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//
//    @Override
//    public User registerUser(User user){
//        if (user.getPassword() != null)
//            user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }
//
//    @Override
//    public GoogleAuthenticatorKey generate2FASecret(Long userId){
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        GoogleAuthenticatorKey key = totpService.generateSecret();
//        user.setTwoFactorSecret(key.getKey());
//        userRepository.save(user);
//        return key;
//    }
//
//    @Override
//    public boolean validate2FACode(Long userId, int code){
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        return totpService.verifyCode(user.getTwoFactorSecret(), code);
//    }
//
//    @Override
//    public void enable2FA(Long userId){
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        user.setTwoFactorEnabled(true);
//        userRepository.save(user);
//    }
//
//    @Override
//    public void disable2FA(Long userId){
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        user.setTwoFactorEnabled(false);
//        userRepository.save(user);
//    }


}
