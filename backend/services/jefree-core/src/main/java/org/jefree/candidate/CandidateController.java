package org.jefree.candidate;

import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.database.DefaultView;
import org.jefree.security.authentication.user.User;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/candidate", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('CANDIDATE')")
public class CandidateController {

  private final CandidateService candidateService;

  public CandidateController(final CandidateService candidateService) {
    this.candidateService = candidateService;
  }

  @GetMapping
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<CandidateEntity> getCandidateInfo(@AuthenticationPrincipal final User user) {
    final CandidateEntity candidate = candidateService.getCandidate(user);
    return ResponseEntity.ok(candidate);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> updateCandidateInfo(
    @AuthenticationPrincipal final User user, @RequestBody final CandidateEntity job
  ) {
    final CandidateEntity updatedCandidate = candidateService.updateCandidate(user, job);
    return ResponseEntity.ok("Updated");
  }
}
