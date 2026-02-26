export default {
    name: 'ctaBanner1',
    title: 'CTA Banner 1 (Hero)',
    type: 'object',
    fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'seoText', title: 'Text/SEO Text', type: 'text' },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Link', type: 'url' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    ],
}
