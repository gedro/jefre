package org.jefree.security.authentication.registration;

import java.util.List;

public record AuthResponse(Long id, String username, List<String> roles, String jwtToken) {
}
