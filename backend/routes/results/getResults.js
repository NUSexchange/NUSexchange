const router = require('express').Router();

const app = require('express')();
const {PythonShell} = require('python-shell');
  
//Router to handle the incoming request. 
router.post("/fetch", (req, res) => { 

  let options = { 
        mode: 'text', 
        pythonPath: '/usr/local/bin/python3.8', 
        pythonOptions: ['-u'], // get print results in real-time 
        args: [JSON.stringify(req.body.information)]
    }; 
    
    PythonShell.run("/Users/carelchay/PycharmProjects/NUSexchange-beta--master/backend/routes/results/getResults.py", options, function (err, results) {
      console.log(results)
      if (err) throw err;
      res.send(results);
    });
}); 


module.exports = router;

