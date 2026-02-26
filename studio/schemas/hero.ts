export default {
    name: 'hero',
    title: 'Hero CTA Banner',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'text',
            title: 'Text',
            type: 'text',
        },
        {
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
        },
        {
            name: 'ctaLink',
            title: 'CTA Link',
            type: 'url',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
}
