export default {
  name: 'promotion',
  title: 'โปรโมชั่น (Promotions)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'ชื่อโปรโมชั่น / คำอธิบายแบบย่อ',
      type: 'string',
      description: 'ใช้สำหรับระบุชื่อหรือคำอธิบายแบบย่อเพื่อให้ง่ายต่อการจัดการ (จะไม่แสดงบนสไลด์รูปถ้าไม่ใช่ข้อความ)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'รูปภาพโปรโมชั่น',
      type: 'image',
      options: {
        hotspot: true, // อนุญาตให้ตั้งจุดโฟกัสรูปได้
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'ลำดับการจัดเรียง',
      type: 'number',
      description: 'เลขน้อยจะถูกจัดให้อยู่ลำดับแรกสุด เช่น 1, 2, 3',
      initialValue: 1,
    },
    {
      name: 'isActive',
      title: 'เปิดใช้งานโปรโมชั่นนี้',
      type: 'boolean',
      description: 'เปิดเพื่อแสดงรูปโปรโมชั่นนี้บนหน้าเว็บไซต์หลัก',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      isActive: 'isActive',
      order: 'order',
    },
    prepare(selection) {
      const { title, media, isActive, order } = selection;
      return {
        title: `[ลำดับ ${order || 0}] ${title}`,
        subtitle: isActive ? '🟢 กำลังเปิดใช้งาน' : '🔴 ปิดใช้งานชั่วคราว',
        media: media,
      };
    },
  },
};
