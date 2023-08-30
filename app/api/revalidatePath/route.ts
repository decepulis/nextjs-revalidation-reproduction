/* eslint-disable no-console */
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const revalidate = async (req: NextRequest) => {
  const query = new URL(req.url).searchParams;
  const path = query?.get('path');
  if (!path) {
    return NextResponse.json({ message: 'searchParam path is required' }, { status: 400 });
  }
  revalidateTag(path);
  return NextResponse.json({ revalidated: path, now: Date.now() });
};

export const GET = (request: NextRequest) => revalidate(request);
