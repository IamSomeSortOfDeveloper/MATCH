export default {
    name: 'faqBlock',
    title: 'FAQ Block',
    type: 'object',
    fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        {
            name: 'items',
            title: 'Questions',
            type: 'array',
            of: [
                {
                    name: 'faqItem',
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Question', type: 'string' },
                        { name: 'answer', title: 'Answer', type: 'text' },
                    ],
                },
            ],
        },
    ],
}
