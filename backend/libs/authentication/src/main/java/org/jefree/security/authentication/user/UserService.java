package org.jefree.security.authentication.user;

import jakarta.transaction.Transactional;
import org.jefree.mailer.google.EmailService;
import org.jefree.security.authentication.registration.PasswordResetTokenEntity;
import org.jefree.security.authentication.registration.PasswordResetTokenRepository;
import org.jefree.security.authentication.registration.ResetMailTemplate;
import org.jefree.security.authorization.role.*;
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
  public List<RoleView> getRoles() {
    return roleRepository.findAll().stream()
      .map(RoleView::new)
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
  public User getUserById(final long id) {
    return User.builder(findById(id)).build();
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

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void storeMfaSecret(final User user, final String mfaSecret) {
    final UserEntity userEntity = findById(user);
    userEntity.setMfaSecret(mfaSecret);
    userRepository.save(userEntity);
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void enableMfa(final User user){
    changeMfa(user, true);
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void disableMfa(final User user){
    changeMfa(user, false);
  }

  @Transactional(Transactional.TxType.SUPPORTS)
  public String getMfaSecret(final User user){
    return findById(user).getMfaSecret();
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void userLocked(final Long id, final boolean locked) {
    final UserEntity userEntity = findById(id);
    userEntity.setAccountNonLocked(!locked);
    userRepository.save(userEntity);
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void userAccountExpired(final Long id, final boolean expired) {
    final UserEntity userEntity = findById(id);
    userEntity.setAccountNonExpired(!expired);
    userRepository.save(userEntity);
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void userEnabled(final Long id, final boolean enabled) {
    final UserEntity userEntity = findById(id);
    userEntity.setEnabled(enabled);
    userRepository.save(userEntity);
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void userCredentialsExpired(final Long id, final boolean expired) {
    final UserEntity userEntity = findById(id);
    userEntity.setCredentialsNonExpired(!expired);
    userRepository.save(userEntity);
  }


  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void updatePassword(final Long id, final String password) {
    try {
      final UserEntity userEntity = findById(id);
      userEntity.setPassword(passwordEncoder.encode(password));
      userRepository.save(userEntity);
    } catch (Exception e) {
      throw new RuntimeException("Failed to update password");
    }
  }

  private void changeMfa(final User user, final boolean enable) {
    final UserEntity userEntity = findById(user);
    userEntity.setMfaEnabled(enable);
    if(!enable) {
      userEntity.setMfaSecret(null);
    }
    userRepository.save(userEntity);
  }

  private UserEntity findById(final User user) {
    return findById(user.getId());
  }

  private UserEntity findById(final Long id) {
    return userRepository.findById(id)
      .orElseThrow(() -> new UserNotFoundException("User not found"));
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
}
