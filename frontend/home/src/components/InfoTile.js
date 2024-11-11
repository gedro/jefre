import React from "react";
import { motion } from "framer-motion";

export default function InfoTile({ classes, text, icon: Icon, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={classes.ho_infoTile}
    >
      <Icon className={classes.ho_infoTileIcon} />
      <h3 className={classes.ho_infoTileH3} >{title}</h3>
      <p className={classes.ho_infoTileP} >{text}</p>
    </motion.div>
  );
};
