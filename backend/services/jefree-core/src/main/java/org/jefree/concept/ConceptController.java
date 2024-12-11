package org.jefree.concept;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
  public ResponseEntity<List<SkillEntity>> getSkills() {
    return ResponseEntity.ok(conceptService.getSkills());
  }

  @JsonView(ConceptView.Collection.class)
  @GetMapping("/occupations")
  public ResponseEntity<List<OccupationEntity>> getOccupations() {
    return ResponseEntity.ok(conceptService.getOccupations());
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
