package org.jefree.concept;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConceptService {

  private final SkillRepository skillRepository;
  private final OccupationRepository occupationRepository;

  public ConceptService(final SkillRepository skillRepository, final OccupationRepository occupationRepository) {
    this.skillRepository = skillRepository;
    this.occupationRepository = occupationRepository;
  }

  public List<SkillEntity> getSkills() {
    return skillRepository.findAll();
  }

  public List<OccupationEntity> getOccupations() {
    return occupationRepository.findAll();
  }

  public Page<SkillEntity> getSkills(final String query, final Pageable pageable) {
    if (query == null || query.isEmpty()) {
      return skillRepository.findAll(pageable);
    }
    return skillRepository.findByTitleContainingIgnoreCaseOrderByTitle(query, pageable);
  }

  public Page<OccupationEntity> getOccupations(final String query, final Pageable pageable) {
    if (query == null || query.isEmpty()) {
      return occupationRepository.findAll(pageable);
    }
    return occupationRepository.findByTitleContainingIgnoreCaseOrderByTitle(query, pageable);
  }

  public String getSkillDescription(final String url) {
    return getSkillByUrl(url).map(SkillEntity::getDescription).orElse("");
  }

  public String getOccupationDescription(final String url) {
    return getOccupationByUrl(url).map(OccupationEntity::getDescription).orElse("");
  }

  public Optional<SkillEntity> getSkillByUrl(final String url) {
    return skillRepository.findByUrl(url);
  }

  public Optional<OccupationEntity> getOccupationByUrl(final String url) {
    return occupationRepository.findByUrl(url);
  }

  public boolean isSkillTableEmpty() {
    return skillRepository.count() == 0;
  }

  public void saveSkills(final List<SkillEntity> skills) {
    skillRepository.saveAll(skills);
  }

  public boolean isOccupationTableEmpty() {
    return occupationRepository.count() == 0;
  }

  public void saveOccupations(final List<OccupationEntity> occupations) {
    occupationRepository.saveAll(occupations);
  }
}
