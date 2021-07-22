import { firestore } from "@libs/firebase/firestore";


function parseHead(fields) {
    return {
        id: fields.id,
        name: fields.name,
        nameShort: fields.nameShort,
    }
}

function parseLeaderTypes(entries, cb = parseHead) {
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


export async function postNewPolitician(payload) {
    let db = await firestore();

    let data = {
        address: "",
        age: "",
        assets: "",
        bannerUrl: "",
        cases: "",
        createdAt: new Date().toISOString(),
        constituency: "",
        education: "",
        liabilities: "",
        name: "",
        party: "",
        partyLogo: "",
        partyShort: "",
        photoUrl: "",
        pincode: "",
        promoted: "",
        searchTags: "",
        state: "",
        twitterHandle: "",
        type: "",
        userName: "",
        winner: "",
        year: "",
    };

    let colRef = db.collection("leaders");
    colRef.where("userName", "==", data.userName).get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                return res.status(400).json({
                    code: "minister/duplicate",
                    messsage: `${data.userName} already added in database`
                });
            }
            else {
                colRef.add(data).then((ref) => {
                    colRef.doc(ref.id).update({ id: ref.id })
                        .then(() => {
                            return res.status(200).json({
                                code: "leader/added",
                                message: "New leader added in database.",
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });

            }
        })
        .catch((err) => {
            return res.status(400).json(err);
        });


    let userName = `${newUser.email.match(/^(.+)@/)[1]}-${uid}`;


    db.doc(`/users/${uid}`)
        .set(data)
        .then(() => {
            // console.log("New user registered successfully.");
        })
        .catch((err) => {
            console.log(err);
        });
}