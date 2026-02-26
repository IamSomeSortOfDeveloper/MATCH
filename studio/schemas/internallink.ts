export default {
    name: 'internallink',
    title: 'Internal Links',
    type: 'object',
    fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
                {
                    name: 'linkItem',
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'slug', title: 'Slug', type: 'slug' },
                    ],
                },
            ],
        },
    ],
}
