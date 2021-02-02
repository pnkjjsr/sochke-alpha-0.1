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


// All stories contentful

function parseStories({ fields, sys, cb = parseImages }) {
    return {
        slug: fields.slug,
        tag: fields.tag,
        image: fields?.image?.map(cb),
        title: fields.title,
        date: sys.createdAt
    }
}

function parseStoriesEntries(entries, cb = parseStories) {
    return entries?.items?.map(cb);
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

export async function getAllStory(lang) {
    const head = await contentfulClient.getEntries({
        content_type: "pageHead",
        locale: lang,
        "fields.slug": "story",
    });

    const stories = await contentfulClient.getEntries({
        content_type: "story",
        locale: lang,
        limit: 10,
    });

    return {
        head: parseHeadEntries(head)[0],
        stories: parseStoriesEntries(stories),
    }
}