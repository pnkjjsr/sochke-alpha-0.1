import { firestore } from "@libs/firebase/firestore";

// Get User
function parseUser(fields) {
    return {
        id: fields.id,
        photoURL: fields.photoURL,
        userName: fields.userName,
        displayName: fields.displayName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        area: fields.area,
        state: fields.state,
        pincode: fields.pincode,
        country: fields.country,
    }
}

export async function getUser(id) {
    let db = await firestore();

    let userData = {};
    await db.doc(`/users/${id}`)
        .get()
        .then((doc) => {
            userData = doc.data();
        })
        .catch((err) => {
            console.log(err);
        });

    return parseUser(userData);
}

// Post User Photo
export async function patchUserPhoto(data) {
    let db = await firestore();

    await db.doc(`/users/${data.id}`)
        .update({
            photoURL: data.photoURL
        })
        .then(() => {
            // console.log("Document successfully updated!");
        }).catch(err => {
            // console.log(err);
        });
}

// Post User Profile
export async function patchUserProfile(data) {
    let db = await firestore();

    await db.doc(`/users/${data.id}`)
        .update({
            displayName: data.displayName,
            email: data.email,
            phoneNumber: data.phoneNumber,
        })
        .then(() => {
            console.log("Document successfully updated!");
        }).catch(err => {
            console.log(err);
        });
}

export async function traceUserName(data) {
    let db = await firestore();

    let result = {};

    await db.collection("users").where("userName", "==", data)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                result = {
                    code: "username/available",
                    message: `${data}, available as username`,
                }
            }
            else {
                result = {
                    code: "username/not-available",
                    message: `${data}, not available as username`,
                }
            }
        }).catch(err => {
            console.log(err);
        });


    return result;
}