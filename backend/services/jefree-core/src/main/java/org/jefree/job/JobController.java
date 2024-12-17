package org.jefree.job;

import org.jefree.security.authentication.user.User;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/jobs", produces = MediaType.APPLICATION_JSON_VALUE)
public class JobController {

  private final JobService jobService;

  public JobController(final JobService jobService) {
    this.jobService = jobService;
  }

  @PreAuthorize("hasRole('RECRUITER')")
  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> createJob(
    @AuthenticationPrincipal final User user, @RequestBody final JobEntity job
  ) {
    final JobEntity savedJob = jobService.saveJob(user, job);
    return ResponseEntity.ok("Saved");
  }
}
