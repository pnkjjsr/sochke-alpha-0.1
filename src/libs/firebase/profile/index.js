import { firestore } from "@libs/firebase/firestore";

async function patchLeader(leaderId, data) {
    let db = await firestore();
    db.collection("leaders").doc(leaderId).update(data);
}

//Add new Party
export async function postNewParty(payload) {
    let db = await firestore();
    let result = {};
    let data = {
        createdate: new Date().toISOString(),
        name: payload.name,
        nameShort: payload.nameShort,
        logo: payload.logo,
        status: "disable",
        position: -1,
    };

    let colRef = db.collection("parties");
    colRef
        .where("name", "==", data.name)
        .where("nameShort", "==", data.nameShort)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                // Already in database
                console.log("This party already in the database.");
            }
            else {
                // Create new party doc
                colRef.add(data).then((ref) => {
                    colRef.doc(ref.id).update({ id: ref.id })
                        .then(() => {
                            result = {
                                code: "party/added",
                                message: "New party added in database.",
                            };
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    let newParty = {
                        partyId: ref.id,
                        party: data.name,
                        partyShort: data.nameShort,
                        partyLogo: data.logo,
                        partyStatus: data.status,
                    };
                    patchLeader(payload.leaderId, newParty);
                });

            }
        })
        .catch((err) => {
            console.log(err);
        });

    return result;
}

function parsePartiesField(fields) {
    return {
        id: fields.id,
        name: fields.name,
        nameShort: fields.nameShort,
        logo: fields.logo,
        position: fields.position,
        status: fields.status,
        createdate: fields.createdate
    }
}

function parseParties(entries, cb = parsePartiesField) {
    return entries?.map(cb)
}

//Get All Party
export async function getParties() {
    let db = await firestore();
    const result = [];

    let colRef = db.collection("parties");
    await colRef
        .orderBy("position", "asc")
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                let data = doc.data();
                result.push(data);
            });
        }).catch((err) => {
            console.log(err);
        });

    return parseParties(result);
}

//Get Party by ID
export async function getParty(payload) {
    let db = await firestore();
    let result = [];

    await db.doc(`/parties/${payload.partyId}`)
        .get()
        .then((doc) => {
            result = doc.data();
            let data = {
                partyId: result.id,
                party: result.name,
                partyShort: result.nameShort,
                partyLogo: result.logo,
                partyStatus: result.status,
            };
            patchLeader(payload.leaderId, data);
        })
        .catch((err) => {
            console.log(err);
        });

    return parsePartiesField(result);
}