import { firestore } from "@libs/firebase/firestore";

export async function postNewUser(newUser) {
    let db = await firestore();

    let userName = `${newUser.email.match(/^(.+)@/)[1]}-${newUser.uid}`;
    let data = {
        createdAt: new Date().toISOString(),
        id: newUser.uid,
        userType: "citizen", //citizen, leader, etc
        email: newUser.email,
        emailVerified: false,
        password: "",
        countryCode: "",
        phoneNumber: newUser.phoneNumber,
        phoneVerified: false,
        displayName: newUser.displayName,
        photoURL: newUser.photoURL,
        area: "",
        district: "",
        division: "",
        state: "",
        pincode: "",
        country: "",
        userName: userName,
        leaderCount: 0,
        believerCount: 0,
    };

    db.doc(`/users/${data.id}`)
        .set(data)
        .then(() => {
            // console.log("New user registered successfully.");
        })
        .catch((err) => {
            console.log(err);
        });
}