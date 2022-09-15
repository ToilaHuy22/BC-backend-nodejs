require('dotenv').config();
const nodemailer = require('nodemailer');

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BookingCare" <bookingcare22@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: 'Confirm Email', // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = '';

  if (dataSend.language === 'vi') {
    result = `<h3>Xin chào ${dataSend.patientName} !</h3>
  <br>
  <p>Hệ thống đặt lịch khám bệnh Bookingcare đã nhận được thông tin đặt lịch của bạn:</p>
  <br>
  <div>
      <b>Thời gian: ${dataSend.time}</b>
  </div>
  <div>
      <b>Bác sĩ: ${dataSend.doctorName}</b>
  </div>
  <p>Để xác nhận thông tin là đúng và giữ lịch hẹn, vui lòng chọn xác nhận:</p>
  <div>
      <a href=${dataSend.redirectLink} target="_blank">Xác nhận</a>
  </div>
   <br>
    <br>
  <p>Bookingcare hân hạnh vì được hỗ trợ bạn.</p>
  <div>
      <h1>BookingCareVn</h1>
  </div>`;
  }

  if (dataSend.language === 'en') {
    result = `<h3>Dear ${dataSend.patientName} !</h3>
    <br>
    <p>Bookingcare system has received your booking information:</p>
    <br>
    <div>
        <b>Time: ${dataSend.time}</b>
    </div>
    <div>
        <b>Doctor: ${dataSend.doctorName}</b>
    </div>
    <p>To confirm the information is correct and to keep the appointment, please select confirm:</p>
    <div>
        <a href=${dataSend.redirectLink} target="_blank">Confirm</a>
    </div>
     <br>
      <br>
    <p>Bookingcare is pleased to assist you.</p>
    <div>
        <h1>BookingCareVn</h1>
    </div>`;
  }
  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
