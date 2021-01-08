const router = require('express').Router();

const app = require('express')();
const {PythonShell} = require('python-shell');

//Router to handle the incoming request. 
router.post("/create-pdf", (req, res) => { 
    let options = { 
        mode: 'text', 
        pythonPath: '/usr/local/bin/python3.8', 
        pythonOptions: ['-u'], // get print results in real-time 
        args: [JSON.stringify(req.body)]
    }; 
    
    PythonShell.run("/Users/carelchay/PycharmProjects/NUSexchange-beta--master/backend/routes/pdf/getPdf.py", options, function (err, results) {
      if (err) throw err;
    });

    res.send("PDF Generator connected");
}); 

router.get("/get-pdf", (req, res) => {
  file = req.query.fileName
  fileLocation =  "./routes/pdf/" + file
  res.download(fileLocation, (err) => {
                if (err) console.log(err );
            });
});

module.exports = router;
