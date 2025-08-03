/**
 * 성능 측정 자동화: API 헬스체크 엔드포인트
 *
 * 이슈 #255 - API 헬스체크 엔드포인트 추가
 *
 * 목적:
 * - GitHub Actions에서 서버 시작 확인
 * - Lighthouse CI 실행 전 서버 상태 검증
 * - 기본적인 서버 동작 상태 모니터링
 * - **프로덕션 Supabase DB 연결 상태 확인 추가**
 *
 * 사용법:
 * - GET /api/health
 * - GitHub Actions 워크플로우에서 서버 준비 상태 확인
 *
 * 응답 예시:
 * {
 *   "status": "healthy",
 *   "timestamp": "2024-01-01T00:00:00.000Z",
 *   "uptime": 123.456,
 *   "environment": "production",
 *   "database": "connected"
 * }
 */

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  // Prisma 클라이언트 초기화
  const prisma = new PrismaClient();

  try {
    // 기본 서버 상태 정보 수집
    const healthStatus: any = {
      status: 'healthy', // 서버 상태
      timestamp: new Date().toISOString(), // 현재 시간
      uptime: process.uptime(), // 서버 가동 시간 (초)
      environment: process.env.NODE_ENV, // 실행 환경
    };

    // 프로덕션 Supabase DB 연결 상태 확인
    try {
      // 간단한 쿼리로 DB 연결 테스트
      await prisma.$queryRaw`SELECT 1`;
      healthStatus.database = 'connected';
      console.log('✅ Database connection: healthy');
    } catch (dbError) {
      // DB 연결 실패 시 상태 업데이트
      healthStatus.database = 'disconnected';
      healthStatus.status = 'degraded';
      console.error('❌ Database connection failed:', dbError);

      // DB 연결 에러 정보도 포함
      if (dbError instanceof Error) {
        healthStatus.databaseError = dbError.message;
      }
    }

    // 성공 응답 반환 (캐시 비활성화로 실시간 상태 확인)
    return NextResponse.json(healthStatus, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // 캐시 비활성화
        Pragma: 'no-cache', // HTTP/1.0 호환성
        Expires: '0', // 즉시 만료
      },
    });
  } catch (error) {
    // 에러 발생 시 로그 기록 및 unhealthy 상태 응답
    console.error('❌ Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy', // 비정상 상태 표시
        timestamp: new Date().toISOString(), // 에러 발생 시간
        database: 'unknown', // DB 상태 불명
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 } // HTTP 500 Internal Server Error
    );
  } finally {
    // Prisma 클라이언트 연결 해제 (메모리 누수 방지)
    await prisma.$disconnect();
  }
}
