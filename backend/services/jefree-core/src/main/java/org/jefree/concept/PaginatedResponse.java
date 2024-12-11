package org.jefree.concept;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;

import java.util.List;

public class PaginatedResponse<T> {

  @JsonView(ConceptView.Collection.class)
  private final List<T> concepts;

  @JsonView(ConceptView.Collection.class)
  private final boolean hasMore;

  public PaginatedResponse(final Page<T> concepts) {
    this.concepts = concepts.getContent();
    this.hasMore = concepts.hasNext();
  }

  public List<T> getConcepts() {
    return concepts;
  }

  public boolean isHasMore() {
    return hasMore;
  }
}