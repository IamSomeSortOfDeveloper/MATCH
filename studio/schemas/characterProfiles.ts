export default {
    name: 'characterProfiles',
    title: 'Character Profiles Grid',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'profiles',
            title: 'Profiles',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                        },
                        {
                            name: 'badge',
                            title: 'Badge/Tag',
                            type: 'string',
                        },
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                        },
                        {
                            name: 'buttonText',
                            title: 'Button Text',
                            type: 'string',
                        },
                        {
                            name: 'buttonLink',
                            title: 'Button Link',
                            type: 'url',
                        },
                    ],
                },
            ],
        },
    ],
}
