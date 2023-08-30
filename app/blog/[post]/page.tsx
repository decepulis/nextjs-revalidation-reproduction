import { notFound } from 'next/navigation';

import { PortableText } from '@portabletext/react';

import { client, overlayDrafts } from '@/_sanity/server';

import query, { BlogPostDocument, BlogPostSlugDocument, slugsQuery } from './query';

interface Params {
  post: string;
}

const getData = async (params: Params) => {
  // Did the user provide parameters? If not, 404
  if (!params?.post || typeof params?.post !== 'string') {
    console.warn('No params provided');
    notFound();
  }

  // Can we find the post? If not, 404
  const { post } = params;
  const results = await client.fetch<BlogPostDocument[]>(query, { slug: post }, { next: { tags: [`/blog/${post}`] } });
  console.log({ post, results });
  const data = overlayDrafts(results);
  const document = data?.[0];
  if (!document) {
    console.warn(`No document found for blog post with params ${JSON.stringify(params)}`);
    notFound();
  }

  return document;
};

export const revalidate = 604800; // revalidate this page every 604800 seconds

export const generateStaticParams = async () => {
  const allBlogPosts = await client.fetch<BlogPostSlugDocument[]>(slugsQuery);
  console.log({ allBlogPosts });

  return allBlogPosts.map((post) => ({
    params: { post: post.slug.current },
  }));
};

const BlogPost = async ({ params }: { params: Params }) => {
  const document = await getData(params);
  console.log({ document });
  return (
    <>
      <h1>{document.title}</h1>
      <PortableText value={document.body} />
    </>
  );
};
export default BlogPost;
