import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const token = import.meta.env.VITE_SANITY_WRITE_TOKEN;

// Client สำหรับดึงข้อมูลทั่วไป (Public Read)
export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // เปลี่ยนเป็น false เพื่อให้ได้ข้อมูลล่าสุดทันที
  apiVersion: '2024-03-13',
});

// Client สำหรับบันทึกข้อมูล (Authenticated Write)
export const writeClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-03-13',
  token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const getCarBrands = async () => {
  const query = `*[_type == "carBrand"] | order(order asc, name asc) {
    _id,
    name,
    "logoUrl": logo.asset->url
  }`;
  return await client.fetch(query);
};

export const getCarModels = async (brandId) => {
  const query = `*[_type == "carModel" && brand._ref == $brandId] | order(name asc) {
    _id,
    name,
    group
  }`;
  return await client.fetch(query, { brandId });
};

export const getFeaturedPlans = async () => {
  const query = `*[_type == "insurancePlan" && isFeatured == true] {
    _id,
    companyName,
    logo,
    planType,
    coverage,
    premium,
    features
  }`;
  return await client.fetch(query);
};

export const getPlansByType = async (planType, carGroup) => {
  const groupKey = `g${carGroup}`;

  const query = `*[_type == "insurancePlan" && planType == $planType] {
      _id,
      companyName,
      "logo": logo.asset->url,
      planType,
      coverage,
      features,
      "premium": prices[$groupKey]
    }[defined(premium)]`;
  
  return await client.fetch(query, { planType, groupKey });
};
