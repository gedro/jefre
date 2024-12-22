package org.jefree.job;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.database.DefaultView;
import org.jefree.security.audit.AuditableEntity;
import org.jefree.security.authentication.user.UserEntity;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Entity(name = "Job")
@Table(name = "job_postings",
  indexes = {
    @Index(columnList = "recruiter_id", unique = false)
  }
)
public class JobEntity extends AuditableEntity<String> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @NotBlank
  @Size(max = 255)
  @Column(name="title", length = 255, updatable = true, nullable = false)
  private String title;

  @Enumerated(EnumType.STRING)
  @Column(name="job_type", updatable = true, nullable = false)
  private JobType jobType;

  @Enumerated(EnumType.STRING)
  @Column(name="experience_level", updatable = true, nullable = false)
  private ExperienceLevel experienceLevel;

  @Enumerated(EnumType.STRING)
  @Column(name="work_type", updatable = true, nullable = false)
  private WorkType workType;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Temporal(TemporalType.DATE)
  @Column(name="end_date", updatable = true, nullable = false)
  private LocalDate vacancyEndDate;

  @Size(max = 50)
  @Column(name="country", length = 50, updatable = true, nullable = true)
  private String country;

  @Size(max = 120)
  @Column(name="city", length = 120, updatable = true, nullable = true)
  private String city;

  @Size(max = 120)
  @Column(name="company_name", length = 120, updatable = true, nullable = true)
  private String companyName;

  @NotBlank
  @Size(max = 120)
  @Column(name="contact_person", length = 120, updatable = true, nullable = false)
  private String contactPerson;

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
  @Column(name="description", updatable = true, nullable = true)
  private String description;

  @ManyToOne(optional = false, cascade = CascadeType.REFRESH)
  @JoinColumn(name = "recruiter_id", referencedColumnName = "id")
  @JsonView(DefaultView.Ignore.class)
  private UserEntity recruiter;

  @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<JobSkillEntity> skills = Collections.emptyList();

  @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<JobOccupationEntity> occupations = Collections.emptyList();

  public Long getId() {
    return id;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(final String title) {
    this.title = title;
  }

  public JobType getJobType() {
    return jobType;
  }

  public void setJobType(final JobType jobType) {
    this.jobType = jobType;
  }

  public ExperienceLevel getExperienceLevel() {
    return experienceLevel;
  }

  public void setExperienceLevel(final ExperienceLevel experienceLevel) {
    this.experienceLevel = experienceLevel;
  }

  public WorkType getWorkType() {
    return workType;
  }

  public void setWorkType(final WorkType workType) {
    this.workType = workType;
  }

  public LocalDate getVacancyEndDate() {
    return vacancyEndDate;
  }

  public void setVacancyEndDate(final LocalDate vacancyEndDate) {
    this.vacancyEndDate = vacancyEndDate;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(final String country) {
    this.country = country;
  }

  public String getCity() {
    return city;
  }

  public void setCity(final String city) {
    this.city = city;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(final String companyName) {
    this.companyName = companyName;
  }

  public String getContactPerson() {
    return contactPerson;
  }

  public void setContactPerson(final String contactPerson) {
    this.contactPerson = contactPerson;
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

  public String getDescription() {
    return description;
  }

  public void setDescription(final String description) {
    this.description = description;
  }

  public UserEntity getRecruiter() {
    return recruiter;
  }

  public void setRecruiter(final UserEntity recruiter) {
    this.recruiter = recruiter;
  }

  public List<JobSkillEntity> getSkills() {
    return skills;
  }

  public void setSkills(final List<JobSkillEntity> skills) {
    this.skills = skills;
  }

  public List<JobOccupationEntity> getOccupations() {
    return occupations;
  }

  public void setOccupations(final List<JobOccupationEntity> occupations) {
    this.occupations = occupations;
  }
}
