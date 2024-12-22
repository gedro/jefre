package org.jefree.suggestion;

import org.jefree.database.DefaultView;

public class SuggestionView {
  public interface Candidate extends DefaultView.Entity {}
  public interface Job extends DefaultView.Entity {}
}
