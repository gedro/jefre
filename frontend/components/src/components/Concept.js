import React from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import TextField from '@material-ui/core/TextField';

export default function Concept({ classes, item, removeItem, handleOnChange, withRange }) {

  return (
    <div className={classes.com_select_concept_list_row}>
      <button style={{ cursor: "pointer", marginRight: '1.2em' }} onClick={() => removeItem(item)} type="button">X</button>
      <span style={{ marginRight: '0.8em' }}>
        {item.title}{" "}
        <a style={{ marginLeft: "0.5em" }} href={item?.url} target="_blank" rel="noopener noreferrer">
          <FaExternalLinkAlt/>
        </a>
      </span>
      <div style={{ display: 'flex' }}>
        <TextField
          key={item.url} id={`month-${item.url}`} label={withRange ? "min" : "months"}
          value={item?.month} onChange={(e) => handleOnChange(e, item, 'min')}
          type="number" variant="outlined" margin="dense" fullWidth required={false}
          style={{ width: "5em", marginRight: '0.7em'}}
        />
        {withRange && (
          <TextField
            key={item.url + '-max'} id={`max-month-${item.url}`} label={"max"}
            value={item?.maxMonth} onChange={(e) => handleOnChange(e, item, 'max')}
            type="number" variant="outlined" margin="dense" fullWidth required={false}
            style={{ width: "5em", marginRight: '0.7em'}}
          />
        )}
      </div>
    </div>
  );
};