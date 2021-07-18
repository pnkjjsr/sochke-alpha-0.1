import { contentfulClient } from "@libs/contentful";

function parseImages(fields) {
    return fields.fields.file.url
}

function parseHead({ fields }) {
    return {
        slug: fields.slug,
        title: fields.title,
        desc: fields.desc,
        tags: fields.tags,
        image: fields.image.fields.file
    }
}

function parseHeadEntries(entries, cb = parseHead) {
    return entries?.items?.map(cb)
}

export async function getNetaHead(lang) {
    const head = await contentfulClient.getEntries({
        content_type: "pageHead",
        locale: lang,
        "fields.slug": "neta",
    });

    return {
        head: parseHeadEntries(head)[0]
    }
}