const router = require("express").Router();
const validateLoginInput = require("../validation/login");
const validateAddUserInput = require("../validation/addUser");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const timeToLive = require("../config/session").timeToLive;

let keys;
if (process.env.NODE_ENV === "production") {
  keys = require("../config/prodKeys");
} else {
  keys = require("../config/keys");
}

function signJwt(user, response) {
    const payload = { id: user.id, email: user.email };
    jwt.sign(payload, keys.secretOrKey, { expiresIn: timeToLive}, response);
}

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.login = "Incorrect email or password";
        return res.status(401).json(errors);
      }
  
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          signJwt(user, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.login = "Incorrect email or password";
          return res.status(401).json(errors);
        }
      });
    });
  });


router.post("/addUser", (req, res) => {
    const { errors, isValid } = validateAddUserInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(401).json(errors);
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              errors.internal = "Failed to add the user, Please try later!";
              res.status(500).json(errors);
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.json({
                  success: true,
                  email: req.body.email
                });
              })
              .catch(err => {
                errors.internal = "Failed to add the user, Please try later!";
                res.status(444).json(errors);
              });
          });
        });
      }
    });
});

module.exports = router;
