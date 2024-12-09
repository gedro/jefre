import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const useStyles = makeStyles((theme) => ({
  com_location: {
    color: 'rgb(51 65 85)',
    fontWeight: '500',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    margin: '0',
    display: 'inline',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
}));

export default function LocationPicker({
  countryLabel, countryId, countryValue, handleCountryOnChange,
  cityLabel, cityId, cityValue, handleCityOnChange
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.com_location}>
        <label htmlFor={countryId}>{countryLabel}</label>
        <CountryDropdown id={countryId} value={countryValue} onChange={handleCountryOnChange} />
      </div>
      <div className={classes.com_location}>
        <label htmlFor={cityId}>{cityLabel}</label>
        <RegionDropdown id={cityId} country={countryValue} value={cityValue} onChange={handleCityOnChange} />
      </div>
    </Fragment>
  );
};
