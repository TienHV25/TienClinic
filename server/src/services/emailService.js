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

let sendBillEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let billBuffer = null;
    let filename = 'bill.jpg';
    
    if (dataSend.billImage) {
        let base64Data = dataSend.billImage.replace(/^data:image\/[a-z]+;base64,/, '');
        billBuffer = Buffer.from(base64Data, 'base64');
        
        if (dataSend.billImage.includes('data:image/png')) {
            filename = 'bill.png';
        } else if (dataSend.billImage.includes('data:application/pdf')) {
            filename = 'bill.pdf';
        }
    }

    const mailOptions = {
        from: '"TienClinic" <hvtienjv2005@gmail.com>',
        to: dataSend.receiverEmail,
        subject: dataSend.language === 'vi' ? "Kết quả đặt lịch khám bệnh" : "Medical Appointment Result",
        html: getBillHTMLEmail(dataSend),
        attachments: billBuffer ? [{
            filename: filename,
            content: billBuffer,
            contentType: dataSend.billImage.includes('pdf') ? 'application/pdf' : 'image/jpeg'
        }] : []
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Bill email sent: ', info.messageId);
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

let getBillHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend?.language === 'vi') {
        result =
            `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2c5aa0; margin: 0;">TienClinic</h2>
          <p style="color: #666; margin: 5px 0;">Hệ thống chăm sóc sức khỏe</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Xin chào ${dataSend.patientName}!</h3>
          <p>Bạn nhận được email này để xác nhận việc hoàn thành buổi khám bệnh tại TienClinic.</p>
        </div>

        <div style="background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #2c5aa0; margin-top: 0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
            📋 Thông tin bệnh nhân
          </h4>
          <div style="margin-bottom: 15px;">
            <strong style="color: #495057;">📧 Email bệnh nhân:</strong>
            <span style="margin-left: 10px;">${dataSend.receiverEmail}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #495057;">📧 Tên bệnh nhân:</strong>
            <span style="margin-left: 10px;">${dataSend.patientName}</span>
          </div>
        </div>

        <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #155724; margin-top: 0;">✅ Trạng thái: Hoàn thành</h4>
          <p style="margin: 0; color: #155724;">
            Buổi khám của bạn đã được hoàn thành thành công. Hóa đơn và kết quả khám được đính kèm trong email này.
          </p>
        </div>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #856404; margin-top: 0;">📄 Hóa đơn đính kèm</h4>
          <p style="margin: 0; color: #856404;">
            Vui lòng kiểm tra file đính kèm để xem chi tiết hóa đơn và kết quả khám bệnh.
          </p>
        </div>

        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #2c5aa0; margin-top: 0;">💡 Lưu ý quan trọng</h4>
          <ul style="margin: 0; padding-left: 20px; color: #495057;">
            <li>Vui lòng tuân theo đúng hướng dẫn của bác sĩ</li>
            <li>Uống thuốc đúng liều lượng và thời gian được chỉ định</li>
            <li>Liên hệ ngay với chúng tôi nếu có bất kỳ triệu chứng bất thường nào</li>
            <li>Lưu giữ hóa đơn để phục vụ cho các lần tái khám sau này</li>
          </ul>
        </div>

        <div style="text-align: center; background: #2c5aa0; color: white; padding: 20px; border-radius: 8px;">
          <p style="margin: 0; font-size: 16px;">
            🙏 <strong>Cảm ơn bạn đã tin tưởng và lựa chọn TienClinic!</strong>
          </p>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
            Chúng tôi luôn sẵn sàng đồng hành cùng sức khỏe của bạn
          </p>
        </div>

      </div>
    `
    }
    if (dataSend?.language === 'en') {
        result =
            `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2c5aa0; margin: 0;">TienClinic</h2>
          <p style="color: #666; margin: 5px 0;">Healthcare Management System</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Hello ${dataSend.patientName}!</h3>
          <p>You received this email to confirm the completion of your medical appointment at TienClinic.</p>
        </div>

        <div style="background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #2c5aa0; margin-top: 0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
            📋 Patient Information
          </h4>
          <div style="margin-bottom: 15px;">
            <strong style="color: #495057;">📧 Patient Email:</strong>
            <span style="margin-left: 10px;">${dataSend.receiverEmail}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #495057;">📧 Patient Name:</strong>
            <span style="margin-left: 10px;">${dataSend.patientName}</span>
          </div>
        </div>

        <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #155724; margin-top: 0;">✅ Status: Completed</h4>
          <p style="margin: 0; color: #155724;">
            Your appointment has been successfully completed. The bill and examination results are attached to this email.
          </p>
        </div>

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #856404; margin-top: 0;">📄 Bill Attached</h4>
          <p style="margin: 0; color: #856404;">
            Please check the attached file for detailed bill and examination results.
          </p>
        </div>

        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #2c5aa0; margin-top: 0;">💡 Important Notes</h4>
          <ul style="margin: 0; padding-left: 20px; color: #495057;">
            <li>Please follow the doctor's instructions carefully</li>
            <li>Take medication at the prescribed dosage and timing</li>
            <li>Contact us immediately if you experience any unusual symptoms</li>
            <li>Keep the bill for future follow-up appointments</li>
          </ul>
        </div>

        <div style="text-align: center; background: #2c5aa0; color: white; padding: 20px; border-radius: 8px;">
          <p style="margin: 0; font-size: 16px;">
            🙏 <strong>Thank you for trusting and choosing TienClinic!</strong>
          </p>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
            We are always ready to accompany your health journey
          </p>
        </div>

      </div>
    `
    }
    return result;
}


module.exports = {
    sendEmail: sendEmail,
    sendBillEmail : sendBillEmail
}