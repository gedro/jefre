package org.jefree.security.authentication.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.util.Pair;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @AuthorizeReturnObject
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

//    @AuthorizeReturnObject
    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT new org.springframework.data.util.Pair(FUNCTION('DATE', e.createdDate), COUNT(DISTINCT e.email)) " +
      "FROM RegisteredUser e " +
      "WHERE e.createdDate >= :startDate " +
      "GROUP BY FUNCTION('DATE', e.createdDate) " +
      "ORDER BY FUNCTION('DATE', e.createdDate) ASC")
    List<Pair<Date, Long>> findDailyUserSumData(LocalDateTime startDate);

    @Query(
      "SELECT new org.springframework.data.util.Pair(FUNCTION('DATE', e.createdDate), COUNT(DISTINCT e.email)) " +
      "FROM RegisteredUser e JOIN e.roles r " +
      "WHERE e.createdDate >= :startDate " +
      "AND r.name = 'ROLE_RECRUITER' " +
      "GROUP BY FUNCTION('DATE', e.createdDate) " +
      "ORDER BY FUNCTION('DATE', e.createdDate) ASC")
    List<Pair<Date, Long>> findDailyRecruiterSumData(LocalDateTime startDate);

    @Query("SELECT COUNT(DISTINCT e.email) FROM RegisteredUser e")
    long countRegisteredUsers();

    @Query("SELECT COUNT(DISTINCT u.email) FROM RegisteredUser u JOIN u.roles r WHERE r.name = 'ROLE_RECRUITER'")
    long countRegisteredRecruiters();
}

