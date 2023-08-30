import { draftMode } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = (req: NextRequest) => {
  draftMode().disable();
  const query = new URL(req.url).searchParams;
  return new Response(null, {
    status: 307,
    headers: {
      Location: `/${query.get('slug')}` ?? '/',
    },
  });
};
