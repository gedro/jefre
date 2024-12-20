import React, { Fragment, useState, useEffect, useCallback } from "react";
import {Redirect, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";

import workTypes from /*webpackIgnore: true*/ '../../../utils/workTypes';
import jobTypes from /*webpackIgnore: true*/ '../../../utils/jobTypes';
import experienceLevels from /*webpackIgnore: true*/ '../../../utils/experienceLevels';

import Loader from 'components/Loader';
import Button from "components/Button";
import InputTextField from "components/InputTextField";
import Editor from "components/Editor";
import DatePicker from "components/DatePicker";
import LocationPicker from "components/LocationPicker";
import AsyncLazySelect from "components/AsyncLazySelect";

export default function EditJob({ classes, appContext, onAppContextChanged, history }) {
  const { jobId } = useParams();
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
      localStorage.removeItem('job_skillSelect_concepts');
      localStorage.removeItem('job_occupationSelect_concepts');
    }
  }, [appContext.isSignedIn]);

  useEffect(() => {
    fetchJobData().catch((err) => { toast.error("Error fetching job details", err); });
  }, [fetchJobData, jobId, reset]);

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [workType, setWorkType] = useState("");
  const [vacancyEndDate, setVacancyEndDate] = useState(oneYearFromNow);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const fetchJobData = useCallback(async () => {
    if(jobId) {
      try {
        setLoading(true);

        const response = await appContext.api.get(`/jobs/${jobId}`);
        const jobData = response.data;

        if (!jobData) {
          setRedirect(true);
          return;
        }

        const vacancyEndDateData = jobData?.vacancyEndDate ? new Date(jobData?.vacancyEndDate) : oneYearFromNow;

        // Set form values with fetched data
        reset({
          jobTitle: jobData?.title,
          vacancyEndDate: vacancyEndDateData,
          companyName: jobData?.companyName,
          contactPerson: jobData?.contactPerson,
          contactEmail: jobData?.contactEmail,
          contactPhone: jobData?.contactPhone,
        });

        // Set other state values
        setJobType(jobTypes.find((item) => item.value === jobData?.jobType));
        setExperienceLevel(experienceLevels.find((item) => item.value === jobData?.experienceLevel));
        setWorkType(workTypes.find((item) => item.value === jobData?.workType));
        setVacancyEndDate(vacancyEndDateData);
        setCountry(jobData?.country);
        setCity(jobData?.city);
        setJobDescription(jobData?.description);
        setSelectedOptions(jobData.occupations);
        setSelectedSkills(jobData.skills);
      } finally {
        setLoading(false);
      }
    }
  }, [jobId, reset]);

  const onSubmitHandler = async (data) => {
    const { jobTitle, companyName, contactPerson, contactEmail, contactPhone } = data;

    try {
      setLoading(true);

      const jobData = {
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
        "skills": selectedSkills,
        "occupations": selectedOptions,
      }

      if(jobId) {
        await appContext.api.put(`/jobs/${jobId}`, jobData);
        reset();
        await fetchJobData();
        toast.success("Job is updated!");
      } else {
        await appContext.api.post("/jobs", jobData);
        reset();
        setJobDescription("");
        toast.success("Job is posted!");
      }
    } catch (error) {
      toast.error("Error while " + (jobId ? "updating" : "creating") + " job posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {redirect && <Redirect to="/recruiter/jobs" />}
          <div className={classes.re_recruiter}>
            <div>
              <div className={classes.re_new_job_flex}>
                <div>
                  <h1 className={classes.re_new_job_h1}>{!jobId && "New "}Job Details</h1>
                </div>
                <div>
                  <Button loading={loading} text="Submit">
                    <div style={{width: "15em", height: "1.5em", paddingTop: "0.35em"}}>{jobId ? "Update" : "Post"} the Job</div>
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
                id="job_occupationSelect"
                placeholder="Select an ESCO Occupation"
                value={selectedOptions} handleOnChange={setSelectedOptions}
                listEndpoint="/concepts/occupations"
                detailsEndpoint="/concepts/occupation-description"
                withRange={true} appContext={appContext}
              />
            </div>
          </div>
          <div className={classes.re_recruiter}>
            <h1 className={classes.re_new_job_h1}>Skills</h1>
            <hr className={classes.re_new_job_hr}/>
            <div className={classes.re_new_job_form_line}>
              <AsyncLazySelect
                id="job_skillSelect"
                placeholder="Select an ESCO Skill"
                value={selectedSkills} handleOnChange={setSelectedSkills}
                listEndpoint="/concepts/skills"
                detailsEndpoint="/concepts/skill-description"
                withRange={true} appContext={appContext}
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
      )}
    </Fragment>
  );
};