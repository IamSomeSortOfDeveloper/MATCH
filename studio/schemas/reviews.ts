export default {
    name: 'reviews',
    title: 'Reviews Slider',
    type: 'object',
    fields: [
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
        },
        {
            name: 'reviewsList',
            title: 'Reviews',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'author',
                            title: 'Author',
                            type: 'string',
                        },
                        {
                            name: 'reviewText',
                            title: 'Review Text',
                            type: 'text',
                        },
                        {
                            name: 'rating',
                            title: 'Rating',
                            type: 'number',
                            validation: (Rule: any) => Rule.min(1).max(5),
                        },
                        {
                            name: 'avatar',
                            title: 'Avatar',
                            type: 'image',
                        },
                    ],
                },
            ],
        },
    ],
}
