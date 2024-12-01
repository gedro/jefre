import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  com_progressbar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Progress() {
  const classes = useStyles();

  return (
    <div className={classes.com_progressbar}>
      <LinearProgress />
    </div>
  );
};
