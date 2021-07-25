import { contentfulClient } from "@libs/contentful";

function parseHead({ fields }) {
    return {
        slug: fields.slug,
        title: fields.title,
        desc: fields.desc,
        image: fields.image.fields.file,
        // languages: fields.languages
    }
}

function parseHeadEntries(entries, cb = parseHead) {
    return entries?.items?.map(cb)
}

export async function getHome(lang) {
    const head = await contentfulClient.getEntries({
        content_type: "pageHead",
        locale: lang,
        "fields.slug": "home",
    });

    return {
        head: parseHeadEntries(head)[0],
    }
}