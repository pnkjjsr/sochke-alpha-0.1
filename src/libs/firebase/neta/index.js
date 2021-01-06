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

function parseMinisterEntries(entry, cb = parseMinister) {
    return entry?.map(cb)
}

export async function getMinister(slug) {
    let entry = {};
    await service
        .get(`/minister/${slug}`)
        .then((res) => {
            entry = res.data;
        });

    return {
        minister: parseMinisterEntries(entry)[0],
    }
}