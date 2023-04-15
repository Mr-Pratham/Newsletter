// const express = require('express')
// const bodyParser = require('body-parser');
// const request = require('request');
// const https = require('https');
// const app = express();
// const port = 3000;

// app.use("/public", express.static(__dirname + "/public"))
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));



// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/signup.html');
// });


// app.post("/", function (req, res) {
//     const firstName = req.body.fname;
//     const lastName = req.body.lname;
//     const email = req.body.email;

//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };
//     const jsonData = JSON.stringify(data);
//     const url = 'https://us21.api.mailchimp.com/3.0/f5f2361a00';
    
//     const options = {
//         method: "POST",
//         auth: "pratham:67b34e408f5c81c393f420ac6246ea0f-us21"
//     }
//     const request = https.request(url, options, function (response) {
//         response.on("data", function (data) {
//         })
//     })
//     request.write(jsonData);
//     request.end;
// });
// app.listen(port, function () {
//     console.log(`Example app listening on port ${port}`);
// });
// //API KEY:- 67b34e408f5c81c393f420ac6246ea0f-us21
// // lIST ID:- f5f2361a00



const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
const port = 3000;
const listId = 'f5f2361a00';
const apiKey = '67b34e408f5c81c393f420ac6246ea0f-us21';
const server = 'us21';

app.use("/public", express.static(__dirname + "/public"))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ],
        update_existing: true,
    };
    const jsonData = JSON.stringify(data);

    const options = {
        method: "POST",
        auth: `pratham:${apiKey}`,
    };

    const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}`;
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data", function (data) { });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});
