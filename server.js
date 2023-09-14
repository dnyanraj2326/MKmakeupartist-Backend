const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb+srv://mkmakeupartist:MKmakeupartist%40123@mkclustor.uvgeo8x.mongodb.net/mkdatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  // name,city,mobileNum,email,selectedServies,desc
const contactSchema = new mongoose.Schema({
  name: String,
  city: String,
  mobileNum: String,
  email: String,
  selectedServices: String,
  desc: String
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name,city,mobileNum,email,selectedServices,desc } = req.body;

  const newContact = new Contact({ name,city,mobileNum,email,selectedServices,desc });

  newContact.save()
    .then(() => res.status(500).json({
      res: {
        code: 200,
        status: "success"
      },
      message: "Thanks For Contact!"
    }))
    .catch(err => {
      console.error('Error saving contact form submission:', err);
      return res.status(500).json({
        res: {
          code: 500,
          status: "failed"
        },
        message: "Internal Server Error!"
      });
    });
});

app.get('/api/getContacts', async(req, res) => {
  try{
    let data = await Contact.find().sort({createdAt: -1});
    return res.status(200).json({
      res: {
        code: 200,
        status: "success"
      },
      message: "Data Fetched!",
      data,
    });
  }catch(err){
    return res.status(500).json({
      res: {
        code: 500,
        status: "failed"
      },
      message: "Internal Server Error!"
    });
  }

  
  
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});