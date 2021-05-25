import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
    apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
    server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
});

export async function callPing() {
    const response = await mailchimp.ping.get();
    console.log(response);
}


// export default class Mailchimp {
//     init() {
//         return new Promise(async (resolve, reject) => {
//             mailchimp.setConfig({
//                 apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
//                 server: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
//             });

//             const response = await mailchimp.ping.get();
//             resolve(response)
//         });
//     }
// }
