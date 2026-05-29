import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// GET — 조회수 읽기
export async function GET(request, { params }) {
  const { slug } = await params;
  const redis = getRedis();
  if (!redis) return NextResponse.json({ views: 0 });

  try {
    const views = (await redis.get(`views:${slug}`)) || 0;
    return NextResponse.json({ views: Number(views) });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}

// POST — 조회수 증가
export async function POST(request, { params }) {
  const { slug } = await params;
  const redis = getRedis();
  if (!redis) return NextResponse.json({ views: 0 });

  try {
    const views = await redis.incr(`views:${slug}`);
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
