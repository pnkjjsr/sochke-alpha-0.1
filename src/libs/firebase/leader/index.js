import { firestore } from "@libs/firebase/firestore";


function parseTypeField(fields) {
    return {
        id: fields.id,
        name: fields.name,
        nameShort: fields.nameShort,
    }
}

function parseLeaderTypes(entries, cb = parseTypeField) {
    return entries?.map(cb)
}

// Get LeaderTypes
export async function getLeaderTypes() {
    let db = await firestore();
    const result = [];

    let colRef = db.collection("leaderTypes");
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

    return parseLeaderTypes(result);
}

// Add new leader
export async function postNewPolitician(payload) {
    let db = await firestore();
    let result = {};
    let data = {
        age: "",
        assets: "",
        cases: "",
        createdate: new Date().toISOString(),
        constituency: "",
        education: "",
        liabilities: "",
        party: "",
        partyLogo: "",
        partyShort: "",
        promoted: -1,
        searchTags: "",
        twitterHandle: "",
        type: payload.type,
        typeOther: payload.typeOther,
        userName: payload.userName,
        userId: payload.id,
        winner: "",
        year: "",
    };

    let colRef = db.collection("leaders");

    colRef.where("userName", "==", data.userName).get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                // Update leader doc
                snapshot.forEach(doc => {
                    let leaderData = doc.data();
                    colRef.doc(leaderData.id).update({
                        type: data.type,
                        typeOther: data.typeOther
                    })
                });

            }
            else {
                // Create new leader doc
                colRef.add(data).then((ref) => {
                    colRef.doc(ref.id).update({ id: ref.id })
                        .then(() => {
                            result = {
                                code: "leader/added",
                                message: "New leader added in database.",
                            };
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    db.collection("users").doc(payload.id).update({ leaderId: ref.id });
                });

            }
        })
        .catch((err) => {
            console.log(err);
        });

    return result;
}

// Get leader Parse
function parseLeader(fields) {
    return {
        age: fields.age,
        assets: fields.assets,
        cases: fields.cases,
        createdate: fields.createdate,
        constituency: fields.constituency,
        education: fields.education,
        liabilities: fields.liabilities,
        party: fields.party,
        partyId: fields.partyId,
        partyLogo: fields.partyLogo,
        partyShort: fields.partyShort,
        partyStatus: fields.partyStatus,
        promoted: fields.promoted,
        searchTags: fields.searchTags,
        twitterHandle: fields.twitterHandle,
        winner: fields.winner,
        year: fields.year,
    }
}

// Get leader data by ID
export async function getLeader(id) {
    let db = await firestore();

    let leaderData = {};
    await db.doc(`/leaders/${id}`)
        .get()
        .then((doc) => {
            leaderData = doc.data();
        })
        .catch((err) => {
            console.log(err);
        });

    return parseLeader(leaderData);
}
