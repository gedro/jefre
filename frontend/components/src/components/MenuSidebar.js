import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles((theme) => ({
  com_menuSidebar: {
    display: 'flex',
    width: '100%',
  },
  com_menuSidebar_left: {
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    overflow: 'hidden',
    flex: '1 1',
    width: '100%',
    minHeight: 'calc(100vh - 90px)',
    display: 'block',
    unicodeBidi: 'isolate',
  },
  com_menuSidebar_left_open: {
    marginRight: '13rem',
  },
  com_menuSidebar_left_close: {
    marginRight: '3rem',
  },
  com_menuSidebar_right: {
    position: 'fixed',
    padding: '0.5rem',
    top: '90px',
    minHeight: 'calc(100vh - 99px)',
    maxHeight: 'calc(100vh - 90px)',
    zIndex: '20',
    right: '8px',
    backgroundColor: 'black',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
  },
  com_menuSidebar_right_open: {
    width: '13rem',
  },
  com_menuSidebar_right_close: {
    width: '3rem',
  },
  com_menu: {
    minHeight: '2.5rem',
    maxHeight: '2.5rem',
    display: 'flex',
  },
  com_menu_opened_button: {
    display: 'flex',
    width: '100%',
    color: 'rgb(255 255 255)',
    alignItems: 'center',
    gap: '0.25rem',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    textTransform: 'none',
  },
  com_menu_closed_button: {
    display: 'flex',
    width: '100%',
    color: 'rgb(255 255 255)',
    alignItems: 'center',
    gap: '0.25rem',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
  },
  com_menu_opened_button_text: {
    fontWeight: '600',
    fontSize: '100%',
  },
  com_menu_opened_button_arrow: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  com_menu_closed_button_arrow: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  com_menu_elements: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginTop: '1rem',
  },
  com_menu_elmnt_link: {
    display: 'flex',
    color: 'rgb(255 255 255)',
    alignItems: 'center',
    gap: '0.5rem',
    minHeight: '2.5rem',
    maxHeight: '2.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '1.5rem',
    paddingRight: '0.5rem',
    borderRadius: '0.375rem',
    textDecoration: 'inherit',
    cursor: 'pointer',
  },
  com_menu_elmnt_link_closed: {
    paddingLeft: '0.5rem',
  },
  com_menu_elmnt_txt: {
    fontWeight: '600',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    color: 'rgb(255 255 255)',
  },
  com_menu_elmnt_txt_closed: {
    opacity: '0',
  }
}));

export default function MenuSidebar({ name, items, children }) {
  const classes = useStyles();

  const sideBarName = name + "_SIDEBAR_OPEN";

  const storageOpenSidebar = localStorage.getItem(sideBarName);
  const foundOpenSidebar = storageOpenSidebar ? JSON.parse(storageOpenSidebar) : true;
  const [openSidebar, setOpenSidebar] = useState(foundOpenSidebar);

  useEffect(() => {
    localStorage.setItem(sideBarName, JSON.stringify(openSidebar));
  }, [openSidebar]);

  return (
    <div className={classes.com_menuSidebar}>
      <div className={classes.com_menuSidebar_left + " " + (
        openSidebar ? classes.com_menuSidebar_left_open : classes.com_menuSidebar_left_close
      )}>
        {children}
      </div>
      <div className={classes.com_menuSidebar_right + " " + (
        openSidebar ? classes.com_menuSidebar_right_open : classes.com_menuSidebar_right_close
      )}>
        <div className={classes.com_menu}>
          {openSidebar ? (
            <button className={classes.com_menu_opened_button} onClick={() => setOpenSidebar(!openSidebar)} >
              <span className={classes.com_menu_opened_button_text}>Close</span>
              <span><FaArrowRight className={classes.com_menu_opened_button_arrow} /></span>
            </button>
          ) : (
            <Tooltip title="Click To Expand">
              <button className={classes.com_menu_closed_button} onClick={() => setOpenSidebar(!openSidebar)} >
                <span><FaArrowLeft className={classes.com_menu_closed_button_arrow} /></span>
              </button>
            </Tooltip>
          )}
        </div>

        <div className={classes.com_menu_elements} >
          {items.map((item) => (
            <Tooltip key={item?.link} title={`${openSidebar ? "" : item?.label}`}>
              <Link to={item?.link}
                className={classes.com_menu_elmnt_link + " " + (!openSidebar ? classes.com_menu_elmnt_link_closed : "")} >
                <span>{item?.icon}</span>
                <span
                  className={classes.com_menu_elmnt_txt + " " + (!openSidebar ? classes.com_menu_elmnt_txt_closed : "")} >
                  {item?.label}
                </span>
              </Link>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}
