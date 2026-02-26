export default {
    name: 'modelBanner',
    title: 'Model Banner Grid',
    type: 'object',
    fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    name: 'card',
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                        { name: 'ctaText', title: 'CTA Text', type: 'string' },
                        { name: 'ctaLink', title: 'CTA Link', type: 'url' },
                        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                    ],
                },
            ],
        },
    ],
}
