package org.jefree.concept;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
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
      InputStream inputStream = new ClassPathResource("skills.json").getInputStream();
      ObjectMapper objectMapper = new ObjectMapper();
      JsonNode rootNode = objectMapper.readTree(inputStream);
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
      InputStream inputStream = new ClassPathResource("occ.json").getInputStream();
      ObjectMapper objectMapper = new ObjectMapper();
      JsonNode rootNode = objectMapper.readTree(inputStream);
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