import React from "react";

export default function LabeledCheckBox({ classes, label, name, checked, handleOnChange }) {
  return (
    <div className={classes.ad_details_checkbox_div}>
      <label className={classes.ad_details_checkbox_label} >
        {" "}{label}
      </label>
      <input
        name={name} checked={checked} onChange={handleOnChange}
        type="checkbox" className={classes.ad_details_checkbox}
      />
    </div>
  );
}