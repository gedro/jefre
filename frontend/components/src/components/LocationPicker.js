import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const useStyles = makeStyles((theme) => ({
  com_location: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  com_location_labeled_input: {
    display: "flex",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
    flex: "2",
    margin: '0',
    marginBlockStart: '0.3em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  com_location_label: {
    marginRight: "1.2em",
  },
  com_location_selector: {
    fontSize: '1rem',
    width: "20em",
  }
}));

export default function LocationPicker({
  countryLabel, countryId, countryValue, handleCountryOnChange,
  cityLabel, cityId, cityValue, handleCityOnChange
}) {
  const classes = useStyles();

  return (
    <div className={classes.com_location}>
      <div className={classes.com_location_labeled_input}>
        <label htmlFor={countryId} className={classes.com_location_label}>{countryLabel}: </label>
        <CountryDropdown className={classes.com_location_selector}
          id={countryId} value={countryValue} onChange={handleCountryOnChange} />
      </div>
      <div className={classes.com_location_labeled_input}>
        <label htmlFor={cityId} className={classes.com_location_label}>{cityLabel}: </label>
        <RegionDropdown className={classes.com_location_selector}
          id={cityId} country={countryValue} value={cityValue} onChange={handleCityOnChange} />
      </div>
    </div>
  );
};
