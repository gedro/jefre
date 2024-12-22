package org.jefree.suggestion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class ScoringSystem {

  private static final Logger LOG = LoggerFactory.getLogger(ScoringSystem.class);

  private static final int DELAYED = 30;
  private static final int MAX_DELAYED_COUNTER = 300 /* 5m */ / DELAYED;

  public static final AtomicBoolean REFRESH_SCORES = new AtomicBoolean(true);
  private static final AtomicInteger DELAYED_COUNTER  = new AtomicInteger(0);

  private final SuggestionService  suggestionService;

  public ScoringSystem(final SuggestionService suggestionService) {
    this.suggestionService = suggestionService;
  }

  @Scheduled(initialDelay = 90, fixedDelay = DELAYED, timeUnit = TimeUnit.SECONDS)
  public void refreshScores() {
    if(
      REFRESH_SCORES.compareAndSet(true, false) ||
      DELAYED_COUNTER.compareAndSet(MAX_DELAYED_COUNTER, 0)
    ) {
      LOG.info("Refreshing scores...");
      suggestionService.refreshScores();
      LOG.info("Scores refreshed!");
    }
    DELAYED_COUNTER.incrementAndGet();
  }
}
