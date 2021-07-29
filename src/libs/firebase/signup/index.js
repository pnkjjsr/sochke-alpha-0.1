import { firestore } from "@libs/firebase/firestore";

export async function postNewUser(newUser, uid) {
    let db = await firestore();

    let userName = `${newUser.email.match(/^(.+)@/)[1]}-${uid}`;
    let data = {
        createdAt: new Date().toISOString(),
        id: uid,
        type: "citizen", //citizen, leader, etc
        email: newUser.email,
        emailVerified: false,
        password: "",
        countryCode: "",
        phoneNumber: newUser.phoneNumber,
        phoneVerified: false,
        displayName: newUser.displayName,
        photoURL: newUser.photoURL,
        bannerUrl: "",
        address: "",
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

    db.doc(`/users/${uid}`)
        .set(data)
        .then(() => {
            // console.log("New user registered successfully.");
        })
        .catch((err) => {
            console.log(err);
        });
}