import { contentfulClient } from "@libs/contentful";

function parseStory({ fields, sys }) {
    return {
        slug: fields.slug,
        tag: fields.tag,
        image: fields.image.fields.file,
        title: fields.title,
        desc: fields.desc.content,
        date: sys.createdAt
    }
}

function parseStoryEntries(entries, cb = parseStory) {
    return entries?.items?.map(cb)
}

export async function getStory(slug) {
    const entry = await contentfulClient.getEntries({
        content_type: "story",
        limit: 1,
        "fields.slug[in]": slug,
    });

    // const entries = await getClient(preview).getEntries({
    //     content_type: 'post',
    //     limit: 2,
    //     order: '-fields.date',
    //     'fields.slug[nin]': slug,
    // })

    return {
        story: parseStoryEntries(entry)[0],
        // morePosts: parsePostEntries(entries),
    }
}