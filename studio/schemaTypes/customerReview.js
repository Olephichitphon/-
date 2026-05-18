export default {
  name: 'customerReview',
  title: 'รีวิวการโอนเงิน (Reviews)',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'วันที่ (เช่น 18 พ.ค. 2569)',
      type: 'string',
      placeholder: 'เช่น 18 พ.ค. 2569 หรือ วันนี้',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'comment',
      title: 'ข้อความ / ความคิดเห็น',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slips',
      title: 'หลักฐานการโอนสลิป (ใส่ได้ 1-2 รูป)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(2),
    },
  ],
  preview: {
    select: {
      title: 'comment',
      subtitle: 'date',
      media: 'slips.0',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title ? (title.length > 50 ? `${title.slice(0, 50)}...` : title) : 'ไม่มีข้อความ',
        subtitle: subtitle || '',
        media: media,
      };
    },
  },
};
