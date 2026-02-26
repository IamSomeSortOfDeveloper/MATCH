export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'metatitle',
            title: 'Meta title',
            type: 'string',
        },
        {
            name: 'metadescription',
            title: 'Meta description',
            type: 'text',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'ctaBanner1' },
                { type: 'modelBanner' },
                { type: 'textBlock1' },
                { type: 'textBlock2' },
                { type: 'textBlock3' },
                { type: 'faqBlock' },
                { type: 'internallink' },
                { type: 'footerStrip' },
            ],
        },
    ],
}
