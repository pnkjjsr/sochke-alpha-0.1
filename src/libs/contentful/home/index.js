import { contentfulClient } from "@libs/contentful";

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

function parseTags({ fields }) {
    return {
        slug: fields.slug,
        tag: fields.tag
    }
}

function parseTagsEntries(entries, cb = parseTags) {
    return entries?.items?.map(cb)
}

export async function getHome(lang) {
    const head = await contentfulClient.getEntries({
        content_type: "pageHead",
        locale: lang,
        "fields.slug": "home",
    });

    const tags = await contentfulClient.getEntries({
        content_type: "story",
        locale: lang,
        limit: 10,
    });

    return {
        head: parseHeadEntries(head)[0],
        tags: parseTagsEntries(tags),
    }
}