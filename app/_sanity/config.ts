import type { ClientConfig } from 'next-sanity';

const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  apiVersion: '2022-03-22',
  useCdn: false,
};

export default config;
