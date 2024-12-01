import React from 'react';
import { Blocks } from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  com_loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '18rem',
  },
}));

export default function Loader( ) {
  const classes = useStyles();
  return (
    <div className={classes.com_loader}>
      <span>
        <Blocks
          height="70"
          width="70"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </span>
      <span>Please wait...</span>
    </div>
  );
}
