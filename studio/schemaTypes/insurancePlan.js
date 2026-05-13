export default {
  name: 'insurancePlan',
  title: 'Insurance Plan',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
    },
    {
      name: 'planType',
      title: 'Plan Type',
      type: 'string',
      options: {
        list: [
          { title: 'Class 1', value: '1' },
          { title: 'Class 2+', value: '2plus' },
          { title: 'Class 3+', value: '3plus' },
          { title: 'Class 3', value: '3' },
        ],
      },
    },
    {
      name: 'coverage',
      title: 'Coverage (Sum Insured)',
      type: 'number',
    },
    {
      name: 'premium',
      title: 'Premium (Price)',
      type: 'number',
    },
    {
      name: 'features',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isFeatured',
      title: 'Is Featured?',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
