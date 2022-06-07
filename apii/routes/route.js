const express = require("express");
const router = express.Router();
const https = require("https");

require("dotenv").config();
router.get('/', (req, res)=>{
  res.render("../../react-landing-page/src/views/Landing");
})

router.post("/login", (req, res) => {
  const email = req.body.email;
  const lastname = req.body.lastName;
  const firstname = req.body.firstName;
  const phone = req.body.phone;

  const RegisterTemplate = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          LNAME: lastname,
          FNAME: firstname,
          PHONE: phone,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(RegisterTemplate);
  const url = process.env.BASE__URL;
  const options = {
    method: "POST",
    auth: "okondolee:" + `${process.env.API__KEY}`,
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/Success.html");
    } else {
      console.log("oops bruh");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
// // MESSAGE AND FEEDBACK PAGE

// router.post("/", (req, res) => {
//   const email = req.body.email;
//   const lastname = req.body.lastName;
//   const firstname = req.body.firstName;
//   const message = req.body.message;

//   const MessageTemplate = {
//     members: [
//       {
//         email_address: email,
//         status: "subscribed",
//         merge_fields: {
//           LNAME: lastname,
//           FNAME: firstname,
//         },
//         MESSAGE: message,
//       },
//     ],
//   };

//   const jsonData2 = JSON.stringify(MessageTemplate);
//   const url = process.env.BASE__URL;
//   const options = {
//     method: "POST",
//     auth: "okondo:" + `${process.env.API__KEY}`,
//   };

//   const request = https.request(url, options, (response) => {
//     response.on("data", (data) => {
//       console.log(JSON.parse(data));
//     });
//   });
//   request.write(jsonData2);

//   request.end();
// });

module.exports = router;
