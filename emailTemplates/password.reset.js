const Layout = require("./email.layout")

const passwordReset = (user, resetLink) => {
  return (`
        ${Layout.Header()}

        <div style="text-align: center;">
          <p>Dear ${user.name}!</p>
          <p style="text-align: center;">
            We have received a request for a forgotten password.<br />
            To change your account password, please click on the link below.<br />
          </p>
          <br/>
          <hr />
          <br/>
          <p style="text-align: center;">
            Please click here to reset (change) your password:
            <a href="${resetLink}">[Password Reset Link]</a></p>
          </p>
          <p>${resetLink}</p>
          <br/>
          <hr />
          <br/>
          <p style="text-align: center;">
            If you did not request this change, kindly contact our security team through this email.<br />
            Thanks,<br/>
            Your Favorite Book Store.
          </p>
        </div>

        ${Layout.Footer()}
    `);
};

module.exports = passwordReset;