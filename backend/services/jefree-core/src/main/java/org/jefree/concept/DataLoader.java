package org.jefree.concept;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

  private final ConceptService conceptService;

  public DataLoader(final ConceptService conceptService) {
    this.conceptService = conceptService;
  }

  @Override
  public void run(String... args) throws Exception {
    if (conceptService.isSkillTableEmpty()) {
      File file = new ClassPathResource("occ.json").getFile();
      ObjectMapper objectMapper = new ObjectMapper();
      JsonNode rootNode = objectMapper.readTree(file);
      JsonNode resultsNode = rootNode.path("results").path("bindings");

      List<SkillEntity> skills = new ArrayList<>();
      for (JsonNode node : resultsNode) {
        SkillEntity skill = new SkillEntity();
        skill.setUrl(node.path("uri").path("value").asText());
        skill.setTitle(node.path("label").path("value").asText());
        skill.setDescription(node.path("description").path("value").asText());
        skills.add(skill);
      }

      conceptService.saveSkills(skills);
    }

    if (conceptService.isOccupationTableEmpty()) {
      File file = new ClassPathResource("skills.json").getFile();
      ObjectMapper objectMapper = new ObjectMapper();
      JsonNode rootNode = objectMapper.readTree(file);
      JsonNode resultsNode = rootNode.path("results").path("bindings");

      List<OccupationEntity> occupations = new ArrayList<>();
      for (JsonNode node : resultsNode) {
        OccupationEntity occupation = new OccupationEntity();
        occupation.setUrl(node.path("uri").path("value").asText());
        occupation.setTitle(node.path("label").path("value").asText());
        occupation.setDescription(node.path("description").path("value").asText());
        occupations.add(occupation);
      }

      conceptService.saveOccupations(occupations);
    }
  }
}