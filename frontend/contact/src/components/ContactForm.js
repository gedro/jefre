import React from "react";

export default function ContactForm({ classes }) {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.con_contact}>
      <h1 className={classes.con_h1}>Contact Us</h1>
      <div className={classes.con_centerDiv}>
        <p className={classes.con_p}>
          We'd love to hear from you! If you have any questions or feedback,
          feel free to reach out to us.
        </p>
      </div>
      <form onSubmit={onSubmitHandler} className={classes.con_form}>
        <div className={classes.con_div}>
          <label className={classes.con_label} htmlFor="name">
            Name
          </label>
          <input type="text" id="name" className={classes.con_input}/>
        </div>
        <div className={classes.con_div}>
          <label className={classes.con_label} htmlFor="email">
            Email
          </label>
          <input type="email" id="email" className={classes.con_input}/>
        </div>
        <div className={classes.con_div}>
          <label className={classes.con_label} htmlFor="message">
            Message
          </label>
          <textarea id="message" className={classes.con_textarea}></textarea>
        </div>
        <button type="submit" className={classes.con_submit}>
          Send Message
        </button>
      </form>
    </div>
  );
};