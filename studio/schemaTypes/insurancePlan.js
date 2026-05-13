export default {
  name: 'insurancePlan',
  title: 'แผนประกันภัย',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'ชื่อบริษัทประกัน',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'โลโก้บริษัท',
      type: 'image',
    },
    {
      name: 'planType',
      title: 'ประเภทประกัน (ชั้น)',
      type: 'string',
      options: {
        list: [
          { title: 'ชั้น 1', value: '1' },
          { title: 'ชั้น 2+', value: '2plus' },
          { title: 'ชั้น 3+', value: '3plus' },
          { title: 'ชั้น 3', value: '3' },
        ],
      },
    },
    {
      name: 'coverage',
      title: 'วงเงินคุ้มครอง (ทุนประกัน)',
      type: 'number',
    },
    {
      name: 'prices',
      title: 'ข้อมูลราคาและเงื่อนไขปีรถ',
      type: 'object',
      description: 'ระบุราคาและช่วงอายุรถที่รับประกัน',
      fields: [
        { name: 'g1', title: 'ราคา กลุ่ม 1 (รถหรู/Supercar)', type: 'number' },
        { name: 'g2', title: 'ราคา กลุ่ม 2 (รถใหญ่/ยุโรป)', type: 'number' },
        { name: 'g3', title: 'ราคา กลุ่ม 3 (เก๋งกลาง: Camry/Accord)', type: 'number' },
        { name: 'g4', title: 'ราคา กลุ่ม 4 (เก๋งเล็ก: Civic/Altis)', type: 'number' },
        { name: 'g5', title: 'ราคา กลุ่ม 5 (Eco Car: City/Vios/Yaris)', type: 'number' },
      ],
    },
    {
      name: 'features',
      title: 'จุดเด่น/รายละเอียดคุ้มครอง',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isFeatured',
      title: 'แสดงเป็นแผนแนะนำ (หน้าแรก)',
      type: 'boolean',
      initialValue: false,
    },

  ],
  preview: {
    select: {
      title: 'companyName',
      planType: 'planType',
      media: 'logo',
    },
    prepare(selection) {
      const { title, planType, media } = selection;
      const planTypes = {
        '1': 'ชั้น 1',
        '2plus': 'ชั้น 2+',
        '3plus': 'ชั้น 3+',
        '3': 'ชั้น 3',
      };
      const planName = planType ? planTypes[planType] : '';
      return {
        title: planName ? `${title} (${planName})` : title,
        media: media,
      };
    },
  },
};
