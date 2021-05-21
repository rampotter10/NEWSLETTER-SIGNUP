const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post('/', function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }


        }]
    }

});
const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/8f8439deba";

const options = {
    method: "POST",
    auth: "ram1:1c7c4474fe061481b9648e5a387ba2c5-us17"
}

const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();



app.listen(3000, function() {
    console.log('Server is runiing on port 3000');
})


//8f8439deba
//1c7c4474fe061481b9648e5a387ba2c5-us17