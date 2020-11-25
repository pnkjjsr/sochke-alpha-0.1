import { contentfulClient } from "@libs/contentful";

function parseImages(fields) {
    return fields.fields.file.url

}

function parseStory({ fields, sys, cb = parseImages }) {
    return {
        slug: fields.slug,
        tag: fields.tag,
        image: fields?.image?.map(cb),
        title: fields.title,
        desc: fields.desc.content,
        date: sys.createdAt
    }
}

function parseStoryEntries(entries, cb = parseStory) {
    return entries?.items?.map(cb);
}

export async function getStory(slug, lang) {
    const entry = await contentfulClient.getEntries({
        content_type: "story",
        limit: 1,
        "fields.slug": slug,
        locale: lang
    });

    return {
        story: parseStoryEntries(entry)[0]
    }
}