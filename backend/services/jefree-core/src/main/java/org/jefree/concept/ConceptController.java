package org.jefree.concept;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/concepts", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER')")
public class ConceptController {

  private final ConceptService conceptService;

  public ConceptController(final ConceptService conceptService) {
    this.conceptService = conceptService;
  }

  @JsonView(ConceptView.Collection.class)
  @GetMapping("/skills")
  public ResponseEntity<PaginatedResponse<SkillEntity>> getSkills(
    @RequestParam(required = false, defaultValue = "") final String query,
    @RequestParam(defaultValue = "0") final int page,
    @RequestParam(defaultValue = "10") final int size
  ) {
    final Pageable pageable = PageRequest.of(page, size);
    final Page<SkillEntity> skillsPage = conceptService.getSkills(query, pageable);
    return ResponseEntity.ok(new PaginatedResponse<>(skillsPage));
  }

  @JsonView(ConceptView.Collection.class)
  @GetMapping("/occupations")
  public ResponseEntity<PaginatedResponse<OccupationEntity>> getOccupations(
    @RequestParam(required = false, defaultValue = "") final String query,
    @RequestParam(defaultValue = "0") final int page,
    @RequestParam(defaultValue = "10") final int size
  ) {
    final Pageable pageable = PageRequest.of(page, size);
    final Page<OccupationEntity> occupationsPage = conceptService.getOccupations(query, pageable);
    return ResponseEntity.ok(new PaginatedResponse<>(occupationsPage));
  }

  @GetMapping("/skill-description")
  public ResponseEntity<String> getSkillDescription(final String url) {
    return ResponseEntity.ok(conceptService.getSkillDescription(url));
  }

  @GetMapping("/occupation-description")
  public ResponseEntity<String> getOccupationDescription(final String url) {
    return ResponseEntity.ok(conceptService.getOccupationDescription(url));
  }
}
