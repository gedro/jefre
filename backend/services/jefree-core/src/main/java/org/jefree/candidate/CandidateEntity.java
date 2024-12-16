package org.jefree.candidate;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.job.*;
import org.jefree.security.authentication.user.UserEntity;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Entity(name = "Candidate")
@Table(
  name = "candidates",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "user_id")
  }
)
public class CandidateEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @NotBlank
  @Size(max = 255)
  @Column(name="display_name", length = 255, updatable = true, nullable = false)
  private String displayName;

  @ElementCollection(targetClass = JobType.class)
  @CollectionTable(name = "candidate_job_types", joinColumns = @JoinColumn(name = "candidate_id"))
  @Enumerated(EnumType.STRING)
  @Column(name="job_types", updatable = true, nullable = false)
  private List<JobType> jobTypes;

  @ElementCollection(targetClass = ExperienceLevel.class)
  @CollectionTable(name = "candidate_experience_levels", joinColumns = @JoinColumn(name = "candidate_id"))
  @Enumerated(EnumType.STRING)
  @Column(name="experience_levels", updatable = true, nullable = false)
  private List<ExperienceLevel> experienceLevel;

  @ElementCollection(targetClass = WorkType.class)
  @CollectionTable(name = "candidate_work_types", joinColumns = @JoinColumn(name = "candidate_id"))
  @Enumerated(EnumType.STRING)
  @Column(name="work_types", updatable = true, nullable = false)
  private List<WorkType> workType;

  @NotBlank
  @Size(max = 120)
  @Email
  @Column(name="contact_email", length = 120, updatable = true, nullable = false)
  private String contactEmail;

  @NotBlank
  @Size(max = 20)
  @Column(name="contact_phone", length = 60, updatable = true, nullable = false)
  private String contactPhone;

  @Lob
  @Column(name="resume", updatable = true, nullable = true)
  private String resume;

  @OneToOne(optional = false, cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private UserEntity user;

  @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<SkillExperienceEntity> skills;

  @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OccupationExperienceEntity> occupations;

  public Long getId() {
    return id;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public String getDisplayName() {
    return displayName;
  }

  public void setDisplayName(final String displayName) {
    this.displayName = displayName;
  }

  public List<JobType> getJobTypes() {
    return jobTypes;
  }

  public void setJobTypes(final List<JobType> jobTypes) {
    this.jobTypes = jobTypes;
  }

  public List<ExperienceLevel> getExperienceLevel() {
    return experienceLevel;
  }

  public void setExperienceLevel(final List<ExperienceLevel> experienceLevel) {
    this.experienceLevel = experienceLevel;
  }

  public List<WorkType> getWorkType() {
    return workType;
  }

  public void setWorkType(final List<WorkType> workType) {
    this.workType = workType;
  }

  public String getContactEmail() {
    return contactEmail;
  }

  public void setContactEmail(final String contactEmail) {
    this.contactEmail = contactEmail;
  }

  public String getContactPhone() {
    return contactPhone;
  }

  public void setContactPhone(final String contactPhone) {
    this.contactPhone = contactPhone;
  }

  public String getResume() {
    return resume;
  }

  public void setResume(final String resume) {
    this.resume = resume;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(final UserEntity user) {
    this.user = user;
  }

  public List<SkillExperienceEntity> getSkills() {
    return skills;
  }

  public void setSkills(final List<SkillExperienceEntity> skills) {
    this.skills = skills;
  }

  public List<OccupationExperienceEntity> getOccupations() {
    return occupations;
  }

  public void setOccupations(final List<OccupationExperienceEntity> occupations) {
    this.occupations = occupations;
  }
}
