import React from 'react';
import {FaExternalLinkAlt} from "react-icons/fa";
import TextField from '@material-ui/core/TextField';

export default function Concept({ classes, item, removeItem, handleOnChange }) {

  return (
    <div className={classes.com_select_concept_list_row}>
      <button style={{ cursor: "pointer" }} onClick={() => removeItem(item)} type="button">X</button>
      <span>
        {item.title}{" "}
        <a style={{ marginLeft: "0.5em" }} href={item?.url} target="_blank" rel="noopener noreferrer">
          <FaExternalLinkAlt/>
        </a>
      </span>
      <TextField
        key={item.url} id={`month-${item.url}`} label={"months"}
        value={item?.month} onChange={(e) => handleOnChange(e, item)}
        type="number" variant="outlined" margin="dense" fullWidth required={false} style={{ width: "5em"}}
      />
    </div>
  );
};