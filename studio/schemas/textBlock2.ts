export default {
    name: 'textBlock2',
    title: 'Text Block 2 (Text + Image)',
    type: 'object',
    fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'seoText', title: 'Text/SEO Text', type: 'text' },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaUrl', title: 'CTA URL', type: 'url' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    ],
}
