import { service } from "@utils/api";

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
    let entries = {};
    await service
        .get("/minister/promoted")
        .then((res) => {
            entries = res.data;
        });

    return {
        minister: parseMinisterEntries(entries),
    }
}