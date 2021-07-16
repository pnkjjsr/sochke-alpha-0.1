import { firestore } from "@libs/firebase/firestore";

// Get single minister via slug
function parseCitizen(fields) {
    return {
        id: fields.id,
        slug: fields.userName,
        name: fields.displayName,
        photoURL: fields.photoURL,
        area: fields.area,
        country: fields.country,
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