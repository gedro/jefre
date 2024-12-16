import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import workTypes from /*webpackIgnore: true*/ '../../../utils/workTypes';
import jobTypes from /*webpackIgnore: true*/ '../../../utils/jobTypes';
import experienceLevels from /*webpackIgnore: true*/ '../../../utils/experienceLevels';

import Button from "components/Button";
import InputTextField from "components/InputTextField";
import Editor from "components/Editor";
import DatePicker from "components/DatePicker";
import LocationPicker from "components/LocationPicker";
import AsyncLazySelect from "components/AsyncLazySelect";

export default function NewJob({ classes, appContext, onAppContextChanged, history }) {
  const oneYearFromNow = new Date();
  oneYearFromNow.setMonth(oneYearFromNow.getMonth() + 1);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      vacancyEndDate: oneYearFromNow,
      companyName: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!appContext?.isSignedIn) {
      localStorage.removeItem('skillSelect_concepts');
      localStorage.removeItem('occupationSelect_concepts');
    }
  }, [appContext.isSignedIn]);

  const [loading, setLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [workType, setWorkType] = useState("");
  const [vacancyEndDate, setVacancyEndDate] = useState(oneYearFromNow);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const onSubmitHandler = async (data) => {
    const { jobTitle, vacancyEndDate, companyName, contactPerson, contactEmail, contactPhone } = data;

    try {
      setLoading(true);

      const job = {
        "title": jobTitle,
        "jobType": jobType.value,
        "experienceLevel": experienceLevel.value,
        "workType": workType.value,
        "vacancyEndDate": vacancyEndDate.toLocaleDateString('en-CA'), // YYYY-MM-DD
        "country": country,
        "city": city,
        "companyName": companyName,
        "contactPerson": contactPerson,
        "contactEmail": contactEmail,
        "contactPhone": contactPhone,
        "description": jobDescription,
        "skills": selectedSkills.map(skill => { return {"url": skill.url, "month": skill.month}; }),
        "occupations": selectedOptions.map(occupation => { return {"url": occupation.url, "month": occupation.month}; }),
      }

      await appContext.api.post("/jobs", job);

      toast.success("New Job is posted!");
      reset();
    } catch (error) {
      toast.error("Error while creating new job posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={classes.re_recruiter}>
        <div>
          <div className={classes.re_new_job_flex}>
            <div>
              <h1 className={classes.re_new_job_h1}>New Job Details</h1>
            </div>
            <div>
              <Button loading={loading} text="Submit">
                <div style={{width: "15em", height: "1.5em", paddingTop: "0.35em"}}>Post the Job</div>
              </Button>
            </div>
          </div>
          <hr className={classes.re_new_job_hr}/>
        </div>
        <div className={classes.re_new_job_form_line}>
          <InputTextField
            label="Job Title" message="*Job Title is required"
            id="jobTitle" min={1}
            register={register} errors={errors}
          />
        </div>
        <div className={classes.re_new_job_form_line}>
          <div className={classes.re_new_job_form_labeled_input}>
            <label className={classes.re_new_job_form_label}>Job Type *:{" "}</label>
            <Select
              name="jobType" required={true} className={classes.re_new_job_form_select}
              value={jobType} onChange={setJobType} options={jobTypes}
            />
          </div>
          <div className={classes.re_new_job_form_labeled_input}>
            <label className={classes.re_new_job_form_label}>Work Type *:{" "}</label>
            <Select
              name="workType" required={true} className={classes.re_new_job_form_select}
              value={workType} onChange={setWorkType} options={workTypes}
            />
          </div>
        </div>
        <div className={classes.re_new_job_form_line}>
          <div className={classes.re_new_job_form_labeled_input}>
            <label className={classes.re_new_job_form_label}>Experience Level *:{" "}</label>
            <Select
              name="experienceLevel" required={true} className={classes.re_new_job_form_select}
              value={experienceLevel} onChange={setExperienceLevel} options={experienceLevels}
            />
          </div>
          <div className={classes.re_new_job_form_labeled_input}>
            <DatePicker label="Vacancy End Date *:" id="vacancyEndDate"
                        value={vacancyEndDate} handleOnChange={setVacancyEndDate}
            />
          </div>
        </div>
        <div className={classes.re_new_job_form_line}>
          <LocationPicker
            countryLabel="Preferred country" countryId="country"
            countryValue={country} handleCountryOnChange={setCountry}
            cityLabel="Preferred region" cityId="city"
            cityValue={city} handleCityOnChange={setCity}
          />
        </div>
      </div>
      <div className={classes.re_recruiter}>
        <h1 className={classes.re_new_job_h1}>Contact Information</h1>
        <hr className={classes.re_new_job_hr}/>
        <div className={classes.re_new_job_form_line}>
          <InputTextField
            label="Company Name" id="companyName"
            register={register} errors={errors} required={false}
          />
        </div>
        <div className={classes.re_new_job_form_line}>
          <InputTextField
            label="Contact Person" message="*Contact Person is required"
            id="contactPerson" min={10}
            register={register} errors={errors}
          />
        </div>
        <div className={classes.re_new_job_form_line}>
          <InputTextField
            label="Contact Email" id="contactEmail" value={appContext?.user?.email}
            register={register} errors={errors} readOnly={true}
          />
        </div>
        <div className={classes.re_new_job_form_line}>
          <InputTextField
            label="Contact Phone" message="*Contact Phone is required" id="contactPhone"
            register={register} errors={errors}
          />
        </div>
      </div>
      <div className={classes.re_recruiter}>
        <h1 className={classes.re_new_job_h1}>Occupations</h1>
        <hr className={classes.re_new_job_hr}/>
        <div className={classes.re_new_job_form_line}>
          <AsyncLazySelect
            id="occupationSelect"
            placeholder="Select an ESCO Occupation"
            value={selectedOptions} handleOnChange={setSelectedOptions}
            listEndpoint="/concepts/occupations"
            detailsEndpoint="/concepts/occupation-description"
            appContext={appContext}
          />
        </div>
      </div>
      <div className={classes.re_recruiter}>
        <h1 className={classes.re_new_job_h1}>Skills</h1>
        <hr className={classes.re_new_job_hr}/>
        <div className={classes.re_new_job_form_line}>
          <AsyncLazySelect
            id="skillSelect"
            placeholder="Select an ESCO Skill"
            value={selectedSkills} handleOnChange={setSelectedSkills}
            listEndpoint="/concepts/skills"
            detailsEndpoint="/concepts/skill-description"
            appContext={appContext}
          />
        </div>
      </div>
      <div className={classes.re_recruiter}>
        <h1 className={classes.re_new_job_h1}>Job Description</h1>
        <hr className={classes.re_new_job_hr}/>
        <div className={classes.re_new_job_desc_div}>
          <Editor id="jobDescription" value={jobDescription} handleOnChange={setJobDescription}/>
        </div>
      </div>
    </form>
  );
};