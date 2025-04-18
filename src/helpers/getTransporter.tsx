import nodemailer from "nodemailer";
export function getTransporter(): nodemailer.Transporter {
  const isDev = process.env.NODE_ENV === "development";
  console.log("isDev", process.env.MAILTRAP_USER);
  //   const transporter = nodemailer.createTransport(
  //     isDev
  //       ? {
  //           host: "sandbox.smtp.mailtrap.io",
  //           port: 2525,
  //           auth: {
  //             user: process.env.MAILTRAP_USER,
  //             pass: process.env.MAILTRAP_PASS,
  //           },
  //         }
  //       : {
  //           host: "smtp.gmail.com",
  //           port: 465,
  //           secure: true,
  //           auth: {
  //             user: process.env.EMAIL_BUSINESS,
  //             pass: process.env.EMAIL_PASS,
  //           },
  //         }
  //   );
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_BUSINESS,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
}
