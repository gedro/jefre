package org.jefree.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/admin", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

  private final StatisticsService statisticsService;

  public AdminController(final StatisticsService statisticsService) {
    this.statisticsService = statisticsService;
  }

  @GetMapping("/statistics")
  public ResponseEntity<StatisticResponse> getStatistics() {
    return new ResponseEntity<>(statisticsService.getStatistics(), HttpStatus.OK);
  }
}
