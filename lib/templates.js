function resetPasswordTemplate(options) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    >
    <title>Password Reset Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .container {
        background-color: #f9f9f9;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #2c3e50;
        border-bottom: 2px solid #00687B;
        padding: 0, 0, 10px, 5px;
      }
        
      .btn {
        display: inline-block;
        border-radius: 8px;
        background: #00687B;
        text-decoration: none;
        color: #ffffff !important;
        font-weight: bold;
        padding: 12px 20px;
        margin-top: 20px;
      }
      .btn:hover {
        text-decoration: underline;
      }
      .footer {
        margin-top: 20px;
        font-size: 0.8em;
        text-align: center;
        color: #7f8c8d;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>Hello ${options.receiverName},</p>
      <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <a href="${options.resetUrl}" class="btn">Reset Password</a>
      <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
      <p>${options.resetUrl}</p>
      <p>This link will expire in 10 minutes.</p>
      <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
      <p>Best regards,<br>Raqeeb Team</p>
    </div>
    <div class="footer">
      <p>This email was sent by ${options.senderName}. Please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `;
}


export {
  resetPasswordTemplate,
}
