import React, { Fragment, useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import workTypes from /*webpackIgnore: true*/ '../../../utils/workTypes';
import jobTypes from /*webpackIgnore: true*/ '../../../utils/jobTypes';
import experienceLevels from /*webpackIgnore: true*/ '../../../utils/experienceLevels';

import Loader from 'components/Loader';
import Button from "components/Button";
import InputTextField from "components/InputTextField";
import Editor from "components/Editor";
import AsyncLazySelect from "components/AsyncLazySelect";

export default function CandidateDetails({ classes, appContext, onAppContextChanged, history }) {

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: "",
      contactEmail: "",
      contactPhone: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!appContext?.isSignedIn) {
      localStorage.removeItem('candidate_skillSelect_concepts');
      localStorage.removeItem('candidate_occupationSelect_concepts');
    }
  }, [appContext.isSignedIn]);

  const [loading, setLoading] = useState(false);
  const [jobType, setJobType] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [workType, setWorkType] = useState([]);
  const [resume, setResume] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const fetchCandidateDetails = useCallback(async () => {
    try {
      setLoading(true);

      const response = await appContext.api.get('/candidate');
      const candidateData = response.data;

      if(!candidateData) return;

      // Set form values with fetched data
      reset({
        displayName: candidateData.displayName,
        contactEmail: candidateData.contactEmail,
        contactPhone: candidateData.contactPhone,
      });

      // Set other state values
      setJobType(jobTypes.filter(type => candidateData?.jobTypes?.includes(type.value)));
      setExperienceLevel(experienceLevels.filter(level => candidateData?.experienceLevels?.includes(level.value)));
      setWorkType(workTypes.filter(type => candidateData?.workTypes?.includes(type.value)));
      setResume(candidateData.resume);
      setSelectedOptions(candidateData.occupations);
      setSelectedSkills(candidateData.skills);
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchCandidateDetails().catch((err) => { toast.error("Error fetching details", err); });
  }, [fetchCandidateDetails, reset]);

  const onSubmitHandler = async (data) => {
    const { displayName, contactEmail, contactPhone } = data;

    try {
      setLoading(true);

      const candidate = {
        "displayName": displayName,
        "jobTypes": jobType.map(type => type.value),
        "experienceLevels": experienceLevel.map(level => level.value),
        "workTypes": workType.map(type => type.value),
        "contactEmail": contactEmail,
        "contactPhone": contactPhone,
        "resume": resume,
        "skills": selectedSkills,
        "occupations": selectedOptions,
      }
      await appContext.api.post("/candidate", candidate);

      reset();
      await fetchCandidateDetails();
      toast.success("Details are updated!");
    } catch (error) {
      toast.error("Error while updating details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading ? ( <Loader /> ) : (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={classes.ca_candidate}>
            <div>
              <div className={classes.ca_details_flex}>
                <div>
                  <h1 className={classes.ca_details_h1}>Candidate Details</h1>
                </div>
                <div>
                  <Button loading={loading} text="Submit">
                    <div style={{width: "15em", height: "1.5em", paddingTop: "0.35em"}}>Update</div>
                  </Button>
                </div>
              </div>
              <hr className={classes.ca_details_hr}/>
            </div>
            <div className={classes.ca_details_form_line}>
              <InputTextField
                label="Display Name" message="*Display Name is required"
                id="displayName" min={1}
                register={register} errors={errors}
              />
            </div>
            <div className={classes.ca_details_form_line}>
              <label className={classes.ca_details_form_label}>Job Type *:{" "}</label>
              <Select
                name="jobType" required={true} className={classes.ca_details_form_select} isMulti
                value={jobType} onChange={setJobType} options={jobTypes}
              />
            </div>
            <div className={classes.ca_details_form_line}>
              <label className={classes.ca_details_form_label}>Work Type *:{" "}</label>
              <Select
                name="workType" required={true} className={classes.ca_details_form_select} isMulti
                value={workType} onChange={setWorkType} options={workTypes}
              />
            </div>
            <div className={classes.ca_details_form_line}>
              <label className={classes.ca_details_form_label}>Experience Level *:{" "}</label>
              <Select
                name="experienceLevel" required={true} className={classes.ca_details_form_select} isMulti
                value={experienceLevel} onChange={setExperienceLevel} options={experienceLevels}
              />
            </div>
          </div>
          <div className={classes.ca_candidate}>
            <h1 className={classes.ca_details_h1}>Contact Information</h1>
            <hr className={classes.ca_details_hr}/>
            <div className={classes.ca_details_form_line}>
              <InputTextField
                label="Contact Email" id="contactEmail" value={appContext?.user?.email}
                register={register} errors={errors} readOnly={true}
              />
            </div>
            <div className={classes.ca_details_form_line}>
              <InputTextField
                label="Contact Phone" message="*Contact Phone is required" id="contactPhone"
                register={register} errors={errors}
              />
            </div>
          </div>
          <div className={classes.ca_candidate}>
            <h1 className={classes.ca_details_h1}>Occupations</h1>
            <hr className={classes.ca_details_hr}/>
            <div className={classes.ca_details_form_line}>
              <AsyncLazySelect
                id="candidate_occupationSelect"
                placeholder="Select an ESCO Occupation"
                value={selectedOptions} handleOnChange={setSelectedOptions}
                listEndpoint="/concepts/occupations"
                detailsEndpoint="/concepts/occupation-description"
                appContext={appContext}
              />
            </div>
          </div>
          <div className={classes.ca_candidate}>
            <h1 className={classes.ca_details_h1}>Skills</h1>
            <hr className={classes.ca_details_hr}/>
            <div className={classes.ca_details_form_line}>
              <AsyncLazySelect
                id="candidate_skillSelect"
                placeholder="Select an ESCO Skill"
                value={selectedSkills} handleOnChange={setSelectedSkills}
                listEndpoint="/concepts/skills"
                detailsEndpoint="/concepts/skill-description"
                appContext={appContext}
              />
            </div>
          </div>
          <div className={classes.ca_candidate}>
            <h1 className={classes.ca_details_h1}>Resume</h1>
            <hr className={classes.ca_details_hr}/>
            <div className={classes.ca_details_desc_div}>
              <Editor id="resume" value={resume} handleOnChange={setResume}/>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};