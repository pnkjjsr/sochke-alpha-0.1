import { service } from "@utils/api";

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
        bannerUrl: "",
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
        education: fields.education
    }
}

function parseMinisterEntry(entry, cb = parseMinister) {
    return entry?.map(cb)
}

export async function getMinister(slug) {
    let entry = {};
    await service
        .get(`/minister/username/${slug}`)
        .then((res) => {
            entry = res.data;
        });

    return {
        minister: parseMinisterEntry(entry)[0]
    }
}

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

export async function getMinisters(slug) {
    let entry = {};

    await service
        .get(`/minister/trending`)
        .then((res) => {
            entry = res.data;
        });

    return parseMinisterEntries(entry)
}