package org.jefree.job;

import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.candidate.CandidateEntity;
import org.jefree.candidate.CandidateService;
import org.jefree.database.DefaultView;
import org.jefree.security.authentication.user.User;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/recruiter", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('RECRUITER')")
public class RecruiterController {

  private final CandidateService candidateService;

  public RecruiterController(final CandidateService candidateService) {
    this.candidateService = candidateService;
  }

  @GetMapping("/favorite-candidates")
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<List<CandidateEntity>> getFavoriteCandidates(@AuthenticationPrincipal final User user) {
    return ResponseEntity.ok(candidateService.getFavoriteCandidates(user));
  }

  @GetMapping("/candidates/{candidateId}")
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<CandidateEntity> getCandidate(@PathVariable final Long candidateId) {
    return ResponseEntity.ok(candidateService.getCandidate(candidateId));
  }
}
