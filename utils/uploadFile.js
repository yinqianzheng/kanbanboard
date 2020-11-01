const AWS = require("aws-sdk");

let ID;
let SECRET;
if (process.env.NODE_ENV === "production") {
  ID = require("../config/prodKeys").AWSAccessKeyId;
  SECRET = require("../config/prodKeys").AWSSecretKey;
} else {
  ID = require("../config/keys").AWSAccessKeyId;
  SECRET = require("../config/keys").AWSSecretKey;
}

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

module.exports = (email, file, callback) => {
    const params = {
        Bucket: "zresumes",
        Key: email.match(/[^@|.]+/g).join("")+file.name,
        Body: file.data
    };

    s3.upload(params, function(err, data){
        if (err) {
            callback(null);
            throw err;
        }
        callback(data.Location);
    })
}
