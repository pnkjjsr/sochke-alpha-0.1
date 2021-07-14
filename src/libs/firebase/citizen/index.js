import { service } from "@utils/api";
import { firestore } from "@libs/firebase/firestore";

// Get single minister via slug
function parseMinister(fields) {
    let title = "";

    switch (fields.type) {
        case "PM":
            title = "Prime Minister";
            break;
        case "CM":
            title = "Chief Minister";
            break;
        case "MP":
            title = "Member of Parliament";
            break;
        case "MLA":
            title = "Minister of Legislative Assembly";
            break;
        case "Councillor":
            title = "Councillor";
            break;
        default:
            title = "Minister";
            break;
    }

    return {
        id: fields.id,
        slug: fields.userName,
        name: fields.name,
        imageUrl: fields.photoUrl,
        bannerUrl: fields.bannerUrl || "",
        party: fields.party,
        partyShort: fields.partyShort,
        partyLogo: fields.partyLogo || null,
        titleShort: fields.type,
        title: title,
        constituency: fields.constituency,
        year: fields.year,
        cases: fields.cases,
        age: fields.age,
        asset: fields.assets,
        liability: fields.liabilities,
        education: fields.education,
        twitterHandle: fields.twitterHandle || null,
    }
}

function parseMinisterEntry(entry, cb = parseMinister) {
    return entry?.map(cb)
}

export async function getMinister(slug) {
    let db = await firestore();

    const minister = [];

    let colRef = db.collection("ministers");
    await colRef
        .where("userName", "==", slug)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                return console.log({
                    code: "minister/empty",
                    message: "No data is available.",
                });
            } else {
                snapshot.forEach((doc) => {
                    minister.push(doc.data());
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });

    return parseMinisterEntry(minister)[0];
}

// Get Promoted and features Ministers List
function parseMinisters(fields) {
    return {
        id: fields.id,
        slug: fields.userName,
        type: fields.type,
        name: fields.name,
        thumbUrl: fields.photoUrl,
        constituency: fields.constituency,
        year: fields.year
    }
}

function parseObject(entry) {
    return parseMinisters(entry);
}

function parseMinisterEntries(entries, cb = parseObject) {
    let ministerObj = {};
    let objArr = Object.values(entries);

    for (const ministers of objArr) {
        let type = ministers[0]?.type;
        switch (type) {
            case "MP":
                ministerObj.mps = ministers?.map(cb);
                break;
            case "MLA":
                ministerObj.mlas = ministers?.map(cb);
                break;
            case "COUNCILLOR":
                ministerObj.councillors = ministers?.map(cb);
                break;
            default:
                break;
        }
    }

    return ministerObj
}

export async function getMinisters() {
    let db = await firestore();
    let ministers = {
        mps: [],
        mlas: [],
        councillors: []
    }

    let colRef = db.collection("ministers");
    await colRef
        .where("type", "==", "MP")
        .where("trending", ">", 0)
        .orderBy("trending", "asc")
        .limit(10)
        .get().then((snapshot) => {
            if (snapshot.empty) return null;

            snapshot.forEach((doc) => {
                ministers.mps.push(doc.data());
            });
        });

    await colRef
        .where("type", "==", "MLA")
        .where("trending", ">", 0)
        .orderBy("trending", "asc")
        .limit(10)
        .get().then((snapshot) => {
            if (snapshot.empty) return null;

            snapshot.forEach((doc) => {
                ministers.mlas.push(doc.data());
            });
        });

    await colRef
        .where("type", "==", "COUNCILLOR")
        .where("trending", ">", 0)
        .orderBy("trending", "asc")
        .limit(10)
        .get().then((snapshot) => {
            if (snapshot.empty) return null;

            snapshot.forEach((doc) => {
                ministers.councillors.push(doc.data());
            });
        });

    return parseMinisterEntries(ministers)
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