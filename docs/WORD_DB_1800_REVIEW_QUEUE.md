# 보카 스터디 — 1,800어 통합 검토 큐 (REVIEW_QUEUE)

## 0. 검토 가이드라인 및 상태 정의

- **검토 목적**: 1,800개 DB 중 사람이 집중적으로 품질을 검수해야 할 **실질 검토 대상 1007개 어휘**의 우선순위별 전수 목록입니다.
- **현재 판정**:
  - 자동 기술 검증: **PASS**
  - 의미 품질 사람 검토: **PENDING (검토 대기)**
  - 1,800 Release Ready: **NO (출시 동결)**
- **검토 상태 코드**:
  - `[ ] 미검토 (UNREVIEWED)`: 아직 사람이 확인하지 않음 (기본값)
  - `[V] 정상 (PASS)`: 표제어, 품사, 대표뜻, 퀴즈 출제 모두 적합
  - `[!] 수정 필요 (NEEDS_CORRECTION)`: 뜻 띄어쓰기, 난이도 조정, 유의어 보완 필요
  - `[X] 제외 권고 (EXCLUDE_RECOMMENDED)`: 실서비스 출제 부적합 단어로 대체 후보 교체 필요

---

## 1. 우선순위별 검토 요약표

| 우선순위 그룹 | 대상 건수 | 주요 속성 |
| :--- | :--- | :--- |
| **1. B등급 어휘 (Priority 1)** | 168개 | 상대적 고난도 어휘, 문맥 의존성 단어 |
| **2. 구동사 (Priority 2)** | 128개 | 동사+전치사 결합 의미, 직역 오류 검토 |
| **3. 비즈니스 표현 (Priority 3)** | 100개 | 숙어적 맥락, 2단어 이상 공백 포함 표현 |
| **4. 복합 다의어군 (Priority 4)** | 391개 | 추가 뜻(subMeanings) 2개 이상 보유 단어 |
| **5. 의미 충돌 관계 단어 (Priority 5)**| 131개 | 정답 시비 방지 사전 등록 단어 |
| **6. A등급 층화 표본 (Priority 6)** | 89개 | 시드 `QA1800-202609` 기반 품사·난이도 균등 표본 |
| **총 실질 검토 대상** | **1007개** | **중복 제거 완료된 고유 검토 대상** |

---

## 2. 통합 검토 큐 전수 목록 (총 1007개)

| 번호 | 표제어 (Word) | 품사 | 대표 뜻 | 추가 뜻 | 난이도 | 등급 | 우선순위 그룹 | 공식근거 | 검토상태 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **executive** | `noun` | 임원 | 경영진, 간부 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 2 | **department** | `noun` | 부서 | 부처, 학과 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 3 | **policy** | `noun` | 규정 | 방침, 정책 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 4 | **supervise** | `verb` | 감독하다 | 지도하다, 통솔하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 5 | **delegate** | `verb` | 위임하다 | 맡기다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 6 | **implement** | `verb` | 실행하다 | 이행하다, 실시하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 7 | **notify** | `verb` | 통보하다 | 알리다, 통지하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 8 | **efficient** | `adjective` | 효율적인 | 능률적인 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 9 | **promptly** | `adverb` | 신속하게 | 즉시, 지체없이 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 10 | **submit** | `verb` | 제출하다 | 내다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 11 | **mandatory** | `adjective` | 의무적인 | 강제적인 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 12 | **applicant** | `noun` | 지원자 | 신청자 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 13 | **candidate** | `noun` | 후보자 | 응시자 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 14 | **eligible** | `adjective` | 적격의 | 자격이있는 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 15 | **probation** | `noun` | 수습기간 | 시험기간 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 16 | **headcount** | `noun` | 인원수 | 총인원 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 17 | **postpone** | `verb` | 연기하다 | 미루다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 18 | **attend** | `verb` | 참석하다 | 출석하다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 19 | **adjourn** | `verb` | 휴회하다 | 중단하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 20 | **tentative** | `adjective` | 잠정적인 | 임시의 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 21 | **unanimously** | `adverb` | 만장일치로 | - | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 22 | **session** | `noun` | 기간 | 회기, 수업 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 23 | **revenue** | `noun` | 수익 | 세입 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 24 | **budget** | `noun` | 예산 | 경비예정액 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 25 | **expense** | `noun` | 비용 | 지출 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 26 | **reimburse** | `verb` | 상환하다 | 배상하다, 환급하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 27 | **audit** | `verb` | 감사하다 | 회계감사를하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 28 | **dividend** | `noun` | 배당금 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 29 | **balance** | `noun` | 잔액 | 잔고, 균형 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 30 | **deduct** | `verb` | 공제하다 | 차감하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 31 | **campaign** | `noun` | 캠페인 | 판촉활동 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 32 | **expand** | `verb` | 확장하다 | 확대하다, 넓히다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 33 | **demographic** | `noun` | 인구집단 | 고객층 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 34 | **purchase** | `verb` | 구매하다 | 구입하다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 35 | **invoice** | `noun` | 청구서 | 송장 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 36 | **acquire** | `verb` | 획득하다 | 습득하다, 매입하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 37 | **procure** | `verb` | 조달하다 | 구입하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 38 | **requisition** | `noun` | 요청서 | 신청서 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 39 | **carrier** | `noun` | 운송회사 | 운반인 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 40 | **in_transit** | `adverb` | 수송중에 | 운송도중에 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 41 | **transfer** | `verb` | 환승하다 | 이동하다, 전근가다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 42 | **itinerary** | `noun` | 여행일정표 | 여정 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 43 | **banquet** | `noun` | 연회 | 만찬 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 44 | **reserve** | `verb` | 예약하다 | 잡아두다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 45 | **complimentary** | `adjective` | 무료의 | 칭찬의 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 46 | **impeccably** | `adverb` | 흠잡을데없이 | 완벽하게 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 47 | **hospitality** | `noun` | 환대 | 접대 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 48 | **delicacy** | `noun` | 별미 | 진미 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 49 | **premises** | `noun` | 구내 | 부지, 건물구역 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 50 | **renovate** | `verb` | 개조하다 | 보수하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 51 | **complaint** | `noun` | 불만 | 항의 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 52 | **resolve** | `verb` | 해결하다 | 풀다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 53 | **feedback** | `noun` | 의견 | 반응, 피드백 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 54 | **helpline** | `noun` | 상담전화 | 고객상담선 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 55 | **manufacture** | `verb` | 제조하다 | 생산하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 56 | **inspect** | `verb` | 점검하다 | 검사하다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 57 | **halt** | `verb` | 중단시키다 | 멈추다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 58 | **specimen** | `noun` | 표본 | 견본 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 59 | **malfunction** | `noun` | 오작동 | 고장 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 60 | **upgrade** | `verb` | 개선하다 | 승급시키다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 61 | **configuration** | `noun` | 환경설정 | 배치 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 62 | **workshop** | `noun` | 연수회 | 워크숍 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 63 | **conference** | `noun` | 학회 | 협의회, 총회 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 64 | **informative** | `adjective` | 유익한 | 정보를주는 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 65 | **intensive** | `adjective` | 집중적인 | 강도높은 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 66 | **confirm** | `verb` | 확인하다 | 확정하다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 67 | **negotiate** | `verb` | 협상하다 | 절충하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 68 | **convenient** | `adjective` | 편리한 | 가까운 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 69 | **diligent** | `adjective` | 성실한 | 근면한 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 70 | **familiar** | `adjective` | 익숙한 | 친숙한 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 71 | **identify** | `verb` | 식별하다 | 확인하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 72 | **associate** | `verb` | 관련시키다 | 연상하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 73 | **condition** | `noun` | 상태 | 조건 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 74 | **employment** | `noun` | 고용 | 취업 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 75 | **lack** | `noun` | 부족 | 결핍 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 76 | **consistently** | `adverb` | 지속적으로 | 일관되게 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 77 | **crucial** | `adjective` | 결정적인 | 중대한 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 78 | **terminate** | `verb` | 종결시키다 | 끝내다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 79 | **achieve** | `verb` | 달성하다 | 성취하다, 이루다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 80 | **warranty** | `noun` | 품질보증서 | 보증기간 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 81 | **terminal** | `noun` | 종착역 | 터미널 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 82 | **accept** | `verb` | 수락하다 | 받아들이다, 동의하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 83 | **acknowledge** | `verb` | 인정하다 | 확인하다, 수령을 통지하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 84 | **address** | `verb` | 다루다 | 고심하다, 연설하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 85 | **adjust** | `verb` | 조정하다 | 조절하다, 적응하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 86 | **admire** | `verb` | 칭찬하다 | 감탄하다, 존경하다 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 87 | **allocate** | `verb` | 배분하다 | 할당하다, 책정하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 88 | **announce** | `verb` | 발표하다 | 알리다, 공고하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 89 | **anticipate** | `verb` | 예상하다 | 기대하다, 고대하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 90 | **appreciate** | `verb` | 감사하다 | 고마워하다, 진가를 인정하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 91 | **approve** | `verb` | 승인하다 | 허가하다, 찬성하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 92 | **arrange** | `verb` | 준비하다 | 정리하다, 배열하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 93 | **assess** | `verb` | 평가하다 | 산정하다, 가늠하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 94 | **assign** | `verb` | 배정하다 | 맡기다, 할당하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 95 | **authorize** | `verb` | 인가하다 | 권한을 주다, 승인하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 96 | **collaborate** | `verb` | 협력하다 | 공동작업하다, 협동하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 97 | **compensate** | `verb` | 보상하다 | 배상하다, 보충하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 98 | **compile** | `verb` | 수집하다 | 편집하다, 자료를 모으다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 99 | **comply** | `verb` | 준수하다 | 따르다, 응하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 100 | **compose** | `verb` | 구성하다 | 작성하다, 작곡하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 101 | **conclude** | `verb` | 결론짓다 | 끝내다, 체결하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 102 | **conduct** | `verb` | 수행하다 | 실시하다, 지휘하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 103 | **conserve** | `verb` | 보존하다 | 절약하다, 아끼다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 104 | **consolidate** | `verb` | 통합하다 | 강화하다, 합병하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 105 | **contribute** | `verb` | 기여하다 | 공헌하다, 기고하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 106 | **coordinate** | `verb` | 조율하다 | 조정하다, 협력시키다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 107 | **customize** | `verb` | 맞춤제작하다 | 주문생산하다, 개별화하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 108 | **decline** | `verb` | 거절하다 | 감소하다, 하락하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 109 | **demonstrate** | `verb` | 시연하다 | 입증하다, 설명하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 110 | **designate** | `verb` | 지정하다 | 지명하다, 가리키다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 111 | **discard** | `verb` | 폐기하다 | 버리다, 처분하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 112 | **disclose** | `verb` | 공개하다 | 밝히다, 누설하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 113 | **discourage** | `verb` | 단념시키다 | 만류하다, 낙담시키다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 114 | **dismiss** | `verb` | 해고하다 | 기각하다, 해산시키다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 115 | **distribute** | `verb` | 배포하다 | 유통하다, 나누어주다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 116 | **duplicate** | `verb` | 복제하다 | 복사하다, 되풀이하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 117 | **emphasize** | `verb` | 강조하다 | 중시하다, 역설하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 118 | **encourage** | `verb` | 격려하다 | 장려하다, 권장하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 119 | **endorse** | `verb` | 지지하다 | 보증하다, 배서하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 120 | **enhance** | `verb` | 향상시키다 | 높이다, 강화하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 121 | **evaluate** | `verb` | 평가하다 | 감정하다, 성적을 매기다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 122 | **examine** | `verb` | 조사하다 | 검토하다, 진찰하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 123 | **exceed** | `verb` | 초과하다 | 넘어서다, 능가하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 124 | **execute** | `verb` | 실행하다 | 처형하다, 집행하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 125 | **expire** | `verb` | 만료되다 | 끝나다, 숨을 거두다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 126 | **facilitate** | `verb` | 촉진하다 | 용이하게하다, 돕다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 127 | **finalize** | `verb` | 마무리하다 | 완결하다, 매듭짓다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 128 | **generate** | `verb` | 창출하다 | 발생시키다, 생산하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 129 | **handle** | `verb` | 처리하다 | 다루다, 손으로만지다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 130 | **highlight** | `verb` | 강조하다 | 눈에띄게하다, 형광펜을칠하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 131 | **illustrate** | `verb` | 설명하다 | 예시하다, 삽화를넣다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 132 | **inaugurate** | `verb` | 취임시키다 | 개관하다, 시작하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 133 | **incorporate** | `verb` | 포함하다 | 통합하다, 법인화하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 134 | **indicate** | `verb` | 나타내다 | 가리키다, 표시하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 135 | **influence** | `verb` | 영향을 미치다 | 좌우하다, 감화하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 136 | **initiate** | `verb` | 시작하다 | 착수하다, 개시하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 137 | **introduce** | `verb` | 도입하다 | 소개하다, 선보이다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 138 | **investigate** | `verb` | 조사하다 | 수사하다, 살피다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 139 | **launch** | `verb` | 출시하다 | 시작하다, 발사하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 140 | **maintain** | `verb` | 유지하다 | 관리하다, 주장하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 141 | **manage** | `verb` | 관리하다 | 경영하다, 용케해내다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 142 | **modify** | `verb` | 수정하다 | 바꾸다, 수식하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 143 | **monitor** | `verb` | 감시하다 | 점검하다, 관찰하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 144 | **motivate** | `verb` | 동기를 부여하다 | 자극하다, 격려하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 145 | **obtain** | `verb` | 획득하다 | 얻다, 취득하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 146 | **operate** | `verb` | 운영하다 | 작동하다, 수술하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 147 | **organize** | `verb` | 정리하다 | 조직하다, 준비하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 148 | **outline** | `verb` | 개요를 서술하다 | 약술하다, 윤곽을그리다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 149 | **overlook** | `verb` | 간과하다 | 내려다보다, 눈감아주다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 150 | **participate** | `verb` | 참가하다 | 참여하다, 함께하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 151 | **perform** | `verb` | 수행하다 | 공연하다, 작동하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 152 | **persist** | `verb` | 지속하다 | 고집하다, 잔존하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 153 | **predict** | `verb` | 예측하다 | 예견하다, 전망하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 154 | **preserve** | `verb` | 보존하다 | 보호하다, 유지하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 155 | **prioritize** | `verb` | 우선순위를 매기다 | 우선하다, 중요시하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 156 | **proceed** | `verb` | 진행하다 | 나아가다, 계속하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 157 | **process** | `verb` | 가공하다 | 처리하다, 수속하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 158 | **prohibit** | `verb` | 금지하다 | 방해하다, 못하게하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 159 | **propose** | `verb` | 제안하다 | 제의하다, 청혼하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 160 | **provide** | `verb` | 제공하다 | 공급하다, 규정하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 161 | **publish** | `verb` | 출판하다 | 게재하다, 발표하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 162 | **recommend** | `verb` | 추천하다 | 권고하다, 권하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 163 | **recover** | `verb` | 회복하다 | 되찾다, 만회하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 164 | **reduce** | `verb` | 줄이다 | 감소시키다, 낮추다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 165 | **register** | `verb` | 등록하다 | 기록하다, 신청하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 166 | **release** | `verb` | 공개하다 | 출시하다, 해제하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 167 | **remind** | `verb` | 상기시키다 | 일깨우다, 알려주다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 168 | **renew** | `verb` | 갱신하다 | 재개하다, 연장하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 169 | **replace** | `verb` | 교체하다 | 대체하다, 대신하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 170 | **require** | `verb` | 요구하다 | 필요로하다, 명하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 171 | **retain** | `verb` | 유지하다 | 보유하다, 기억하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 172 | **review** | `verb` | 검토하다 | 복습하다, 비평하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 173 | **revise** | `verb` | 개정하다 | 수정하다, 고치다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 174 | **solicit** | `verb` | 요청하다 | 간청하다, 구하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 175 | **specify** | `verb` | 명시하다 | 자세히말하다, 구체화하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 176 | **utilize** | `verb` | 활용하다 | 이용하다, 쓰다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 177 | **accurate** | `adjective` | 정확한 | 정밀한, 오류가 없는 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 178 | **adequate** | `adjective` | 적절한 | 충분한, 알맞은 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 179 | **apparent** | `adjective` | 명백한 | 분명한, 외견상의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 180 | **applicable** | `adjective` | 적용 가능한 | 해당되는, 타당한 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 181 | **appreciative** | `adjective` | 감사하는 | 고마워하는, 진가를 아는 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 182 | **appropriate** | `adjective` | 적합한 | 알맞은, 타당한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 183 | **attentive** | `adjective` | 주의 깊은 | 세심한, 경청하는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 184 | **beneficial** | `adjective` | 유익한 | 이로운, 도움이 되는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 185 | **brief** | `adjective` | 간결한 | 잠깐의, 짧은 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 186 | **broad** | `adjective` | 광범위한 | 넓은, 일반적인 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 187 | **cautious** | `adjective` | 신중한 | 조심스러운, 주의하는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 188 | **comprehensive** | `adjective` | 포괄적인 | 종합적인, 이해력이 넓은 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 189 | **considerable** | `adjective` | 상당한 | 적지 않은, 중요한 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 190 | **consistent** | `adjective` | 일관된 | 한결같은, 모순이 없는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 191 | **constructive** | `adjective` | 건설적인 | 발전적인, 도움이 되는 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 192 | **critical** | `adjective` | 중대한 | 비판적인, 결정적인 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 193 | **decisive** | `adjective` | 결정적인 | 단호한, 결단력 있는 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 194 | **dedicated** | `adjective` | 헌신적인 | 전념하는, 전용의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 195 | **dependable** | `adjective` | 신뢰할 수 있는 | 믿음직한, 확실한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 196 | **desirable** | `adjective` | 바람직한 | 호감가는, 가치있는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 197 | **detailed** | `adjective` | 상세한 | 자세한, 세부적인 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 198 | **distinct** | `adjective` | 뚜렷한 | 별개의, 확연한 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 199 | **dramatic** | `adjective` | 극적인 | 급격한, 감동적인 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 200 | **durable** | `adjective` | 내구성 있는 | 튼튼한, 오래가는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 201 | **eager** | `adjective` | 열의를 보이는 | 열망하는, 간절한 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 202 | **economical** | `adjective` | 경제적인 | 절약하는, 알뜰한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 203 | **enthusiastic** | `adjective` | 열정적인 | 열심인, 열렬한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 204 | **exceptional** | `adjective` | 뛰어난 | 예외적인, 탁월한 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 205 | **exemplary** | `adjective` | 모범적인 | 전형적인, 본보기가 되는 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 206 | **extensive** | `adjective` | 광범위한 | 대규모의, 넓은 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 207 | **feasible** | `adjective` | 실현 가능한 | 그럴듯한, 실행성 있는 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 208 | **flexible** | `adjective` | 유연한 | 융통성 있는, 적응성 있는 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 209 | **frequent** | `adjective` | 빈번한 | 자주 일어나는, 단골의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 210 | **generous** | `adjective` | 관대한 | 후한, 넉넉한 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 211 | **gradual** | `adjective` | 점진적인 | 서서히 일어나는, 완만한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 212 | **helpful** | `adjective` | 유용한 | 도움이 되는, 친절한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 213 | **identical** | `adjective` | 동일한 | 일치하는, 똑같은 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 214 | **immediate** | `adjective` | 즉각적인 | 당면한, 직접적인 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 215 | **impressive** | `adjective` | 인상적인 | 감명 깊은, 대단한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 216 | **incredible** | `adjective` | 놀라운 | 믿기 힘든, 엄청난 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 217 | **inevitable** | `adjective` | 불가피한 | 피할 수 없는, 필연적인 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 218 | **influential** | `adjective` | 영향력 있는 | 유력한, 세력 있는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 219 | **initial** | `adjective` | 초기의 | 처음의, 머리글자의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 220 | **integral** | `adjective` | 필수적인 | 완전한, 내장된 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 221 | **leading** | `adjective` | 선도적인 | 주요한, 앞서가는 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 222 | **legitimate** | `adjective` | 정당한 | 적법한, 합법적인 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 223 | **loyal** | `adjective` | 충실한 | 충성스러운, 단골의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 224 | **modest** | `adjective` | 겸손한 | 적당한, 크지 않은 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 225 | **notable** | `adjective` | 주목할 만한 | 눈에 띄는, 유명한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 226 | **numerous** | `adjective` | 수많은 | 다수의, 무수한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 227 | **objective** | `adjective` | 객관적인 | 공정한, 사심 없는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 228 | **optimistic** | `adjective` | 낙관적인 | 희망찬, 긍정적인 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 229 | **outstanding** | `adjective` | 우수한 | 미결제된, 눈에 띄는 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 230 | **partial** | `adjective` | 부분적인 | 불완전한, 편파적인 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 231 | **permanent** | `adjective` | 영구적인 | 불변의, 상설의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 232 | **persistent** | `adjective` | 지속적인 | 끈질긴, 고집하는 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 233 | **pleasant** | `adjective` | 즐거운 | 기분 좋은, 상냥한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 234 | **popular** | `adjective` | 인기 있는 | 대중적인, 유행하는 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 235 | **preliminary** | `adjective` | 예비의 | 준비의, 서두의 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 236 | **primary** | `adjective` | 주요한 | 기본적인, 제1의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 237 | **productive** | `adjective` | 생산적인 | 결실 있는, 다작의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 238 | **prompt** | `adjective` | 신속한 | 즉각적인, 기민한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 239 | **prosperous** | `adjective` | 번영하는 | 번창하는, 성공한 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 240 | **redundant** | `adjective` | 불필요한 | 중복된, 정리해고된 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 241 | **relevant** | `adjective` | 관련된 | 적절한, 타당한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 242 | **reliable** | `adjective` | 신뢰성 있는 | 믿을 만한, 확실한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 243 | **reluctant** | `adjective` | 꺼리는 | 마지못해 하는, 주저하는 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 244 | **remarkable** | `adjective` | 주목할 만한 | 놀라운, 현저한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 245 | **remote** | `adjective` | 원격의 | 외딴, 희박한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 246 | **representative** | `adjective` | 대표적인 | 표시하는, 전형적인 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 247 | **resistant** | `adjective` | 저항력 있는 | 견디는, 방지의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 248 | **respective** | `adjective` | 각자의 | 각각의, 저마다의 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 249 | **secure** | `adjective` | 안전한 | 확보된, 안심하는 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 250 | **significant** | `adjective` | 중요한 | 상당한, 의미심장한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 251 | **stable** | `adjective` | 안정된 | 차분한, 견고한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 252 | **strict** | `adjective` | 엄격한 | 엄한, 정확한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 253 | **substantial** | `adjective` | 상당한 | 실질적인, 견고한 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 254 | **sufficient** | `adjective` | 충분한 | 역량 있는, 넉넉한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 255 | **suitable** | `adjective` | 적합한 | 알맞은, 어울리는 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 256 | **temporary** | `adjective` | 임시의 | 일시적인, 과도기의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 257 | **unanimous** | `adjective` | 만장일치의 | 전원일치의, 합의된 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 258 | **unconditional** | `adjective` | 무조건적인 | 절대적인, 무제한의 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 259 | **urgent** | `adjective` | 긴급한 | 시급한, 다급한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 260 | **valuable** | `adjective` | 귀중한 | 값비싼, 유익한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 261 | **versatile** | `adjective` | 다재다능한 | 다용도의, 변하기 쉬운 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 262 | **adequately** | `adverb` | 적절하게 | 충분히 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 263 | **adversely** | `adverb` | 불리하게 | 역으로 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 264 | **closely** | `adverb` | 밀접하게 | 면밀히, 가까이 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 265 | **collectively** | `adverb` | 집단으로 | 다 함께, 총괄하여 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 266 | **constantly** | `adverb` | 끊임없이 | 지속적으로 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 267 | **currently** | `adverb` | 현재 | 지금은 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 268 | **decisively** | `adverb` | 결정적으로 | 단호하게 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 269 | **definitely** | `adverb` | 분명히 | 확실히 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 270 | **deliberately** | `adverb` | 의도적으로 | 신중하게 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 271 | **efficiently** | `adverb` | 효율적으로 | 능률적으로 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 272 | **exceptionally** | `adverb` | 예외적으로 | 각별히, 대단히 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 273 | **exclusively** | `adverb` | 독점적으로 | 오로지, 배타적으로 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 274 | **fairly** | `adverb` | 상당히 | 공정하게, 꽤 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 275 | **formally** | `adverb` | 공식적으로 | 정식으로 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 276 | **frequently** | `adverb` | 자주 | 빈번하게 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 277 | **gradually** | `adverb` | 점차적으로 | 차츰, 서서히 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 278 | **heavily** | `adverb` | 대폭 | 심하게, 무겁게 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 279 | **inadvertently** | `adverb` | 부주의로 | 무심코, 우연히 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 280 | **initially** | `adverb` | 처음에 | 시초에, 당초에 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 281 | **intensely** | `adverb` | 강렬하게 | 열렬히 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 282 | **moderately** | `adverb` | 적당히 | 알맞게, 온건하게 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 283 | **mutually** | `adverb` | 상호간에 | 서로, 공동으로 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 284 | **officially** | `adverb` | 공식적으로 | 공인되어 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 285 | **predominantly** | `adverb` | 주로 | 대부분 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 286 | **previously** | `adverb` | 이전에 | 미리 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 287 | **primarily** | `adverb` | 주로 | 본래, 첫째로 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 288 | **rapidly** | `adverb` | 빠르게 | 급속히 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 289 | **readily** | `adverb` | 손쉽게 | 기꺼이, 즉시 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 290 | **scarcely** | `adverb` | 거의 ~않다 | 겨우, 간신히 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 291 | **strictly** | `adverb` | 엄격히 | 순전히 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 292 | **unexpectedly** | `adverb` | 뜻밖에 | 갑작스럽게 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 293 | **agreement** | `noun` | 합의 | 계약, 일치 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 294 | **allowance** | `noun` | 수당 | 허용량, 용돈 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 295 | **alternative** | `noun` | 대안 | 양자택일, 선택지 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 296 | **amendment** | `noun` | 수정안 | 개정, 수정 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 297 | **announcement** | `noun` | 발표 | 공고, 안내방송 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 298 | **appliance** | `noun` | 가전제품 | 기기, 적용 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 299 | **appraisal** | `noun` | 평가 | 감정, 사정 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 300 | **approach** | `noun` | 접근법 | 접근, 가까워짐 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 301 | **arrangement** | `noun` | 준비 | 배열, 합의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 302 | **asset** | `noun` | 자산 | 재산, 이점 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 303 | **assignment** | `noun` | 과제 | 임무, 배정 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 304 | **attendance** | `noun` | 참석 | 출석, 참석자 수 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 305 | **auditor** | `noun` | 감사인 | 회계감사관, 청강생 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 306 | **authorization** | `noun` | 인가 | 권한 부여, 공식 승인 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 307 | **brochure** | `noun` | 안내 책자 | 팸플릿, 소책자 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 308 | **catalyst** | `noun` | 계기 | 촉매, 자극제 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 309 | **certificate** | `noun` | 증명서 | 자격증, 이수증 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 310 | **clearance** | `noun` | 정리 | 승인, 허가 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 311 | **commitment** | `noun` | 헌신 | 약속, 책무 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 312 | **compensation** | `noun` | 보상 | 보수, 배상금 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 313 | **compliance** | `noun` | 준수 | 순응, 따름 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 314 | **component** | `noun` | 부품 | 구성 요소, 성분 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 315 | **consequence** | `noun` | 결과 | 영향, 중요성 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 316 | **contract** | `noun` | 계약서 | 계약, 협약 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 317 | **convention** | `noun` | 총회 | 협약, 관례 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 318 | **correspondence** | `noun` | 서신 | 통신, 일치 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 319 | **criterion** | `noun` | 기준 | 척도, 표준 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 320 | **dealer** | `noun` | 판매인 | 중개상, 취급점 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 321 | **delegation** | `noun` | 대표단 | 위임, 파견단 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 322 | **directory** | `noun` | 안내책자 | 인명부, 디렉터리 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 323 | **disruption** | `noun` | 중단 | 혼란, 지장 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 324 | **distribution** | `noun` | 유통 | 배분, 분포 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 325 | **document** | `noun` | 문서 | 서류, 기록 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 326 | **donation** | `noun` | 기부금 | 기증, 기부 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 327 | **drawback** | `noun` | 단점 | 결점, 환급 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 328 | **duration** | `noun` | 지속 기간 | 기간, 지속 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 329 | **earnings** | `noun` | 소득 | 수익, 임금 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 330 | **efficiency** | `noun` | 효율성 | 능률, 효능 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 331 | **emission** | `noun` | 배출 | 배출물, 방출 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 332 | **enterprise** | `noun` | 기업 | 사업체, 기획 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 333 | **evaluation** | `noun` | 평가 | 사정, 가치판단 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 334 | **exception** | `noun` | 예외 | 이의, 제외 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 335 | **excursion** | `noun` | 소풍 | 유람, 견학 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 336 | **expiration** | `noun` | 만료 | 만기, 종결 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 337 | **expertise** | `noun` | 전문 지식 | 전문 기술, 전문가적 식견 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 338 | **extension** | `noun` | 내선 번호 | 연장, 확장 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 339 | **foundation** | `noun` | 재단 | 토대, 창립 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 340 | **guideline** | `noun` | 지침 | 가이드라인, 안내선 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 341 | **incentive** | `noun` | 장려책 | 유인책, 보너스 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 342 | **increment** | `noun` | 증가 | 증분, 인상 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 343 | **initiative** | `noun` | 계획 | 주도권, 창의성 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 344 | **innovation** | `noun` | 혁신 | 쇄신, 새로운 것 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 345 | **insight** | `noun` | 통찰력 | 식견, 이해 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 346 | **inspection** | `noun` | 검사 | 점검, 시찰 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 347 | **institution** | `noun` | 기관 | 제도, 협회 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 348 | **instructor** | `noun` | 강사 | 지도자, 교관 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 349 | **insurance** | `noun` | 보험 | 보험금, 안전책 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 350 | **liability** | `noun` | 부채 | 법적 책임, 불리한 점 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 351 | **merger** | `noun` | 합병 | 흡수합병, 결합 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 352 | **milestone** | `noun` | 주요 일정 | 이정표, 획기적 사건 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 353 | **negotiation** | `noun` | 협상 | 교섭, 절충 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 354 | **objective** | `noun` | 목표 | 목적, 취지 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 355 | **obligation** | `noun` | 의무 | 책임, 약정 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 356 | **operator** | `noun` | 조작원 | 운영자, 통화원 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 357 | **performance** | `noun` | 성과 | 실적, 공연 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 358 | **permission** | `noun` | 허가 | 승인, 허락 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 359 | **persistence** | `noun` | 끈기 | 지속, 완고함 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 360 | **perspective** | `noun` | 관점 | 시각, 원근법 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 361 | **portfolio** | `noun` | 포트폴리오 | 투자자산목록, 작품집 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 362 | **precaution** | `noun` | 예방책 | 조심, 경계 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 363 | **preference** | `noun` | 선호 | 선호도, 우선권 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 364 | **proposal** | `noun` | 제안서 | 기획안, 청혼 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 365 | **prospect** | `noun` | 전망 | 가능성, 예상 고객 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 366 | **regulation** | `noun` | 규정 | 법규, 규제 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 367 | **representative** | `noun` | 직원 | 대표자, 대리인 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 368 | **resource** | `noun` | 자원 | 재원, 수단 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 369 | **signature** | `noun` | 서명 | 사인, 특징 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 370 | **specification** | `noun` | 사양서 | 세부사항, 명세 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 371 | **subscription** | `noun` | 구독 | 가입, 기부금 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 372 | **transaction** | `noun` | 거래 | 매매, 업무처리 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 373 | **achievement** | `noun` | 업적 | 성취, 달성 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 374 | **acknowledgement** | `noun` | 확인 | 수령 통지, 인정 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 375 | **acquisition** | `noun` | 인수 | 습득, 획득 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 376 | **administration** | `noun` | 행정 | 관리, 운영진 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 377 | **advisor** | `noun` | 고문 | 자문위원, 상담사 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 378 | **affiliate** | `noun` | 계열사 | 지부, 제휴처 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 379 | **agency** | `noun` | 대행사 | 대리점, 정부 기관 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 380 | **agent** | `noun` | 대리인 | 중개인, 직원 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 381 | **allegation** | `noun` | 주장 | 진술, 혐의 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 382 | **alliance** | `noun` | 동맹 | 제휴, 연합 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 383 | **ambition** | `noun` | 야망 | 포부, 의욕 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 384 | **arbitrator** | `noun` | 중재인 | 조정자 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 385 | **aspiration** | `noun` | 열망 | 포부, 염원 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 386 | **assistant** | `noun` | 보조원 | 조수, 비서 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 387 | **attorney** | `noun` | 변호사 | 법률대리인 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 388 | **authority** | `noun` | 권한 | 당국, 권위자 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 389 | **autonomy** | `noun` | 자율성 | 자치권 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 390 | **board** | `noun` | 이사회 | 게시판, 판자 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 391 | **boss** | `noun` | 상사 | 대표, 책임자 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 392 | **branch** | `noun` | 지점 | 분점, 나뭇가지 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 393 | **brand** | `noun` | 상표 | 브랜드, 낙인 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 394 | **bureaucracy** | `noun` | 관료제 | 관료 체계 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 395 | **capability** | `noun` | 역량 | 능력, 수용능력 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 396 | **career** | `noun` | 경력 | 이력, 직업 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 397 | **chairman** | `noun` | 위원장 | 의장, 회장 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 398 | **clerk** | `noun` | 점원 | 서기, 직원 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 399 | **cohort** | `noun` | 집단 | 동료 그룹 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 400 | **commander** | `noun` | 지휘관 | 사령관 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 401 | **commissioner** | `noun` | 위원 | 청장, 국장 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 402 | **competency** | `noun` | 핵심역량 | 자격요건 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 403 | **composer** | `noun` | 작곡가 | 작성자 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 404 | **corporation** | `noun` | 법인 | 기업, 주식회사 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 405 | **crew** | `noun` | 직원 승무원 | 작업팀, 승무원단 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 406 | **curator** | `noun` | 기획관리원 | 박물관 학예사 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 407 | **custodian** | `noun` | 관리인 | 수탁기관 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 408 | **customer** | `noun` | 고객 | 손님, 의뢰인 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 409 | **director** | `noun` | 이사 | 부서장, 감독 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 410 | **dispatch** | `noun` | 파견 | 발송, 특파 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 411 | **employee** | `noun` | 직원 | 고용원, 피고용자 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 412 | **employer** | `noun` | 고용주 | 기업주, 사용자 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 413 | **enthusiast** | `noun` | 애호가 | 열성신봉자 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 414 | **envoy** | `noun` | 특사 | 공사, 전령 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 415 | **equity** | `noun` | 자기자본 | 순자산, 형평성 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 416 | **executor** | `noun` | 집행관 | 유언집행자 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 417 | **governor** | `noun` | 주지사 | 총재, 운영위원 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 418 | **head** | `noun` | 책임자 | 우두머리, 머리 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 419 | **hire** | `noun` | 신규채용자 | 고용 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 420 | **immigrant** | `noun` | 이주민 | 이민자 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 421 | **informant** | `noun` | 정보제공자 | 통보자 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 422 | **investigator** | `noun` | 조사관 | 수사관 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 423 | **judge** | `noun` | 판사 | 심판, 감정인 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 424 | **leader** | `noun` | 지도자 | 대표, 선구자 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 425 | **magistrate** | `noun` | 치안판사 | 행정관 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 426 | **master** | `noun` | 전문장인 | 주인, 원형 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 427 | **mentor** | `noun` | 지도교사 | 조언자 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 428 | **minister** | `noun` | 장관 | 성직자 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 429 | **officer** | `noun` | 임원직원 | 책임자, 경관 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 430 | **partner** | `noun` | 동업자 | 파트너, 협력사 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 431 | **practitioner** | `noun` | 실무자 | 개업의사 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 432 | **premier** | `noun` | 수상 | 국무총리 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 433 | **president** | `noun` | 대표이사 | 대통령, 총장 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 434 | **principal** | `noun` | 원금 | 교장, 주요인물 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 435 | **professor** | `noun` | 교수 | 강의자 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 436 | **proprietor** | `noun` | 소유주 | 자영업주 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 437 | **scholar** | `noun` | 학자 | 연구가 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 438 | **secretary** | `noun` | 비서 | 간사, 장관 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 439 | **superintendent** | `noun` | 관리소장 | 총감독관 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 440 | **trustee** | `noun` | 수탁관리인 | 이사위원 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 441 | **veteran** | `noun` | 베테랑실무자 | 퇴역군인 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 442 | **volunteer** | `noun` | 자원봉사자 | 지원자 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 443 | **worker** | `noun` | 근로자 | 직원, 일꾼 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 444 | **bulletin** | `noun` | 공보 | 회보, 속보판 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 445 | **circular** | `noun` | 안내회람 | 회보 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 446 | **covenant** | `noun` | 서약규약 | 계약서약 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 447 | **decree** | `noun` | 법령 | 포고령 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 448 | **deliberation** | `noun` | 심의 | 숙고, 토의 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 449 | **disposition** | `noun` | 기질 | 배치, 처분 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 450 | **draft** | `noun` | 초안 | 원고, 징집 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 451 | **duplicate** | `noun` | 복사본 | 사본 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 452 | **enactment** | `noun` | 입법제정 | 법률발효 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 453 | **index** | `noun` | 색인 | 지표, 색인지수 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 454 | **instruction** | `noun` | 설명서 | 지침, 교육 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 455 | **log** | `noun` | 운항일지 | 기록부, 통나무 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 456 | **manifest** | `noun` | 적하목록 | 승객명단 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 457 | **manuscript** | `noun` | 원고 | 필사본 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 458 | **notification** | `noun` | 통지서 | 공지문 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 459 | **pamphlet** | `noun` | 소책자 | 홍보팸플릿 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 460 | **provision** | `noun` | 조항규정 | 지급, 공급 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 461 | **record** | `noun` | 기록부 | 음반, 실적 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 462 | **synopsis** | `noun` | 개요서 | 줄거리 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 463 | **treaty** | `noun` | 공식조약 | 협정체결문 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 464 | **account** | `noun` | 계좌 | 거래처, 설명 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 465 | **bond** | `noun` | 채권 | 유대감, 보증 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 466 | **capital** | `noun` | 자본금 | 수도, 대문자 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 467 | **circulation** | `noun` | 유통부수 | 순환, 발행부수 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 468 | **debenture** | `noun` | 무담보회사채 | 채무증서 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 469 | **debit** | `noun` | 차변 | 직불출금 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 470 | **deposit** | `noun` | 보증금 | 예금, 착수금 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 471 | **depression** | `noun` | 경기침체 | 우울증 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 472 | **interest** | `noun` | 이자율 | 관심, 이해관계 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 473 | **lien** | `noun` | 유치권 | 우선저당권 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 474 | **margin** | `noun` | 수익마진 | 여백, 한계 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 475 | **market** | `noun` | 시장 | 장터, 수요처 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 476 | **mortgage** | `noun` | 주택담보대출 | 저당융자 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 477 | **premium** | `noun` | 할증보험료 | 보험료, 고급형 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 478 | **profit** | `noun` | 순영업이익 | 수익 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 479 | **security** | `noun` | 유가증권 | 보안, 경비 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 480 | **settlement** | `noun` | 합의금지급 | 결제, 정착 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 481 | **solvent** | `noun` | 지급능력자 | 용매 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 482 | **tax** | `noun` | 세금 | 조세, 과세 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 483 | **toll** | `noun` | 통행료 | 사용료, 손실 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 484 | **trust** | `noun` | 신탁기금 | 신뢰, 트러스트 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 485 | **valuation** | `noun` | 자산평가액 | 감정평가 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 486 | **venture** | `noun` | 벤처투자 | 모험사업 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 487 | **apparatus** | `noun` | 기계장치 | 기구단위 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 488 | **assembly** | `noun` | 조립라인 | 의회, 집회 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 489 | **circuit** | `noun` | 전기회로 | 순회코스 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 490 | **dynamo** | `noun` | 발전기 | 에너지원 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 491 | **furnace** | `noun` | 가열화로 | 제련소 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 492 | **gadget** | `noun` | 소형기기 | 편리도구 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 493 | **girder** | `noun` | 대들보철골 | 지지대 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 494 | **hardware** | `noun` | 컴퓨터하드웨어 | 철물장비 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 495 | **instrument** | `noun` | 정밀계측기 | 악기, 수단 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 496 | **laboratory** | `noun` | 연구실험실 | 검사실 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 497 | **lathe** | `noun` | 공작선반 | 선반기계 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 498 | **layout** | `noun` | 배치도 | 도면설계 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 499 | **locomotive** | `noun` | 기관차 | 철도동력차 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 500 | **mill** | `noun` | 방적분쇄공장 | 제재소 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 501 | **panel** | `noun` | 조작패널 | 패널단, 배전반 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 502 | **patent** | `noun` | 기술특허 | 전매특허 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 503 | **plant** | `noun` | 제조플랜트 | 식물, 공장 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 504 | **scaffold** | `noun` | 건축비계 | 임시발판 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 505 | **vessel** | `noun` | 대형선박 | 용기, 혈관 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 506 | **boutique** | `noun` | 전문의류매장 | 부티크 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 507 | **carriage** | `noun` | 객차차량 | 운송료 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 508 | **catalog** | `noun` | 상품목록집 | 도록 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 509 | **eatery** | `noun` | 음식점 | 대중식당 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 510 | **flyer** | `noun` | 홍보전단지 | 광고지 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 511 | **gala** | `noun` | 축하공연행사 | 갈라쇼 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 512 | **gourmet** | `noun` | 미식요리 | 미식가 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 513 | **landing** | `noun` | 착륙 | 선착장, 상륙 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 514 | **outlet** | `noun` | 할인매장 | 배출구, 콘센트 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 515 | **stall** | `noun` | 간이매대 | 마구간 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 516 | **voyage** | `noun` | 해외항해 | 원정여행 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 517 | **acceptance** | `noun` | 수락 | 승인, 합격 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 518 | **admission** | `noun` | 입장 | 입학허가, 인정 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 519 | **approval** | `noun` | 승인 | 인가 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 520 | **assessment** | `noun` | 평가 | 과세사정 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 521 | **atmosphere** | `noun` | 분위기 | 대기권 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 522 | **awareness** | `noun` | 인식 | 자각 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 523 | **basis** | `noun` | 기준 | 기반 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 524 | **bill** | `noun` | 청구서 | 계산서, 법안 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 525 | **binding** | `noun` | 제본 | 표지, 구속력 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 526 | **block** | `noun` | 구역 | 차단재, 블록 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 527 | **builder** | `noun` | 건설업자 | 시공사 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 528 | **channel** | `noun` | 유통경로 | 채널, 수로 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 529 | **chapter** | `noun` | 지부 | 단원, 지회 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 530 | **commencement** | `noun` | 시작 | 개시, 졸업식 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 531 | **consolidation** | `noun` | 통합 | 합병 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 532 | **accomplish** | `verb` | 성취하다 | 완수하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 533 | **accustom** | `verb` | 익숙하게하다 | 길들이다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 534 | **activate** | `verb` | 가동하다 | 활성화하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 535 | **adapt** | `verb` | 적응하다 | 맞추다, 개작하다 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 536 | **administer** | `verb` | 집행하다 | 관리하다, 투여하다 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 537 | **admit** | `verb` | 인정하다 | 입장을 허가하다 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 538 | **advise** | `verb` | 조언하다 | 권고하다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 539 | **advocate** | `verb` | 옹호하다 | 주장하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 540 | **allot** | `verb` | 배당하다 | 할당하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 541 | **alter** | `verb` | 변경하다 | 바꾸다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 542 | **amplify** | `verb` | 증폭하다 | 확대하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 543 | **analyze** | `verb` | 분석하다 | 검토하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 544 | **appeal** | `verb` | 호소하다 | 매력을 끌다, 항소하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 545 | **appoint** | `verb` | 임명하다 | 지정하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 546 | **appraise** | `verb` | 감정하다 | 평가하다 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 547 | **apprehend** | `verb` | 파악하다 | 체포하다, 걱정하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 548 | **assert** | `verb` | 단언하다 | 주장하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 549 | **assimilate** | `verb` | 동화시키다 | 흡수하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 550 | **attain** | `verb` | 도달하다 | 달성하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 551 | **bid** | `verb` | 입찰하다 | 제시하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 552 | **bind** | `verb` | 묶다 | 구속하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 553 | **broaden** | `verb` | 넓히다 | 확장하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 554 | **calculate** | `verb` | 계산하다 | 산정하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 555 | **cancel** | `verb` | 취소하다 | 무효화하다 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 556 | **certify** | `verb` | 증명하다 | 공인하다 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 557 | **charge** | `verb` | 청구하다 | 부과하다, 충전하다 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 558 | **circulate** | `verb` | 배포하다 | 순환하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 559 | **cite** | `verb` | 인용하다 | 언급하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 560 | **commemorate** | `verb` | 기념하다 | 축하하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 561 | **commend** | `verb` | 칭찬하다 | 추천하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 562 | **condense** | `verb` | 압축하다 | 요약하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 563 | **cultivate** | `verb` | 양성하다 | 계발하다, 경작하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 564 | **defer** | `verb` | 미루다 | 연기하다, 경의를 표하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 565 | **delineate** | `verb` | 상세히 기술하다 | 윤곽을 그리다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 566 | **deposit** | `verb` | 예치하다 | 입금하다, 착수금을 내다 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 567 | **deter** | `verb` | 단념시키다 | 저지하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 568 | **determine** | `verb` | 결정하다 | 측정하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 569 | **differentiate** | `verb` | 구별하다 | 차별화하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 570 | **diminish** | `verb` | 감소하다 | 줄이다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 571 | **discharge** | `verb` | 해고하다 | 방출하다, 퇴원시키다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 572 | **disperse** | `verb` | 해산시키다 | 분산하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 573 | **display** | `verb` | 진열하다 | 전시하다, 화면에 표시하다 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 574 | **elevate** | `verb` | 격상시키다 | 승진시키다, 올리다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 575 | **eliminate** | `verb` | 제거하다 | 배제하다 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 576 | **employ** | `verb` | 고용하다 | 사용하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 577 | **encompass** | `verb` | 망라하다 | 포함하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 578 | **enlarge** | `verb` | 확대하다 | 늘리다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 579 | **enlist** | `verb` | 요청하여 얻다 | 입대하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 580 | **entail** | `verb` | 수반하다 | 필요로하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 581 | **entrust** | `verb` | 위탁하다 | 맡기다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 582 | **extend** | `verb` | 연장하다 | 제공하다, 확장하다 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 583 | **fabricate** | `verb` | 제작하다 | 날조하다 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 584 | **forecast** | `verb` | 예측하다 | 예보하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 585 | **furnish** | `verb` | 비치하다 | 공급하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 586 | **govern** | `verb` | 통치하다 | 지배규율하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 587 | **guarantee** | `verb` | 보증하다 | 담보하다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 588 | **harness** | `verb` | 활용하다 | 이용하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 589 | **incur** | `verb` | 발생시키다 | 초래하다, 입다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 590 | **indemnify** | `verb` | 배상하다 | 보상하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 591 | **institute** | `verb` | 도입하다 | 제정하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 592 | **integrate** | `verb` | 통합하다 | 융합하다 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 593 | **intercept** | `verb` | 가로채다 | 차단하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 594 | **intervene** | `verb` | 개입하다 | 중재하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 595 | **issue** | `verb` | 발행하다 | 발급하다, 발표하다 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 596 | **lease** | `verb` | 임대하다 | 리스하다 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 597 | **legislate** | `verb` | 법률을 제정하다 | 입법하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 598 | **lessen** | `verb` | 줄이다 | 완화하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 599 | **liquidate** | `verb` | 청산하다 | 정리하다, 현금화하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 600 | **magnify** | `verb` | 확대하다 | 과장하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 601 | **mediate** | `verb` | 조정하다 | 중재하다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 602 | **merge** | `verb` | 합병하다 | 병합하다 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 603 | **mount** | `verb` | 장착하다 | 개최하다, 증가하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 604 | **navigate** | `verb` | 항행하다 | 길을 찾다, 조종하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 605 | **neutralize** | `verb` | 무력화하다 | 중화하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 606 | **nominate** | `verb` | 지명하다 | 추천하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 607 | **nullify** | `verb` | 무효화하다 | 파기하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 608 | **orchestrate** | `verb` | 조직화하다 | 치밀하게 계획하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 609 | **outlaw** | `verb` | 불법화하다 | 금지하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 610 | **oversee** | `verb` | 감독하다 | 두루 살피다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 611 | **patronize** | `verb` | 애용하다 | 후원하다, 깔보는태도를취하다 | hard | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 612 | **perpetuate** | `verb` | 영속시키다 | 이어지게하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 613 | **pilot** | `verb` | 시험 운용하다 | 조종하다 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 614 | **portray** | `verb` | 그리다 | 묘사하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 615 | **prevail** | `verb` | 우세하다 | 만연하다, 설득하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 616 | **project** | `verb` | 예상투사하다 | 계획하다, 영사하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 617 | **proliferate** | `verb` | 급증하다 | 확산하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 618 | **propagate** | `verb` | 전파하다 | 번식시키다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 619 | **prosecute** | `verb` | 기소하다 | 수행하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 620 | **punctuate** | `verb` | 구두점을 찍다 | 중단시키다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 621 | **ratify** | `verb` | 비준하다 | 재가하다 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 622 | **rebound** | `verb` | 반등하다 | 회복하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 623 | **reciprocate** | `verb` | 화답하다 | 보답하다, 왕복운동하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 624 | **reckon** | `verb` | 계산하다 | 생각하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 625 | **reclaim** | `verb` | 되찾다 | 개간하다, 재활용하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 626 | **reconstruct** | `verb` | 재건하다 | 복원하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 627 | **redeem** | `verb` | 교환상환하다 | 만회하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 628 | **refine** | `verb` | 정제하다 | 다듬다, 개선하다 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 629 | **reform** | `verb` | 개혁하다 | 개선하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 630 | **refund** | `verb` | 환불하다 | 반환하다 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 631 | **regulate** | `verb` | 규제하다 | 조절하다 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 632 | **rekindle** | `verb` | 다시 불붙이다 | 되살리다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 633 | **revamp** | `verb` | 개정수선하다 | 대대적으로 바꾸다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 634 | **route** | `verb` | 경로를 지정하다 | 발송하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 635 | **salvage** | `verb` | 구출구난하다 | 폐품을 이용하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 636 | **settle** | `verb` | 정산하다 | 해결하다, 정착하다 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 637 | **ship** | `verb` | 선적운송하다 | 배송하다 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 638 | **substitute** | `verb` | 대체하다 | 대신하다 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 639 | **testify** | `verb` | 증언하다 | 입증하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 640 | **transform** | `verb` | 변형시키다 | 탈바꿈하다 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 641 | **undergo** | `verb` | 겪다 | 경험하다, 수검받다 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 642 | **unify** | `verb` | 통합하다 | 단일화하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 643 | **validate** | `verb` | 유효하게하다 | 검증확인하다 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 644 | **verify** | `verb` | 입증확인하다 | 조회검증하다 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 645 | **warrant** | `verb` | 보증하다 | 정당화하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 646 | **withdraw** | `verb` | 인출하다 | 철회하다, 물러나다 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 647 | **withhold** | `verb` | 원천징수하다 | 보류하다 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 648 | **yield** | `verb` | 산출하다 | 양보하다, 수익을 내다 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 649 | **abide** | `verb` | 준수하다 | 머무르다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 650 | **alleviate** | `verb` | 완화하다 | 경감하다 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 651 | **ascertain** | `verb` | 확인하다 | 알아내다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 652 | **concur** | `verb` | 동의하다 | 일치하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 653 | **conform** | `verb` | 따르다 | 순응하다 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 654 | **curtail** | `verb` | 축소하다 | 줄이다 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 655 | **decrease** | `verb` | 감소하다 | 줄이다 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 656 | **deteriorate** | `verb` | 악화되다 | 저하되다 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 657 | **account for** | `verb` | 설명하다 | 차지하다, 원인이 되다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 658 | **adhere to** | `verb` | 준수하다 | 고수하다, 들러붙다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 659 | **aim at** | `verb` | 겨냥하다 | 목표로 하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 660 | **allow for** | `verb` | 감안하다 | 고려하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 661 | **appeal to** | `verb` | 호소하다 | 마음에 들다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 662 | **apply for** | `verb` | 지원하다 | 신청하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 663 | **back up** | `verb` | 백업하다 | 지원하다, 후진하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 664 | **belong to** | `verb` | 속하다 | 소유이다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 665 | **boil down to** | `verb` | 결국 ~이 되다 | 요약되다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 666 | **branch out** | `verb` | 사업을 확장하다 | 새 분야로 진출하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 667 | **break down** | `verb` | 고장 나다 | 분해하다, 결렬되다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 668 | **break into** | `verb` | 진출하다 | 침입하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 669 | **break off** | `verb` | 중단하다 | 결렬되다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 670 | **break out** | `verb` | 발발하다 | 탈출하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 671 | **break through** | `verb` | 돌파하다 | 극복하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 672 | **bring about** | `verb` | 초래하다 | 일으키다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 673 | **bring in** | `verb` | 영입하다 | 수익을 가져오다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 674 | **bring out** | `verb` | 출시하다 | 특징을 끌어내다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 675 | **bring up** | `verb` | 안건을 꺼내다 | 양육하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 676 | **build up** | `verb` | 쌓아 올리다 | 강화하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 677 | **call back** | `verb` | 다시 전화하다 | 리콜하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 678 | **call for** | `verb` | 요구하다 | 필요로 하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 679 | **call off** | `verb` | 취소하다 | 철회하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 680 | **call on** | `verb` | 방문하다 | 요청하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 681 | **care for** | `verb` | 보살피다 | 좋아하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 682 | **carry on** | `verb` | 계속하다 | 속행하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 683 | **carry out** | `verb` | 수행하다 | 실행하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 684 | **catch on** | `verb` | 유행하다 | 이해하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 685 | **catch up with** | `verb` | 따라잡다 | 밀린 일을 하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 686 | **check in** | `verb` | 체크인하다 | 탑승수속하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 687 | **check out** | `verb` | 체크아웃하다 | 대출하다, 확인하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 688 | **clean up** | `verb` | 치우다 | 정리정돈하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 689 | **clear up** | `verb` | 해결하다 | 날씨가 개다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 690 | **close down** | `verb` | 폐쇄하다 | 조업을 중단하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 691 | **come across** | `verb` | 우연히 마주치다 | 인상을 주다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 692 | **come by** | `verb` | 잠깐 들르다 | 얻다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 693 | **come down with** | `verb` | 병에 걸리다 | 앓아눕다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 694 | **come into** | `verb` | 물려받다 | 들어가다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 695 | **come out** | `verb` | 출시되다 | 발행되다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 696 | **come to** | `verb` | 총계가 되다 | 의식을 되찾다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 697 | **come up with** | `verb` | 생각해내다 | 제시하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 698 | **cope with** | `verb` | 대처하다 | 극복하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 699 | **count on** | `verb` | 의지하다 | 기대하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 700 | **cross out** | `verb` | 줄을 그어 지우다 | 줄을 그어 지우다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 701 | **cut back on** | `verb` | 절감하다 | 축소하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 702 | **cut down on** | `verb` | 줄이다 | 소비를 삭감하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 703 | **deal with** | `verb` | 처리하다 | 다루다, 거래하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 704 | **depend on** | `verb` | 의존하다 | ~에 달려있다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 705 | **do away with** | `verb` | 폐지하다 | 없애다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 706 | **drop by** | `verb` | 잠깐 들르다 | 방문하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 707 | **drop off** | `verb` | 내려주다 | 가져다주다, 떨어지다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 708 | **drop out** | `verb` | 중퇴하다 | 탈락하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 709 | **end up** | `verb` | 결국 ~하게 되다 | 마치다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 710 | **face up to** | `verb` | 직시하다 | 인정하고 맞서다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 711 | **fall back on** | `verb` | 기대다 | 최후로 의지하다 | hard | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 712 | **fall behind** | `verb` | 뒤처지다 | 연체되다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 713 | **fall through** | `verb` | 수포로 돌아가다 | 무산되다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 714 | **figure out** | `verb` | 알아내다 | 이해하다, 계산하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 715 | **fill in** | `verb` | 대체하다 | 빈칸을 채우다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 716 | **fill out** | `verb` | 작성하다 | 기입하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 717 | **find out** | `verb` | 알아내다 | 발견하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 718 | **fit in** | `verb` | 어울리다 | 시간을 내다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 719 | **focus on** | `verb` | 집중하다 | 초점을 맞추다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 720 | **follow through** | `verb` | 완수하다 | 이행하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 721 | **follow up** | `verb` | 후속 조치하다 | 사후 점검하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 722 | **get across** | `verb` | 이해시키다 | 전달되다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 723 | **get ahead** | `verb` | 성공하다 | 앞서가다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 724 | **get along with** | `verb` | 사이좋게 지내다 | 협력하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 725 | **get away with** | `verb` | 처벌을 모면하다 | 처벌을 모면하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 726 | **get by** | `verb` | 그럭저럭 살아가다 | 통과하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 727 | **get in touch with** | `verb` | 연락을 취하다 | 연락을 취하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 728 | **get over** | `verb` | 극복하다 | 회복하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 729 | **get rid of** | `verb` | 제거하다 | 처분하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 730 | **get through** | `verb` | 연결되다 | 통과하다, 끝마치다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 731 | **give away** | `verb` | 무료로 주다 | 누설하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 732 | **give in** | `verb` | 굴복하다 | 제출하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 733 | **give up** | `verb` | 포기하다 | 그만두다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 734 | **go ahead** | `verb` | 추진하다 | 앞서가다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 735 | **go over** | `verb` | 검토하다 | 살펴보다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 736 | **go through** | `verb` | 겪다 | 통과되다, 살피다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 737 | **go with** | `verb` | 선택하다 | 어울리다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 738 | **grow out of** | `verb` | 벗어나다 | 원인이 되다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 739 | **hand in** | `verb` | 제출하다 | 인계하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 740 | **hand out** | `verb` | 배포하다 | 나누어주다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 741 | **hang on** | `verb` | 기다리다 | 버티다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 742 | **hold back** | `verb` | 저지하다 | 억제하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 743 | **hold off** | `verb` | 미루다 | 가까이 못 오게 하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 744 | **hold on** | `verb` | 잠깐 기다리다 | 통화를 유지하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 745 | **hold up** | `verb` | 지연시키다 | 견디다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 746 | **insist on** | `verb` | 고집하다 | 주장하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 747 | **keep on** | `verb` | 계속하다 | 고용을 유지하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 748 | **keep up with** | `verb` | 따라가다 | 보조를 맞추다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 749 | **lay off** | `verb` | 일시 해고하다 | 정리해고하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 750 | **lead to** | `verb` | 초래하다 | 이어지다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 751 | **leave out** | `verb` | 빼다 | 생략하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 752 | **let down** | `verb` | 실망시키다 | 실망시키다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 753 | **line up** | `verb` | 줄을 서다 | 정렬시키다, 섭외하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 754 | **live up to** | `verb` | 부응하다 | 기대에 미치다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 755 | **look after** | `verb` | 돌보다 | 관리하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 756 | **look back on** | `verb` | 되돌아보다 | 회고하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 757 | **look down on** | `verb` | 깔보다 | 얕보다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 758 | **look for** | `verb` | 찾다 | 구하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 759 | **look forward to** | `verb` | 학수고대하다 | 기대하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 760 | **look into** | `verb` | 조사하다 | 검토하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 761 | **look out for** | `verb` | 주의하다 | 보호하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 762 | **look over** | `verb` | 훑어보다 | 검토하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 763 | **look through** | `verb` | 살펴보다 | 훑어 읽다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 764 | **look up** | `verb` | 찾아보다 | 나아지다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 765 | **look up to** | `verb` | 존경하다 | 우러러보다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 766 | **make out** | `verb` | 알아보다 | 작성하다, 이해하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 767 | **make sure** | `verb` | 확인하다 | 확실하게 하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 768 | **make up** | `verb` | 구성하다 | 보충하다, 화해하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 769 | **make up for** | `verb` | 만회하다 | 보상하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 770 | **move on** | `verb` | 넘어가다 | 이직하다, 진행하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 771 | **opt out** | `verb` | 탈퇴하다 | 빠지다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 772 | **pass away** | `verb` | 사망하다 | 사망하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 773 | **pass out** | `verb` | 기절하다 | 배포하다 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 774 | **pay back** | `verb` | 갚다 | 상환하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 775 | **pay off** | `verb` | 성과를 거두다 | 전액 갚다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 776 | **phase in** | `verb` | 단계적으로 도입하다 | 단계적으로 도입하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 777 | **phase out** | `verb` | 단계적으로 폐지하다 | 단계적으로 폐지하다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 778 | **pick out** | `verb` | 골라내다 | 선택하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 779 | **pick up** | `verb` | 픽업하다 | 수거하다, 회복되다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 780 | **point out** | `verb` | 지적하다 | 언급하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 781 | **pull off** | `verb` | 해내다 | 성사시키다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 782 | **pull through** | `verb` | 회복하다 | 극복하다 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 783 | **put away** | `verb` | 치우다 | 저축하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 784 | **put down** | `verb` | 적다 | 진압하다, 내려놓다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 785 | **put forward** | `verb` | 제안하다 | 앞당기다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 786 | **put off** | `verb` | 연기하다 | 미루다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 787 | **put on** | `verb` | 입다 | 상연하다, 가동하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 788 | **put out** | `verb` | 불을 끄다 | 출판하다, 생산하다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 789 | **put together** | `verb` | 조립하다 | 기획구성하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 790 | **put up with** | `verb` | 참다 | 견디다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 791 | **rely on** | `verb` | 의지하다 | 신뢰하다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 792 | **rule out** | `verb` | 배제하다 | 제외하다 | medium | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 793 | **run into** | `verb` | 우연히 만나다 | 충돌하다, 겪다 | easy | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 794 | **run out of** | `verb` | 바닥나다 | 다 써버리다 | easy | **A** | `PHRASAL_VERB` | `verified` | `미검토` |
| 795 | **run over** | `verb` | 검토하다 | 초과하다, 치다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 796 | **see to** | `verb` | 처리하다 | 돌보다 | medium | **A** | `PHRASAL_VERB` | `unknown` | `미검토` |
| 797 | **adverse** | `adjective` | 불리한 | 부정적인, 반대의 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 798 | **agreeable** | `adjective` | 쾌적한 | 동의하는, 상냥한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 799 | **allergic** | `adjective` | 알레르기가 있는 | 몹시 싫어하는 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 800 | **amiable** | `adjective` | 상냥한 | 붙임성 있는 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 801 | **authentic** | `adjective` | 진품의 | 진정한, 신뢰할 수 있는 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 802 | **autonomous** | `adjective` | 자율적인 | 자치의 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 803 | **bilingual** | `adjective` | 2개 국어를 구사하는 | 2개 국어를 구사하는 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 804 | **binding** | `adjective` | 구속력 있는 | 의무적인 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 805 | **bold** | `adjective` | 대담한 | 선명한, 굵은 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 806 | **capable** | `adjective` | 유능한 | 역량 있는, ~할 수 있는 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 807 | **chronic** | `adjective` | 만성적인 | 장기적인 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 808 | **cognitive** | `adjective` | 인식의 | 인지적인 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 809 | **compulsory** | `adjective` | 의무적인 | 강제적인 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 810 | **conclusive** | `adjective` | 결정적인 | 확실한 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 811 | **consecutive** | `adjective` | 연속적인 | 잇따른 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 812 | **conspicuous** | `adjective` | 눈에 띄는 | 뚜렷한 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 813 | **cordial** | `adjective` | 다정한 | 진심 어린 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 814 | **definitive** | `adjective` | 최종적인 | 결정적인 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 815 | **deliberate** | `adjective` | 신중한 | 고의의 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 816 | **delicate** | `adjective` | 섬세한 | 민감한, 취약한 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 817 | **demanding** | `adjective` | 요구사항이 많은 | 까다로운, 힘든 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 818 | **desperate** | `adjective` | 필사적인 | 자포자기의 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 819 | **economic** | `adjective` | 경제의 | 수지맞는 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 820 | **elaborate** | `adjective` | 정교한 | 공들인 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 821 | **eminent** | `adjective` | 저명한 | 탁월한 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 822 | **essential** | `adjective` | 필수적인 | 본질적인 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 823 | **evident** | `adjective` | 명백한 | 증거가 뚜렷한 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 824 | **exhaustive** | `adjective` | 철저한 | 완전한, 소모적인 | hard | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 825 | **exotic** | `adjective` | 이국적인 | 색다른 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 826 | **expedient** | `adjective` | 방편의 | 유리한 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 827 | **explicit** | `adjective` | 명백한 | 노골적인 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 828 | **extraordinary** | `adjective` | 비범한 | 대단한, 임시의 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 829 | **formidable** | `adjective` | 어마어마한 | 만만찮은 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 830 | **frugal** | `adjective` | 절약하는 | 소박한 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 831 | **idle** | `adjective` | 가동되지 않는 | 게으른, 유휴의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 832 | **imperative** | `adjective` | 필수적인 | 반드시 해야 하는, 명령적인 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 833 | **inaugural** | `adjective` | 취임의 | 개막의, 창간의 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 834 | **inclusive** | `adjective` | 포괄적인 | 전부 포함된 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 835 | **incompatible** | `adjective` | 양립할 수 없는 | 호환되지 않는 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 836 | **indifferent** | `adjective` | 무관심한 | 그저 그런 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 837 | **interim** | `adjective` | 임시의 | 과도기의, 중간의 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 838 | **intricate** | `adjective` | 복잡한 | 정교한 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 839 | **invaluable** | `adjective` | 매우 귀중한 | 값을 매길 수 없는 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 840 | **invariable** | `adjective` | 변함없는 | 불변의 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 841 | **marginal** | `adjective` | 미미한 | 한계의, 가장자리의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 842 | **monetary** | `adjective` | 통화의 | 금융의, 화폐의 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 843 | **noticeable** | `adjective` | 뚜렷한 | 현저한 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 844 | **obsolete** | `adjective` | 시대에 뒤떨어진 | 구식의, 더이상쓸모없는 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 845 | **original** | `adjective` | 원래의 | 독창적인, 원본의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 846 | **paramount** | `adjective` | 가장 중요한 | 최고의 | hard | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 847 | **permissible** | `adjective` | 허용되는 | 무방한 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 848 | **perpetual** | `adjective` | 영속하는 | 끊임없는 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 849 | **pertinent** | `adjective` | 적절한 | 관련된 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 850 | **pragmatic** | `adjective` | 실용적인 | 현실적인 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 851 | **precise** | `adjective` | 정밀한 | 정확한 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 852 | **pristine** | `adjective` | 자연 그대로의 | 오염되지 않은, 완전무결한 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 853 | **prospective** | `adjective` | 장래의 | 유망한, 곧 있을 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 854 | **qualitative** | `adjective` | 정성적인 | 질적인 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 855 | **rudimentary** | `adjective` | 기초적인 | 초보적인 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 856 | **sensitive** | `adjective` | 민감한 | 기밀의, 세심한 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 857 | **serene** | `adjective` | 평온한 | 맑게 갠 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 858 | **sophisticated** | `adjective` | 정교한 | 세련된, 고급의 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 859 | **straightforward** | `adjective` | 솔직한 | 간단명료한 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 860 | **superior** | `adjective` | 우수한 | 상급의 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 861 | **supreme** | `adjective` | 최고의 | 궁극의 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 862 | **surplus** | `adjective` | 잉여의 | 과잉의 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 863 | **tangible** | `adjective` | 만질 수 있는 | 유형의, 실재하는 | medium | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 864 | **tedious** | `adjective` | 지루한 | 단조로운 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 865 | **transparent** | `adjective` | 투명한 | 명백한 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 866 | **turbulent** | `adjective` | 격동의 | 난기류의 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 867 | **volatile** | `adjective` | 변덕스러운 | 휘발성의, 불안정한 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 868 | **aesthetic** | `adjective` | 미적인 | 심미적인 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 869 | **affluent** | `adjective` | 부유한 | 풍요로운 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 870 | **appreciable** | `adjective` | 상당한 | 눈에 띄는 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 871 | **apt** | `adjective` | 적절한 | ~하기 쉬운 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 872 | **arduous** | `adjective` | 몹시 힘든 | 고된 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 873 | **astute** | `adjective` | 기민한 | 약삭빠른 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 874 | **authoritative** | `adjective` | 권위 있는 | 믿을 만한 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 875 | **beneficent** | `adjective` | 인정 많은 | 자비로운 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 876 | **casual** | `adjective` | 격식 없는 | 우연한, 평상시의 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 877 | **certain** | `adjective` | 확실한 | 어떤 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 878 | **close** | `adjective` | 가까운 | 친밀한, 철저한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 879 | **concrete** | `adjective` | 구체적인 | 콘크리트의 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 880 | **conducive** | `adjective` | 도움이 되는 | 기여하는 | hard | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 881 | **congenial** | `adjective` | 마음이 맞는 | 쾌적한 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 882 | **constant** | `adjective` | 지속적인 | 불변의 | easy | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 883 | **crisp** | `adjective` | 선명한 | 바삭한, 상쾌한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 884 | **daring** | `adjective` | 대담한 | 용감한 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 885 | **deadly** | `adjective` | 치명적인 | 극도의 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 886 | **dim** | `adjective` | 어둑한 | 흐릿한 | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 887 | **disastrous** | `adjective` | 재난의 | 비참한 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 888 | **equitable** | `adjective` | 공평한 | 공정한 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 889 | **grand** | `adjective` | 웅장한 | 위대한, 원대한 | easy | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 890 | **allegedly** | `adverb` | 주장에 의하면 | 전해지는 바에 따르면 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 891 | **appropriately** | `adverb` | 적절하게 | 알맞게 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 892 | **belatedly** | `adverb` | 뒤늦게 | 때늦게 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 893 | **briskly** | `adverb` | 활발하게 | 기운차게, 빠르게 | medium | **A** | `POLYSEMY_COMPLEX` | `unknown` | `미검토` |
| 894 | **centrally** | `adverb` | 중심에 | 집중적으로 | easy | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 895 | **clearly** | `adverb` | 분명하게 | 명백히 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 896 | **conservatively** | `adverb` | 보수적으로 | 조심스럽게 | medium | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 897 | **conspicuously** | `adverb` | 눈에 띄게 | 현저히 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 898 | **critically** | `adverb` | 비판적으로 | 결정적으로, 위태롭게 | easy | **A** | `POLYSEMY_COMPLEX` | `verified` | `미검토` |
| 899 | **cumulatively** | `adverb` | 누적하여 | 점증적으로 | hard | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 900 | **dependably** | `adverb` | 신뢰성 있게 | 확실히 | easy | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 901 | **desperately** | `adverb` | 절박하게 | 필사적으로 | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 902 | **distinctly** | `adverb` | 뚜렷하게 | 분명히 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 903 | **distinctively** | `adverb` | 독특하게 | 특색 있게 | medium | **A** | `SAMPLE_A` | `unknown` | `미검토` |
| 904 | **domestically** | `adverb` | 국내에서 | 가정적으로 | easy | **A** | `SAMPLE_A` | `verified` | `미검토` |
| 905 | **eloquently** | `adverb` | 웅변으로 | 설득력 있게 | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 906 | **evidently** | `adverb` | 분명히 | 눈에 띄게 | medium | **A** | `SEMANTIC_CONFLICT` | `verified` | `미검토` |
| 907 | **feasibly** | `adverb` | 실현 가능하게 | 알맞게 | medium | **A** | `SEMANTIC_CONFLICT` | `unknown` | `미검토` |
| 908 | **as a matter of fact** | `phrase` | 사실은 | 실제로는 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 909 | **as a result of** | `phrase` | ~의 결과로 | ~로 인하여 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 910 | **as far as I know** | `phrase` | 내가 아는 한 | 아는 바로는 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 911 | **as long as** | `phrase` | ~하는 한 | ~하기만 하면 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 912 | **as opposed to** | `phrase` | ~와는 대조적으로 | ~가 아니라 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 913 | **as per your request** | `phrase` | 귀하의 요청에 따라 | 요청하신 대로 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 914 | **as soon as possible** | `phrase` | 가능한 한 빨리 | 가급적 속히 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 915 | **as well as** | `phrase` | ~뿐만 아니라 | ~와 마찬가지로 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 916 | **at all times** | `phrase` | 항상 | 언제나 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 917 | **at any rate** | `phrase` | 어쨌든 | 하여간 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 918 | **at first glance** | `phrase` | 언뜻 보기에 | 첫눈에 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 919 | **at one's disposal** | `phrase` | ~의 뜻대로 이용할 수 있는 | 마음대로 처분할 수 있는 | hard | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 920 | **at one's earliest convenience** | `phrase` | 형편이 닿는 대로 빨리 | 가장 편한 때에 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 921 | **at the expense of** | `phrase` | ~의 비용으로 | ~을 희생하여 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 922 | **at the latest** | `phrase` | 늦어도 | 최대한 늦게 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 923 | **at the moment** | `phrase` | 현재 | 지금으로서는 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 924 | **back and forth** | `phrase` | 왔다 갔다 | 앞뒤로 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 925 | **because of** | `phrase` | ~ 때문에 | ~로 인해 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 926 | **by all means** | `phrase` | 반드시 | 아무렴 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 927 | **by means of** | `phrase` | ~에 의하여 | ~라는 수단으로 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 928 | **by no means** | `phrase` | 결코 ~가 아닌 | 절대로 아닌 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 929 | **by the time** | `phrase` | ~할 때까지는 | ~할 무렵에 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 930 | **comply with regulations** | `phrase` | 규정을 준수하다 | 법규를 지키다 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 931 | **due to circumstances beyond our control** | `phrase` | 불가항력적인 사정으로 인해 | 불가항력적인 사정으로 인해 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 932 | **each and every** | `phrase` | 하나하나 모두 | 각각의 모든 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 933 | **either way** | `phrase` | 어느 쪽이든 | 어차피 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 934 | **enclosed please find** | `phrase` | 동봉된 서류를 확인해주십시오 | 동봉된 서류를 확인해주십시오 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 935 | **first of all** | `phrase` | 우선 | 무엇보다도 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 936 | **for the time being** | `phrase` | 당분간 | 현재로서는 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 937 | **from now on** | `phrase` | 이제부터는 | 향후 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 938 | **hand in hand** | `phrase` | 협력하여 | 손에 손잡고 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 939 | **in a timely manner** | `phrase` | 적시에 | 시기적절하게 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 940 | **in accordance with** | `phrase` | ~에 부합하여 | ~에 따라 | medium | **A** | `EXPRESSION` | `verified` | `미검토` |
| 941 | **in addition to** | `phrase` | ~에 더하여 | ~뿐만 아니라 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 942 | **in advance** | `phrase` | 사전에 | 미리 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 943 | **in agreement with** | `phrase` | ~와 합의하여 | ~와 일치하여 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 944 | **in an effort to** | `phrase` | ~하려는 노력의 일환으로 | ~하기 위해 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 945 | **in bulk** | `phrase` | 대량으로 | 포장하지 않고 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 946 | **in charge of** | `phrase` | ~을 담당하는 | ~의 책임자인 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 947 | **in collaboration with** | `phrase` | ~와 협력하여 | ~와 공동으로 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 948 | **in compliance with** | `phrase` | ~을 준수하여 | ~에 의거하여 | medium | **A** | `EXPRESSION` | `verified` | `미검토` |
| 949 | **in conclusion** | `phrase` | 결론적으로 | 끝으로 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 950 | **in conjunction with** | `phrase` | ~와 연계하여 | ~와 함께 | medium | **A** | `EXPRESSION` | `verified` | `미검토` |
| 951 | **in contrast to** | `phrase` | ~와 대조적으로 | ~와 달리 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 952 | **in detail** | `phrase` | 상세하게 | 자세히 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 953 | **in effect** | `phrase` | 사실상 | 효력을 발휘하는 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 954 | **in exchange for** | `phrase` | ~의 대가로 | ~와 교환하여 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 955 | **in favor of** | `phrase` | ~을 찬성하여 | ~을 지지하여 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 956 | **in general** | `phrase` | 일반적으로 | 대체로 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 957 | **in honor of** | `phrase` | ~을 기념하여 | ~에게 경의를 표하여 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 958 | **in keeping with** | `phrase` | ~에 부합하여 | ~에 따라 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 959 | **in light of** | `phrase` | ~을 고려하여 | ~에 비추어 볼 때 | medium | **A** | `EXPRESSION` | `verified` | `미검토` |
| 960 | **in no time** | `phrase` | 순식간에 | 곧바로 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 961 | **in order to** | `phrase` | ~하기 위하여 | ~하기 위하여 | medium | **A** | `EXPRESSION` | `verified` | `미검토` |
| 962 | **in place of** | `phrase` | ~을 대신하여 | ~의 자리에 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 963 | **in practice** | `phrase` | 실제로는 | 실행상 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 964 | **in recognition of** | `phrase` | ~을 인정하여 | ~의 공로를 치하하여 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 965 | **in response to** | `phrase` | ~에 응하여 | ~에 대한 답변으로 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 966 | **in summary** | `phrase` | 요약하건대 | 간추려 말하면 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 967 | **in terms of** | `phrase` | ~의 관점에서 | ~에 관하여 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 968 | **in the event of** | `phrase` | ~가 발생할 경우에 | ~의 경우 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 969 | **in the long run** | `phrase` | 장기적으로는 | 결국에는 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 970 | **in the meantime** | `phrase` | 그동안에 | 한편 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 971 | **in the near future** | `phrase` | 가까운 장래에 | 조만간 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 972 | **in touch with** | `phrase` | ~와 연락하는 | ~와 접촉하는 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 973 | **in writing** | `phrase` | 서면으로 | 문서상으로 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 974 | **keep in mind** | `phrase` | 명심하다 | 유념하다 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 975 | **keep track of** | `phrase` | 파악하다 | 추적기록하다 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 976 | **make a decision** | `phrase` | 결정을 내리다 | 판단하다 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 977 | **make an appointment** | `phrase` | 약속을 잡다 | 예약하다 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 978 | **no matter what** | `phrase` | 비록 무슨 일이 있어도 | 어찌 되었든 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 979 | **on a regular basis** | `phrase` | 정기적으로 | 규칙적으로 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 980 | **on behalf of** | `phrase` | ~을 대표하여 | ~을 대신하여 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 981 | **on board** | `phrase` | 탑승하여 | 동참하여 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 982 | **on demand** | `phrase` | 요구에 따라 | 주문형의 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 983 | **on duty** | `phrase` | 근무 중인 | 당직의 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 984 | **on schedule** | `phrase` | 예정대로 | 일정표에 맞추어 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 985 | **on the contrary** | `phrase` | 그와 반대로 | 오히려 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 986 | **on the other hand** | `phrase` | 다른 한편으로는 | 반면에 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 987 | **on the whole** | `phrase` | 전반적으로 보아 | 대체로 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 988 | **out of date** | `phrase` | 구식의 | 시대에 뒤떨어진 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 989 | **out of order** | `phrase` | 고장 난 | 작동하지 않는 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 990 | **out of stock** | `phrase` | 품절된 | 재고가 없는 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 991 | **play a role** | `phrase` | 역할을 하다 | 한몫하다 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 992 | **prior to** | `phrase` | ~에 앞서 | ~전에 | medium | **A** | `EXPRESSION` | `verified` | `미검토` |
| 993 | **regardless of** | `phrase` | ~에 상관없이 | ~을 불문하고 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 994 | **side by side** | `phrase` | 나란히 | 협력하여 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 995 | **so as to** | `phrase` | ~하기 위하여 | ~하도록 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 996 | **sooner or later** | `phrase` | 조만간 | 머지않아 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 997 | **strictly speaking** | `phrase` | 엄격히 말하면 | 정확하게는 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 998 | **take into account** | `phrase` | 고려하다 | 참작하다 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 999 | **take into consideration** | `phrase` | 참작하다 | 고려에 넣다 | easy | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 1000 | **thanks to** | `phrase` | ~의 덕분에 | ~로 인하여 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 1001 | **to date** | `phrase` | 지금까지 | 현재까지 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 1002 | **to some extent** | `phrase` | 어느 정도까지는 | 다소 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 1003 | **to the best of my knowledge** | `phrase` | 내가 아는 한 가장 정확하게는 | 내가 아는 한 가장 정확하게는 | medium | **A** | `EXPRESSION` | `unknown` | `미검토` |
| 1004 | **under consideration** | `phrase` | 고려 중인 | 검토 중인 | medium | **A** | `EXPRESSION` | `verified` | `미검토` |
| 1005 | **under construction** | `phrase` | 공사 중인 | 시공 중인 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 1006 | **under warranty** | `phrase` | 보증 기간 중인 | 품질보증이 적용되는 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
| 1007 | **up to date** | `phrase` | 최신의 | 최근의 | easy | **A** | `EXPRESSION` | `verified` | `미검토` |
