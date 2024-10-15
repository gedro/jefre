package org.jefree.security.authorization.role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
  Set<RoleEntity> findByNameIn(Collection<@NotBlank @Size(max = 30) String> name);
}

