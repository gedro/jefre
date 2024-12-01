import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "react-select";

import Loader from 'components/Loader';

import LabeledCheckBox from './LabeledCheckBox';

const roles = [
  { value: "ROLE_ADMIN", label: "admin" },
  { value: "ROLE_RECRUITER", label: "recruiter" },
  { value: "ROLE_CANDIDATE", label: "candidate" },
];

export default function UserDetails({ classes, appContext, onAppContextChanged, history }) {
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  const fetchUserDetails = useCallback(async () => {
    try {
      setLoading(true);

      const response = await appContext.api.get(`/admin/users/${userId}`);
      setUser(response.data);

      const selectedRoles = roles.filter(role => response.data.roles.includes(role.value));
      setUserRoles(selectedRoles);

      console.log(response.data);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handleUpdateRole = async () => {
    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("userId", userId);
      formData.append("roles", userRoles.map(role => role.value).join(","));

      await appContext.api.put(`/admin/users/${userId}/roles`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success("Update roles successful");
      await fetchUserDetails();
    } catch (err) {
      toast.error("Update roles failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (e, updateUrl) => {
    const { name, checked } = e.target;

    let message = null;
    if (name === "locked") {
      message = "Update Account Lock status Successful";
    } else if (name === "expired") {
      message = "Update Account Expiry status Successful";
    } else if (name === "enabled") {
      message = "Update Account Enable status Successful";
    } else if (name === "credentialsExpired") {
      message = "Update Credentials Expiry status Successful";
    }

    try {
      const formData = new URLSearchParams();
      formData.append("id", userId);
      formData.append(name, checked);

      await appContext.api.put(updateUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success(message);
      await fetchUserDetails();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      message = null;
    }
  };

  useEffect(() => {
    fetchUserDetails().catch((err) => { toast.error("Error fetching user", err); });
  }, [fetchUserDetails, userId]);

  return (
    <div className={classes.ad_userdetails} >
      {loading ? ( <Loader /> ) : (
        <Fragment>
          <div className={classes.ad_details_header}>
            <div>
              <h1 className={classes.ad_details_header_h1}>
                Profile Information
                <hr className={classes.ad_hr}/>
              </h1>
              <h4 className={classes.ad_details}>
                <span>{user?.name}</span>
                <span>{user?.email}</span>
                <span>{user?.username}</span>
              </h4>
            </div>
          </div>
          <div className={classes.ad_details_header}>
            <h1 className={classes.ad_details_header_h1}>
              Admin Actions
              <hr className={classes.ad_hr}/>
            </h1>

            <div className={classes.ad_details_roles}>
              <div className={classes.ad_details_ms_div}>
                <label className={classes.ad_details_ms_label}>
                  Role:{" "}
                </label>
                <Select
                  name="roles" className={classes.ad_details_ms}
                  value={userRoles} onChange={setUserRoles}
                  isMulti options={roles}
                />
              </div>
              <button className={classes.ad_details_roles_button} onClick={handleUpdateRole}>
                <strong>{loading ? "Loading..." : "Update Role"}</strong>
              </button>
            </div>

            <hr className={classes.ad_hr}/>

            <div className={classes.ad_details_flags} >
              <LabeledCheckBox
                classes={classes}
                label="Account Locked"
                name="locked"
                checked={!user?.accountNonLocked}
                handleOnChange={ (e) => handleCheckboxChange(e, `/admin/users/${userId}/locked`) }
              />
              <LabeledCheckBox
                classes={classes}
                label="Account Expired"
                name="expired"
                checked={!user?.accountNonExpired}
                handleOnChange={ (e) => handleCheckboxChange(e, `/admin/users/${userId}/expired`) }
              />
              <LabeledCheckBox
                classes={classes}
                label="Account Enabled"
                name="enabled"
                checked={user?.enabled}
                handleOnChange={ (e) => handleCheckboxChange(e, `/admin/users/${userId}/enabled`) }
              />
              <LabeledCheckBox
                classes={classes}
                label="Credentials Expired"
                name="credentialsExpired"
                checked={!user?.credentialsNonExpired}
                handleOnChange={(e) => handleCheckboxChange(e,
                  `/admin/users/${userId}/credentials-expired?id=${userId}&expired=${user?.credentialsNonExpired}`
                )}
              />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};