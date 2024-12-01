import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import FooterLine from './components/FooterLine';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*, ::before, ::after': {
      boxSizing: 'border-box',
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
    }
  },
  fo_footer: {
    display: 'block',
    width: '100%',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    backgroundColor: 'rgb(36 37 48)',
    minHeight: '7rem',
    zIndex: '50',
    position: 'relative',
    unicodeBidi: 'isolate',
    lineHeight: 'inherit',
  },
  fo_footerDiv: {
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
    gap: '0px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '7rem',
    display: 'flex',
    unicodeBidi: 'isolate',
    lineHeight: 'inherit',
  },
  fo_ul: {
    gap: '1.5rem',
    color: 'rgb(255 255 255)',
    alignItems: 'center',
    flexDirection: 'row',
    flex: '1 1',
    display: 'flex',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    unicodeBidi: 'isolate',
    lineHeight: 'inherit',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    paddingInlineStart: '40px',
  },
  fo_copyright: {
    unicodeBidi: 'isolate',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    color: 'rgb(255 255 255)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    alignItems: 'center',
    width: 'fit-content',
    display: 'flex',
    margin: '0',
    textAlign: 'center',
  },
  fo_copyrightSpan: {
    color: 'rgb(255 255 255)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  fo_socialButtons: {
    unicodeBidi: 'isolate',
    justifyContent: 'flex-end',
    gap: '1.5rem',
    alignItems: 'center',
    flexDirection: 'row',
    flex: '1 1',
    display: 'flex',
    lineHeight: 'inherit',
  },
  fo_socialButtonLink: {
    transitionDuration: '300ms',
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'rgb(255 255 255)',
    padding: '0.5rem',
    borderColor: 'rgb(255 255 255)',
    borderWidth: '1px',
    borderRadius: '9999px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    textDecoration: 'inherit',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    cursor: 'pointer',
    lineHeight: 'inherit',
  },
  fo_socialButton: {
    display: 'block',
    verticalAlign: 'middle',
    transformOrigin: '0px 0px',
    color: 'rgb(255 255 255)',
    cursor: 'pointer',
    lineHeight: 'inherit',
    stroke: 'currentcolor',
    fill: 'currentcolor',
    strokeWidth: '0',
    width: '1em',
    height: '1em',
    overflowClipMargin: 'content-box',
    overflow: 'hidden',
  },
  fo_li: {
    unicodeBidi: 'isolate',
    color: 'rgb(255 255 255)',
    display: 'list-item',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    lineHeight: 'inherit',
  },
  fo_link: {
    color: 'inherit',
    textDecoration: 'inherit',
    cursor: 'pointer',
    lineHeight: 'inherit',
  }
}));

export default function StyledApp({ appContext, onAppContextChanged, history }) {
  const classes = useStyles();
  return (
    <Fragment>
      <style> {`
          .fo_mfe {
            z-index: 50;
            position: relative;
          }
      `} </style>
      <FooterLine classes={classes}/>
    </Fragment>
  );
};
