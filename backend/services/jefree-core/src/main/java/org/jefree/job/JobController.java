package org.jefree.job;

import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.database.DefaultView;
import org.jefree.security.authentication.user.User;
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

  @PreAuthorize("hasRole('RECRUITER')")
  @GetMapping
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<List<JobEntity>> getJobs(@AuthenticationPrincipal final User user) {
    return ResponseEntity.ok(jobService.getUserJobs(user));
  }
}
