// import 'server-only'
// todo once pages is gone import 'server-only'
import { createClient } from 'next-sanity';
import { draftMode } from 'next/headers';

import type { SanityDocument } from '@sanity/client';

import config from './config';

export const client = createClient({
  ...config,
  token: process.env.SANITY_TOKEN,
});

export function overlayDrafts<T extends Record<string, any>>(
  docs: Array<SanityDocument<T>>,
  forcePreview?: boolean
): T[] {
  const { isEnabled } = draftMode();
  const preview = isEnabled || forcePreview;
  const overlayed = docs.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error('Ensure that `_id` is included in query projection');
    }

    const isDraft = doc._id.startsWith('drafts.');
    const id = isDraft ? doc._id.slice(7) : doc._id;
    if (preview) {
      if (isDraft) {
        // in preview mode, we always use a draft
        return map.set(id, doc);
      }
      // and use a published version only if we have to
      return !map.has(id) ? map.set(id, doc) : map;
    }
    // in standard mode, the inverse is true
    // we never use the draft
    return isDraft ? map : map.set(id, doc);
  }, new Map());

  return Array.from(overlayed.values()) as Array<SanityDocument<T>>;
}
