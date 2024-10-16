package org.jefree.security.authentication.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @AuthorizeReturnObject
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

//    @AuthorizeReturnObject
    Optional<UserEntity> findByEmail(String email);
}

