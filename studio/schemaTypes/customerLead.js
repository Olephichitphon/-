export default {
  name: 'customerLead',
  title: 'ข้อมูลลูกค้า (Leads)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'ชื่อลูกค้า',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'เบอร์โทรศัพท์',
      type: 'string',
    },
    {
      name: 'carDetails',
      title: 'รายละเอียดรถ',
      type: 'object',
      fields: [
        { name: 'brand', title: 'ยี่ห้อ', type: 'string' },
        { name: 'model', title: 'รุ่น', type: 'string' },
        { name: 'year', title: 'ปีรถ', type: 'string' },
      ],
    },
    {
      name: 'insuranceType',
      title: 'ประเภทประกันที่สนใจ',
      type: 'string',
    },
    {
      name: 'status',
      title: 'สถานะการติดต่อ',
      type: 'string',
      initialValue: 'รอดำเนินการ',
      options: {
        list: [
          { title: 'รอดำเนินการ', value: 'pending' },
          { title: 'ติดต่อแล้ว', value: 'contacted' },
          { title: 'ปิดการขายแล้ว', value: 'closed' },
          { title: 'ยกเลิก', value: 'cancelled' },
        ],
      },
    },
  ],
};
