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
    html:getBodyHTMLEmail(dataSend)
  });
}

let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if(dataSend?.language === 'vi'){
    result = 
    `
      <h3>Xin chào ${dataSend.patientName} !</h3>
      <p>Bạn nhận được email này vì đã đặt lệnh khám bệnh online trên website TienClinic</p>
      <p>Thông tin đặt lệnh khám bệnh:</p>
      <div><b>Thời gian khám bệnh:${dataSend.time}</b></div>
      <br/>
      <div><b>Bác sĩ:${dataSend.doctorName}</b></div>

      <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới 
          để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh. </p>
      <div>
      <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
      </div>

      <p>Xin cảm ơn vì đã tin tưởng và chọn đặt lệnh khám bệnh tại TienClinic.Vui lòng đến sớm 10 phút để chuẩn bị các thủ tục cần thiết !</P>
    `
  }
  if(dataSend?.language === 'en'){
    result = 
     `
      <h3>Hello ${dataSend.patientName}!</h3>
      <p>You received this email because you booked a medical appointment online on the TienClinic website.</p>
      <p>Appointment details:</p>
      <div><b>Appointment time: ${dataSend.time}</b></div>
      <br/>
      <div><b>Doctor: ${dataSend.doctorName}</b></div>

      <p>If the information above is correct, please click the link below to confirm and complete your medical appointment booking.</p>
      <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
      </div>

      <p>Thank you for trusting and choosing to book your appointment at TienClinic. Please arrive 10 minutes early to complete the necessary procedures!</p>
    `
  }
  return result;
}

module.exports = {
    sendEmail: sendEmail
}