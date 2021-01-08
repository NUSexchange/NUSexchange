const router = require('express').Router();

const app = require('express')();
const {PythonShell} = require('python-shell');
  
//Router to handle the incoming request. 
router.post("/fetch", (req, res) => { 

  let options = { 
        mode: 'text', 
        pythonPath: 'C:/Python39/python.exe', 
        pythonOptions: ['-u'], // get print results in real-time 
        args: [JSON.stringify(req.body.information)]
    }; 
    
    PythonShell.run("./routes/results/getResults.py", options, function (err, results) {
      console.log(results)
      if (err) throw err;
      res.send(results);
    });
}); 


module.exports = router;

