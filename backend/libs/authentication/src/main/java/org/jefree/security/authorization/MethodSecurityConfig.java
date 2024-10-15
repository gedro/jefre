package org.jefree.security.authorization;

import org.aopalliance.intercept.MethodInvocation;
import org.jefree.security.authorization.handler.EmailMaskingMethodAuthorizationDeniedHandler;
import org.jefree.security.authorization.handler.MaskAnnotationDeniedHandler;
import org.jefree.security.authorization.handler.NullMethodAuthorizationDeniedHandler;
import org.jefree.security.authorization.role.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authorization.AuthorityAuthorizationManager;
import org.springframework.security.authorization.method.AuthorizationManagerBeforeMethodInterceptor;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.EnumSet;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
@EnableMethodSecurity(prePostEnabled = true, jsr250Enabled = false, securedEnabled = false)
public class MethodSecurityConfig {

  private static final Logger log = LoggerFactory.getLogger(MethodSecurityConfig.class);

  @Bean
  static CommandLineRunner initRoles (
    @Autowired(required = false) final RoleProvider roleProvider,
    final RoleRepository roleRepository,
    final PlatformTransactionManager transactionManager
  ) {
    return args -> {
      final TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
      transactionTemplate.execute(new TransactionCallbackWithoutResult() {
        @Override
        protected void doInTransactionWithoutResult(final TransactionStatus status) {
          final Set<String> appRoles = getRoles(roleProvider).stream().map(Role::roleName).collect(Collectors.toSet());
          final Set<String> dbRoles = roleRepository.findAll().stream().map(RoleEntity::getName).collect(Collectors.toSet());

          log.info("Roles in the application: {}", appRoles);
          log.info("Roles in the database: {}", dbRoles);

          appRoles.removeAll(dbRoles);
          log.info("Adding roles to database: {}", appRoles);

          // store the roles that are not in the database yet
          appRoles.forEach(roleName -> roleRepository.save(new RoleEntity(roleName)));
          roleRepository.flush();
          status.flush();
        }
      });
    };
  }

  @Bean
  static RoleHierarchy roleHierarchy(
    @Autowired(required = false) final RoleProvider roleProvider
  ) {
    final StringBuilder roleHierarchy = new StringBuilder();

    final Set<Role> roles = getRoles(roleProvider);
    for(final Role role : roles) {
      Optional.ofNullable(role.getIncludedRoles())
        .ifPresent(includedRoles ->
          includedRoles.stream()
            .map(includedRole -> role.roleName() + " > " + includedRole.roleName() + "\n")
            .forEach(roleHierarchy::append)
        );

      Optional.ofNullable(role.getPermissions())
        .ifPresent(permissions -> {
          permissions.stream()
            .map(perm ->
              role.roleName() + " > " + role.internalName().toLowerCase() + ":" + perm.name().toLowerCase() + "\n"
            ).forEach(roleHierarchy::append);

          if(
            !permissions.contains(Permission.READ) && (
              permissions.contains(Permission.UPDATE) ||
              permissions.contains(Permission.CREATE) ||
              permissions.contains(Permission.DELETE)
            )
          ) {
            roleHierarchy
              .append(role.roleName())
              .append(" > ")
              .append(role.internalName().toLowerCase())
              .append(":read\n");
          }
        });
    }

    return RoleHierarchyImpl.fromHierarchy(roleHierarchy.toString());
  }

  @Bean
  static MethodSecurityExpressionHandler methodSecurityExpressionHandler(final RoleHierarchy roleHierarchy) {
    final DefaultMethodSecurityExpressionHandler handler = new DefaultMethodSecurityExpressionHandler();
    handler.setRoleHierarchy(roleHierarchy);
    return handler;
  }

  @Bean
  @org.springframework.context.annotation.Role(BeanDefinition.ROLE_INFRASTRUCTURE)
  static Advisor protectServicePointcut(final RoleHierarchy roleHierarchy) {
    final AspectJExpressionPointcut pattern = new AspectJExpressionPointcut();
    pattern.setExpression(
      "execution(* org.jefree..*Controller.*(..)) && " +
      "!@annotation(org.jefree.security.authorization.annotation.Public)"
    );

    final AuthorityAuthorizationManager<MethodInvocation> manager = AuthorityAuthorizationManager.hasAuthority("user:read");
    manager.setRoleHierarchy(roleHierarchy);

    return new AuthorizationManagerBeforeMethodInterceptor(pattern, manager);
  }

  @Bean
  public NullMethodAuthorizationDeniedHandler nullMethodAuthorizationDeniedHandler() {
    return new NullMethodAuthorizationDeniedHandler();
  }

  @Bean
  public EmailMaskingMethodAuthorizationDeniedHandler emailMaskingMethodAuthorizationDeniedHandler() {
    return new EmailMaskingMethodAuthorizationDeniedHandler();
  }

  @Bean
  public MaskAnnotationDeniedHandler maskAnnotationDeniedHandler() {
    return new MaskAnnotationDeniedHandler();
  }

  private static Set<Role> getRoles(final RoleProvider roleProvider) {
    final Set<Role> roles = new HashSet<>(EnumSet.allOf(DefaultRole.class));

    Optional.ofNullable(roleProvider)
      .map(RoleProvider::getRoles)
      .ifPresent(roles::addAll);

    return roles;
  }
}