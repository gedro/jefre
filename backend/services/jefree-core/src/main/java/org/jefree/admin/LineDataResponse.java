package org.jefree.admin;

import org.springframework.data.util.Pair;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LineDataResponse {
  private final List<String> labels = new ArrayList<>();
  private List<Long> registeredUsers;
  private List<Long> registeredCandidates;
  private List<Long> registeredRecruiters;
  private List<Long> openJobs;

  public LineDataResponse(final LocalDateTime startDate) {
    final LocalDateTime now = LocalDateTime.now();
    for (LocalDateTime date = startDate; !date.isAfter(now); date = date.plusDays(1)) {
      this.labels.add(date.format(DateTimeFormatter.ISO_LOCAL_DATE));
    }
  }

  private List<Long> fillTheGaps(final List<Pair<Date, Long>> dailySumData) {
    final Map<String, Long> dateToSumMap = dailySumData.stream()
      .collect(Collectors.toMap(
        pair -> pair.getFirst().toLocalDate().format(DateTimeFormatter.ISO_LOCAL_DATE),
        Pair::getSecond
      ));

    Long total = 0L;
    final List<Long> data = new ArrayList<>();
    for(int i = 0; i < this.labels.size(); i++) {
      final String date = this.labels.get(i);
      if (dateToSumMap.containsKey(date)) {
        total += dateToSumMap.get(date);
      }
      data.add(total);
    }

    return data;
  }

  public List<String> getLabels() {
    return labels;
  }

  public List<Long> getRegisteredUsers() {
    return registeredUsers;
  }

  public void setRegisteredUsers(final List<Pair<Date, Long>> dailySumData) {
    this.registeredUsers = fillTheGaps(dailySumData);
  }

  public List<Long> getRegisteredCandidates() {
    return registeredCandidates;
  }

  public void setRegisteredCandidates(final List<Pair<Date, Long>> dailySumData) {
    this.registeredCandidates = fillTheGaps(dailySumData);
  }

  public List<Long> getRegisteredRecruiters() {
    return registeredRecruiters;
  }

  public void setRegisteredRecruiters(final List<Pair<Date, Long>> dailySumData) {
    this.registeredRecruiters = fillTheGaps(dailySumData);
  }

  public List<Long> getOpenJobs() {
    return openJobs;
  }

  public void setOpenJobs(final List<Pair<Date, Long>> dailySumData) {
    this.openJobs = fillTheGaps(dailySumData);
  }
}
