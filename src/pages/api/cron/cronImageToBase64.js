import { firestore } from "@libs/firebase/firestore";
import ChildProcess from "child_process";
const cronImageToBase64 = ChildProcess.fork("./childProcess/imagetobase64.js");

// Use carefully, its change the full db image into base64. its only 1 time used. 
export default async (req, res) => {
  let db = await firestore();

  let colRef = db.collection("ministers");
  await colRef
    .get()
    .then((snapshot) => {
      if (snapshot.empty) return res.json({
        code: "minister/not-available",
        message: "minster not available."
      });

      snapshot.forEach((doc) => {
        let data = doc.data();
        console.log(data.name);
        cronImageToBase64.send(data);
      });
    });

  return res.status(200).json({
    code: "cron-imageToBase64/running",
    message: "Cron start working."
  });
}