const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data ={
        members: [{
            email_address:email,
            status : "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/69c61c0c48";
    const options={
        method:"POST",
        auth : "sawan:c5b5b8551d568416f9abd9990b558986-us5"
    }
   const request= https.request(url,options,function(response){
       if(response.statusCode===200){
           res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile( __dirname+"/failure.html");
       }
      
    });
    request.write(jsonData);
    request.end();

});
// ac78627769e24f6e5ac8f7ddea89fd42-us5
// 69c61c0c48
app.listen(process.env.PORT ||  3000, function () {
    console.log("server started at port 3000.");
});