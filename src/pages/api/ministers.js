// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "@libs/firebase/firestore";

export default async (req, res) => {
  let db = await firestore();
  let ministers = [];

  let colRef = db.collection("ministers");
  await colRef
    .orderBy("name", "asc")
    .startAt("y")
    .endAt("z")
    .get()
    .then((snapshot) => {
      if (snapshot.empty) return null;

      snapshot.forEach((doc) => {
        ministers.push(doc.data());
      });
    });

  res.statusCode = 200
  return res.json(ministers);
}
