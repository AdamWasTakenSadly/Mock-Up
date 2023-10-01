const Log = require('../models/LogsModel');
const transporter = require('../nodemailerConfig');

// Controller actions
const getAllLogs = async (req, res) => {
  if(await req.user.role == "Admin")
  {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
else
{
  res.status(400).json({ error: "Access Restriced"});
}
};

//POST a new log
const addLog = async (req, res) => {
 const { productName, productID, action, role, oldAmount, newAmount} = req.body;

  try {
    const log = await Log.create({
      productName,
      productID,
      action,
      role,
      oldAmount,
      newAmount
    });
    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Admin sends email to devs for bugs
const emailToDevs = async (req, res) => {
  if(await req.user.role == "Admin")
  {
  try {
    const { text, subject } = req.body;
    const mailOptions = {
      from: 'bluet3253@gmail.com', // Sender's email address
      to: 'mariam.faggal6@gmail.com', // Recipient's email address
      subject: subject, // Email subject
      text: text, // The text content from the front end
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
else
{
  res.status(400).json({ error: "Access Restriced"});
}
}


module.exports = {
  getAllLogs,
  addLog,
  emailToDevs
};
