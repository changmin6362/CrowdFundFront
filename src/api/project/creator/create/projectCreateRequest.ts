/** 프로젝트 생성 요청 */
export interface ProjectCreateRequest {
  /**
   * 프로젝트 카테고리 ID
   * @format int32
   * @example 1
   */
  categoryId: number;
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title: string;
  /**
   * 프로젝트 본문 콘텐츠 블록 데이터 (JSON)
   * @example {"time":1717200000000,"blocks":[{"id":"b1","type":"header","data":{"text":"프로젝트 소개","level":2}},{"id":"b2","type":"paragraph","data":{"text":"친환경 소재로 만든 방수 미니멀 백팩입니다. 일상과 여행 모두에 완벽하게 어울립니다."}},{"id":"b3","type":"image","data":{"url":"https://crowdfund.com","caption":"백팩 착용 정면 사진"}}],"version":"2.28.2"}
   */
  contentBlocks: object;
  /**
   * 목표 금액
   * @example 1000000
   */
  goalAmount: number;
  /**
   * 프로젝트 종료일
   * @format date-time
   * @example "2024-01-01T00:00:00"
   */
  endAt: string;
}
