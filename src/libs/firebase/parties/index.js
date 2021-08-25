import { firestore } from "@libs/firebase/firestore";

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
                console.log("This party alreayd in the database.");
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

                    db.collection("leaders").doc(payload.leaderId).update({
                        partyId: ref.id,
                        party: data.name,
                        partyShort: data.nameShort,
                        partyLogo: data.logo,
                        partyStatus: data.status,
                    });
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
