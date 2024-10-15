package org.jefree.security.web;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.lang.Nullable;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Default ESCO CORS Configuration
 */
public class DefaultCorsConfigurationSource implements CorsConfigurationSource {

  private final long maxAge;
  private final List<String> allowedOrigins;
  private final List<String> allowedOriginPatterns;
  private final List<String> allowedHeaders;
  private final List<String> allowedMethods;
  private final List<String> exposedHeaders;

  public DefaultCorsConfigurationSource(final CorsProperties cors) {
    this.maxAge = cors.getMaxAge();
    this.allowedOrigins = wrap(cors.getAllowedOrigins());
    this.allowedOriginPatterns = wrap(cors.getAllowedOriginPatterns());
    this.allowedHeaders = wrap(cors.getAllowedHeaders());
    this.allowedMethods = wrap(cors.getAllowedMethods());
    this.exposedHeaders = wrap(cors.getExposedHeaders());
  }

  @Override
  @Nullable
  public CorsConfiguration getCorsConfiguration(final HttpServletRequest request) {
    final CorsConfiguration config = new CorsConfiguration();

    config.setAllowCredentials(true);
    config.setAllowedOrigins(allowedOrigins);
    config.setAllowedOriginPatterns(allowedOriginPatterns);
    config.setAllowedHeaders(allowedHeaders);
    config.setAllowedMethods(allowedMethods);
    config.setExposedHeaders(exposedHeaders);
    config.setMaxAge(maxAge);

    return config;
  }

  private List<String> wrap(final String... strs) {
    return strs != null && strs.length > 0 ? Arrays.asList(strs) : Collections.emptyList();
  }

  @Override
  public String toString() {
    return "DefaultCorsConfigurationSource{" +
      "maxAge=" + maxAge +
      ", allowedOrigins=" + allowedOrigins +
      ", allowedOriginPatterns=" + allowedOriginPatterns +
      ", allowedHeaders=" + allowedHeaders +
      ", allowedMethods=" + allowedMethods +
      ", exposedHeaders=" + exposedHeaders +
      '}';
  }
}

