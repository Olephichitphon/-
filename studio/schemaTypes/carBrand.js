export default {
  name: 'carBrand',
  title: 'ยี่ห้อรถ',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'ชื่อยี่ห้อ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'โลโก้ยี่ห้อ',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'ลำดับการแสดงผล',
      type: 'number',
      description: 'ตัวเลขน้อยจะขึ้นก่อน (เช่น 1, 2, 3)',
    },
  ],
};
