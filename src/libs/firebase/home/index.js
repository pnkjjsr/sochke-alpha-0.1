import { firestore } from "@libs/firebase/firestore";

function parseHead(fields) {
    return {
        slug: fields.userName,
        name: fields.name,
        thumbUrl: fields.photoUrl
    }
}

function parseMinisterEntries(entries, cb = parseHead) {
    return entries?.map(cb)
}


export async function getPromotedMinisters() {
    let db = await firestore();

    const promotedMinisters = [];

    let colRef = db.collection("ministers");
    await colRef
        .where("promoted", ">", 0)
        .orderBy("promoted", "asc")
        .limit(10)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                return console.log({
                    code: "minister/empty",
                    message: "No data is available.",
                });
            } else {
                snapshot.forEach((doc) => {
                    promotedMinisters.push(doc.data());
                });
            }
        })
        .catch((err) => {
            return console.log(err);
        });

    return parseMinisterEntries(promotedMinisters)
}