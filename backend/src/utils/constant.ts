import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
export const sendToMail = async (email: string, subject: string, html: any) => {
  const info = await transporter.sendMail({
    from: `"Paradise Estate "shivam412978143@gmail.com"`,
    to: email,
    subject: subject,
    html: html,
  });
  return info
};
export const generateRandomFourDigitOTP = () => {
  const min = 1000;
  const max = 9999;
  const randomOTP = Math.floor(Math.random() * (max - min + 1) + min);
  return randomOTP.toString();
};
