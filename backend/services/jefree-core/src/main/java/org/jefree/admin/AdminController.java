package org.jefree.admin;

import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.database.DefaultView;
import org.jefree.job.JobEntity;
import org.jefree.job.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/admin", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

  private final StatisticsService statisticsService;
  private final JobService jobService;

  public AdminController(
    final StatisticsService statisticsService,
    final JobService jobService
  ) {
    this.statisticsService = statisticsService;
    this.jobService = jobService;
  }

  @GetMapping("/statistics")
  public ResponseEntity<StatisticResponse> getStatistics() {
    return new ResponseEntity<>(statisticsService.getStatistics(), HttpStatus.OK);
  }

  @GetMapping("/jobs/{id}")
  @JsonView(DefaultView.Entity.class)
  public ResponseEntity<JobEntity> getJob(@PathVariable final Long id) {
    return new ResponseEntity<>(jobService.getJob(id), HttpStatus.OK);
  }
}
