export const resetPasswordTemplate = (firstName: string, resetLink: string) => {
  return `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Template</title>
        <style>
          /* Add your CSS styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #555;
          }
          a {
            text-decoration: none;
            background-color: #0078d4;
            color: #fff !important;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reset Password</h1>
          <p>
            Hello ${firstName},
          </p>
          <p>You are receiving this email because you requested to reset your password. 
          Please click the button below to reset your password:</p>
          <a href="${resetLink}" target="_blank">Reset Password</a>
          <p>  Regards, </p>
          <p> Paradise Estate </p>
        </div>
      </body>
      </html>
      `;
};
export const resetPasswordSuccessTemplate = (firstName: string) => {
  return `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Template</title>
        <style>
          /* Add your CSS styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #555;
          }
          a {
            text-decoration: none;
            background-color: #0078d4;
            color: #fff !important;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reset Password Successfully</h1>
          <p>
            Hello ${firstName},
          </p>
          <p>Your password has been reset successfully<p>
          <p>  Regards, </p>
           <p> Paradise Estate </p>
          </p>
        </div>
      </body>
      </html>
      `;
};
