export default {
  name: 'carBrand',
  title: 'Car Brand',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Priority for display (lower numbers show first)',
    },
  ],
};
