// Cloudflare Workers 엔트리포인트 (정적 에셋 서빙 전용)
// 사용자 데이터 저장, 파일 업로드, 인증 API는 일체 포함하지 않음 (로컬 우선 원칙 준수)

export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 모든 요청을 Static Assets(PWA 빌드 결과물)로 전달
    return await env.ASSETS.fetch(request);
  },
};
