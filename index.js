require('dotenv').config();
 
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
 
app.get('/', (req, res) => {
    res.send('Hello Word')
})
 
app.get('/enviarCodigo', (req, res) => {
    client.verify.v2.services("VA4473eace92a4f7f3eadd6171c7bca495")
        .verifications
        .create({ to: '+5516991978947', channel: 'sms' })
        .then(verification => console.log(verification.sid));
})

app.get('/teste/:um/:dois', (req, res) => {
     const um = req.params.id
     const dois = req.params.id
     const umMaisdois = um + dois
 res.send(umMaisdois) 
})
 
app.get('/checkCodigo/:codigo/:id', (req, res) => {
    const id = req.params.id
    const codigo = req.params.codigo
    client.verify.v2.services("VA4473eace92a4f7f3eadd6171c7bca495")
    .verificationChecks
    .create({ to: '+5516991978947', code: codigo })
    .then(verification_check => {
      if (verification_check.status === 'approved') {
        res.status(200).json({ message: 'Verification successful!' });
      } else {
        res.status(400).json({ message: 'Invalid code' });
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
