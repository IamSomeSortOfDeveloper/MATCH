export default {
    name: 'imageWithText',
    title: 'Image with Text Component',
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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
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
            name: 'imagePosition',
            title: 'Image Position',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
            },
        },
    ],
}
