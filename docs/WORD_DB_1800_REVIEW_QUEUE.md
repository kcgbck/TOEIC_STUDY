# 보카 스터디 — 1,800어 최종 압축 사람 검토 큐 (QA-02 REVIEW_QUEUE)

## 0. 검토 가이드라인 및 상태 정의

- **검토 목적**: 1,800개 DB 중 사람이 반드시 확인해야 할 **최종 압축 검토 대상 198개 어휘**의 목록입니다.
- **현재 공식 상태**:
  - 자동 기술 검증: **QA_02_SEMANTIC_NORMALIZATION_PASS**
  - 의미 품질 사람 검토: **HUMAN_REVIEW_PENDING (검토 대기)**
  - 1,800 Release Ready: **NO (출시 동결)**
- **검토 액션 코드**:
  - `[ ] 미검토 (UNREVIEWED)`: 기본 상태
  - `[V] 정상 (APPROVED)`: 표제어, 품사, 대표뜻, 다의어, 퀴즈 출제 적합
  - `[!] 수정 필요 (NEEDS_CORRECTION)`: 뜻 수정 또는 난이도 재조정 필요
  - `[X] 제외 (EXCLUDE)`: 출제 부적합 (대체 후보 교체 필요)
  - `[-] 보류 (HOLD)`: 추가 맥락 확인 필요

---

## 1. 압축 검토 그룹 통계

| 우선순위 그룹 | 대상 건수 | 주요 속성 |
| :--- | :--- | :--- |
| **1. B등급 어휘 (Priority 1)** | 168개 | 상대적 고난도 어휘, 문맥 의존성 단어 |
| **2. 실제 다의어 (Priority 2)** | 20개 | 고유의 다의어(VALID_SENSE)를 보유한 어휘 |
| **3. 띄어쓰기 정규화 확인 (Priority 3)** | 12개 | 표준 맞춤법 띄어쓰기 정규화 확인 대상 |
| **4. 직역 위험 구동사/표현 (Priority 4)** | 14개 | B등급 또는 상 난이도 다단어 어휘 |
| **총 압축 검토 대상** | **198개** | **중복 제거 완료된 최종 고유 검토 대상** |

---

## 2. 최종 압축 검토 큐 전수 목록 (총 198개)

| 번호 | 표제어 (Word) | 품사 | 대표 뜻 | 유효 추가 뜻(VALID_SENSE) | 난이도 | 등급 | 우선순위 그룹 | 근거 판정 | 검토상태 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **department** | `noun` | 부서 | 부처, 학과 | easy | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 2 | **qualify** | `verb` | 자격을 갖추다 | - | hard | **A** | `SPACING_NORMALIZED` | `unknown` | `미검토` |
| 3 | **promote** | `verb` | 승진시키다 | 촉진하다 | medium | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 4 | **probation** | `noun` | 수습기간 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 5 | **headcount** | `noun` | 인원수 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 6 | **adjourn** | `verb` | 휴회하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 7 | **dividend** | `noun` | 배당금 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 8 | **balance** | `noun` | 잔액 | 잔고, 균형 | medium | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 9 | **demographic** | `noun` | 인구집단 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 10 | **requisition** | `noun` | 요청서 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 11 | **intact** | `adjective` | 손상되지 않은 | - | hard | **A** | `SPACING_NORMALIZED` | `unknown` | `미검토` |
| 12 | **in_transit** | `adverb` | 수송 중에 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 13 | **impeccably** | `adverb` | 흠잡을 데 없이 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 14 | **delicacy** | `noun` | 별미 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 15 | **courteous** | `adjective` | 예의 바른 | - | hard | **A** | `SPACING_NORMALIZED` | `unknown` | `미검토` |
| 16 | **helpline** | `noun` | 상담전화 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 17 | **specimen** | `noun` | 표본 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 18 | **address** | `verb` | 다루다 | 고심하다, 연설하다 | medium | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 19 | **admire** | `verb` | 칭찬하다 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 20 | **compose** | `verb` | 구성하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 21 | **conduct** | `verb` | 수행하다 | 지휘하다 | medium | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 22 | **conserve** | `verb` | 보존하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 23 | **discourage** | `verb` | 단념시키다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 24 | **dismiss** | `verb` | 해고하다 | 해산시키다 | hard | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 25 | **distribute** | `verb` | 배포하다 | - | medium | **A** | `SPACING_NORMALIZED` | `unknown` | `미검토` |
| 26 | **execute** | `verb` | 실행하다 | 처형하다 | hard | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 27 | **illustrate** | `verb` | 설명하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 28 | **inaugurate** | `verb` | 취임시키다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 29 | **overlook** | `verb` | 간과하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 30 | **persist** | `verb` | 지속하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 31 | **require** | `verb` | 요구하다 | - | easy | **A** | `SPACING_NORMALIZED` | `unknown` | `미검토` |
| 32 | **appreciative** | `adjective` | 감사하는 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 33 | **eager** | `adjective` | 열의를 보이는 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 34 | **exemplary** | `adjective` | 모범적인 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 35 | **generous** | `adjective` | 관대한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 36 | **incredible** | `adjective` | 놀라운 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 37 | **legitimate** | `adjective` | 정당한 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 38 | **modest** | `adjective` | 겸손한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 39 | **optimistic** | `adjective` | 낙관적인 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 40 | **persistent** | `adjective` | 지속적인 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 41 | **prosperous** | `adjective` | 번영하는 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 42 | **redundant** | `adjective` | 불필요한 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 43 | **reluctant** | `adjective` | 꺼리는 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 44 | **unconditional** | `adjective` | 무조건적인 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 45 | **versatile** | `adjective` | 다재다능한 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 46 | **adversely** | `adverb` | 불리하게 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 47 | **decisively** | `adverb` | 결정적으로 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 48 | **deliberately** | `adverb` | 의도적으로 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 49 | **inadvertently** | `adverb` | 부주의로 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 50 | **intensely** | `adverb` | 강렬하게 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 51 | **moderately** | `adverb` | 적당히 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 52 | **predominantly** | `adverb` | 주로 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 53 | **preferably** | `adverb` | 가급적 | - | medium | **A** | `SPACING_NORMALIZED` | `unknown` | `미검토` |
| 54 | **scarcely** | `adverb` | 거의 ~않다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 55 | **catalyst** | `noun` | 계기 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 56 | **contract** | `noun` | 계약서 | 계약 | easy | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 57 | **drawback** | `noun` | 단점 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 58 | **excursion** | `noun` | 소풍 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 59 | **increment** | `noun` | 증가 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 60 | **persistence** | `noun` | 끈기 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 61 | **allegation** | `noun` | 주장 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 62 | **arbitrator** | `noun` | 중재인 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 63 | **board** | `noun` | 이사회 | 게시판 | easy | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 64 | **bureaucracy** | `noun` | 관료제 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 65 | **cohort** | `noun` | 집단 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 66 | **commander** | `noun` | 지휘관 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 67 | **composer** | `noun` | 작곡가 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 68 | **curator** | `noun` | 기획관리원 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 69 | **custodian** | `noun` | 관리인 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 70 | **enthusiast** | `noun` | 애호가 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 71 | **envoy** | `noun` | 특사 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 72 | **executor** | `noun` | 집행관 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 73 | **governor** | `noun` | 주지사 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 74 | **immigrant** | `noun` | 이주민 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 75 | **informant** | `noun` | 정보제공자 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 76 | **magistrate** | `noun` | 치안판사 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 77 | **minister** | `noun` | 장관 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 78 | **premier** | `noun` | 수상 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 79 | **scholar** | `noun` | 학자 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 80 | **superintendent** | `noun` | 관리소장 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 81 | **trustee** | `noun` | 수탁관리인 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 82 | **veteran** | `noun` | 베테랑실무자 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 83 | **circular** | `noun` | 안내회람 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 84 | **covenant** | `noun` | 서약규약 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 85 | **decree** | `noun` | 법령 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 86 | **disposition** | `noun` | 기질 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 87 | **draft** | `noun` | 초안 | 원고 | easy | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 88 | **enactment** | `noun` | 입법제정 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 89 | **manuscript** | `noun` | 원고 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 90 | **record** | `noun` | 기록부 | 음반 | easy | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 91 | **synopsis** | `noun` | 개요서 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 92 | **treaty** | `noun` | 공식조약 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 93 | **account** | `noun` | 계좌 | 설명 | easy | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 94 | **capital** | `noun` | 자본금 | 수도, 대문자 | easy | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 95 | **debenture** | `noun` | 무담보회사채 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 96 | **default** | `noun` | 채무불이행 | 기본값 | medium | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 97 | **depression** | `noun` | 경기침체 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 98 | **lien** | `noun` | 유치권 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 99 | **solvent** | `noun` | 지급능력자 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 100 | **dynamo** | `noun` | 발전기 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 101 | **furnace** | `noun` | 가열화로 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 102 | **gadget** | `noun` | 소형기기 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 103 | **girder** | `noun` | 대들보철골 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 104 | **lathe** | `noun` | 공작선반 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 105 | **locomotive** | `noun` | 기관차 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 106 | **mill** | `noun` | 방적분쇄공장 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 107 | **plant** | `noun` | 제조플랜트 | 공장 | easy | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 108 | **scaffold** | `noun` | 건축비계 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 109 | **boutique** | `noun` | 전문의류매장 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 110 | **carriage** | `noun` | 객차차량 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 111 | **eatery** | `noun` | 음식점 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 112 | **gala** | `noun` | 축하공연행사 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 113 | **gourmet** | `noun` | 미식요리 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 114 | **stall** | `noun` | 간이매대 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 115 | **voyage** | `noun` | 해외항해 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 116 | **bill** | `noun` | 청구서 | 법안 | easy | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 117 | **accustom** | `verb` | 익숙하게하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 118 | **advocate** | `verb` | 옹호하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 119 | **apprehend** | `verb` | 파악하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 120 | **assimilate** | `verb` | 동화시키다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 121 | **charge** | `verb` | 청구하다 | 충전하다 | easy | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 122 | **delineate** | `verb` | 상세히 기술하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 123 | **deter** | `verb` | 단념시키다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 124 | **disperse** | `verb` | 해산시키다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 125 | **encompass** | `verb` | 망라하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 126 | **enlist** | `verb` | 요청하여 얻다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 127 | **entail** | `verb` | 수반하다 | - | hard | **A** | `SPACING_NORMALIZED` | `unknown` | `미검토` |
| 128 | **govern** | `verb` | 통치하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 129 | **intercept** | `verb` | 가로채다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 130 | **intervene** | `verb` | 개입하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 131 | **issue** | `verb` | 발행하다 | 발급하다 | easy | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 132 | **legislate** | `verb` | 법률을 제정하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 133 | **magnify** | `verb` | 확대하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 134 | **neutralize** | `verb` | 무력화하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 135 | **nullify** | `verb` | 무효화하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 136 | **orchestrate** | `verb` | 조직화하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 137 | **outlaw** | `verb` | 불법화하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 138 | **perpetuate** | `verb` | 영속시키다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 139 | **portray** | `verb` | 그리다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 140 | **proliferate** | `verb` | 급증하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 141 | **propagate** | `verb` | 전파하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 142 | **prosecute** | `verb` | 기소하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 143 | **punctuate** | `verb` | 구두점을 찍다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 144 | **reciprocate** | `verb` | 화답하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 145 | **reckon** | `verb` | 계산하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 146 | **rekindle** | `verb` | 다시 불붙이다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 147 | **revamp** | `verb` | 개정수선하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 148 | **salvage** | `verb` | 구출구난하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 149 | **testify** | `verb` | 증언하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 150 | **yield** | `verb` | 산출하다 | 양보하다 | medium | **A** | `GENUINE_POLYSEMY` | `CONTENT_VERIFIED` | `미검토` |
| 151 | **boil down to** | `verb` | 결국 ~이 되다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 152 | **break out** | `verb` | 발발하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 153 | **come down with** | `verb` | 병에 걸리다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 154 | **come into** | `verb` | 물려받다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 155 | **drop out** | `verb` | 중퇴하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 156 | **face up to** | `verb` | 직시하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 157 | **fall back on** | `verb` | 기대다 | - | hard | **A** | `HARD_PHRASAL_OR_EXPR` | `unknown` | `미검토` |
| 158 | **get by** | `verb` | 그럭저럭 살아가다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 159 | **give in** | `verb` | 굴복하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 160 | **grow out of** | `verb` | 벗어나다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 161 | **hand out** | `verb` | 배포하다 | - | easy | **A** | `SPACING_NORMALIZED` | `CONTENT_VERIFIED` | `미검토` |
| 162 | **look down on** | `verb` | 깔보다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 163 | **pass out** | `verb` | 기절하다 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 164 | **pull through** | `verb` | 회복하다 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 165 | **allergic** | `adjective` | 알레르기가 있는 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 166 | **amiable** | `adjective` | 상냥한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 167 | **chronic** | `adjective` | 만성적인 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 168 | **cognitive** | `adjective` | 인식의 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 169 | **conspicuous** | `adjective` | 눈에 띄는 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 170 | **cordial** | `adjective` | 다정한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 171 | **desperate** | `adjective` | 필사적인 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 172 | **expedient** | `adjective` | 방편의 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 173 | **formidable** | `adjective` | 어마어마한 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 174 | **frugal** | `adjective` | 절약하는 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 175 | **indifferent** | `adjective` | 무관심한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 176 | **perpetual** | `adjective` | 영속하는 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 177 | **rudimentary** | `adjective` | 기초적인 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 178 | **serene** | `adjective` | 평온한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 179 | **supreme** | `adjective` | 최고의 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 180 | **tedious** | `adjective` | 지루한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 181 | **turbulent** | `adjective` | 격동의 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 182 | **volatile** | `adjective` | 변덕스러운 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 183 | **aesthetic** | `adjective` | 미적인 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 184 | **affluent** | `adjective` | 부유한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 185 | **arduous** | `adjective` | 몹시 힘든 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 186 | **astute** | `adjective` | 기민한 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 187 | **beneficent** | `adjective` | 인정 많은 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 188 | **compact** | `adjective` | 소형의 | 조밀한 | easy | **A** | `GENUINE_POLYSEMY` | `unknown` | `미검토` |
| 189 | **congenial** | `adjective` | 마음이 맞는 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 190 | **daring** | `adjective` | 대담한 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 191 | **deadly** | `adjective` | 치명적인 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 192 | **dim** | `adjective` | 어둑한 | - | easy | **B** | `B_GRADE` | `unknown` | `미검토` |
| 193 | **disastrous** | `adjective` | 재난의 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 194 | **allegedly** | `adverb` | 주장에 의하면 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 195 | **conspicuously** | `adverb` | 눈에 띄게 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 196 | **desperately** | `adverb` | 절박하게 | - | medium | **B** | `B_GRADE` | `unknown` | `미검토` |
| 197 | **eloquently** | `adverb` | 웅변으로 | - | hard | **B** | `B_GRADE` | `unknown` | `미검토` |
| 198 | **at one's disposal** | `phrase` | ~의 뜻대로 이용할 수 있는 | - | hard | **A** | `HARD_PHRASAL_OR_EXPR` | `unknown` | `미검토` |
