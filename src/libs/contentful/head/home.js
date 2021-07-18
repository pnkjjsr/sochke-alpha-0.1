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
        image: fields.image.fields.file,
        languages: fields.languages
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
    return entries?.items?.map(cb);
}

function parseStoryEntry(entries, cb = parseImages) {
    let fields = entries?.items[0].fields;
    let sys = entries?.items[0].sys;
    return {
        slug: fields.slug,
        title: fields.title,
        image: fields?.image?.map(cb),
        tag: fields.tag,
        date: sys.createdAt
    }

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
        story: parseStoryEntry(tags),
    }
}