import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pixkit — Free Online Image Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0f1e',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '14px',
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#0a0f1e',
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#ffffff',
              letterSpacing: '-1px',
            }}
          >
            Pixkit
          </span>
        </div>
        <p
          style={{
            fontSize: '28px',
            color: '#f59e0b',
            margin: '0',
            fontWeight: '500',
          }}
        >
          Free Image Tools — Fast, Private, No Upload
        </p>
        <p
          style={{
            fontSize: '18px',
            color: '#94a3b8',
            marginTop: '16px',
          }}
        >
          pixkit.app
        </p>
      </div>
    ),
    { ...size }
  );
}
