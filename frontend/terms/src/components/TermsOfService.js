import React from "react";

export default function TermsOfService({ classes }) {
  return (
    <div className={classes.tos_terms}>
      <h1 className={classes.tos_h1}>Terms of Service</h1>
      <p className={classes.tos_p}>
      </p>

      <h2 className={classes.tos_h2}>1. Introduction</h2>
      <p className={classes.tos_p}>
        Welcome to JEFREE. By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.
      </p>

      <h2 className={classes.tos_h2}>2. User Accounts</h2>
      <p className={classes.tos_p}>
      </p>

      <h3 className={classes.tos_h3}>2.1 Registration</h3>
      <p className={classes.tos_p}>
        You may register for an account using one of the following methods:
        <ul>
          <li>Normal registration with username, email address, password</li>
          <li>Google OpenID Connect</li>
          <li>GitHub OAuth2</li>
        </ul>
      </p>

      <h3 className={classes.tos_h3}>2.2 Account Security</h3>
      <p className={classes.tos_p}>
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
      </p>

      <h2 className={classes.tos_h2}>3. Use of Services</h2>
      <p className={classes.tos_p}>
      </p>

      <h3 className={classes.tos_h3}>3.1 Eligibility</h3>
      <p className={classes.tos_p}>
        You must be at least 18 years old to use our services.
      </p>

      <h3 className={classes.tos_h3}>3.2 Prohibited Activities</h3>
      <p className={classes.tos_p}>
        You agree not to engage in any of the following prohibited activities:
        <ul>
          <li>Violating any applicable laws or regulations</li>
          <li>Infringing on the rights of others</li>
          <li>Using our services for any unauthorized or illegal purpose</li>
        </ul>
      </p>

      <h2 className={classes.tos_h2}>4. Content</h2>
      <p className={classes.tos_p}>
      </p>

      <h3 className={classes.tos_h3}>4.1 User Content</h3>
      <p className={classes.tos_p}>
        You retain ownership of any content you submit to our services. However, by submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and distribute your content.
      </p>

      <h3 className={classes.tos_h3}>4.2 Our Content</h3>
      <p className={classes.tos_p}>
        All content provided by us is protected by intellectual property laws. You may not use our content without our prior written consent.
      </p>

      <h2 className={classes.tos_h2}>5. Termination</h2>
      <p className={classes.tos_p}>
        We reserve the right to terminate or suspend your account at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of our services.
      </p>

      <h2 className={classes.tos_h2}>6. Limitation of Liability</h2>
      <p className={classes.tos_p}>
        To the fullest extent permitted by law, JEFREE shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
        <ul>
          <li>Your use or inability to use our services</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
        </ul>
      </p>

      <h2 className={classes.tos_h2}>7. Changes to Terms</h2>
      <p className={classes.tos_p}>
        We may modify these Terms of Service at any time. We will notify you of any changes by posting the new Terms of Service on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms of Service.
      </p>

      <h2 className={classes.tos_h2}>8. Contact Us</h2>
      <p className={classes.tos_p}>
        If you have any questions about these Terms of Service, please contact us at <a href="mailto:info@jefree.org">info@jefree.org</a>.
      </p>
    </div>
  );
};