package org.jefree.candidate;

import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.database.DefaultView;
import org.jefree.job.JobEntity;
import org.jefree.job.JobService;
import org.jefree.security.authentication.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/candidate", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('CANDIDATE')")
public class CandidateController {

  private final CandidateService candidateService;
  private final JobService jobService;

  public CandidateController(
    final CandidateService candidateService,
    final JobService jobService
  ) {
    this.candidateService = candidateService;
    this.jobService = jobService;
  }

  @GetMapping
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<CandidateEntity> getCandidateInfo(@AuthenticationPrincipal final User user) {
    final CandidateEntity candidate = candidateService.getCandidate(user);
    return ResponseEntity.ok(candidate);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> updateCandidateInfo(
    @AuthenticationPrincipal final User user, @RequestBody final CandidateEntity candidate
  ) {
    candidateService.updateCandidate(user, candidate);
    return ResponseEntity.ok("Updated");
  }

  @GetMapping("/jobs")
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<List<JobEntity>> getSuggestedJobsFor(@AuthenticationPrincipal final User user) {
    return new ResponseEntity<>(jobService.getSuggestedJobsFor(user), HttpStatus.OK);
  }

  @GetMapping("/jobs/{id}")
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<JobEntity> getJob(@PathVariable final Long id) {
    return new ResponseEntity<>(jobService.getJob(id), HttpStatus.OK);
  }
}
