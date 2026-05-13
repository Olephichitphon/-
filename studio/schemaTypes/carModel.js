export default {
  name: 'carModel',
  title: 'รุ่นรถ',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'ชื่อรุ่น',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'ยี่ห้อรถ',
      type: 'reference',
      to: [{ type: 'carBrand' }],
    },
    {
      name: 'group',
      title: 'กลุ่มรถ (1-5)',
      type: 'string',
      options: {
        list: [
          { title: 'กลุ่ม 1: รถหรู / Supercar / นำเข้า', value: '1' },
          { title: 'กลุ่ม 2: รถยุโรป / รถขนาดใหญ่', value: '2' },
          { title: 'กลุ่ม 3: รถเก๋งขนาดกลาง (Camry/Accord)', value: '3' },
          { title: 'กลุ่ม 4: รถเก๋งขนาดเล็ก (Civic/Altis)', value: '4' },
          { title: 'กลุ่ม 5: รถ Eco Car / รถเล็ก (City/Vios/Yaris)', value: '5' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
    },
  },
};
