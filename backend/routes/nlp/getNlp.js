const router = require('express').Router();
const axios = require("axios");

const app = require('express')();
const {PythonShell} = require('python-shell');


router.post("/fetch", (req, res) => { 

  console.log(req.body.nusModule);

  let currentAcademicYear = "2020-2021";
  let targetURL = "https://api.nusmods.com/v2/" + currentAcademicYear + "/modules/" + req.body.nusModule + ".json";

  axios.get(targetURL)
      .then(function (response) {

        let options = { 
          mode: 'text', 
          pythonPath: 'C:/Python39/python.exe', 
          pythonOptions: ['-u'], // get print results in real-time 
          args: [response.data.description, req.body.otherModule]
        }; 

        console.log("arg 1: " + response.data.description);
        console.log("arg 2: " + req.body.otherModule)

        PythonShell.run("./routes/nlp/main.py", options, function (err, results) {
          if (err) throw err;
          res.send(results);
        });
      }).catch(function(error) {
          console.log(error);
          res.send(error);
      });    
}); 


module.exports = router;
