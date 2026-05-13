export default {
  name: 'carModel',
  title: 'Car Model',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Model Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'carBrand' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'group',
      title: 'Car Group',
      type: 'string',
      options: {
        list: [
          { title: 'Group 1', value: '1' },
          { title: 'Group 2', value: '2' },
          { title: 'Group 3', value: '3' },
          { title: 'Group 4', value: '4' },
          { title: 'Group 5', value: '5' },
        ],
      },
      description: 'Used for premium calculation logic',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
    },
  },
};
