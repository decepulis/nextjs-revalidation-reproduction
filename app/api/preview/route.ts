import { draftMode } from 'next/headers';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
  draftMode().enable();
  const query = new URL(req.url).searchParams;
  return new Response(null, {
    status: 307,
    headers: {
      Location: `/${query.get('slug')}` ?? '/',
    },
  });
}
