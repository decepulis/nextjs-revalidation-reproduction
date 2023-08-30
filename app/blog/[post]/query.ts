import { groq } from 'next-sanity';

import type { PortableTextBlock } from '@portabletext/types';
import { SanityDocument } from '@sanity/client';

export const slugsQuery = groq`*[_type == "testPostPleaseIgnore" && defined(slug.current) && !(_id in path('drafts.**'))] {
  _id,
  slug {
    current
  }
}`;
interface BlogPostSlug {
  _id: string;
  slug: { current: string };
}
export interface BlogPostSlugDocument extends SanityDocument<BlogPostSlug> {}

export default groq`*[_type == "testPostPleaseIgnore" && slug.current == $slug && defined(slug.current)] {
  _id,
  title,
  slug {
    current
  },
  body
}`;

interface BlogPost {
  title: string;
  slug?: { current: string };
  body: PortableTextBlock[];
}
export interface BlogPostDocument extends SanityDocument<BlogPost> {}
