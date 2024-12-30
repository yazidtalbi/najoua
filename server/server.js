const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files like HTML, CSS, and JS

// SMTP transporter setup for Brevo
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo SMTP server
  port: 587, // Port for STARTTLS
  secure: false, // Use STARTTLS
  auth: {
    user: "82a066002@smtp-brevo.com", // Brevo SMTP username
    pass: "P0px8ZbJTnrtARaF", // Brevo SMTP key
  },
});

// Endpoint to send emails
app.post("/send-email", async (req, res) => {
  const { subject, html } = req.body;

  // Email options
  const mailOptions = {
    from: '"Your Name" <82a066002@smtp-brevo.com>', // Sender's email
    to: "contact@arlibera.ma", // Recipient's email
    subject: subject, // Subject of the email
    html: html, // HTML body content
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
