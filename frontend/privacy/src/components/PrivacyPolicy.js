import React from "react";

export default function PrivacyPolicy({ classes }) {

  return (
    <div className={classes.pp_policy}>
      <h1 className={classes.pp_h1}>Privacy Policy</h1>
      <p className={classes.pp_p}>
      </p>

      <h2 className={classes.pp_h2}>1. Introduction</h2>
      <p className={classes.pp_p}>
        JEFREE is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
      </p>

      <h2 className={classes.pp_h2}>2. Information We Collect</h2>
      <p className={classes.pp_p}>
      </p>

      <h3 className={classes.pp_h3}>2.1 Personal Information</h3>
      <p className={classes.pp_p}>
        We may collect personal information that you provide to us, such as:
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Profile information</li>
        </ul>
      </p>

      <h3 className={classes.pp_h3}>2.2 Information from Third-Party Services</h3>
      <p className={classes.pp_p}>
        If you choose to register or log in using Google OpenID Connect or GitHub, we may collect information from these third-party services, such as your name, email address, and profile picture.
      </p>

      <h3 className={classes.pp_h3}>2.3 Usage Data</h3>
      <p className={classes.pp_p}>
        We may collect information about your interactions with our services, such as:
        <ul>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Access times</li>
          <li>Pages viewed</li>
        </ul>
      </p>

      <h2 className={classes.pp_h2}>3. How We Use Your Information</h2>
      <p className={classes.pp_p}>
        We may use the information we collect for various purposes, including:
        <ul>
          <li>To provide, operate, and maintain our services</li>
          <li>To improve, personalize, and expand our services</li>
          <li>To communicate with you, either directly or through one of our partners</li>
          <li>To process your transactions and manage your orders</li>
          <li>To send you promotional information, such as newsletters</li>
        </ul>
      </p>

      <h2 className={classes.pp_h2}>4. Sharing Your Information</h2>
      <p className={classes.pp_p}>
        We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this Privacy Policy. We may share your information with:
        <ul>
          <li>Service providers who assist us in operating our services</li>
          <li>Law enforcement or other governmental agencies as required by law</li>
        </ul>
      </p>

      <h2 className={classes.pp_h2}>5. Data Security</h2>
      <p className={classes.pp_p}>
        We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>

      <h2 className={classes.pp_h2}>6. Your Rights</h2>
      <p className={classes.pp_p}>
        You have the right to:
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request the correction of inaccurate personal information</li>
          <li>Request the deletion of your personal information</li>
          <li>Object to the processing of your personal information</li>
        </ul>
      </p>

      <h2 className={classes.pp_h2}>7. Changes to This Privacy Policy</h2>
      <p className={classes.pp_p}>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Privacy Policy.
      </p>

      <h2 className={classes.pp_h2}>8. Contact Us</h2>
      <p className={classes.pp_p}>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:gabor.harsanyi@ptl.expert">gabor.harsanyi@ptl.expert</a>.
      </p>
    </div>
  );
};