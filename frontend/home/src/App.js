import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, makeStyles } from '@material-ui/core/styles';
import { motion } from "framer-motion";

import Welcome from './components/Welcome';
import ForEmployers from './components/ForEmployers';
import ForJobSeekers from './components/ForJobSeekers';
import WhyChoose from './components/WhyChoose';
import GetStarted from './components/GetStarted';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ho',
});

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*, ::before, ::after': {
      boxSizing: 'border-box',
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
    },
    html: {
      lineHeight: '1.5',
      tabSize: '4',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      fontFeatureSettings: 'normal',
      fontVariationSettings: 'normal',
    }
  },
  ho_home: {
    // body
    lineHeight: 'inherit',
    display: 'block',
    unicodeBidi: 'isolate',

    // home
    justifyContent: 'center',
    minHeight: '100vh',
    margin: '0',
    // display: 'flex',

    // custom
    width: '100%',
    minWidth: '768px',
    padding: '2rem',
    twBgOpacity: 1,
    backgroundColor: 'rgb(255 255 255)',
    borderRadius: '0.5rem',
    maxWidth: '65rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  ho_centerDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ho_parts: {
    display: 'block',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    width: '90%',
  },
  ho_p: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '80%',
    color: 'rgb(51 65 85)',
    textAlign: 'justify',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  ho_h1: {
    opacity: '1',
    transform: 'none',
    fontSize: '50px',
    lineHeight: '60px',
    width: '95%',
    color: 'rgb(36 37 48)',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: '0',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
    display: 'block',
  },
  ho_h2: {
    marginTop: '1rem',
    marginBottom: '1rem',
    fontSize: '40px',
    lineHeight: '50px',
    color: 'rgb(36 37 48)',
    fontWeight: '650',
    textAlign: 'center',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  ho_h3: {
    marginTop: '1rem',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    color: 'rgb(30 41 59)',
    fontWeight: '600',
    textAlign: 'center',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  ho_pStrong: {
    fontSize: '1.3rem',
  },
  ho_infoTile: {
    opacity: '1',
    transform: 'none',
    boxShadow: '#0172F4 0 1px 2px 0',
    paddingTop: '1.75rem',
    paddingBottom: '2.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    gap: '0.75rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    // width: '30%',
  },
  ho_infoTileIcon: {
    color: 'rgb(51 65 85)',
    fontSize: '3.75rem',
    lineHeight: '1',
    display: 'block',
    verticalAlign: 'middle',
  },
  ho_infoTileH3: {
    color: 'rgb(51 65 85)',
    fontWeight: '700',
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  ho_infoTileP: {
    color: 'rgb(71 85 105)',
    textAlign: 'center',
    margin: '0',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  ho_tiles: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '3rem',
    rowGap: '2.5rem',
    columnGap: '1rem',
    display: 'grid',
  }
}));

const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const fadeInFromBotom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default ({ appContext, onAppContextChanged, history }) => {
  const classes = useStyles();

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <div className={classes.ho_home}>
          <Router history={history}>
            <motion.div
              className={classes.ho_centerDiv}
              variants={fadeInFromTop}
              initial="hidden" animate="visible"
            >
              <Welcome classes={classes}/>
            </motion.div>
            <motion.div
              className={classes.ho_centerDiv}
              variants={fadeInFromBotom}
              initial="hidden" animate="visible"
            >
              <ForJobSeekers classes={classes}/>
            </motion.div>
            <motion.div
              className={classes.ho_centerDiv}
              variants={fadeInFromBotom}
              initial="hidden" animate="visible"
            >
              <ForEmployers classes={classes} />
            </motion.div>
            <div className={classes.ho_centerDiv}><WhyChoose classes={classes} /></div>
            <div className={classes.ho_centerDiv}><GetStarted classes={classes}/></div>
          </Router>
        </div>
      </StylesProvider>
    </div>
);
};
