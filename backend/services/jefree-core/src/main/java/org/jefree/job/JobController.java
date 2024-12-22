package org.jefree.job;

import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.candidate.CandidateEntity;
import org.jefree.database.DefaultView;
import org.jefree.security.authentication.user.User;
import org.jefree.suggestion.Suggestion;
import org.jefree.suggestion.SuggestionService;
import org.jefree.suggestion.SuggestionView;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/jobs", produces = MediaType.APPLICATION_JSON_VALUE)
public class JobController {

  private final JobService jobService;
  private final SuggestionService suggestionService;

  public JobController(final JobService jobService, final SuggestionService suggestionService) {
    this.jobService = jobService;
    this.suggestionService = suggestionService;
  }

  @PreAuthorize("hasRole('RECRUITER')")
  @GetMapping
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<List<JobEntity>> getJobs(@AuthenticationPrincipal final User user) {
    return ResponseEntity.ok(jobService.getRecruiterJobs(user));
  }

  @PreAuthorize("hasRole('RECRUITER')")
  @GetMapping("/{jobId}")
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<JobEntity> getJob(@AuthenticationPrincipal final User user, @PathVariable final Long jobId) {
    return ResponseEntity.ok(jobService.getUserJob(user, jobId));
  }

  @PreAuthorize("hasRole('RECRUITER')")
  @GetMapping("/{jobId}/candidates")
  @JsonView(SuggestionView.Candidate.class)
  public ResponseEntity<List<Suggestion<CandidateEntity>>> suggestCandidates(
    @AuthenticationPrincipal final User user, @PathVariable final Long jobId
  ) {
    jobService.getUserJob(user, jobId); // only to check if job exists and available for the signed in recruiter
    return ResponseEntity.ok(suggestionService.suggestCandidates(jobId));
  }

  @PreAuthorize("hasRole('RECRUITER')")
  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> createJob(
    @AuthenticationPrincipal final User user, @RequestBody final JobEntity job
  ) {
    jobService.saveJob(user, job);
    return ResponseEntity.ok("Saved");
  }

  @PreAuthorize("hasRole('RECRUITER')")
  @PutMapping(value = "/{jobId}", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> updateJob(
    @AuthenticationPrincipal final User user, @PathVariable final Long jobId, @RequestBody final JobEntity job
  ) {
    jobService.updateJob(user, jobId, job);
    return ResponseEntity.ok("Updated");
  }
}
