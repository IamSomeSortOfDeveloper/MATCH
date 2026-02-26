export default {
    name: 'textBlock3',
    title: 'Text Block 3 (Image + Text)',
    type: 'object',
    fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'seoText', title: 'Text/SEO Text', type: 'text' },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaUrl', title: 'CTA URL', type: 'url' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    ],
}
