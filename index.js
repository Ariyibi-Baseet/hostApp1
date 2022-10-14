const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');


app.listen(3000, () => console.log('Example app listening on port 3000!'));

// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/public/blog.html");
});

app.get("/login", (req, res) => {
   res.sendFile(__dirname + "/public/login.html");
});

app.get("/registration", (req, res) => {
   res.sendFile(__dirname + "/public/registration.html");
});

app.get("/article", (req, res) => {
   res.sendFile(__dirname + "/public/read_more.html");
});

// form validation
app.post('/registration', 
  body('fullname', 'First Name cannot be empty').notEmpty(),
  body('email', 'Email cannot be empty').notEmpty(),
  body('email', 'Input a valid email Address').isEmail(),
  body('phone', 'Phone cannot be empty').notEmpty(),
  body('phone', 'Numbers only').isInt(),
  body('company_name', 'Company Name cannot be empty').notEmpty(),
  body('street_address_1', 'Street Address cannot be empty').notEmpty(),
  body('city', 'City cannot be empty').notEmpty(),
  body('postcode', 'Postcode cannot be empty').notEmpty(),
  body('country', 'Street Address cannot be empty').notEmpty(),
  body('tax_id', 'Tax Id cannot be empty').notEmpty(),
  body('password', 'Password cannot be empty').notEmpty(),
  body('password', 'Password must be between 6 and 12 characters plus number').isLength({min:6,max:12}),
  body('confirm_password', 'Confirm Password cannot be empty').notEmpty(),
  

  
  (req,res) => {
    const validation_result = validationResult(req);
    if(validation_result.isEmpty())
    {
      res.send('Good to go')
    }else{
      console.log(validation_result.array({ onlyFirstError : true }))

      let sendError = validation_result.array()[0].msg;
      validation_result.array().forEach((error) => {
        sendError += ' <br>' + error.msg;
      // body('error-message') = validation_result.array()[0].msg;
      });
    res.send(sendError);
    app.get("/registration", (req, res) => {
      res.render(__dirname + "/public/registration.html", {sendError:sendError});
   });
    }
  }
)
app.use('/', router);
app.use('/register', router);
app.use('/login', router);
app.use('/article', router);