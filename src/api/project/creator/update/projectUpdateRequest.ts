/** 프로젝트 제목과 본문 수정 요청 */
export interface ProjectUpdateRequest {
  /**
   * 프로젝트 제목
   * @example "프로젝트 제목 예시"
   */
  title: string;
  /**
   * 프로젝트 콘텐트 블럭 데이터
   * @example {"time":1717200000000,"blocks":[{"id":"b1","type":"header","data":{"text":"프로젝트 소개","level":2}},{"id":"b2","type":"paragraph","data":{"text":"친환경 소재로 만든 방수 미니멀 백팩입니다. 일상과 여행 모두에 완벽하게 어울립니다."}},{"id":"b3","type":"image","data":{"url":"https://crowdfund.com","caption":"백팩 착용 정면 사진"}}],"version":"2.28.2"}
   */
  contentBlocks: object;
}
