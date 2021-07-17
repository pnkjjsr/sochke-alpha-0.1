const { db } = require("../src/libs/firebase/admin.js");

process.on("message", data => {
    let imageUrl = data.photoUrl;
    var request = require('request').defaults({ encoding: null });

    request.get(imageUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let base64Code = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');

            db.collection("ministers").doc(data.id)
                .update({
                    photoUrl: base64Code
                }).then(() => {
                    console.log("Document successfully updated!");
                }).catch((err) => {
                    console.log(err);
                });
        }
    });
});