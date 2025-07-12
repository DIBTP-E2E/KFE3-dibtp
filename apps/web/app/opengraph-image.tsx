import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'DDIP - 지역 기반 중고 물품 경매 플랫폼';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #fdf4e9 0%, #fadcba 100%)', // --color-orange-50 to --color-orange-100
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '40px',
          }}
        >
          {/* 로고 영역 */}
          <div
            style={{
              fontSize: '120px',
              fontWeight: '800',
              color: '#ee8e1f', // --color-orange-500
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            DDIP
          </div>

          {/* 제목 */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#1f1f1f', // --color-gray-100
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: '1.2',
              maxWidth: '800px',
            }}
          >
            DDIP(띱)
          </div>

          {/* 설명 */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: '400',
              color: '#656565', // --color-gray-70
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: '1.3',
              maxWidth: '700px',
            }}
          >
            띱! 먼저 가져가는 사람이 임자! 하향식 경매 시스템을 통해 중고 물품을 거래할 수 있는
            플랫폼
          </div>

          {/* 장식 요소 */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#ee8e1f', // --color-orange-500
                opacity: 0.8,
              }}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#f4b369', // --color-orange-300
                opacity: 0.6,
              }}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#f7cb98', // --color-orange-200
                opacity: 0.4,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
