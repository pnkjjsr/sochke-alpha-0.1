import { firestore } from "@libs/firebase/firestore";

// Get single minister via slug
function parseCitizen(fields) {
    return {
        id: fields.id,
        slug: fields.userName,
        name: fields.displayName,
        photoURL: fields.photoURL,
        bannerUrl: fields.bannerUrl || "",
        area: fields.area,
        country: fields.country,
        type: fields.type || fields.userType
    }
}

function parseCitizenEntry(entry, cb = parseCitizen) {
    return entry?.map(cb)
}

export async function getCitizen(slug) {
    let db = await firestore();

    const citizen = [];

    let colRef = db.collection("users");
    await colRef
        .where("userName", "==", slug)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                return console.log({
                    code: "citizen/empty",
                    message: "No data is available.",
                });
            } else {
                snapshot.forEach((doc) => {
                    citizen.push(doc.data());
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });

    return parseCitizenEntry(citizen)[0];
}

// Get minister alphabetically
function parseAlphaCitizen(fields) {
    return {
        id: fields.id,
        slug: fields.userName,
        type: fields.userType,
        name: fields.displayName || fields.userName,
        thumbUrl: fields.photoURL
    }
}

function parseCitizenAlphaEntries(entries, cb = parseAlphaCitizen) {
    return entries?.map(cb);
}

// Get citizen by Char
export async function getCitizensByChar(slug) {
    let db = await firestore();
    let citizens = [];
    let char = slug;
    let nextChar = String.fromCharCode(char.charCodeAt(char.length - 1) + 1);

    let colRef = db.collection("users");
    await colRef
        .orderBy("userName", "asc")
        .startAt(char)
        .endAt(nextChar)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) return null;

            snapshot.forEach((doc) => {
                citizens.push(doc.data());
            });
        });

    return parseCitizenAlphaEntries(citizens);
}

// Get User by UID
function parseUser(fields) {
    return {
        id: fields.id,
        slug: fields.userName,
        name: fields.displayName,
        photoURL: fields.photoURL,
        type: fields.type || fields.userType
    }
}

function parseUserEntry(entry, cb = parseUser) {
    return entry?.map(cb)
}

export async function getUser(id) {
    let db = await firestore();
    const user = [];

    let colRef = db.collection("users");
    await colRef.doc(id)
        .get()
        .then((doc) => {
            let userData = doc.data();
            user.push(userData);
        })
        .catch((err) => {
            console.log(err);
        });

    return parseUserEntry(user)[0];
}