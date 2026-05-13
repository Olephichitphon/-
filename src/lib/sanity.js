import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'l237md01', // Update this with your actual Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-13',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const getCarBrands = async () => {
  const query = `*[_type == "carBrand"] | order(order asc, name asc) {
    _id,
    name,
    logo
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
