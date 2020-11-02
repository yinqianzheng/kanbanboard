const router = require("express").Router();
const Candidate = require("../models/Candidate");
const fileupload = require("express-fileupload");
const uploadFile = require("../utils/uploadFile");
const validateAddCandidateInput = require("../validation/addCandidate");

router.post("/add", fileupload(), (req, res) => {
    const {errors, isValid} = validateAddCandidateInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const {name, email, phoneNum} = req.body;
    Candidate.findOne({ email: req.body.email }).then(candidate => {
      if (candidate) {
        errors.email = "Email already exists";
        return res.status(401).json(errors);
      } else {
        // upload resume
        if(req.files && req.files.resume){
          const file = req.files.resume;
          uploadFile(email, file, (fileUrl) => {
            if(!fileUrl){
              return res.status(444).json({uploadResume: "Failed to add a new candidate, Please try later!"});
            }
            const newCandidate = new Candidate({name,email,phoneNum,resume: fileUrl});
            newCandidate
                .save()
                .then(candidate => {
                  return res.json(candidate);
                }).catch(err => {
                    errors.internal = "Failed to add a new candidate, Please try later!";
                    return res.status(444).json(errors);
                });
            
          })
        }else{
          errors.resume = "Please upload the resume!";
          return res.status(444).json(errors);
        }
      }
    });
});

router.get("/fetch", (req, res) => {
  Candidate.find().then(candidates => {
    res.json(candidates);
  }).catch(err => {
    const errors = {};
    errors.internal = "Failed to fetch candidates, Please try later!";
    res.status(500).json(errors);
  });
});

router.post("/update/:id",(req, res) => {
    const errors = {};
    const newInfo = {};
    let type = "process";
    if(req.body.process){
      newInfo.process = req.body.process;
    }
    if(req.body.rating){
      type = "rating";
    }
    if(req.body.comment){
      type = "comment"
      newInfo.comments = [req.body.comment]
    }

    if(type == "rating"){
      Candidate.findOne({ _id: req.params.id }).then(candidate => {
        if(!candidate){
          errors.rating = "Unable to update right now";
          return res.status(401).json(errors);
        }
        const ratings = candidate.rating;
        let updated = false;
        for(let i = 0; i < ratings.length; i++){
          if(ratings[i].provider == req.body.rating[0].provider){
            ratings[i].value = req.body.rating[0].value;
            updated = true;
            break;
          }
        }
        if(!updated){
          ratings.push(...req.body.rating);
        }
        candidate.save().then(c =>{
          res.json({type, candidate:c});
        }).catch(err => {
          errors.internal = "Unable to update right now";
          res.status(444).json(errors);
        });
      })
    }else{
      Candidate.findOneAndUpdate({ _id: req.params.id }, {$addToSet: newInfo}, {
        upsert: true,
        new: true,
        runValidators: true
      }).then(candidate => {
        if (!candidate) {
          errors.candidate = "Candidate doesn't exist";
          return res.status(400).json(errors);
        } else {
          return res.status(200).json({type, candidate});
        }
      }).catch(err => {
        errors.internal = "Unable to update now!";
        return res.status(404).json(errors);
      });
    }
  }
);

module.exports = router;
