package org.jefree.security.authentication.registration;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 60)
    private String username;

    @NotBlank
    @Size(max = 120)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Size(min = 10, max = 120)
    private String password;

    public @NotBlank @Size(min = 3, max = 60) String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank @Size(min = 3, max = 60) final String username) {
        this.username = username;
    }

    public @NotBlank @Size(max = 120) @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Size(max = 120) @Email final String email) {
        this.email = email;
    }

    public @NotBlank @Size(max = 120) String getName() {
        return name;
    }

    public void setName(@NotBlank @Size(max = 120) final String name) {
        this.name = name;
    }

    public @NotBlank @Size(min = 10, max = 120) String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank @Size(min = 10, max = 120) final String password) {
        this.password = password;
    }
}