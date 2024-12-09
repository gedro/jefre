import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
  com_editor: {
    height: '100%',
  },
}));

const editorToolbarOptions = [
  [{ 'font': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  // [{ size: [ 'small', false, 'large', 'huge' ]}],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  ['blockquote'],
  ['link', 'image'],
  [{ 'script': 'sub'}, { 'script': 'super' }],

  ['clean']
];

export default function Editor({ id, value, handleOnChange, readOnly }) {
  const classes = useStyles();

  return (
    <ReactQuill
      id={id}
      bounds={'.re_new_job_desc_div'}
      className={classes.com_editor}
      value={value}
      onChange={handleOnChange}
      modules={{
        toolbar: editorToolbarOptions,
      }}
      readOnly={readOnly}
    />
  );
}
