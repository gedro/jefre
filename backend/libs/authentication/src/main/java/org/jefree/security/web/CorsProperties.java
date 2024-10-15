package org.jefree.security.web;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.util.Arrays;

@Validated
@Component
@ConfigurationProperties("libs.security.web.cors")
public class CorsProperties {

  /**
   * Comma separated whitelisted URLs for CORS.
   * Should contain the applicationURL at the minimum.
   * Not providing this property or {@code #allowedOriginPatterns} would disable CORS configuration.
   */
  private String[] allowedOrigins;

  /**
   * Comma separated whitelisted URL patterns for CORS.
   * Should contain the applicationURL at the minimum.
   * Not providing this property or {@code #allowedOrigins} would disable CORS configuration.
   */
  private String[] allowedOriginPatterns;

  /**
   * Methods to be allowed, e.g. GET,POST,...
   */
  private String[] allowedMethods;

  /**
   * Request headers to be allowed, e.g. content-type, accept, origin, x-requested-with, ...
   *
   * https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
   */
  private String[] allowedHeaders;

  /**
   * Response headers that you want to expose to the client JavaScript programmer
   *
   * <br />
   * See <a href="http://stackoverflow.com/questions/25673089/why-is-access-control-expose-headers-needed#answer-25673446">here</a>
   * to know why this could be needed.
   *
   * <br />
   * https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
   */
  private String[] exposedHeaders;

  /**
   * CORS <code>maxAge</code> long property
   */
  private long maxAge;

  public String[] getAllowedOrigins() {
    return allowedOrigins;
  }

  public void setAllowedOrigins(final String[] allowedOrigins) {
    this.allowedOrigins = allowedOrigins;
  }

  public String[] getAllowedOriginPatterns() {
    return allowedOriginPatterns;
  }

  public void setAllowedOriginPatterns(final String[] allowedOriginPatterns) {
    this.allowedOriginPatterns = allowedOriginPatterns;
  }

  public String[] getAllowedMethods() {
    return allowedMethods;
  }

  public void setAllowedMethods(final String[] allowedMethods) {
    this.allowedMethods = allowedMethods;
  }

  public String[] getAllowedHeaders() {
    return allowedHeaders;
  }

  public void setAllowedHeaders(final String[] allowedHeaders) {
    this.allowedHeaders = allowedHeaders;
  }

  public String[] getExposedHeaders() {
    return exposedHeaders;
  }

  public void setExposedHeaders(final String[] exposedHeaders) {
    this.exposedHeaders = exposedHeaders;
  }

  public long getMaxAge() {
    return maxAge;
  }

  public void setMaxAge(final long maxAge) {
    this.maxAge = maxAge;
  }

  @Override
  public String toString() {
    return "CorsProperties{" +
      "allowedOrigins=" + Arrays.toString(allowedOrigins) +
      ", allowedOriginPatterns=" + Arrays.toString(allowedOriginPatterns) +
      ", allowedMethods=" + Arrays.toString(allowedMethods) +
      ", allowedHeaders=" + Arrays.toString(allowedHeaders) +
      ", exposedHeaders=" + Arrays.toString(exposedHeaders) +
      ", maxAge=" + maxAge +
    '}';
  }
}
