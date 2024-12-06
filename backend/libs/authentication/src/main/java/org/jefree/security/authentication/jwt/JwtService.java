package org.jefree.security.authentication.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.jefree.security.authentication.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JwtService {

  private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

  private final String jwtSecret;
  private final int jwtExpirationMs;
  private final String jwtHeader;
  private final String jwtPrefix;

  private final JwtParser jwtParser;

  public JwtService(
    @Value("${libs.security.jwt.secret}") final String jwtSecret,
    @Value("${libs.security.jwt.expiration: 86400000}") final int jwtExpirationMs,
    @Value("${libs.security.jwt.header: Authorization}") final String jwtHeader,
    @Value("${libs.security.jwt.prefix: Bearer}") final String jwtPrefix
  ) {
    this.jwtSecret = jwtSecret;
    this.jwtExpirationMs = jwtExpirationMs;
    this.jwtHeader = jwtHeader;
    this.jwtPrefix = jwtPrefix;

    jwtParser = Jwts.parser().verifyWith(key()).build();
  }

  String getJwtToken(final HttpServletRequest request) {
    final String authHeader = request.getHeader(jwtHeader);
    logger.debug("Authorization Header: {}", authHeader);

    if (authHeader != null && authHeader.startsWith(jwtPrefix)) {
      return authHeader.replace(jwtPrefix + " ", "");
    }
    return null;
  }

  Optional<Claims> getValidatedJwtClaimsFrom(final HttpServletRequest request) {
    return getValidatedJwtClaimsFrom(getJwtToken(request));
  }

  Optional<Claims> getValidatedJwtClaimsFrom(final String authToken) {
    if(authToken == null) {
      return Optional.empty();
    }

    try {
      return Optional.ofNullable(jwtParser.parseSignedClaims(authToken)).map(Jws::getPayload);
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage(), e);
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage(), e);
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage(), e);
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage(), e);
    }

    return Optional.empty();
  }

  User extractUserDetails(final Claims claims) {
    return User.builder(
      Long.valueOf(claims.getSubject()),
      claims.get(JwtFields.JWT_USERNAME, String.class),
      claims.get(JwtFields.JWT_EMAIL, String.class)
    )
      .mfaEnabled(claims.get(JwtFields.JWT_IS_MFA_ENABLED, Boolean.class))
      .authorities(claims.get(JwtFields.JWT_ROLES, String.class).split(","))
      .build();
  }

  public String generateToken(final User user) {
    final String roles = user.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.joining(","));

    return Jwts.builder()
      .subject(user.getId().toString())
      .claim(JwtFields.JWT_NAME, user.getName())
      .claim(JwtFields.JWT_USERNAME, user.getUsername())
      .claim(JwtFields.JWT_EMAIL, user.getEmail())
      .claim(JwtFields.JWT_ROLES, roles)
      .claim(JwtFields.JWT_IS_MFA_ENABLED, user.isMfaEnabled())
      .issuedAt(new Date())
      .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
      .signWith(key())
      .compact();
  }

  public void storeJwtUserToSecurityContext(final User user, final HttpServletRequest request) {
    if(user == null) {
      return;
    }

    final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
      user, null, user.getAuthorities()
    );

    logger.debug("User from JWT: {}", user);

    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }

  public String generateNewJwtAndStoreToSecurityContext(final User user, final HttpServletRequest request) {
    final String jwtToken = generateToken(user);
    storeJwtUserToSecurityContext(user, request);
    return jwtToken;
  }

  private SecretKey key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }
}
