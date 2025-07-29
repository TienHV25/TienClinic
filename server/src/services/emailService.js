require('dotenv').config()
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"TienClinic" <hvtienjv2005@gmail.com>',
    to: dataSend.receiverEmail,
    subject: "Thông tin đặt lệnh khám bệnh",
    html: `
    <h3>Xin chào ${dataSend.patientName} !</h3>
    <p>Bạn nhận được email này vì đã đặt lệnh khám bệnh online trên website TienClinic</p>
    <p>Thông tin đặt lệnh khám bệnh:</p>
    <div><b>Thời gian khám bệnh:${dataSend.time}</b></div>
    <br/>
    <div><b>Bác sĩ:${dataSend.doctorName}</b></div>

    <p>Xin cảm ơn vì đã tin tưởng và chọn đặt lệnh khám bệnh tại TienClinic.Vui lòng đến sớm 10 phút để chuẩn bị các thủ tục cần thiết !</P>
    `
  });


}

module.exports = {
    sendEmail: sendEmail
}