import { firestore } from "@libs/firebase/firestore";

// Get User
function parseUser(fields) {
    return {
        id: fields.id,
        photoURL: fields.photoURL,
        bannerUrl: fields.bannerUrl,
        userName: fields.userName,
        displayName: fields.displayName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        address: fields.address,
        area: fields.area,
        division: fields.division,
        district: fields.district,
        state: fields.state,
        city: fields.city,
        pincode: fields.pincode,
        country: fields.country,
        userType: fields.type || fields.userType,
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
    let result = {};

    await db.doc(`/users/${data.id}`)
        .update({
            photoURL: data.photoURL
        })
        .then(() => {
            result = {
                code: "user-photo/updated",
                message: "User profile photo successfully updated!"
            };

        }).catch(err => {
            result = {
                code: "user-photo/error",
                message: "User profile photo not updated!",
                error: err
            };
        });

    return result;
}

// Post User Photo
export async function patchUserBanner(data) {
    let db = await firestore();
    let result = {};

    await db.doc(`/users/${data.id}`)
        .update({
            bannerUrl: data.bannerUrl
        })
        .then(() => {
            result = {
                code: "user-banner/updated",
                message: "User banner successfully updated!"
            };

        }).catch(err => {
            result = {
                code: "user-banner/error",
                message: "User banner not updated!",
                error: err
            };
        });

    return result;
}

// Post User Profile
export async function patchUserProfile(data) {
    let db = await firestore();
    let result = {};

    await db.doc(`/users/${data.id}`)
        .update({
            displayName: data.displayName,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            education: data.education,
        })
        .then(() => {
            result = {
                code: "user-profile/updated",
                message: "User profile info successfully updated!"
            };
        }).catch(err => {
            result = {
                code: "user-profile/error",
                message: "User profile info not updated!",
                error: err
            };
        });

    return result;
}

// Post User Address
export async function patchUserAddress(data) {
    let db = await firestore();
    let result = {};

    await db.doc(`/users/${data.id}`)
        .update({
            country: data.country,
            countryShortName: data.countryShortName,
            countryCode: data.countryCode,
            state: data.state,
            city: data.city,
            pincode: data.pincode,
            area: data.area,
            district: data.district,
            division: data.division,
            address: data.address,
        })
        .then(() => {
            result = {
                code: "user-address/updated",
                message: "User address info successfully updated!"
            };
        }).catch(err => {
            result = {
                code: "user-address/error",
                message: "User address info not updated!",
                error: err
            };
        });

    return result;
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


// Post User Profile
export async function patchLeaderProfile(data) {
    let db = await firestore();
    let result = {};

    await db.doc(`/users/${data.id}`)
        .update({
            userType: data.userType,
            userTypeOther: data.userTypeOther,
        })
        .then(() => {
            result = {
                code: "user-leaderInfo/updated",
                message: "User leader info successfully updated!"
            };
        }).catch(err => {
            result = {
                code: "user-leaderInfo/error",
                message: "User leader info not updated!",
                error: err
            };
        });

    return result;
}