require('dotenv').config();
var Mailchimp = require('mailchimp-api-v3');
import { firestore } from "@libs/firebase/firestore";

export default async (req, res) => {
    let db = await firestore();
    var mailchimp = new Mailchimp(process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY);
    let result = "";

    const data = {
        createdAt: new Date().toISOString(),
        email: req.body.email,
        type: req.body.type,
    };

    let colRef = db.collection("subscribers");
    await colRef
        .where("email", "==", data.email)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                let docRef = colRef.doc();
                data.id = docRef.id;

                result = {
                    code: "subscriber/add",
                    message: "Subscriber added successfully.",
                }

                docRef
                    .set(data)
                    .then(() => {
                        console.log("Subscriber added successfully.");

                        mailchimp.post(`/lists/${process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID}/members`, {
                            email_address: data.email,
                            status: "subscribed",
                        }).then((response) => {
                            if (response.statusCode === 200) console.log("Subscriber added in mailchimp audience.");
                        }).catch((err) => console.log(err));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                result = {
                    code: "subscriber/repeat",
                    message: "This email already subscribed.",
                };

            }
        })
        .catch((err) => {
            result = err;
        });

    return res.json(result);
}
