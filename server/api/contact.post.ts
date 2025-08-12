import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactForm>(event);

  const errors = validateContactForm(body);

  if (Object.keys(errors).length) return errors;

  const { emailUser, emailPassword, emailHost, emailPort } = useRuntimeConfig();

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(emailPort),
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  } as SMTPTransport.Options);

  const { lastname, firstname, email, subject, message } = body;

  const mailOptions = {
    from: `"${lastname} ${firstname}" ${email}`,
    to: emailUser,
    subject,
    html: `
            <p>${message}</p>
            <hr>
            <a href="mailto:${email}">répondre: ${email}</a>
           `,
  };

  await transporter.sendMail(mailOptions);
});
