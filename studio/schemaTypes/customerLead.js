export default {
  name: 'customerLead',
  title: 'Customer Lead',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'carDetails',
      title: 'Car Details',
      type: 'object',
      fields: [
        { name: 'brand', type: 'string' },
        { name: 'model', type: 'string' },
        { name: 'year', type: 'string' },
        { name: 'isCustom', type: 'boolean', title: 'Is Manual Input?' },
      ],
    },
    {
      name: 'insuranceType',
      title: 'Interested In',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    },
  ],
  readOnly: true,
};
