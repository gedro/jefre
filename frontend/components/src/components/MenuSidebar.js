import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  com_menuSidebar: {

  },
}));

export default function MenuSidebar({ children }) {
  const classes = useStyles();
  return (
    <div className="flex">
      {/*<AdminSidebar/>*/}
      <div
        className={`transition-all overflow-hidden flex-1 duration-150 w-full min-h-[calc(100vh-74px)]
        ${true ? "lg:ml-52 ml-12" : "ml-12"}`}
      >
        {children}
      </div>
    </div>
  );
}
