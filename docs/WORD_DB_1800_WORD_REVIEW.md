# 보카 스터디 — DB-03 1,800 기본 어휘 사람 검토 문서 (WORD_REVIEW)

## 0. 개요 및 검토 가이드라인

- **문서 목적**: DB-03 확장을 통해 새롭게 추가된 신규 1,300개 어휘(단일 단어 1,060개, 구동사 140개, 표현 100개) 및 B등급 어휘(168개)의 품사, 뜻, 난이도, 공식 공개 근거를 전수 검토하기 위한 공식 문서입니다.
- **데이터베이스 버전**: `databaseVersion: 3` (`schemaVersion: 1`)
- **총 단어 수**: 1,800개 (기준선 500개 100% 동결 보존 + 신규 1,300개 추가)
- **C등급 단어 포함 수**: **0개 (100% 배제)**
- **공식 출처 검증 어휘 수**: 406개
- **검토 우선순위**:
  1. **B등급 어휘(168개)**: 상대적으로 난이도가 높거나 문맥 의존성이 있는 어휘군
  2. **구동사(140개) 및 표현(100개)**: 다의어 충돌 및 공통 숙어 해석의 명확성
  3. **신규 단일 명사/동사/형용사/부사**: 대표 뜻의 명확성 및 출제 안전성

---

## 1. B등급 어휘 전수 집중 검토 목록 (총 168개)

B등급 어휘는 토익 시험에 출제되나 복합적이거나 고급 어휘군으로 분류된 항목입니다.

| 번호 | 표제어 (Word) | 품사 (POS) | 대표 뜻 | 추가 뜻 | 난이도 | 주제군 | 공식 근거 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **probation** | `noun` | 수습기간 | 시험기간 | hard | 채용/인사 | `unknown` |
| 2 | **headcount** | `noun` | 인원수 | 총인원 | medium | 채용/인사 | `unknown` |
| 3 | **adjourn** | `verb` | 휴회하다 | 중단하다 | hard | 회의/일정 | `unknown` |
| 4 | **dividend** | `noun` | 배당금 | - | hard | 금융/회계 | `unknown` |
| 5 | **demographic** | `noun` | 인구집단 | 고객층 | hard | 판매/마케팅 | `unknown` |
| 6 | **requisition** | `noun` | 요청서 | 신청서 | hard | 구매/주문 | `unknown` |
| 7 | **in_transit** | `adverb` | 수송중에 | 운송도중에 | medium | 배송/물류 | `unknown` |
| 8 | **impeccably** | `adverb` | 흠잡을데없이 | 완벽하게 | hard | 호텔/식당, 고객서비스 | `unknown` |
| 9 | **delicacy** | `noun` | 별미 | 진미 | hard | 호텔/식당 | `unknown` |
| 10 | **helpline** | `noun` | 상담전화 | 고객상담선 | easy | 고객서비스 | `unknown` |
| 11 | **specimen** | `noun` | 표본 | 견본 | hard | 생산/제조 | `unknown` |
| 12 | **admire** | `verb` | 칭찬하다 | 감탄하다, 존경하다 | easy | 일반 | `unknown` |
| 13 | **compose** | `verb` | 구성하다 | 작성하다, 작곡하다 | medium | 회사/사무, 일반 | `unknown` |
| 14 | **conserve** | `verb` | 보존하다 | 절약하다, 아끼다 | medium | 시설/건물, 일반 | `unknown` |
| 15 | **discourage** | `verb` | 단념시키다 | 만류하다, 낙담시키다 | hard | 채용/인사, 일반 | `unknown` |
| 16 | **illustrate** | `verb` | 설명하다 | 예시하다, 삽화를넣다 | medium | 교육/행사, 회의/일정 | `unknown` |
| 17 | **inaugurate** | `verb` | 취임시키다 | 개관하다, 시작하다 | hard | 교육/행사, 회사/사무 | `unknown` |
| 18 | **overlook** | `verb` | 간과하다 | 내려다보다, 눈감아주다 | hard | 회사/사무, 시설/건물 | `unknown` |
| 19 | **persist** | `verb` | 지속하다 | 고집하다, 잔존하다 | hard | 일반 | `unknown` |
| 20 | **appreciative** | `adjective` | 감사하는 | 고마워하는, 진가를 아는 | hard | 고객서비스, 일반 | `unknown` |
| 21 | **eager** | `adjective` | 열의를 보이는 | 열망하는, 간절한 | medium | 채용/인사, 일반 | `unknown` |
| 22 | **exemplary** | `adjective` | 모범적인 | 전형적인, 본보기가 되는 | hard | 채용/인사, 회사/사무 | `unknown` |
| 23 | **generous** | `adjective` | 관대한 | 후한, 넉넉한 | medium | 고객서비스, 일반 | `unknown` |
| 24 | **incredible** | `adjective` | 놀라운 | 믿기 힘든, 엄청난 | easy | 판매/마케팅, 일반 | `unknown` |
| 25 | **legitimate** | `adjective` | 정당한 | 적법한, 합법적인 | hard | 회사/사무, 금융/회계 | `unknown` |
| 26 | **modest** | `adjective` | 겸손한 | 적당한, 크지 않은 | medium | 금융/회계, 일반 | `unknown` |
| 27 | **optimistic** | `adjective` | 낙관적인 | 희망찬, 긍정적인 | medium | 금융/회계, 일반 | `unknown` |
| 28 | **persistent** | `adjective` | 지속적인 | 끈질긴, 고집하는 | hard | 고객서비스, 일반 | `unknown` |
| 29 | **prosperous** | `adjective` | 번영하는 | 번창하는, 성공한 | hard | 금융/회계, 회사/사무 | `unknown` |
| 30 | **redundant** | `adjective` | 불필요한 | 중복된, 정리해고된 | hard | 생산/제조, 채용/인사 | `unknown` |
| 31 | **reluctant** | `adjective` | 꺼리는 | 마지못해 하는, 주저하는 | hard | 채용/인사, 일반 | `unknown` |
| 32 | **unconditional** | `adjective` | 무조건적인 | 절대적인, 무제한의 | hard | 구매/주문, 고객서비스 | `unknown` |
| 33 | **versatile** | `adjective` | 다재다능한 | 다용도의, 변하기 쉬운 | hard | 채용/인사, 기술/장비 | `unknown` |
| 34 | **adversely** | `adverb` | 불리하게 | 역으로 | hard | 금융/회계, 회사/사무 | `unknown` |
| 35 | **decisively** | `adverb` | 결정적으로 | 단호하게 | hard | 회의/일정, 회사/사무 | `unknown` |
| 36 | **deliberately** | `adverb` | 의도적으로 | 신중하게 | hard | 회사/사무, 일반 | `unknown` |
| 37 | **inadvertently** | `adverb` | 부주의로 | 무심코, 우연히 | hard | 고객서비스, 회사/사무 | `unknown` |
| 38 | **intensely** | `adverb` | 강렬하게 | 열렬히 | hard | 교육/행사, 일반 | `unknown` |
| 39 | **moderately** | `adverb` | 적당히 | 알맞게, 온건하게 | medium | 금융/회계, 일반 | `unknown` |
| 40 | **predominantly** | `adverb` | 주로 | 대부분 | hard | 판매/마케팅, 회사/사무 | `unknown` |
| 41 | **scarcely** | `adverb` | 거의 ~않다 | 겨우, 간신히 | hard | 일반 | `unknown` |
| 42 | **catalyst** | `noun` | 계기 | 촉매, 자극제 | hard | 회사/사무, 일반 | `unknown` |
| 43 | **drawback** | `noun` | 단점 | 결점, 환급 | hard | 회사/사무, 일반 | `unknown` |
| 44 | **excursion** | `noun` | 소풍 | 유람, 견학 | medium | 여행/교통, 교육/행사 | `unknown` |
| 45 | **increment** | `noun` | 증가 | 증분, 인상 | hard | 금융/회계, 채용/인사 | `unknown` |
| 46 | **persistence** | `noun` | 끈기 | 지속, 완고함 | hard | 채용/인사, 일반 | `unknown` |
| 47 | **allegation** | `noun` | 주장 | 진술, 혐의 | hard | 회사/사무, 일반 | `unknown` |
| 48 | **arbitrator** | `noun` | 중재인 | 조정자 | hard | 회사/사무, 회의/일정 | `unknown` |
| 49 | **bureaucracy** | `noun` | 관료제 | 관료 체계 | hard | 회사/사무 | `unknown` |
| 50 | **cohort** | `noun` | 집단 | 동료 그룹 | hard | 채용/인사, 교육/행사 | `unknown` |
| 51 | **commander** | `noun` | 지휘관 | 사령관 | medium | 회사/사무, 일반 | `unknown` |
| 52 | **composer** | `noun` | 작곡가 | 작성자 | medium | 교육/행사, 일반 | `unknown` |
| 53 | **curator** | `noun` | 기획관리원 | 박물관 학예사 | hard | 교육/행사, 시설/건물 | `unknown` |
| 54 | **custodian** | `noun` | 관리인 | 수탁기관 | hard | 시설/건물, 금융/회계 | `unknown` |
| 55 | **enthusiast** | `noun` | 애호가 | 열성신봉자 | medium | 판매/마케팅, 일반 | `unknown` |
| 56 | **envoy** | `noun` | 특사 | 공사, 전령 | hard | 회사/사무 | `unknown` |
| 57 | **executor** | `noun` | 집행관 | 유언집행자 | hard | 회사/사무, 일반 | `unknown` |
| 58 | **governor** | `noun` | 주지사 | 총재, 운영위원 | hard | 회사/사무 | `unknown` |
| 59 | **immigrant** | `noun` | 이주민 | 이민자 | medium | 일반 | `unknown` |
| 60 | **informant** | `noun` | 정보제공자 | 통보자 | hard | 회사/사무, 일반 | `unknown` |
| 61 | **magistrate** | `noun` | 치안판사 | 행정관 | hard | 회사/사무 | `unknown` |
| 62 | **minister** | `noun` | 장관 | 성직자 | medium | 회사/사무, 일반 | `unknown` |
| 63 | **premier** | `noun` | 수상 | 국무총리 | hard | 회사/사무 | `unknown` |
| 64 | **scholar** | `noun` | 학자 | 연구가 | medium | 교육/행사 | `unknown` |
| 65 | **superintendent** | `noun` | 관리소장 | 총감독관 | hard | 시설/건물, 회사/사무 | `unknown` |
| 66 | **trustee** | `noun` | 수탁관리인 | 이사위원 | hard | 금융/회계, 회사/사무 | `unknown` |
| 67 | **veteran** | `noun` | 베테랑실무자 | 퇴역군인 | medium | 채용/인사, 일반 | `unknown` |
| 68 | **circular** | `noun` | 안내회람 | 회보 | hard | 회사/사무, 회의/일정 | `unknown` |
| 69 | **covenant** | `noun` | 서약규약 | 계약서약 | hard | 회사/사무, 금융/회계 | `unknown` |
| 70 | **decree** | `noun` | 법령 | 포고령 | hard | 회사/사무, 일반 | `unknown` |
| 71 | **disposition** | `noun` | 기질 | 배치, 처분 | hard | 채용/인사, 일반 | `unknown` |
| 72 | **enactment** | `noun` | 입법제정 | 법률발효 | hard | 회사/사무, 일반 | `unknown` |
| 73 | **manuscript** | `noun` | 원고 | 필사본 | medium | 회사/사무, 교육/행사 | `unknown` |
| 74 | **synopsis** | `noun` | 개요서 | 줄거리 | hard | 회사/사무, 교육/행사 | `unknown` |
| 75 | **treaty** | `noun` | 공식조약 | 협정체결문 | hard | 회사/사무, 일반 | `unknown` |
| 76 | **debenture** | `noun` | 무담보회사채 | 채무증서 | hard | 금융/회계 | `unknown` |
| 77 | **depression** | `noun` | 경기침체 | 우울증 | medium | 금융/회계, 일반 | `unknown` |
| 78 | **lien** | `noun` | 유치권 | 우선저당권 | hard | 금융/회계, 구매/주문 | `unknown` |
| 79 | **solvent** | `noun` | 지급능력자 | 용매 | hard | 금융/회계, 생산/제조 | `unknown` |
| 80 | **dynamo** | `noun` | 발전기 | 에너지원 | hard | 기술/장비, 생산/제조 | `unknown` |
| 81 | **furnace** | `noun` | 가열화로 | 제련소 | hard | 생산/제조, 시설/건물 | `unknown` |
| 82 | **gadget** | `noun` | 소형기기 | 편리도구 | easy | 기술/장비, 판매/마케팅 | `unknown` |
| 83 | **girder** | `noun` | 대들보철골 | 지지대 | hard | 시설/건물, 생산/제조 | `unknown` |
| 84 | **lathe** | `noun` | 공작선반 | 선반기계 | hard | 생산/제조 | `unknown` |
| 85 | **locomotive** | `noun` | 기관차 | 철도동력차 | medium | 여행/교통, 생산/제조 | `unknown` |
| 86 | **mill** | `noun` | 방적분쇄공장 | 제재소 | medium | 생산/제조 | `unknown` |
| 87 | **scaffold** | `noun` | 건축비계 | 임시발판 | hard | 시설/건물, 생산/제조 | `unknown` |
| 88 | **boutique** | `noun` | 전문의류매장 | 부티크 | easy | 판매/마케팅, 호텔/식당 | `unknown` |
| 89 | **carriage** | `noun` | 객차차량 | 운송료 | medium | 여행/교통, 배송/물류 | `unknown` |
| 90 | **eatery** | `noun` | 음식점 | 대중식당 | easy | 호텔/식당 | `unknown` |
| 91 | **gala** | `noun` | 축하공연행사 | 갈라쇼 | medium | 교육/행사, 호텔/식당 | `unknown` |
| 92 | **gourmet** | `noun` | 미식요리 | 미식가 | medium | 호텔/식당 | `unknown` |
| 93 | **stall** | `noun` | 간이매대 | 마구간 | easy | 판매/마케팅, 시설/건물 | `unknown` |
| 94 | **voyage** | `noun` | 해외항해 | 원정여행 | medium | 여행/교통 | `unknown` |
| 95 | **accustom** | `verb` | 익숙하게하다 | 길들이다 | hard | 회사/사무, 일반 | `unknown` |
| 96 | **advocate** | `verb` | 옹호하다 | 주장하다 | medium | 회사/사무, 일반 | `unknown` |
| 97 | **apprehend** | `verb` | 파악하다 | 체포하다, 걱정하다 | hard | 회사/사무, 일반 | `unknown` |
| 98 | **assimilate** | `verb` | 동화시키다 | 흡수하다 | hard | 회사/사무, 교육/행사 | `unknown` |
| 99 | **delineate** | `verb` | 상세히 기술하다 | 윤곽을 그리다 | hard | 회사/사무, 생산/제조 | `unknown` |
| 100 | **deter** | `verb` | 단념시키다 | 저지하다 | hard | 안전/보건, 회사/사무 | `unknown` |
| 101 | **disperse** | `verb` | 해산시키다 | 분산하다 | hard | 안전/보건, 생산/제조 | `unknown` |
| 102 | **encompass** | `verb` | 망라하다 | 포함하다 | hard | 회사/사무 | `unknown` |
| 103 | **enlist** | `verb` | 요청하여 얻다 | 입대하다 | hard | 회사/사무, 채용/인사 | `unknown` |
| 104 | **govern** | `verb` | 통치하다 | 지배규율하다 | medium | 회사/사무 | `unknown` |
| 105 | **intercept** | `verb` | 가로채다 | 차단하다 | hard | 기술/장비, 배송/물류 | `unknown` |
| 106 | **intervene** | `verb` | 개입하다 | 중재하다 | hard | 회의/일정, 회사/사무 | `unknown` |
| 107 | **legislate** | `verb` | 법률을 제정하다 | 입법하다 | hard | 회사/사무 | `unknown` |
| 108 | **magnify** | `verb` | 확대하다 | 과장하다 | medium | 기술/장비, 일반 | `unknown` |
| 109 | **neutralize** | `verb` | 무력화하다 | 중화하다 | hard | 생산/제조, 안전/보건 | `unknown` |
| 110 | **nullify** | `verb` | 무효화하다 | 파기하다 | hard | 회사/사무, 금융/회계 | `unknown` |
| 111 | **orchestrate** | `verb` | 조직화하다 | 치밀하게 계획하다 | hard | 회사/사무, 판매/마케팅 | `unknown` |
| 112 | **outlaw** | `verb` | 불법화하다 | 금지하다 | hard | 회사/사무 | `unknown` |
| 113 | **perpetuate** | `verb` | 영속시키다 | 이어지게하다 | hard | 회사/사무 | `unknown` |
| 114 | **portray** | `verb` | 그리다 | 묘사하다 | medium | 판매/마케팅, 일반 | `unknown` |
| 115 | **proliferate** | `verb` | 급증하다 | 확산하다 | hard | 판매/마케팅, 기술/장비 | `unknown` |
| 116 | **propagate** | `verb` | 전파하다 | 번식시키다 | hard | 기술/장비, 판매/마케팅 | `unknown` |
| 117 | **prosecute** | `verb` | 기소하다 | 수행하다 | hard | 회사/사무 | `unknown` |
| 118 | **punctuate** | `verb` | 구두점을 찍다 | 중단시키다 | hard | 회사/사무 | `unknown` |
| 119 | **reciprocate** | `verb` | 화답하다 | 보답하다, 왕복운동하다 | hard | 고객서비스, 회사/사무 | `unknown` |
| 120 | **reckon** | `verb` | 계산하다 | 생각하다 | medium | 금융/회계, 일반 | `unknown` |
| 121 | **rekindle** | `verb` | 다시 불붙이다 | 되살리다 | hard | 판매/마케팅, 일반 | `unknown` |
| 122 | **revamp** | `verb` | 개정수선하다 | 대대적으로 바꾸다 | hard | 생산/제조, 판매/마케팅 | `unknown` |
| 123 | **salvage** | `verb` | 구출구난하다 | 폐품을 이용하다 | hard | 배송/물류, 생산/제조 | `unknown` |
| 124 | **testify** | `verb` | 증언하다 | 입증하다 | hard | 회사/사무 | `unknown` |
| 125 | **boil down to** | `verb` | 결국 ~이 되다 | 요약되다 | hard | 회의/일정, 회사/사무 | `unknown` |
| 126 | **break out** | `verb` | 발발하다 | 탈출하다 | medium | 안전/보건 | `unknown` |
| 127 | **come down with** | `verb` | 병에 걸리다 | 앓아눕다 | medium | 의료/건강, 채용/인사 | `unknown` |
| 128 | **come into** | `verb` | 물려받다 | 들어가다 | medium | 금융/회계, 일반 | `unknown` |
| 129 | **drop out** | `verb` | 중퇴하다 | 탈락하다 | medium | 교육/행사, 채용/인사 | `unknown` |
| 130 | **face up to** | `verb` | 직시하다 | 인정하고 맞서다 | hard | 회사/사무, 금융/회계 | `unknown` |
| 131 | **get by** | `verb` | 그럭저럭 살아가다 | 통과하다 | medium | 금융/회계, 일반 | `unknown` |
| 132 | **give in** | `verb` | 굴복하다 | 제출하다 | medium | 회의/일정, 회사/사무 | `unknown` |
| 133 | **grow out of** | `verb` | 벗어나다 | 원인이 되다 | medium | 생산/제조, 일반 | `unknown` |
| 134 | **look down on** | `verb` | 깔보다 | 얕보다 | hard | 채용/인사 | `unknown` |
| 135 | **pass out** | `verb` | 기절하다 | 배포하다 | medium | 교육/행사, 의료/건강 | `unknown` |
| 136 | **pull through** | `verb` | 회복하다 | 극복하다 | hard | 금융/회계, 의료/건강 | `unknown` |
| 137 | **allergic** | `adjective` | 알레르기가 있는 | 몹시 싫어하는 | medium | 의료/건강, 호텔/식당 | `unknown` |
| 138 | **amiable** | `adjective` | 상냥한 | 붙임성 있는 | medium | 채용/인사, 고객서비스 | `unknown` |
| 139 | **chronic** | `adjective` | 만성적인 | 장기적인 | medium | 의료/건강, 생산/제조 | `unknown` |
| 140 | **cognitive** | `adjective` | 인식의 | 인지적인 | hard | 교육/행사, 기술/장비 | `unknown` |
| 141 | **conspicuous** | `adjective` | 눈에 띄는 | 뚜렷한 | hard | 판매/마케팅, 일반 | `unknown` |
| 142 | **cordial** | `adjective` | 다정한 | 진심 어린 | medium | 고객서비스, 호텔/식당 | `unknown` |
| 143 | **desperate** | `adjective` | 필사적인 | 자포자기의 | medium | 일반 | `unknown` |
| 144 | **expedient** | `adjective` | 방편의 | 유리한 | hard | 회사/사무 | `unknown` |
| 145 | **formidable** | `adjective` | 어마어마한 | 만만찮은 | hard | 판매/마케팅, 회사/사무 | `unknown` |
| 146 | **frugal** | `adjective` | 절약하는 | 소박한 | medium | 금융/회계, 일반 | `unknown` |
| 147 | **indifferent** | `adjective` | 무관심한 | 그저 그런 | medium | 고객서비스, 채용/인사 | `unknown` |
| 148 | **perpetual** | `adjective` | 영속하는 | 끊임없는 | hard | 회사/사무, 금융/회계 | `unknown` |
| 149 | **rudimentary** | `adjective` | 기초적인 | 초보적인 | hard | 생산/제조, 기술/장비 | `unknown` |
| 150 | **serene** | `adjective` | 평온한 | 맑게 갠 | medium | 호텔/식당, 여행/교통 | `unknown` |
| 151 | **supreme** | `adjective` | 최고의 | 궁극의 | medium | 회사/사무, 일반 | `unknown` |
| 152 | **tedious** | `adjective` | 지루한 | 단조로운 | medium | 회사/사무, 생산/제조 | `unknown` |
| 153 | **turbulent** | `adjective` | 격동의 | 난기류의 | hard | 여행/교통, 금융/회계 | `unknown` |
| 154 | **volatile** | `adjective` | 변덕스러운 | 휘발성의, 불안정한 | hard | 금융/회계, 생산/제조 | `unknown` |
| 155 | **aesthetic** | `adjective` | 미적인 | 심미적인 | medium | 생산/제조, 판매/마케팅 | `unknown` |
| 156 | **affluent** | `adjective` | 부유한 | 풍요로운 | medium | 금융/회계, 일반 | `unknown` |
| 157 | **arduous** | `adjective` | 몹시 힘든 | 고된 | hard | 생산/제조, 채용/인사 | `unknown` |
| 158 | **astute** | `adjective` | 기민한 | 약삭빠른 | hard | 채용/인사, 금융/회계 | `unknown` |
| 159 | **beneficent** | `adjective` | 인정 많은 | 자비로운 | hard | 채용/인사 | `unknown` |
| 160 | **congenial** | `adjective` | 마음이 맞는 | 쾌적한 | hard | 채용/인사, 호텔/식당 | `unknown` |
| 161 | **daring** | `adjective` | 대담한 | 용감한 | medium | 판매/마케팅 | `unknown` |
| 162 | **deadly** | `adjective` | 치명적인 | 극도의 | medium | 안전/보건 | `unknown` |
| 163 | **dim** | `adjective` | 어둑한 | 흐릿한 | easy | 시설/건물 | `unknown` |
| 164 | **disastrous** | `adjective` | 재난의 | 비참한 | hard | 안전/보건, 금융/회계 | `unknown` |
| 165 | **allegedly** | `adverb` | 주장에 의하면 | 전해지는 바에 따르면 | hard | 회사/사무 | `unknown` |
| 166 | **conspicuously** | `adverb` | 눈에 띄게 | 현저히 | hard | 판매/마케팅, 일반 | `unknown` |
| 167 | **desperately** | `adverb` | 절박하게 | 필사적으로 | medium | 일반 | `unknown` |
| 168 | **eloquently** | `adverb` | 웅변으로 | 설득력 있게 | hard | 회의/일정, 교육/행사 | `unknown` |

---

## 2. 신규 1,300개 어휘 전수 목록

기존 동결 기준선 500개 외에 DB-03에서 새롭게 증설된 1,300개 어휘 전수 목록입니다.

| 번호 | 표제어 (Word) | 품사 (POS) | 대표 뜻 | 추가 뜻 | 난이도 | 등급 | 주제군 | 공식 근거 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **accountant** | `noun` | 회계사 | 경리 담당자 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 2 | **achievement** | `noun` | 업적 | 성취, 달성 | easy | **A** | 회사/사무, 채용/인사 | `unknown` |
| 3 | **acknowledgement** | `noun` | 확인 | 수령 통지, 인정 | medium | **A** | 회사/사무, 고객서비스 | `unknown` |
| 4 | **acquisition** | `noun` | 인수 | 습득, 획득 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 5 | **administration** | `noun` | 행정 | 관리, 운영진 | medium | **A** | 회사/사무 | `verified` |
| 6 | **advisor** | `noun` | 고문 | 자문위원, 상담사 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 7 | **affiliate** | `noun` | 계열사 | 지부, 제휴처 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 8 | **agency** | `noun` | 대행사 | 대리점, 정부 기관 | easy | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 9 | **agent** | `noun` | 대리인 | 중개인, 직원 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 10 | **allegation** | `noun` | 주장 | 진술, 혐의 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 11 | **alliance** | `noun` | 동맹 | 제휴, 연합 | medium | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 12 | **ambition** | `noun` | 야망 | 포부, 의욕 | medium | **A** | 채용/인사, 일반 | `unknown` |
| 13 | **analyst** | `noun` | 분석가 | 분석관 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 14 | **apprentice** | `noun` | 수습생 | 견습생 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 15 | **arbitrator** | `noun` | 중재인 | 조정자 | hard | **B** | 회사/사무, 회의/일정 | `unknown` |
| 16 | **archive** | `noun` | 기록보관소 | 공문서집 | medium | **A** | 회사/사무, 기술/장비 | `unknown` |
| 17 | **aspiration** | `noun` | 열망 | 포부, 염원 | medium | **A** | 채용/인사, 일반 | `unknown` |
| 18 | **assistant** | `noun` | 보조원 | 조수, 비서 | easy | **A** | 회사/사무, 채용/인사 | `unknown` |
| 19 | **attorney** | `noun` | 변호사 | 법률대리인 | easy | **A** | 회사/사무, 일반 | `unknown` |
| 20 | **authority** | `noun` | 권한 | 당국, 권위자 | medium | **A** | 회사/사무, 일반 | `verified` |
| 21 | **autonomy** | `noun` | 자율성 | 자치권 | hard | **A** | 회사/사무, 채용/인사 | `unknown` |
| 22 | **benchmark** | `noun` | 기준점 | 표준 지표 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 23 | **beneficiary** | `noun` | 수혜자 | 수익자 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 24 | **board** | `noun` | 이사회 | 게시판, 판자 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 25 | **boss** | `noun` | 상사 | 대표, 책임자 | easy | **A** | 회사/사무, 채용/인사 | `unknown` |
| 26 | **branch** | `noun` | 지점 | 분점, 나뭇가지 | easy | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 27 | **brand** | `noun` | 상표 | 브랜드, 낙인 | easy | **A** | 판매/마케팅, 회사/사무 | `verified` |
| 28 | **bureaucracy** | `noun` | 관료제 | 관료 체계 | hard | **B** | 회사/사무 | `unknown` |
| 29 | **capability** | `noun` | 역량 | 능력, 수용능력 | medium | **A** | 채용/인사, 생산/제조 | `unknown` |
| 30 | **career** | `noun` | 경력 | 이력, 직업 | easy | **A** | 채용/인사, 교육/행사 | `verified` |
| 31 | **chairman** | `noun` | 위원장 | 의장, 회장 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 32 | **clerk** | `noun` | 점원 | 서기, 직원 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 33 | **cohort** | `noun` | 집단 | 동료 그룹 | hard | **B** | 채용/인사, 교육/행사 | `unknown` |
| 34 | **commander** | `noun` | 지휘관 | 사령관 | medium | **B** | 회사/사무, 일반 | `unknown` |
| 35 | **commissioner** | `noun` | 위원 | 청장, 국장 | hard | **A** | 회사/사무 | `unknown` |
| 36 | **committee** | `noun` | 위원회 | 수임위원단 | easy | **A** | 회사/사무, 회의/일정 | `unknown` |
| 37 | **community** | `noun` | 지역사회 | 공동체 | easy | **A** | 일반, 회사/사무 | `unknown` |
| 38 | **competency** | `noun` | 핵심역량 | 자격요건 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 39 | **competitor** | `noun` | 경쟁사 | 경쟁자 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 40 | **composer** | `noun` | 작곡가 | 작성자 | medium | **B** | 교육/행사, 일반 | `unknown` |
| 41 | **consultant** | `noun` | 전문 자문가 | 컨설턴트 | easy | **A** | 회사/사무, 고객서비스 | `unknown` |
| 42 | **contractor** | `noun` | 수급업체 | 계약자 | medium | **A** | 구매/주문, 시설/건물 | `unknown` |
| 43 | **coordinator** | `noun` | 조정관 | 진행관리자 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 44 | **corporation** | `noun` | 법인 | 기업, 주식회사 | easy | **A** | 회사/사무, 금융/회계 | `unknown` |
| 45 | **counselor** | `noun` | 상담사 | 법률고문 | medium | **A** | 채용/인사, 고객서비스 | `unknown` |
| 46 | **crew** | `noun` | 직원 승무원 | 작업팀, 승무원단 | easy | **A** | 여행/교통, 생산/제조 | `unknown` |
| 47 | **curator** | `noun` | 기획관리원 | 박물관 학예사 | hard | **B** | 교육/행사, 시설/건물 | `unknown` |
| 48 | **custodian** | `noun` | 관리인 | 수탁기관 | hard | **B** | 시설/건물, 금융/회계 | `unknown` |
| 49 | **customer** | `noun` | 고객 | 손님, 의뢰인 | easy | **A** | 고객서비스, 판매/마케팅 | `verified` |
| 50 | **delegate** | `noun` | 대표자 | 파견의원 | medium | **A** | 회의/일정, 교육/행사 | `unknown` |
| 51 | **director** | `noun` | 이사 | 부서장, 감독 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 52 | **dispatch** | `noun` | 파견 | 발송, 특파 | medium | **A** | 배송/물류, 회사/사무 | `unknown` |
| 53 | **employee** | `noun` | 직원 | 고용원, 피고용자 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 54 | **employer** | `noun` | 고용주 | 기업주, 사용자 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 55 | **enthusiast** | `noun` | 애호가 | 열성신봉자 | medium | **B** | 판매/마케팅, 일반 | `unknown` |
| 56 | **entrepreneur** | `noun` | 창업가 | 기업가 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 57 | **envoy** | `noun` | 특사 | 공사, 전령 | hard | **B** | 회사/사무 | `unknown` |
| 58 | **equity** | `noun` | 자기자본 | 순자산, 형평성 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 59 | **evaluator** | `noun` | 평가관 | 심사위원 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 60 | **executor** | `noun` | 집행관 | 유언집행자 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 61 | **expert** | `noun` | 전문가 | 숙련자 | easy | **A** | 채용/인사, 기술/장비 | `verified` |
| 62 | **facilitator** | `noun` | 진행자 | 조력자 | medium | **A** | 교육/행사, 회의/일정 | `unknown` |
| 63 | **founder** | `noun` | 설립자 | 창업주 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 64 | **governor** | `noun` | 주지사 | 총재, 운영위원 | hard | **B** | 회사/사무 | `unknown` |
| 65 | **head** | `noun` | 책임자 | 우두머리, 머리 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 66 | **hire** | `noun` | 신규채용자 | 고용 | easy | **A** | 채용/인사, 회사/사무 | `unknown` |
| 67 | **immigrant** | `noun` | 이주민 | 이민자 | medium | **B** | 일반 | `unknown` |
| 68 | **informant** | `noun` | 정보제공자 | 통보자 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 69 | **innovator** | `noun` | 혁신가 | 선구자 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 70 | **inspector** | `noun` | 검사관 | 점검관 | easy | **A** | 생산/제조, 시설/건물 | `verified` |
| 71 | **intern** | `noun` | 실습생 | 인턴 | easy | **A** | 채용/인사, 교육/행사 | `unknown` |
| 72 | **investigator** | `noun` | 조사관 | 수사관 | medium | **A** | 고객서비스, 회사/사무 | `unknown` |
| 73 | **investor** | `noun` | 투자자 | 출자자 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 74 | **judge** | `noun` | 판사 | 심판, 감정인 | easy | **A** | 회사/사무, 교육/행사 | `unknown` |
| 75 | **leader** | `noun` | 지도자 | 대표, 선구자 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 76 | **liaison** | `noun` | 연락담당자 | 대외협력선 | hard | **A** | 회사/사무, 고객서비스 | `unknown` |
| 77 | **magistrate** | `noun` | 치안판사 | 행정관 | hard | **B** | 회사/사무 | `unknown` |
| 78 | **master** | `noun` | 전문장인 | 주인, 원형 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 79 | **mentor** | `noun` | 지도교사 | 조언자 | easy | **A** | 채용/인사, 교육/행사 | `unknown` |
| 80 | **minister** | `noun` | 장관 | 성직자 | medium | **B** | 회사/사무, 일반 | `unknown` |
| 81 | **negotiator** | `noun` | 협상가 | 교섭위원 | medium | **A** | 회의/일정, 구매/주문 | `unknown` |
| 82 | **officer** | `noun` | 임원직원 | 책임자, 경관 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 83 | **organizer** | `noun` | 행사기획자 | 주최측 | easy | **A** | 교육/행사, 회의/일정 | `unknown` |
| 84 | **partner** | `noun` | 동업자 | 파트너, 협력사 | easy | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 85 | **peer** | `noun` | 동료 | 동향인 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 86 | **pioneer** | `noun` | 선구자 | 개척자 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 87 | **practitioner** | `noun` | 실무자 | 개업의사 | hard | **A** | 채용/인사, 회사/사무 | `unknown` |
| 88 | **predecessor** | `noun` | 전임자 | 선배 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 89 | **premier** | `noun` | 수상 | 국무총리 | hard | **B** | 회사/사무 | `unknown` |
| 90 | **president** | `noun` | 대표이사 | 대통령, 총장 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 91 | **principal** | `noun` | 원금 | 교장, 주요인물 | medium | **A** | 금융/회계, 교육/행사 | `unknown` |
| 92 | **professor** | `noun` | 교수 | 강의자 | easy | **A** | 교육/행사, 채용/인사 | `unknown` |
| 93 | **professional** | `noun` | 전문직종사자 | 프로선수 | easy | **A** | 채용/인사, 회사/사무 | `unknown` |
| 94 | **proprietor** | `noun` | 소유주 | 자영업주 | medium | **A** | 판매/마케팅, 호텔/식당 | `unknown` |
| 95 | **recruiter** | `noun` | 채용담당자 | 스카우터 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 96 | **regulator** | `noun` | 규제기관 | 조절기 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 97 | **researcher** | `noun` | 연구원 | 조사원 | easy | **A** | 기술/장비, 회사/사무 | `verified` |
| 98 | **scholar** | `noun` | 학자 | 연구가 | medium | **B** | 교육/행사 | `unknown` |
| 99 | **secretary** | `noun` | 비서 | 간사, 장관 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 100 | **specialist** | `noun` | 전문인력 | 전문의 | easy | **A** | 채용/인사, 기술/장비 | `verified` |
| 101 | **sponsor** | `noun` | 후원사 | 보증인 | easy | **A** | 판매/마케팅, 교육/행사 | `verified` |
| 102 | **stakeholder** | `noun` | 이해관계자 | 주주연합 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 103 | **subordinate** | `noun` | 부하직원 | 하급자 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 104 | **successor** | `noun` | 후임자 | 계승자 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 105 | **superintendent** | `noun` | 관리소장 | 총감독관 | hard | **B** | 시설/건물, 회사/사무 | `unknown` |
| 106 | **supervisor** | `noun` | 주임관리자 | 감독관 | easy | **A** | 채용/인사, 생산/제조 | `verified` |
| 107 | **trainee** | `noun` | 연수생 | 수습직원 | easy | **A** | 채용/인사, 교육/행사 | `unknown` |
| 108 | **trustee** | `noun` | 수탁관리인 | 이사위원 | hard | **B** | 금융/회계, 회사/사무 | `unknown` |
| 109 | **veteran** | `noun` | 베테랑실무자 | 퇴역군인 | medium | **B** | 채용/인사, 일반 | `unknown` |
| 110 | **volunteer** | `noun` | 자원봉사자 | 지원자 | easy | **A** | 교육/행사, 일반 | `unknown` |
| 111 | **worker** | `noun` | 근로자 | 직원, 일꾼 | easy | **A** | 채용/인사, 생산/제조 | `unknown` |
| 112 | **bulletin** | `noun` | 공보 | 회보, 속보판 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 113 | **calendar** | `noun` | 일정표 | 달력 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 114 | **checklist** | `noun` | 점검표 | 확인목록 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 115 | **circular** | `noun` | 안내회람 | 회보 | hard | **B** | 회사/사무, 회의/일정 | `unknown` |
| 116 | **clause** | `noun` | 계약조항 | 조문 | medium | **A** | 구매/주문, 회사/사무 | `unknown` |
| 117 | **collaboration** | `noun` | 공동협력 | 합작 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 118 | **compilation** | `noun` | 모음집 | 편집자료 | hard | **A** | 회사/사무, 기술/장비 | `unknown` |
| 119 | **consultation** | `noun` | 상담자문 | 협의 | medium | **A** | 고객서비스, 회사/사무 | `unknown` |
| 120 | **covenant** | `noun` | 서약규약 | 계약서약 | hard | **B** | 회사/사무, 금융/회계 | `unknown` |
| 121 | **deadline** | `noun` | 마감기한 | 최종시한 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 122 | **decree** | `noun` | 법령 | 포고령 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 123 | **deliberation** | `noun` | 심의 | 숙고, 토의 | hard | **A** | 회의/일정, 회사/사무 | `unknown` |
| 124 | **dialogue** | `noun` | 대화교섭 | 대화록 | easy | **A** | 회의/일정, 고객서비스 | `unknown` |
| 125 | **directive** | `noun` | 업무지침 | 훈령 | hard | **A** | 회사/사무, 생산/제조 | `unknown` |
| 126 | **disposition** | `noun` | 기질 | 배치, 처분 | hard | **B** | 채용/인사, 일반 | `unknown` |
| 127 | **documentation** | `noun` | 증빙서류 | 문서화자료 | medium | **A** | 회사/사무, 기술/장비 | `unknown` |
| 128 | **draft** | `noun` | 초안 | 원고, 징집 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 129 | **duplicate** | `noun` | 복사본 | 사본 | medium | **A** | 회사/사무, 기술/장비 | `unknown` |
| 130 | **enactment** | `noun` | 입법제정 | 법률발효 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 131 | **excerpt** | `noun` | 발췌본 | 인용구 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 132 | **handbook** | `noun` | 업무편람 | 안내책자 | easy | **A** | 회사/사무, 교육/행사 | `verified` |
| 133 | **index** | `noun` | 색인 | 지표, 색인지수 | easy | **A** | 기술/장비, 금융/회계 | `unknown` |
| 134 | **instruction** | `noun` | 설명서 | 지침, 교육 | easy | **A** | 기술/장비, 생산/제조 | `verified` |
| 135 | **ledger** | `noun` | 원장 | 회계장부 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 136 | **log** | `noun` | 운항일지 | 기록부, 통나무 | easy | **A** | 배송/물류, 기술/장비 | `unknown` |
| 137 | **mandate** | `noun` | 위임권한 | 지시권 | hard | **A** | 회사/사무, 일반 | `unknown` |
| 138 | **manifest** | `noun` | 적하목록 | 승객명단 | hard | **A** | 배송/물류, 여행/교통 | `unknown` |
| 139 | **manual** | `noun` | 안내설명서 | 편람 | easy | **A** | 기술/장비, 생산/제조 | `verified` |
| 140 | **manuscript** | `noun` | 원고 | 필사본 | medium | **B** | 회사/사무, 교육/행사 | `unknown` |
| 141 | **memorandum** | `noun` | 사내회람 | 메모 | medium | **A** | 회사/사무, 회의/일정 | `verified` |
| 142 | **notification** | `noun` | 통지서 | 공지문 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 143 | **pamphlet** | `noun` | 소책자 | 홍보팸플릿 | easy | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 144 | **petition** | `noun` | 청원서 | 탄원서 | medium | **A** | 회사/사무, 일반 | `unknown` |
| 145 | **protocol** | `noun` | 행동수칙 | 통신규약 | medium | **A** | 기술/장비, 회사/사무 | `unknown` |
| 146 | **provision** | `noun` | 조항규정 | 지급, 공급 | medium | **A** | 구매/주문, 회사/사무 | `unknown` |
| 147 | **publication** | `noun` | 간행물 | 출판물 | easy | **A** | 교육/행사, 회사/사무 | `unknown` |
| 148 | **questionnaire** | `noun` | 설문조사지 | 질문지 | easy | **A** | 고객서비스, 판매/마케팅 | `unknown` |
| 149 | **record** | `noun` | 기록부 | 음반, 실적 | easy | **A** | 회사/사무, 금융/회계 | `unknown` |
| 150 | **register** | `noun` | 등록대장 | 명부 | easy | **A** | 교육/행사, 호텔/식당 | `unknown` |
| 151 | **registry** | `noun` | 등기소 | 등록기관 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 152 | **report** | `noun` | 보고서 | 성적표 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 153 | **roster** | `noun` | 근무명단 | 당직표 | medium | **A** | 채용/인사, 회의/일정 | `unknown` |
| 154 | **script** | `noun` | 대본 | 문자스크립트 | easy | **A** | 교육/행사, 기술/장비 | `unknown` |
| 155 | **stipulation** | `noun` | 명문화조항 | 약정조건 | hard | **A** | 구매/주문, 회사/사무 | `unknown` |
| 156 | **summary** | `noun` | 요약문 | 개요집 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 157 | **synopsis** | `noun` | 개요서 | 줄거리 | hard | **B** | 회사/사무, 교육/행사 | `unknown` |
| 158 | **transcript** | `noun` | 성적기록부 | 녹취록 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 159 | **treaty** | `noun` | 공식조약 | 협정체결문 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 160 | **voucher** | `noun` | 교환증명권 | 상품권 | easy | **A** | 판매/마케팅, 호텔/식당 | `unknown` |
| 161 | **waiver** | `noun` | 포기동의서 | 면제조항 | hard | **A** | 구매/주문, 시설/건물 | `unknown` |
| 162 | **account** | `noun` | 계좌 | 거래처, 설명 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 163 | **amortization** | `noun` | 할부상환 | 감가상각 | hard | **A** | 금융/회계 | `unknown` |
| 164 | **annuity** | `noun` | 연금지급금 | 정기연금 | hard | **A** | 금융/회계, 채용/인사 | `unknown` |
| 165 | **appreciation** | `noun` | 가치상승 | 감사 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 166 | **appropriation** | `noun` | 예산책정 | 세출할당 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 167 | **arrears** | `noun` | 연체금 | 미불금 | hard | **A** | 금융/회계, 구매/주문 | `unknown` |
| 168 | **bailout** | `noun` | 구제금융 | 긴급자금지원 | hard | **A** | 금융/회계 | `unknown` |
| 169 | **bond** | `noun` | 채권 | 유대감, 보증 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 170 | **capital** | `noun` | 자본금 | 수도, 대문자 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 171 | **cash** | `noun` | 현금 | 지폐 | easy | **A** | 금융/회계, 구매/주문 | `verified` |
| 172 | **circulation** | `noun` | 유통부수 | 순환, 발행부수 | medium | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 173 | **collateral** | `noun` | 담보물 | 보증저당 | hard | **A** | 금융/회계, 구매/주문 | `unknown` |
| 174 | **commerce** | `noun` | 통상상업 | 무역 | easy | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 175 | **currency** | `noun` | 외환통화 | 유통화폐 | easy | **A** | 금융/회계, 여행/교통 | `unknown` |
| 176 | **debenture** | `noun` | 무담보회사채 | 채무증서 | hard | **B** | 금융/회계 | `unknown` |
| 177 | **debit** | `noun` | 차변 | 직불출금 | easy | **A** | 금융/회계, 구매/주문 | `unknown` |
| 178 | **debt** | `noun` | 부채채무 | 빚 | easy | **A** | 금융/회계, 회사/사무 | `unknown` |
| 179 | **default** | `noun` | 채무불이행 | 기본값 | medium | **A** | 금융/회계, 기술/장비 | `unknown` |
| 180 | **deposit** | `noun` | 보증금 | 예금, 착수금 | easy | **A** | 금융/회계, 호텔/식당 | `unknown` |
| 181 | **depression** | `noun` | 경기침체 | 우울증 | medium | **B** | 금융/회계, 일반 | `unknown` |
| 182 | **devaluation** | `noun` | 평가절하 | 가치하락 | hard | **A** | 금융/회계 | `unknown` |
| 183 | **disbursement** | `noun` | 자금지출 | 지급집행 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 184 | **discount** | `noun` | 할인율 | 에누리 | easy | **A** | 판매/마케팅, 구매/주문 | `verified` |
| 185 | **expenditure** | `noun` | 총지출액 | 경비지출 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 186 | **finance** | `noun` | 재정금융 | 자금조달 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 187 | **fiscal** | `noun` | 재정연도 | 회계의 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 188 | **fund** | `noun` | 기금펀드 | 자금 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 189 | **gain** | `noun` | 이득수익 | 증가분 | easy | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 190 | **grant** | `noun` | 보조지원금 | 인가금 | medium | **A** | 금융/회계, 교육/행사 | `unknown` |
| 191 | **income** | `noun` | 순수소득 | 수입 | easy | **A** | 금융/회계, 채용/인사 | `verified` |
| 192 | **indemnity** | `noun` | 배상보상금 | 손해배상 | hard | **A** | 금융/회계, 시설/건물 | `unknown` |
| 193 | **inflation** | `noun` | 물가상승 | 통화팽창 | easy | **A** | 금융/회계, 일반 | `unknown` |
| 194 | **installment** | `noun` | 할부금 | 분할납입 | medium | **A** | 금융/회계, 구매/주문 | `unknown` |
| 195 | **interest** | `noun` | 이자율 | 관심, 이해관계 | easy | **A** | 금융/회계, 은행 | `verified` |
| 196 | **lien** | `noun` | 유치권 | 우선저당권 | hard | **B** | 금융/회계, 구매/주문 | `unknown` |
| 197 | **liquidation** | `noun` | 청산매각 | 현금화 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 198 | **loan** | `noun` | 대출금 | 융자금 | easy | **A** | 금융/회계, 구매/주문 | `verified` |
| 199 | **margin** | `noun` | 수익마진 | 여백, 한계 | medium | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 200 | **market** | `noun` | 시장 | 장터, 수요처 | easy | **A** | 판매/마케팅, 금융/회계 | `verified` |
| 201 | **mortgage** | `noun` | 주택담보대출 | 저당융자 | medium | **A** | 금융/회계, 시설/건물 | `verified` |
| 202 | **outlay** | `noun` | 지출경비 | 경비투입 | hard | **A** | 금융/회계, 생산/제조 | `unknown` |
| 203 | **payout** | `noun` | 지급금 | 배당지급 | medium | **A** | 금융/회계, 채용/인사 | `unknown` |
| 204 | **penalty** | `noun` | 위약벌금 | 처벌 | easy | **A** | 금융/회계, 구매/주문 | `verified` |
| 205 | **pension** | `noun` | 노령연금 | 퇴직연금 | easy | **A** | 금융/회계, 채용/인사 | `verified` |
| 206 | **premium** | `noun` | 할증보험료 | 보험료, 고급형 | medium | **A** | 금융/회계, 고객서비스 | `unknown` |
| 207 | **price** | `noun` | 정찰가격 | 물가 | easy | **A** | 구매/주문, 판매/마케팅 | `verified` |
| 208 | **profit** | `noun` | 순영업이익 | 수익 | easy | **A** | 금융/회계, 판매/마케팅 | `verified` |
| 209 | **rebate** | `noun` | 환급할인 | 리베이트 | medium | **A** | 구매/주문, 판매/마케팅 | `unknown` |
| 210 | **receipt** | `noun` | 영수증 | 수령 | easy | **A** | 구매/주문, 금융/회계 | `unknown` |
| 211 | **recession** | `noun` | 경기불황 | 후퇴 | medium | **A** | 금융/회계, 일반 | `unknown` |
| 212 | **redemption** | `noun` | 채무상환 | 쿠폰교환 | hard | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 213 | **refund** | `noun` | 환불금 | 반환금 | easy | **A** | 고객서비스, 구매/주문 | `verified` |
| 214 | **reimbursement** | `noun` | 비용변제 | 실비지급 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 215 | **remittance** | `noun` | 송금액 | 송금송부 | hard | **A** | 금융/회계, 구매/주문 | `unknown` |
| 216 | **rent** | `noun` | 임대료 | 월세 | easy | **A** | 시설/건물, 금융/회계 | `verified` |
| 217 | **royalty** | `noun` | 사용저작권료 | 왕족 | medium | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 218 | **salary** | `noun` | 월급여 | 봉급 | easy | **A** | 채용/인사, 금융/회계 | `verified` |
| 219 | **savings** | `noun` | 저축예금 | 절감액 | easy | **A** | 금융/회계, 일반 | `verified` |
| 220 | **security** | `noun` | 유가증권 | 보안, 경비 | easy | **A** | 금융/회계, 시설/건물 | `unknown` |
| 221 | **settlement** | `noun` | 합의금지급 | 결제, 정착 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 222 | **share** | `noun` | 주식지분 | 몫 | easy | **A** | 금융/회계, 회사/사무 | `unknown` |
| 223 | **solvent** | `noun` | 지급능력자 | 용매 | hard | **B** | 금융/회계, 생산/제조 | `unknown` |
| 224 | **stipend** | `noun` | 연구수당 | 장학수당 | medium | **A** | 교육/행사, 채용/인사 | `unknown` |
| 225 | **subsidy** | `noun` | 정부보조금 | 장려금 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 226 | **surplus** | `noun` | 재정잉여금 | 흑자잔액 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 227 | **tariff** | `noun` | 수입관세 | 요율표 | medium | **A** | 배송/물류, 금융/회계 | `unknown` |
| 228 | **tax** | `noun` | 세금 | 조세, 과세 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 229 | **toll** | `noun` | 통행료 | 사용료, 손실 | easy | **A** | 여행/교통, 금융/회계 | `verified` |
| 230 | **treasury** | `noun` | 재무부 | 국고금 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 231 | **trust** | `noun` | 신탁기금 | 신뢰, 트러스트 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 232 | **valuation** | `noun` | 자산평가액 | 감정평가 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 233 | **venture** | `noun` | 벤처투자 | 모험사업 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 234 | **wage** | `noun` | 시급임금 | 노임 | easy | **A** | 채용/인사, 금융/회계 | `verified` |
| 235 | **wealth** | `noun` | 재산부 | 자산총액 | easy | **A** | 금융/회계, 일반 | `unknown` |
| 236 | **apparatus** | `noun` | 기계장치 | 기구단위 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 237 | **assembly** | `noun` | 조립라인 | 의회, 집회 | medium | **A** | 생산/제조, 회의/일정 | `verified` |
| 238 | **automation** | `noun` | 공정자동화 | 기계화 | medium | **A** | 생산/제조, 기술/장비 | `verified` |
| 239 | **boiler** | `noun` | 증기보일러 | 온수기 | easy | **A** | 시설/건물, 생산/제조 | `unknown` |
| 240 | **buffer** | `noun` | 완충구역 | 완충장치 | medium | **A** | 생산/제조, 배송/물류 | `unknown` |
| 241 | **circuit** | `noun` | 전기회로 | 순회코스 | easy | **A** | 기술/장비, 생산/제조 | `unknown` |
| 242 | **conveyor** | `noun` | 컨베이어벨트 | 이송장치 | easy | **A** | 생산/제조, 배송/물류 | `unknown` |
| 243 | **craftsman** | `noun` | 전문기술공 | 장인 | medium | **A** | 생산/제조, 채용/인사 | `unknown` |
| 244 | **dynamo** | `noun` | 발전기 | 에너지원 | hard | **B** | 기술/장비, 생산/제조 | `unknown` |
| 245 | **engine** | `noun` | 동력엔진 | 발동기 | easy | **A** | 기술/장비, 생산/제조 | `unknown` |
| 246 | **fabric** | `noun` | 원단직물 | 구조구격 | easy | **A** | 생산/제조, 구매/주문 | `unknown` |
| 247 | **factory** | `noun` | 제조공장 | 공작소 | easy | **A** | 생산/제조, 시설/건물 | `verified` |
| 248 | **fastener** | `noun` | 체결부품 | 고정장치 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 249 | **fixture** | `noun` | 설비고정물 | 정기경기 | medium | **A** | 시설/건물, 생산/제조 | `unknown` |
| 250 | **framework** | `noun` | 기본체계 | 틀구조 | medium | **A** | 기술/장비, 회사/사무 | `unknown` |
| 251 | **furnace** | `noun` | 가열화로 | 제련소 | hard | **B** | 생산/제조, 시설/건물 | `unknown` |
| 252 | **gadget** | `noun` | 소형기기 | 편리도구 | easy | **B** | 기술/장비, 판매/마케팅 | `unknown` |
| 253 | **gear** | `noun` | 톱니바퀴 | 장비일체 | easy | **A** | 기술/장비, 생산/제조 | `unknown` |
| 254 | **generator** | `noun` | 비상발전기 | 생성프로그램 | easy | **A** | 기술/장비, 시설/건물 | `unknown` |
| 255 | **girder** | `noun` | 대들보철골 | 지지대 | hard | **B** | 시설/건물, 생산/제조 | `unknown` |
| 256 | **hardware** | `noun` | 컴퓨터하드웨어 | 철물장비 | easy | **A** | 기술/장비, 구매/주문 | `verified` |
| 257 | **implement** | `noun` | 도구공구 | 비품 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 258 | **infrastructure** | `noun` | 기반시설 | 사회기반체계 | medium | **A** | 시설/건물, 기술/장비 | `unknown` |
| 259 | **instrument** | `noun` | 정밀계측기 | 악기, 수단 | easy | **A** | 기술/장비, 생산/제조 | `verified` |
| 260 | **laboratory** | `noun` | 연구실험실 | 검사실 | easy | **A** | 기술/장비, 생산/제조 | `unknown` |
| 261 | **lathe** | `noun` | 공작선반 | 선반기계 | hard | **B** | 생산/제조 | `unknown` |
| 262 | **layout** | `noun` | 배치도 | 도면설계 | easy | **A** | 시설/건물, 생산/제조 | `unknown` |
| 263 | **lever** | `noun` | 지렛대 | 조작레버 | easy | **A** | 생산/제조, 기술/장비 | `unknown` |
| 264 | **locomotive** | `noun` | 기관차 | 철도동력차 | medium | **B** | 여행/교통, 생산/제조 | `unknown` |
| 265 | **lubrication** | `noun` | 윤활유주입 | 기름칠 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 266 | **machine** | `noun` | 가공기계 | 장치 | easy | **A** | 생산/제조, 기술/장비 | `verified` |
| 267 | **machinery** | `noun` | 기계류일체 | 설비 | easy | **A** | 생산/제조, 기술/장비 | `unknown` |
| 268 | **mechanism** | `noun` | 작동기제 | 구조기구 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 269 | **mill** | `noun` | 방적분쇄공장 | 제재소 | medium | **B** | 생산/제조 | `unknown` |
| 270 | **mold** | `noun` | 금형틀 | 곰팡이 | medium | **A** | 생산/제조 | `unknown` |
| 271 | **motor** | `noun` | 전동모터 | 발동원 | easy | **A** | 기술/장비, 생산/제조 | `unknown` |
| 272 | **nozzle** | `noun` | 분사노즐 | 출구구멍 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 273 | **panel** | `noun` | 조작패널 | 패널단, 배전반 | easy | **A** | 기술/장비, 회의/일정 | `unknown` |
| 274 | **patent** | `noun` | 기술특허 | 전매특허 | medium | **A** | 기술/장비, 회사/사무 | `unknown` |
| 275 | **pipeline** | `noun` | 송유가스관 | 수송망 | medium | **A** | 배송/물류, 생산/제조 | `unknown` |
| 276 | **plant** | `noun` | 제조플랜트 | 식물, 공장 | easy | **A** | 생산/제조, 시설/건물 | `verified` |
| 277 | **platform** | `noun` | 정거장승강장 | 기술플랫폼 | easy | **A** | 여행/교통, 기술/장비 | `unknown` |
| 278 | **prototype** | `noun` | 시제품 | 초기모델 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 279 | **pump** | `noun` | 가압펌프 | 양수기 | easy | **A** | 생산/제조, 시설/건물 | `unknown` |
| 280 | **refinery** | `noun` | 원유정제소 | 제당소 | hard | **A** | 생산/제조, 시설/건물 | `unknown` |
| 281 | **relay** | `noun` | 계전기 | 계주교대 | medium | **A** | 기술/장비, 통신 | `unknown` |
| 282 | **repair** | `noun` | 수리보수 | 수선 | easy | **A** | 시설/건물, 기술/장비 | `verified` |
| 283 | **reservoir** | `noun` | 저수지 | 비축탱크 | medium | **A** | 시설/건물, 생산/제조 | `unknown` |
| 284 | **robot** | `noun` | 산업용로봇 | 자동장치 | easy | **A** | 생산/제조, 기술/장비 | `unknown` |
| 285 | **scaffold** | `noun` | 건축비계 | 임시발판 | hard | **B** | 시설/건물, 생산/제조 | `unknown` |
| 286 | **sensor** | `noun` | 감지센서 | 검출기 | easy | **A** | 기술/장비, 생산/제조 | `verified` |
| 287 | **shaft** | `noun` | 구동회전축 | 환기갱 | hard | **A** | 생산/제조, 시설/건물 | `unknown` |
| 288 | **shipyard** | `noun` | 조선소 | 선박도크 | medium | **A** | 생산/제조, 배송/물류 | `unknown` |
| 289 | **spare** | `noun` | 예비부품 | 여분 | easy | **A** | 생산/제조, 구매/주문 | `unknown` |
| 290 | **turbine** | `noun` | 발전터빈 | 회전기관 | hard | **A** | 기술/장비, 생산/제조 | `unknown` |
| 291 | **valve** | `noun` | 개폐밸브 | 조절판 | easy | **A** | 생산/제조, 시설/건물 | `unknown` |
| 292 | **vessel** | `noun` | 대형선박 | 용기, 혈관 | medium | **A** | 배송/물류, 여행/교통 | `unknown` |
| 293 | **airfare** | `noun` | 항공운임 | 비행기값 | easy | **A** | 여행/교통, 금융/회계 | `unknown` |
| 294 | **aisle** | `noun` | 좌석통로 | 복도 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 295 | **billboard** | `noun` | 옥외광고판 | 대형게시판 | easy | **A** | 판매/마케팅 | `unknown` |
| 296 | **booklet** | `noun` | 소책자안내문 | 단행본 | easy | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 297 | **boutique** | `noun` | 전문의류매장 | 부티크 | easy | **B** | 판매/마케팅, 호텔/식당 | `unknown` |
| 298 | **breakdown** | `noun` | 세부내역 | 고장분해 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 299 | **broadcast** | `noun` | 방송프로그램 | 방영 | easy | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 300 | **bundle** | `noun` | 묶음상품 | 보따리 | easy | **A** | 판매/마케팅, 구매/주문 | `unknown` |
| 301 | **cabin** | `noun` | 여객선실 | 오두막집 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 302 | **cargo** | `noun` | 선적화물 | 적하물 | easy | **A** | 배송/물류, 여행/교통 | `verified` |
| 303 | **carriage** | `noun` | 객차차량 | 운송료 | medium | **B** | 여행/교통, 배송/물류 | `unknown` |
| 304 | **catalog** | `noun` | 상품목록집 | 도록 | easy | **A** | 판매/마케팅, 구매/주문 | `verified` |
| 305 | **consignment** | `noun` | 위탁판매품 | 탁송물 | hard | **A** | 배송/물류, 판매/마케팅 | `unknown` |
| 306 | **container** | `noun` | 물류컨테이너 | 보관용기 | easy | **A** | 배송/물류, 생산/제조 | `verified` |
| 307 | **courier** | `noun` | 택배배송기사 | 특송업체 | easy | **A** | 배송/물류, 고객서비스 | `verified` |
| 308 | **coupon** | `noun` | 할인쿠폰 | 교환권 | easy | **A** | 판매/마케팅, 고객서비스 | `verified` |
| 309 | **display** | `noun` | 진열전시 | 화면표시장치 | easy | **A** | 판매/마케팅, 기술/장비 | `verified` |
| 310 | **distributor** | `noun` | 총판유통사 | 배급업자 | medium | **A** | 배송/물류, 판매/마케팅 | `unknown` |
| 311 | **eatery** | `noun` | 음식점 | 대중식당 | easy | **B** | 호텔/식당 | `unknown` |
| 312 | **exhibit** | `noun` | 전시출품물 | 전람회 | easy | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 313 | **ferry** | `noun` | 연락페리선 | 여객선 | easy | **A** | 여행/교통 | `unknown` |
| 314 | **flight** | `noun` | 항공편 | 비행시간 | easy | **A** | 여행/교통 | `verified` |
| 315 | **flyer** | `noun` | 홍보전단지 | 광고지 | easy | **A** | 판매/마케팅 | `unknown` |
| 316 | **footwear** | `noun` | 신발류 | 제화제품 | easy | **A** | 판매/마케팅, 구매/주문 | `unknown` |
| 317 | **franchise** | `noun` | 가맹사업점 | 프랜차이즈 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 318 | **gala** | `noun` | 축하공연행사 | 갈라쇼 | medium | **B** | 교육/행사, 호텔/식당 | `unknown` |
| 319 | **gallery** | `noun` | 미술전시관 | 화랑 | easy | **A** | 시설/건물, 교육/행사 | `unknown` |
| 320 | **gathering** | `noun` | 모임집회 | 친목회 | easy | **A** | 회의/일정, 교육/행사 | `unknown` |
| 321 | **giveaway** | `noun` | 무료증정품 | 경품 | easy | **A** | 판매/마케팅, 고객서비스 | `unknown` |
| 322 | **gourmet** | `noun` | 미식요리 | 미식가 | medium | **B** | 호텔/식당 | `unknown` |
| 323 | **grocer** | `noun` | 식료품상인 | 슈퍼마켓 | easy | **A** | 구매/주문, 판매/마케팅 | `unknown` |
| 324 | **harbor** | `noun` | 항구항만 | 피난처 | easy | **A** | 배송/물류, 여행/교통 | `unknown` |
| 325 | **hotline** | `noun` | 직통상담전화 | 핫라인 | easy | **A** | 고객서비스, 회사/사무 | `unknown` |
| 326 | **landing** | `noun` | 착륙 | 선착장, 상륙 | easy | **A** | 여행/교통 | `unknown` |
| 327 | **leaflet** | `noun` | 홍보전단 | 소엽 | easy | **A** | 판매/마케팅 | `unknown` |
| 328 | **lounge** | `noun` | 공항휴게실 | 라운지 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 329 | **luggage** | `noun` | 여행수하물 | 가방짐 | easy | **A** | 여행/교통, 호텔/식당 | `verified` |
| 330 | **merchandise** | `noun` | 판매상품 | 재고품 | easy | **A** | 판매/마케팅, 구매/주문 | `verified` |
| 331 | **merchant** | `noun` | 상인무역상 | 도소매업자 | easy | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 332 | **outlet** | `noun` | 할인매장 | 배출구, 콘센트 | easy | **A** | 판매/마케팅, 시설/건물 | `verified` |
| 333 | **packet** | `noun` | 소포포장 | 우편묶음 | easy | **A** | 배송/물류 | `unknown` |
| 334 | **parcel** | `noun` | 우편소포물 | 필지 | easy | **A** | 배송/물류 | `verified` |
| 335 | **pedestrian** | `noun` | 보행자 | 도보행인 | easy | **A** | 여행/교통, 시설/건물 | `unknown` |
| 336 | **pickup** | `noun` | 화물수거 | 픽업차량 | easy | **A** | 배송/물류, 고객서비스 | `unknown` |
| 337 | **pier** | `noun` | 부두선착장 | 돌제 | medium | **A** | 여행/교통, 배송/물류 | `unknown` |
| 338 | **poster** | `noun` | 홍보벽보 | 포스터 | easy | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 339 | **promotion** | `noun` | 판촉프로모션 | 승진 | easy | **A** | 판매/마케팅, 채용/인사 | `verified` |
| 340 | **provider** | `noun` | 서비스제공업체 | 공급자 | easy | **A** | 고객서비스, 판매/마케팅 | `unknown` |
| 341 | **purchaser** | `noun` | 구매자 | 바이어 | easy | **A** | 구매/주문, 회사/사무 | `unknown` |
| 342 | **queue** | `noun` | 대기줄 | 대기순번 | easy | **A** | 고객서비스, 호텔/식당 | `unknown` |
| 343 | **quota** | `noun` | 배당할당량 | 쿼터제 | medium | **A** | 생산/제조, 판매/마케팅 | `unknown` |
| 344 | **reception** | `noun` | 환영리셉션 | 접수처 | easy | **A** | 호텔/식당, 회사/사무 | `unknown` |
| 345 | **retailer** | `noun` | 소매업체 | 양판점 | easy | **A** | 판매/마케팅, 구매/주문 | `verified` |
| 346 | **route** | `noun` | 운송노선 | 항로 | easy | **A** | 여행/교통, 배송/물류 | `verified` |
| 347 | **seller** | `noun` | 판매자 | 매도인 | easy | **A** | 판매/마케팅, 구매/주문 | `unknown` |
| 348 | **shopper** | `noun` | 쇼핑고객 | 구매자 | easy | **A** | 판매/마케팅, 고객서비스 | `unknown` |
| 349 | **shuttle** | `noun` | 왕복셔틀버스 | 정기왕복편 | easy | **A** | 여행/교통, 시설/건물 | `unknown` |
| 350 | **slogan** | `noun` | 광고슬로건 | 표어 | easy | **A** | 판매/마케팅 | `unknown` |
| 351 | **souvenir** | `noun` | 기념선물 | 특산품 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 352 | **stall** | `noun` | 간이매대 | 마구간 | easy | **B** | 판매/마케팅, 시설/건물 | `unknown` |
| 353 | **subscriber** | `noun` | 정기구독자 | 가입회원 | easy | **A** | 판매/마케팅, 고객서비스 | `unknown` |
| 354 | **subway** | `noun` | 지하철도 | 지하보도 | easy | **A** | 여행/교통, 시설/건물 | `unknown` |
| 355 | **transit** | `noun` | 환승수송 | 운송통과 | easy | **A** | 여행/교통, 배송/물류 | `verified` |
| 356 | **trolley** | `noun` | 손수레대차 | 트롤리전차 | easy | **A** | 배송/물류, 여행/교통 | `unknown` |
| 357 | **turnover** | `noun` | 매출총액 | 이직률 | medium | **A** | 금융/회계, 채용/인사 | `unknown` |
| 358 | **venue** | `noun` | 행사장소 | 개최지 | easy | **A** | 교육/행사, 호텔/식당 | `verified` |
| 359 | **voyage** | `noun` | 해외항해 | 원정여행 | medium | **B** | 여행/교통 | `unknown` |
| 360 | **wholesale** | `noun` | 도매유통 | 도매판매 | easy | **A** | 판매/마케팅, 구매/주문 | `unknown` |
| 361 | **abbreviation** | `noun` | 약어 | 축약형 | medium | **A** | 회사/사무 | `unknown` |
| 362 | **acceptance** | `noun` | 수락 | 승인, 합격 | easy | **A** | 회사/사무, 채용/인사 | `unknown` |
| 363 | **accuracy** | `noun` | 정확성 | 정밀도 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 364 | **adaptation** | `noun` | 적응 | 개작 | medium | **A** | 일반, 회사/사무 | `unknown` |
| 365 | **addition** | `noun` | 추가 | 증축 | easy | **A** | 회사/사무, 시설/건물 | `unknown` |
| 366 | **adequacy** | `noun` | 적절성 | 충분성 | hard | **A** | 생산/제조, 회사/사무 | `unknown` |
| 367 | **adherence** | `noun` | 준수 | 고수 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 368 | **admission** | `noun` | 입장 | 입학허가, 인정 | easy | **A** | 교육/행사, 시설/건물 | `unknown` |
| 369 | **adviser** | `noun` | 자문위원 | 고문관 | easy | **A** | 회사/사무, 채용/인사 | `unknown` |
| 370 | **allocation** | `noun` | 할당 | 배분액 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 371 | **apparel** | `noun` | 의류 | 복장 | easy | **A** | 판매/마케팅 | `unknown` |
| 372 | **appendix** | `noun` | 부록 | 맹장 | medium | **A** | 회사/사무 | `unknown` |
| 373 | **approval** | `noun` | 승인 | 인가 | easy | **A** | 회사/사무 | `unknown` |
| 374 | **aptitude** | `noun` | 적성 | 소질 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 375 | **architecture** | `noun` | 건축구조 | 설계구조 | medium | **A** | 시설/건물, 기술/장비 | `unknown` |
| 376 | **arrival** | `noun` | 도착 | 도착편 | easy | **A** | 여행/교통 | `unknown` |
| 377 | **aspect** | `noun` | 측면 | 양상 | medium | **A** | 회사/사무, 일반 | `unknown` |
| 378 | **assessment** | `noun` | 평가 | 과세사정 | medium | **A** | 채용/인사, 금융/회계 | `unknown` |
| 379 | **assistance** | `noun` | 도움 | 원조 | easy | **A** | 고객서비스, 회사/사무 | `unknown` |
| 380 | **assurance** | `noun` | 보증 | 확신 | medium | **A** | 품질관리, 고객서비스 | `unknown` |
| 381 | **atmosphere** | `noun` | 분위기 | 대기권 | easy | **A** | 일반, 호텔/식당 | `unknown` |
| 382 | **attachment** | `noun` | 첨부파일 | 부착물 | easy | **A** | 회사/사무, 기술/장비 | `unknown` |
| 383 | **attainment** | `noun` | 달성 | 도달 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 384 | **attraction** | `noun` | 명소 | 끌림 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 385 | **audience** | `noun` | 청중 | 관객 | easy | **A** | 교육/행사, 판매/마케팅 | `unknown` |
| 386 | **availability** | `noun` | 이용가능성 | 가동률 | medium | **A** | 호텔/식당, 기술/장비 | `unknown` |
| 387 | **awareness** | `noun` | 인식 | 자각 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 388 | **background** | `noun` | 배경 | 학력경력 | easy | **A** | 채용/인사, 회사/사무 | `unknown` |
| 389 | **baggage** | `noun` | 수하물 | 짐 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 390 | **bargain** | `noun` | 특가품 | 매매계약 | easy | **A** | 판매/마케팅, 구매/주문 | `unknown` |
| 391 | **barrier** | `noun` | 장벽 | 장애물 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 392 | **basis** | `noun` | 기준 | 기반 | easy | **A** | 회사/사무, 금융/회계 | `unknown` |
| 393 | **behavior** | `noun` | 행동 | 태도 | easy | **A** | 채용/인사, 판매/마케팅 | `unknown` |
| 394 | **belongings** | `noun` | 소지품 | 귀중품 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 395 | **beverage** | `noun` | 음료 | 마실것 | easy | **A** | 호텔/식당 | `unknown` |
| 396 | **bid** | `noun` | 입찰 | 응찰가 | medium | **A** | 구매/주문, 회사/사무 | `unknown` |
| 397 | **bill** | `noun` | 청구서 | 계산서, 법안 | easy | **A** | 금융/회계, 구매/주문 | `unknown` |
| 398 | **binding** | `noun` | 제본 | 표지, 구속력 | medium | **A** | 회사/사무 | `unknown` |
| 399 | **blanket** | `noun` | 담요 | 총괄적용 | easy | **A** | 호텔/식당, 회사/사무 | `unknown` |
| 400 | **block** | `noun` | 구역 | 차단재, 블록 | easy | **A** | 시설/건물, 회사/사무 | `unknown` |
| 401 | **blueprint** | `noun` | 설계도 | 청사진 | medium | **A** | 시설/건물, 회사/사무 | `unknown` |
| 402 | **bonus** | `noun` | 상여금 | 보너스 | easy | **A** | 채용/인사, 금융/회계 | `unknown` |
| 403 | **breakthrough** | `noun` | 돌파구 | 비약적발전 | medium | **A** | 기술/장비, 회사/사무 | `unknown` |
| 404 | **broadband** | `noun` | 광대역통신 | 초고속인터넷 | medium | **A** | 기술/장비 | `unknown` |
| 405 | **buffet** | `noun` | 뷔페식사 | 간이식당 | easy | **A** | 호텔/식당, 교육/행사 | `unknown` |
| 406 | **builder** | `noun` | 건설업자 | 시공사 | easy | **A** | 시설/건물 | `unknown` |
| 407 | **cabinet** | `noun` | 수납장 | 내각 | easy | **A** | 회사/사무, 시설/건물 | `unknown` |
| 408 | **cafeteria** | `noun` | 구내식당 | 카페테리아 | easy | **A** | 시설/건물, 호텔/식당 | `unknown` |
| 409 | **calculation** | `noun` | 계산 | 산출 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 410 | **campus** | `noun` | 구내부지 | 대학캠퍼스 | easy | **A** | 시설/건물, 교육/행사 | `unknown` |
| 411 | **caution** | `noun` | 주의 | 경고 | easy | **A** | 안전/보건, 시설/건물 | `unknown` |
| 412 | **celebration** | `noun` | 축하행사 | 기념식 | easy | **A** | 교육/행사, 호텔/식당 | `unknown` |
| 413 | **chamber** | `noun` | 회의실 | 상공회의소 | medium | **A** | 회사/사무, 회의/일정 | `unknown` |
| 414 | **channel** | `noun` | 유통경로 | 채널, 수로 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 415 | **chapter** | `noun` | 지부 | 단원, 지회 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 416 | **characteristic** | `noun` | 특징 | 특성 | medium | **A** | 생산/제조, 판매/마케팅 | `unknown` |
| 417 | **chemist** | `noun` | 화학자 | 약사 | medium | **A** | 생산/제조, 의료/건강 | `unknown` |
| 418 | **commencement** | `noun` | 시작 | 개시, 졸업식 | medium | **A** | 교육/행사, 회사/사무 | `unknown` |
| 419 | **concurrence** | `noun` | 동의 | 일치 | hard | **A** | 회사/사무 | `unknown` |
| 420 | **consolidation** | `noun` | 통합 | 합병 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 421 | **accomplish** | `verb` | 성취하다 | 완수하다 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 422 | **accumulate** | `verb` | 축적하다 | 누적하다 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 423 | **accustom** | `verb` | 익숙하게하다 | 길들이다 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 424 | **activate** | `verb` | 가동하다 | 활성화하다 | easy | **A** | 기술/장비, 생산/제조 | `verified` |
| 425 | **adapt** | `verb` | 적응하다 | 맞추다, 개작하다 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 426 | **administer** | `verb` | 집행하다 | 관리하다, 투여하다 | medium | **A** | 회사/사무 | `verified` |
| 427 | **admit** | `verb` | 인정하다 | 입장을 허가하다 | easy | **A** | 교육/행사, 회사/사무 | `unknown` |
| 428 | **adopt** | `verb` | 채택하다 | 입양하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 429 | **advise** | `verb` | 조언하다 | 권고하다 | easy | **A** | 회사/사무, 고객서비스 | `unknown` |
| 430 | **advocate** | `verb` | 옹호하다 | 주장하다 | medium | **B** | 회사/사무, 일반 | `unknown` |
| 431 | **allot** | `verb` | 배당하다 | 할당하다 | hard | **A** | 금융/회계, 생산/제조 | `unknown` |
| 432 | **alter** | `verb` | 변경하다 | 바꾸다 | medium | **A** | 생산/제조, 회사/사무 | `unknown` |
| 433 | **amend** | `verb` | 개정하다 | 수정하다 | medium | **A** | 회사/사무 | `verified` |
| 434 | **amplify** | `verb` | 증폭하다 | 확대하다 | hard | **A** | 기술/장비, 판매/마케팅 | `unknown` |
| 435 | **analyze** | `verb` | 분석하다 | 검토하다 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 436 | **appeal** | `verb` | 호소하다 | 매력을 끌다, 항소하다 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 437 | **appoint** | `verb` | 임명하다 | 지정하다 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 438 | **appraise** | `verb` | 감정하다 | 평가하다 | medium | **A** | 금융/회계, 채용/인사 | `verified` |
| 439 | **apprehend** | `verb` | 파악하다 | 체포하다, 걱정하다 | hard | **B** | 회사/사무, 일반 | `unknown` |
| 440 | **approach** | `verb` | 다가가다 | 접근하다 | easy | **A** | 회사/사무, 여행/교통 | `unknown` |
| 441 | **assert** | `verb` | 단언하다 | 주장하다 | medium | **A** | 회사/사무 | `unknown` |
| 442 | **assimilate** | `verb` | 동화시키다 | 흡수하다 | hard | **B** | 회사/사무, 교육/행사 | `unknown` |
| 443 | **assure** | `verb` | 확언하다 | 보장하다 | medium | **A** | 고객서비스, 회사/사무 | `unknown` |
| 444 | **attain** | `verb` | 도달하다 | 달성하다 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 445 | **balance** | `verb` | 균형을 맞추다 | 정산하다 | easy | **A** | 금융/회계, 생산/제조 | `unknown` |
| 446 | **benchmark** | `verb` | 기준평가하다 | 벤치마킹하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 447 | **bid** | `verb` | 입찰하다 | 제시하다 | medium | **A** | 구매/주문, 회사/사무 | `unknown` |
| 448 | **bill** | `verb` | 청구서를 발행하다 | 청구하다 | easy | **A** | 금융/회계, 구매/주문 | `unknown` |
| 449 | **bind** | `verb` | 묶다 | 구속하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 450 | **brainstorm** | `verb` | 브레인스토밍하다 | 아이디어를 모으다 | easy | **A** | 회사/사무, 회의/일정 | `unknown` |
| 451 | **broadcast** | `verb` | 방송하다 | 방영하다 | easy | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 452 | **broaden** | `verb` | 넓히다 | 확장하다 | medium | **A** | 교육/행사, 판매/마케팅 | `unknown` |
| 453 | **calculate** | `verb` | 계산하다 | 산정하다 | easy | **A** | 금융/회계, 생산/제조 | `verified` |
| 454 | **calibrate** | `verb` | 눈금을 조정하다 | 교정하다 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 455 | **campaign** | `verb` | 선전운동을 벌이다 | 캠페인하다 | easy | **A** | 판매/마케팅 | `unknown` |
| 456 | **cancel** | `verb` | 취소하다 | 무효화하다 | easy | **A** | 구매/주문, 호텔/식당 | `verified` |
| 457 | **capture** | `verb` | 포착하다 | 사로잡다 | medium | **A** | 판매/마케팅, 기술/장비 | `unknown` |
| 458 | **catalog** | `verb` | 목록에 싣다 | 분류하다 | easy | **A** | 판매/마케팅, 구매/주문 | `unknown` |
| 459 | **certify** | `verb` | 증명하다 | 공인하다 | medium | **A** | 채용/인사, 생산/제조 | `verified` |
| 460 | **chair** | `verb` | 의장을 맡다 | 주재하다 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 461 | **charge** | `verb` | 청구하다 | 부과하다, 충전하다 | easy | **A** | 금융/회계, 기술/장비 | `verified` |
| 462 | **charter** | `verb` | 전세내다 | 특허인가하다 | medium | **A** | 여행/교통, 회사/사무 | `unknown` |
| 463 | **circulate** | `verb` | 배포하다 | 순환하다 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 464 | **cite** | `verb` | 인용하다 | 언급하다 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 465 | **clarify** | `verb` | 명확하게하다 | 해명하다 | medium | **A** | 회사/사무, 회의/일정 | `unknown` |
| 466 | **classify** | `verb` | 분류하다 | 등급을 매기다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 467 | **commemorate** | `verb` | 기념하다 | 축하하다 | medium | **A** | 교육/행사 | `unknown` |
| 468 | **commence** | `verb` | 시작되다 | 개시하다 | medium | **A** | 교육/행사, 회의/일정 | `verified` |
| 469 | **commend** | `verb` | 칭찬하다 | 추천하다 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 470 | **comprehend** | `verb` | 이해하다 | 파악하다 | medium | **A** | 교육/행사, 회사/사무 | `unknown` |
| 471 | **compute** | `verb` | 연산하다 | 추정산출하다 | easy | **A** | 기술/장비, 금융/회계 | `verified` |
| 472 | **conceive** | `verb` | 구상하다 | 착상하다 | hard | **A** | 생산/제조, 판매/마케팅 | `unknown` |
| 473 | **concentrate** | `verb` | 집중하다 | 전념하다 | easy | **A** | 회사/사무, 생산/제조 | `unknown` |
| 474 | **condense** | `verb` | 압축하다 | 요약하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 475 | **confer** | `verb` | 상의하다 | 수여하다 | medium | **A** | 회의/일정, 교육/행사 | `unknown` |
| 476 | **configure** | `verb` | 환경을 설정하다 | 구성하다 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 477 | **construct** | `verb` | 건설하다 | 구성하다 | easy | **A** | 시설/건물, 생산/제조 | `verified` |
| 478 | **consult** | `verb` | 자문하다 | 상담하다 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 479 | **consume** | `verb` | 소비하다 | 섭취하다 | easy | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 480 | **convert** | `verb` | 전환하다 | 개조하다 | medium | **A** | 금융/회계, 시설/건물 | `unknown` |
| 481 | **convey** | `verb` | 전달하다 | 운반하다 | medium | **A** | 회사/사무, 배송/물류 | `unknown` |
| 482 | **convince** | `verb` | 설득하다 | 확신시키다 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 483 | **cultivate** | `verb` | 양성하다 | 계발하다, 경작하다 | medium | **A** | 채용/인사, 판매/마케팅 | `unknown` |
| 484 | **dedicate** | `verb` | 헌신하다 | 바치다 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 485 | **defer** | `verb` | 미루다 | 연기하다, 경의를 표하다 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 486 | **deliberate** | `verb` | 숙고하다 | 심의하다 | hard | **A** | 회의/일정, 회사/사무 | `unknown` |
| 487 | **delineate** | `verb` | 상세히 기술하다 | 윤곽을 그리다 | hard | **B** | 회사/사무, 생산/제조 | `unknown` |
| 488 | **depict** | `verb` | 묘사하다 | 그리다 | medium | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 489 | **deploy** | `verb` | 배치하다 | 배포 전개하다 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 490 | **deposit** | `verb` | 예치하다 | 입금하다, 착수금을 내다 | easy | **A** | 금융/회계, 구매/주문 | `verified` |
| 491 | **depreciate** | `verb` | 가치가 떨어지다 | 감가상각하다 | hard | **A** | 금융/회계 | `unknown` |
| 492 | **deter** | `verb` | 단념시키다 | 저지하다 | hard | **B** | 안전/보건, 회사/사무 | `unknown` |
| 493 | **determine** | `verb` | 결정하다 | 측정하다 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 494 | **devise** | `verb` | 고안하다 | 궁리하다 | medium | **A** | 기술/장비, 생산/제조 | `verified` |
| 495 | **diagnose** | `verb` | 진단하다 | 규명하다 | medium | **A** | 의료/건강, 기술/장비 | `unknown` |
| 496 | **differentiate** | `verb` | 구별하다 | 차별화하다 | medium | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 497 | **diminish** | `verb` | 감소하다 | 줄이다 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 498 | **disburse** | `verb` | 지출하다 | 지급하다 | hard | **A** | 금융/회계 | `unknown` |
| 499 | **discharge** | `verb` | 해고하다 | 방출하다, 퇴원시키다 | medium | **A** | 채용/인사, 생산/제조 | `unknown` |
| 500 | **discount** | `verb` | 할인하다 | 무시하다 | easy | **A** | 판매/마케팅, 구매/주문 | `verified` |
| 501 | **disperse** | `verb` | 해산시키다 | 분산하다 | hard | **B** | 안전/보건, 생산/제조 | `unknown` |
| 502 | **display** | `verb` | 진열하다 | 전시하다, 화면에 표시하다 | easy | **A** | 판매/마케팅, 기술/장비 | `unknown` |
| 503 | **diversify** | `verb` | 다각화하다 | 다양화하다 | medium | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 504 | **divert** | `verb` | 우회시키다 | 전환하다 | medium | **A** | 여행/교통, 금융/회계 | `unknown` |
| 505 | **document** | `verb` | 서류로 기록하다 | 문서화하다 | medium | **A** | 회사/사무 | `unknown` |
| 506 | **donate** | `verb` | 기부하다 | 기증하다 | easy | **A** | 금융/회계, 일반 | `unknown` |
| 507 | **economize** | `verb` | 절약하다 | 비용을 줄이다 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 508 | **elaborate** | `verb` | 상세히 말하다 | 정교하게 만들다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 509 | **elevate** | `verb` | 격상시키다 | 승진시키다, 올리다 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 510 | **eliminate** | `verb` | 제거하다 | 배제하다 | medium | **A** | 생산/제조, 회사/사무 | `verified` |
| 511 | **employ** | `verb` | 고용하다 | 사용하다 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 512 | **enable** | `verb` | 가능하게하다 | 권능을 주다 | easy | **A** | 기술/장비, 회사/사무 | `verified` |
| 513 | **enclose** | `verb` | 동봉하다 | 둘러싸다 | medium | **A** | 회사/사무, 배송/물류 | `verified` |
| 514 | **encompass** | `verb` | 망라하다 | 포함하다 | hard | **B** | 회사/사무 | `unknown` |
| 515 | **enforce** | `verb` | 집행하다 | 시행하다 | medium | **A** | 회사/사무, 안전/보건 | `unknown` |
| 516 | **enlarge** | `verb` | 확대하다 | 늘리다 | easy | **A** | 시설/건물, 생산/제조 | `verified` |
| 517 | **enlist** | `verb` | 요청하여 얻다 | 입대하다 | hard | **B** | 회사/사무, 채용/인사 | `unknown` |
| 518 | **ensure** | `verb` | 확실하게하다 | 보장하다 | easy | **A** | 안전/보건, 회사/사무 | `verified` |
| 519 | **entail** | `verb` | 수반하다 | 필요로하다 | hard | **A** | 회사/사무 | `unknown` |
| 520 | **entrust** | `verb` | 위탁하다 | 맡기다 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 521 | **equalize** | `verb` | 균등하게하다 | 동등화하다 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 522 | **equip** | `verb` | 갖추다 | 장착하다 | easy | **A** | 기술/장비, 생산/제조 | `verified` |
| 523 | **escalate** | `verb` | 확대되다 | 상승하다 | medium | **A** | 고객서비스, 금융/회계 | `unknown` |
| 524 | **establish** | `verb` | 설립하다 | 수립하다 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 525 | **estimate** | `verb` | 견적하다 | 추정하다 | easy | **A** | 구매/주문, 금융/회계 | `verified` |
| 526 | **evolve** | `verb` | 발전하다 | 진화하다 | medium | **A** | 기술/장비, 회사/사무 | `unknown` |
| 527 | **exempt** | `verb` | 면제하다 | 제외하다 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 528 | **exhaust** | `verb` | 소진하다 | 기진맥진하게하다 | medium | **A** | 생산/제조, 채용/인사 | `unknown` |
| 529 | **exhibit** | `verb` | 전시하다 | 나타내다 | easy | **A** | 교육/행사, 판매/마케팅 | `unknown` |
| 530 | **export** | `verb` | 수출하다 | 수출하다 | medium | **A** | 회사/사무 | `unknown` |
| 531 | **extend** | `verb` | 연장하다 | 제공하다, 확장하다 | easy | **A** | 회의/일정, 고객서비스 | `verified` |
| 532 | **fabricate** | `verb` | 제작하다 | 날조하다 | hard | **A** | 생산/제조 | `unknown` |
| 533 | **forecast** | `verb` | 예측하다 | 예보하다 | easy | **A** | 금융/회계, 판매/마케팅 | `verified` |
| 534 | **forfeit** | `verb` | 몰수당하다 | 상실하다 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 535 | **formulate** | `verb` | 수립하다 | 공식화하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 536 | **foster** | `verb` | 조성하다 | 육성하다 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 537 | **furnish** | `verb` | 비치하다 | 공급하다 | medium | **A** | 시설/건물, 회사/사무 | `unknown` |
| 538 | **gather** | `verb` | 모으다 | 수집하다 | easy | **A** | 회의/일정, 생산/제조 | `unknown` |
| 539 | **govern** | `verb` | 통치하다 | 지배규율하다 | medium | **B** | 회사/사무 | `unknown` |
| 540 | **guarantee** | `verb` | 보증하다 | 담보하다 | easy | **A** | 품질관리, 고객서비스 | `unknown` |
| 541 | **harmonize** | `verb` | 조화시키다 | 화합하다 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 542 | **harness** | `verb` | 활용하다 | 이용하다 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 543 | **hire** | `verb` | 고용하다 | 대여하다 | easy | **A** | 채용/인사 | `verified` |
| 544 | **host** | `verb` | 주최하다 | 진행하다 | easy | **A** | 교육/행사, 회의/일정 | `verified` |
| 545 | **incur** | `verb` | 발생시키다 | 초래하다, 입다 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 546 | **indemnify** | `verb` | 배상하다 | 보상하다 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 547 | **induce** | `verb` | 유도하다 | 설득하다 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 548 | **infer** | `verb` | 추론하다 | 암시하다 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 549 | **innovate** | `verb` | 혁신하다 | 쇄신하다 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 550 | **inspire** | `verb` | 영감을 주다 | 고무하다 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 551 | **institute** | `verb` | 도입하다 | 제정하다 | medium | **A** | 회사/사무 | `unknown` |
| 552 | **integrate** | `verb` | 통합하다 | 융합하다 | medium | **A** | 기술/장비, 생산/제조 | `verified` |
| 553 | **intensify** | `verb` | 심화하다 | 강화하다 | medium | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 554 | **intercept** | `verb` | 가로채다 | 차단하다 | hard | **B** | 기술/장비, 배송/물류 | `unknown` |
| 555 | **interpret** | `verb` | 통역하다 | 해석하다 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 556 | **intervene** | `verb` | 개입하다 | 중재하다 | hard | **B** | 회의/일정, 회사/사무 | `unknown` |
| 557 | **invent** | `verb` | 발명하다 | 창안하다 | easy | **A** | 기술/장비, 생산/제조 | `unknown` |
| 558 | **inventory** | `verb` | 재고를 조사하다 | 목록을 만들다 | medium | **A** | 생산/제조, 배송/물류 | `unknown` |
| 559 | **isolate** | `verb` | 고립시키다 | 격리하다 | medium | **A** | 안전/보건, 기술/장비 | `unknown` |
| 560 | **issue** | `verb` | 발행하다 | 발급하다, 발표하다 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 561 | **itemize** | `verb` | 항목별로 적다 | 명세화하다 | medium | **A** | 금융/회계, 구매/주문 | `unknown` |
| 562 | **justify** | `verb` | 정당화하다 | 근거를 대다 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 563 | **lease** | `verb` | 임대하다 | 리스하다 | medium | **A** | 시설/건물, 금융/회계 | `verified` |
| 564 | **legislate** | `verb` | 법률을 제정하다 | 입법하다 | hard | **B** | 회사/사무 | `unknown` |
| 565 | **lessen** | `verb` | 줄이다 | 완화하다 | medium | **A** | 생산/제조, 회사/사무 | `unknown` |
| 566 | **leverage** | `verb` | 지레를 이용하다 | 영향력을 활용하다 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 567 | **liquidate** | `verb` | 청산하다 | 정리하다, 현금화하다 | hard | **A** | 금융/회계 | `unknown` |
| 568 | **localize** | `verb` | 현지화하다 | 국한시키다 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 569 | **locate** | `verb` | 위치를 찾다 | 위치시키다 | easy | **A** | 시설/건물, 배송/물류 | `verified` |
| 570 | **magnify** | `verb` | 확대하다 | 과장하다 | medium | **B** | 기술/장비, 일반 | `unknown` |
| 571 | **mandate** | `verb` | 의무화하다 | 명령하다 | medium | **A** | 회사/사무, 안전/보건 | `unknown` |
| 572 | **maximize** | `verb` | 극대화하다 | 극대화하다 | medium | **A** | 회사/사무 | `unknown` |
| 573 | **mediate** | `verb` | 조정하다 | 중재하다 | hard | **A** | 회사/사무, 회의/일정 | `unknown` |
| 574 | **memorize** | `verb` | 암기하다 | 기억하다 | easy | **A** | 교육/행사 | `unknown` |
| 575 | **merge** | `verb` | 합병하다 | 병합하다 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 576 | **minimize** | `verb` | 최소화하다 | 최소화하다 | medium | **A** | 회사/사무 | `unknown` |
| 577 | **modernize** | `verb` | 현대화하다 | 신호체계를 개선하다 | medium | **A** | 시설/건물, 생산/제조 | `unknown` |
| 578 | **mount** | `verb` | 장착하다 | 개최하다, 증가하다 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 579 | **navigate** | `verb` | 항행하다 | 길을 찾다, 조종하다 | medium | **A** | 여행/교통, 기술/장비 | `unknown` |
| 580 | **neutralize** | `verb` | 무력화하다 | 중화하다 | hard | **B** | 생산/제조, 안전/보건 | `unknown` |
| 581 | **nominate** | `verb` | 지명하다 | 추천하다 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 582 | **nullify** | `verb` | 무효화하다 | 파기하다 | hard | **B** | 회사/사무, 금융/회계 | `unknown` |
| 583 | **nurture** | `verb` | 육성하다 | 양육하다 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 584 | **obligate** | `verb` | 의무를 지우다 | 구속하다 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 585 | **optimize** | `verb` | 최적화하다 | 최적화하다 | medium | **A** | 회사/사무 | `verified` |
| 586 | **orchestrate** | `verb` | 조직화하다 | 치밀하게 계획하다 | hard | **B** | 회사/사무, 판매/마케팅 | `unknown` |
| 587 | **originate** | `verb` | 비롯되다 | 창작하다 | medium | **A** | 회사/사무, 기술/장비 | `unknown` |
| 588 | **outlaw** | `verb` | 불법화하다 | 금지하다 | hard | **B** | 회사/사무 | `unknown` |
| 589 | **outnumber** | `verb` | 수적으로 우세하다 | 수효가 더 많다 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 590 | **outsource** | `verb` | 외부 위탁하다 | 아웃소싱하다 | easy | **A** | 생산/제조, 회사/사무 | `unknown` |
| 591 | **overhaul** | `verb` | 정밀 점검하다 | 총체적으로 분해수리하다 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 592 | **oversee** | `verb` | 감독하다 | 두루 살피다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 593 | **patronize** | `verb` | 애용하다 | 후원하다, 깔보는태도를취하다 | hard | **A** | 판매/마케팅, 고객서비스 | `unknown` |
| 594 | **penalize** | `verb` | 처벌하다 | 불이익을 주다 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 595 | **perceive** | `verb` | 인식하다 | 감지하다 | medium | **A** | 판매/마케팅, 채용/인사 | `unknown` |
| 596 | **periodize** | `verb` | 시대구분하다 | 시대구분하다 | medium | **A** | 회사/사무 | `unknown` |
| 597 | **perpetuate** | `verb` | 영속시키다 | 이어지게하다 | hard | **B** | 회사/사무 | `unknown` |
| 598 | **persuade** | `verb` | 설득하다 | 권유하다 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 599 | **pilot** | `verb` | 시험 운용하다 | 조종하다 | easy | **A** | 기술/장비, 생산/제조 | `unknown` |
| 600 | **pioneer** | `verb` | 개척하다 | 선도하다 | medium | **A** | 기술/장비, 판매/마케팅 | `unknown` |
| 601 | **populate** | `verb` | 데이터를 채우다 | 거주하다 | medium | **A** | 기술/장비, 시설/건물 | `unknown` |
| 602 | **portray** | `verb` | 그리다 | 묘사하다 | medium | **B** | 판매/마케팅, 일반 | `unknown` |
| 603 | **prescribe** | `verb` | 처방하다 | 규정하다 | medium | **A** | 의료/건강, 회사/사무 | `unknown` |
| 604 | **prevail** | `verb` | 우세하다 | 만연하다, 설득하다 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 605 | **project** | `verb` | 예상투사하다 | 계획하다, 영사하다 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 606 | **proliferate** | `verb` | 급증하다 | 확산하다 | hard | **B** | 판매/마케팅, 기술/장비 | `unknown` |
| 607 | **prolong** | `verb` | 연장하다 | 끌다 | medium | **A** | 회의/일정, 생산/제조 | `unknown` |
| 608 | **prompt** | `verb` | 유도촉발하다 | 재촉하다 | medium | **A** | 고객서비스, 회사/사무 | `unknown` |
| 609 | **propagate** | `verb` | 전파하다 | 번식시키다 | hard | **B** | 기술/장비, 판매/마케팅 | `unknown` |
| 610 | **prosecute** | `verb` | 기소하다 | 수행하다 | hard | **B** | 회사/사무 | `unknown` |
| 611 | **prosper** | `verb` | 번영하다 | 성공하다 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 612 | **prototype** | `verb` | 시제품을 만들다 | 원형을 설계하다 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 613 | **punctuate** | `verb` | 구두점을 찍다 | 중단시키다 | hard | **B** | 회사/사무 | `unknown` |
| 614 | **quantify** | `verb` | 수량화하다 | 정량화하다 | medium | **A** | 생산/제조, 금융/회계 | `unknown` |
| 615 | **query** | `verb` | 질의하다 | 의문을 제기하다 | medium | **A** | 기술/장비, 고객서비스 | `unknown` |
| 616 | **quote** | `verb` | 견적하다 | 인용하다 | easy | **A** | 구매/주문, 금융/회계 | `unknown` |
| 617 | **ratify** | `verb` | 비준하다 | 재가하다 | hard | **A** | 회사/사무 | `unknown` |
| 618 | **reassure** | `verb` | 안심시키다 | 재차 확인하다 | medium | **A** | 고객서비스, 회사/사무 | `unknown` |
| 619 | **rebound** | `verb` | 반등하다 | 회복하다 | medium | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 620 | **recalculate** | `verb` | 재계산하다 | 재산정하다 | medium | **A** | 금융/회계 | `unknown` |
| 621 | **reciprocate** | `verb` | 화답하다 | 보답하다, 왕복운동하다 | hard | **B** | 고객서비스, 회사/사무 | `unknown` |
| 622 | **reckon** | `verb` | 계산하다 | 생각하다 | medium | **B** | 금융/회계, 일반 | `unknown` |
| 623 | **reclaim** | `verb` | 되찾다 | 개간하다, 재활용하다 | medium | **A** | 시설/건물, 생산/제조 | `unknown` |
| 624 | **reconcile** | `verb` | 조정일치시키다 | 화해하다 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 625 | **reconstruct** | `verb` | 재건하다 | 복원하다 | medium | **A** | 시설/건물, 생산/제조 | `unknown` |
| 626 | **rectify** | `verb` | 시정하다 | 바로잡다 | medium | **A** | 생산/제조, 고객서비스 | `verified` |
| 627 | **redeem** | `verb` | 교환상환하다 | 만회하다 | medium | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 628 | **redesign** | `verb` | 재설계하다 | 리디자인하다 | easy | **A** | 생산/제조, 기술/장비 | `unknown` |
| 629 | **redevelop** | `verb` | 재개발하다 | 재정비하다 | medium | **A** | 시설/건물 | `unknown` |
| 630 | **refine** | `verb` | 정제하다 | 다듬다, 개선하다 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 631 | **reform** | `verb` | 개혁하다 | 개선하다 | medium | **A** | 회사/사무 | `unknown` |
| 632 | **refresh** | `verb` | 새롭게하다 | 새로고침하다 | easy | **A** | 기술/장비, 호텔/식당 | `unknown` |
| 633 | **refund** | `verb` | 환불하다 | 반환하다 | easy | **A** | 구매/주문, 고객서비스 | `verified` |
| 634 | **refurbish** | `verb` | 재단장하다 | 새로 꾸미다 | medium | **A** | 시설/건물, 호텔/식당 | `unknown` |
| 635 | **regulate** | `verb` | 규제하다 | 조절하다 | medium | **A** | 생산/제조, 회사/사무 | `verified` |
| 636 | **reinforce** | `verb` | 강화하다 | 보강하다 | medium | **A** | 생산/제조, 시설/건물 | `verified` |
| 637 | **reinstate** | `verb` | 복권시키다 | 원상복구하다 | hard | **A** | 채용/인사, 회사/사무 | `unknown` |
| 638 | **reiterate** | `verb` | 되풀이하여 말하다 | 반복하다 | hard | **A** | 회의/일정, 회사/사무 | `unknown` |
| 639 | **rekindle** | `verb` | 다시 불붙이다 | 되살리다 | hard | **B** | 판매/마케팅, 일반 | `unknown` |
| 640 | **remodel** | `verb` | 개조하다 | 리모델링하다 | easy | **A** | 시설/건물 | `unknown` |
| 641 | **remit** | `verb` | 송금하다 | 면제하다 | hard | **A** | 금융/회계 | `unknown` |
| 642 | **reorganize** | `verb` | 개편하다 | 재조직하다 | medium | **A** | 회사/사무, 채용/인사 | `verified` |
| 643 | **replicate** | `verb` | 복제하다 | 재현하다 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 644 | **resemble** | `verb` | 닮다 | 유사하다 | easy | **A** | 일반 | `unknown` |
| 645 | **reside** | `verb` | 거주하다 | 속하다 | medium | **A** | 시설/건물 | `unknown` |
| 646 | **restructure** | `verb` | 구조조정하다 | 개편하다 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 647 | **retail** | `verb` | 소매하다 | 소매로 팔리다 | easy | **A** | 판매/마케팅, 구매/주문 | `unknown` |
| 648 | **retrieve** | `verb` | 검색회수하다 | 되찾아오다 | medium | **A** | 기술/장비, 배송/물류 | `verified` |
| 649 | **revamp** | `verb` | 개정수선하다 | 대대적으로 바꾸다 | hard | **B** | 생산/제조, 판매/마케팅 | `unknown` |
| 650 | **revitalize** | `verb` | 생기를 되찾게하다 | 활성화하다 | medium | **A** | 시설/건물, 금융/회계 | `unknown` |
| 651 | **route** | `verb` | 경로를 지정하다 | 발송하다 | medium | **A** | 배송/물류, 여행/교통 | `unknown` |
| 652 | **salvage** | `verb` | 구출구난하다 | 폐품을 이용하다 | hard | **B** | 배송/물류, 생산/제조 | `unknown` |
| 653 | **sanitize** | `verb` | 소독살균하다 | 위생처리하다 | medium | **A** | 안전/보건, 시설/건물 | `unknown` |
| 654 | **schedule** | `verb` | 일정을 잡다 | 예정하다 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 655 | **scrutinize** | `verb` | 면밀히 조사하다 | 철저히 검토하다 | hard | **A** | 회사/사무, 품질관리 | `verified` |
| 656 | **secure** | `verb` | 확보하다 | 단단히 고정하다 | medium | **A** | 구매/주문, 금융/회계 | `verified` |
| 657 | **settle** | `verb` | 정산하다 | 해결하다, 정착하다 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 658 | **ship** | `verb` | 선적운송하다 | 배송하다 | easy | **A** | 배송/물류, 구매/주문 | `verified` |
| 659 | **simplify** | `verb` | 단순화하다 | 간소화하다 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 660 | **simulate** | `verb` | 모의실험하다 | 흉내내다 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 661 | **specialize** | `verb` | 전문화하다 | 전공하다 | easy | **A** | 채용/인사, 판매/마케팅 | `verified` |
| 662 | **sponsor** | `verb` | 후원하다 | 스폰서가 되다 | easy | **A** | 교육/행사, 판매/마케팅 | `verified` |
| 663 | **stabilize** | `verb` | 안정시키다 | 진정되다 | medium | **A** | 금융/회계, 생산/제조 | `verified` |
| 664 | **standardize** | `verb` | 표준화하다 | 규격화하다 | medium | **A** | 생산/제조, 기술/장비 | `verified` |
| 665 | **stimulate** | `verb` | 자극하다 | 촉진하다 | medium | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 666 | **stipulate** | `verb` | 규정명문화하다 | 약정하다 | hard | **A** | 구매/주문, 회사/사무 | `unknown` |
| 667 | **streamline** | `verb` | 간소화하다 | 능률화하다 | medium | **A** | 생산/제조, 회사/사무 | `verified` |
| 668 | **subcontract** | `verb` | 하청을 주다 | 하도급계약하다 | medium | **A** | 생산/제조, 구매/주문 | `unknown` |
| 669 | **subsidize** | `verb` | 보조금을 지급하다 | 보조금을 지급하다 | medium | **A** | 회사/사무 | `unknown` |
| 670 | **substitute** | `verb` | 대체하다 | 대신하다 | medium | **A** | 생산/제조, 구매/주문 | `verified` |
| 671 | **summarize** | `verb` | 요약하다 | 간추리다 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 672 | **supplement** | `verb` | 보충하다 | 추가하다 | medium | **A** | 금융/회계, 생산/제조 | `verified` |
| 673 | **surpass** | `verb` | 능가하다 | 뛰어넘다 | medium | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 674 | **synthesize** | `verb` | 종합하다 | 합성하다 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 675 | **systematize** | `verb` | 체계화하다 | 조직화하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 676 | **tabulate** | `verb` | 도표로 만들다 | 표로 정리하다 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 677 | **target** | `verb` | 목표로 삼다 | 겨냥하다 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 678 | **testify** | `verb` | 증언하다 | 입증하다 | hard | **B** | 회사/사무 | `unknown` |
| 679 | **tolerate** | `verb` | 용인하다 | 견디다 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 680 | **transcribe** | `verb` | 필기녹취하다 | 베껴 쓰다 | hard | **A** | 회사/사무, 교육/행사 | `unknown` |
| 681 | **transform** | `verb` | 변형시키다 | 탈바꿈하다 | medium | **A** | 생산/제조, 회사/사무 | `verified` |
| 682 | **translate** | `verb` | 번역하다 | 해석하다 | easy | **A** | 회사/사무, 교육/행사 | `verified` |
| 683 | **transmit** | `verb` | 전송하다 | 발신하다 | medium | **A** | 기술/장비, 배송/물류 | `verified` |
| 684 | **trigger** | `verb` | 유발하다 | 방아쇠를 당기다 | medium | **A** | 금융/회계, 기술/장비 | `unknown` |
| 685 | **underestimate** | `verb` | 과소평가하다 | 너무 적게 잡다 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 686 | **undergo** | `verb` | 겪다 | 경험하다, 수검받다 | medium | **A** | 생산/제조, 안전/보건 | `verified` |
| 687 | **undertake** | `verb` | 착수하다 | 떠맡다 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 688 | **unify** | `verb` | 통합하다 | 단일화하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 689 | **validate** | `verb` | 유효하게하다 | 검증확인하다 | medium | **A** | 기술/장비, 회사/사무 | `verified` |
| 690 | **vary** | `verb` | 다양하다 | 달라지다 | easy | **A** | 생산/제조, 판매/마케팅 | `unknown` |
| 691 | **verify** | `verb` | 입증확인하다 | 조회검증하다 | medium | **A** | 금융/회계, 안전/보건 | `verified` |
| 692 | **waive** | `verb` | 면제적용배제하다 | 포기하다 | hard | **A** | 구매/주문, 금융/회계 | `verified` |
| 693 | **warrant** | `verb` | 보증하다 | 정당화하다 | medium | **A** | 품질관리, 구매/주문 | `unknown` |
| 694 | **withdraw** | `verb` | 인출하다 | 철회하다, 물러나다 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 695 | **withhold** | `verb` | 원천징수하다 | 보류하다 | hard | **A** | 금융/회계, 채용/인사 | `unknown` |
| 696 | **yield** | `verb` | 산출하다 | 양보하다, 수익을 내다 | medium | **A** | 생산/제조, 금융/회계 | `verified` |
| 697 | **abide** | `verb` | 준수하다 | 머무르다 | medium | **A** | 회사/사무 | `unknown` |
| 698 | **accelerate** | `verb` | 가속하다 | 촉진하다 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 699 | **affirm** | `verb` | 확언하다 | 단언하다 | medium | **A** | 회사/사무 | `unknown` |
| 700 | **alleviate** | `verb` | 완화하다 | 경감하다 | medium | **A** | 고객서비스, 회사/사무 | `unknown` |
| 701 | **approximate** | `verb` | 가까워지다 | 근사치를 내다 | medium | **A** | 금융/회계 | `unknown` |
| 702 | **ascertain** | `verb` | 확인하다 | 알아내다 | hard | **A** | 회사/사무, 생산/제조 | `unknown` |
| 703 | **caution** | `verb` | 경고하다 | 주의를 주다 | easy | **A** | 안전/보건 | `unknown` |
| 704 | **coincide** | `verb` | 일치하다 | 동시에 발생하다 | medium | **A** | 회의/일정 | `unknown` |
| 705 | **complicate** | `verb` | 복잡하게하다 | 악화시키다 | medium | **A** | 회사/사무 | `unknown` |
| 706 | **concur** | `verb` | 동의하다 | 일치하다 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 707 | **conform** | `verb` | 따르다 | 순응하다 | medium | **A** | 생산/제조, 회사/사무 | `unknown` |
| 708 | **curtail** | `verb` | 축소하다 | 줄이다 | hard | **A** | 금융/회계, 생산/제조 | `unknown` |
| 709 | **decrease** | `verb` | 감소하다 | 줄이다 | easy | **A** | 금융/회계, 생산/제조 | `unknown` |
| 710 | **deteriorate** | `verb` | 악화되다 | 저하되다 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 711 | **account for** | `verb` | 설명하다 | 차지하다, 원인이 되다 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 712 | **adhere to** | `verb` | 준수하다 | 고수하다, 들러붙다 | medium | **A** | 안전/보건, 회사/사무 | `verified` |
| 713 | **aim at** | `verb` | 겨냥하다 | 목표로 하다 | easy | **A** | 판매/마케팅, 회사/사무 | `verified` |
| 714 | **allow for** | `verb` | 감안하다 | 고려하다 | medium | **A** | 금융/회계, 회의/일정 | `verified` |
| 715 | **appeal to** | `verb` | 호소하다 | 마음에 들다 | easy | **A** | 판매/마케팅, 고객서비스 | `unknown` |
| 716 | **apply for** | `verb` | 지원하다 | 신청하다 | easy | **A** | 채용/인사, 구매/주문 | `verified` |
| 717 | **back up** | `verb` | 백업하다 | 지원하다, 후진하다 | easy | **A** | 기술/장비, 회사/사무 | `verified` |
| 718 | **belong to** | `verb` | 속하다 | 소유이다 | easy | **A** | 회사/사무, 시설/건물 | `verified` |
| 719 | **boil down to** | `verb` | 결국 ~이 되다 | 요약되다 | hard | **B** | 회의/일정, 회사/사무 | `unknown` |
| 720 | **branch out** | `verb` | 사업을 확장하다 | 새 분야로 진출하다 | medium | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 721 | **break down** | `verb` | 고장 나다 | 분해하다, 결렬되다 | easy | **A** | 기술/장비, 회의/일정 | `verified` |
| 722 | **break into** | `verb` | 진출하다 | 침입하다 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 723 | **break off** | `verb` | 중단하다 | 결렬되다 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 724 | **break out** | `verb` | 발발하다 | 탈출하다 | medium | **B** | 안전/보건 | `unknown` |
| 725 | **break through** | `verb` | 돌파하다 | 극복하다 | medium | **A** | 기술/장비, 생산/제조 | `unknown` |
| 726 | **bring about** | `verb` | 초래하다 | 일으키다 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 727 | **bring in** | `verb` | 영입하다 | 수익을 가져오다 | easy | **A** | 채용/인사, 금융/회계 | `verified` |
| 728 | **bring out** | `verb` | 출시하다 | 특징을 끌어내다 | easy | **A** | 판매/마케팅, 생산/제조 | `verified` |
| 729 | **bring up** | `verb` | 안건을 꺼내다 | 양육하다 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 730 | **build up** | `verb` | 쌓아 올리다 | 강화하다 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 731 | **call back** | `verb` | 다시 전화하다 | 리콜하다 | easy | **A** | 고객서비스, 생산/제조 | `verified` |
| 732 | **call for** | `verb` | 요구하다 | 필요로 하다 | medium | **A** | 회사/사무, 회의/일정 | `verified` |
| 733 | **call off** | `verb` | 취소하다 | 철회하다 | easy | **A** | 회의/일정, 교육/행사 | `verified` |
| 734 | **call on** | `verb` | 방문하다 | 요청하다 | medium | **A** | 고객서비스, 판매/마케팅 | `unknown` |
| 735 | **care for** | `verb` | 보살피다 | 좋아하다 | easy | **A** | 고객서비스, 의료/건강 | `unknown` |
| 736 | **carry on** | `verb` | 계속하다 | 속행하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 737 | **carry out** | `verb` | 수행하다 | 실행하다 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 738 | **catch on** | `verb` | 유행하다 | 이해하다 | medium | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 739 | **catch up with** | `verb` | 따라잡다 | 밀린 일을 하다 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 740 | **check in** | `verb` | 체크인하다 | 탑승수속하다 | easy | **A** | 호텔/식당, 여행/교통 | `verified` |
| 741 | **check out** | `verb` | 체크아웃하다 | 대출하다, 확인하다 | easy | **A** | 호텔/식당, 회사/사무 | `verified` |
| 742 | **clean up** | `verb` | 치우다 | 정리정돈하다 | easy | **A** | 시설/건물, 안전/보건 | `verified` |
| 743 | **clear up** | `verb` | 해결하다 | 날씨가 개다 | medium | **A** | 고객서비스, 회사/사무 | `verified` |
| 744 | **close down** | `verb` | 폐쇄하다 | 조업을 중단하다 | medium | **A** | 생산/제조, 판매/마케팅 | `verified` |
| 745 | **come across** | `verb` | 우연히 마주치다 | 인상을 주다 | medium | **A** | 회사/사무, 일반 | `verified` |
| 746 | **come by** | `verb` | 잠깐 들르다 | 얻다 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 747 | **come down with** | `verb` | 병에 걸리다 | 앓아눕다 | medium | **B** | 의료/건강, 채용/인사 | `unknown` |
| 748 | **come into** | `verb` | 물려받다 | 들어가다 | medium | **B** | 금융/회계, 일반 | `unknown` |
| 749 | **come out** | `verb` | 출시되다 | 발행되다 | easy | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 750 | **come to** | `verb` | 총계가 되다 | 의식을 되찾다 | medium | **A** | 금융/회계, 구매/주문 | `unknown` |
| 751 | **come up with** | `verb` | 생각해내다 | 제시하다 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 752 | **cope with** | `verb` | 대처하다 | 극복하다 | medium | **A** | 고객서비스, 회사/사무 | `verified` |
| 753 | **count on** | `verb` | 의지하다 | 기대하다 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 754 | **cross out** | `verb` | 줄을 그어 지우다 | 줄을 그어 지우다 | medium | **A** | 회사/사무 | `unknown` |
| 755 | **cut back on** | `verb` | 절감하다 | 축소하다 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 756 | **cut down on** | `verb` | 줄이다 | 소비를 삭감하다 | easy | **A** | 금융/회계, 안전/보건 | `verified` |
| 757 | **deal with** | `verb` | 처리하다 | 다루다, 거래하다 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 758 | **depend on** | `verb` | 의존하다 | ~에 달려있다 | easy | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 759 | **do away with** | `verb` | 폐지하다 | 없애다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 760 | **drop by** | `verb` | 잠깐 들르다 | 방문하다 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 761 | **drop off** | `verb` | 내려주다 | 가져다주다, 떨어지다 | easy | **A** | 배송/물류, 여행/교통 | `verified` |
| 762 | **drop out** | `verb` | 중퇴하다 | 탈락하다 | medium | **B** | 교육/행사, 채용/인사 | `unknown` |
| 763 | **end up** | `verb` | 결국 ~하게 되다 | 마치다 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 764 | **face up to** | `verb` | 직시하다 | 인정하고 맞서다 | hard | **B** | 회사/사무, 금융/회계 | `unknown` |
| 765 | **fall back on** | `verb` | 기대다 | 최후로 의지하다 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 766 | **fall behind** | `verb` | 뒤처지다 | 연체되다 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 767 | **fall through** | `verb` | 수포로 돌아가다 | 무산되다 | medium | **A** | 회의/일정, 구매/주문 | `unknown` |
| 768 | **figure out** | `verb` | 알아내다 | 이해하다, 계산하다 | easy | **A** | 회사/사무, 기술/장비 | `verified` |
| 769 | **fill in** | `verb` | 대체하다 | 빈칸을 채우다 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 770 | **fill out** | `verb` | 작성하다 | 기입하다 | easy | **A** | 채용/인사, 구매/주문 | `verified` |
| 771 | **find out** | `verb` | 알아내다 | 발견하다 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 772 | **fit in** | `verb` | 어울리다 | 시간을 내다 | easy | **A** | 채용/인사, 회의/일정 | `unknown` |
| 773 | **focus on** | `verb` | 집중하다 | 초점을 맞추다 | easy | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 774 | **follow through** | `verb` | 완수하다 | 이행하다 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 775 | **follow up** | `verb` | 후속 조치하다 | 사후 점검하다 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 776 | **get across** | `verb` | 이해시키다 | 전달되다 | medium | **A** | 회의/일정, 교육/행사 | `unknown` |
| 777 | **get ahead** | `verb` | 성공하다 | 앞서가다 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 778 | **get along with** | `verb` | 사이좋게 지내다 | 협력하다 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 779 | **get away with** | `verb` | 처벌을 모면하다 | 처벌을 모면하다 | medium | **A** | 회사/사무 | `unknown` |
| 780 | **get by** | `verb` | 그럭저럭 살아가다 | 통과하다 | medium | **B** | 금융/회계, 일반 | `unknown` |
| 781 | **get in touch with** | `verb` | 연락을 취하다 | 연락을 취하다 | medium | **A** | 회사/사무 | `unknown` |
| 782 | **get over** | `verb` | 극복하다 | 회복하다 | easy | **A** | 회사/사무, 의료/건강 | `unknown` |
| 783 | **get rid of** | `verb` | 제거하다 | 처분하다 | easy | **A** | 생산/제조, 회사/사무 | `unknown` |
| 784 | **get through** | `verb` | 연결되다 | 통과하다, 끝마치다 | medium | **A** | 기술/장비, 고객서비스 | `verified` |
| 785 | **give away** | `verb` | 무료로 주다 | 누설하다 | easy | **A** | 판매/마케팅, 고객서비스 | `unknown` |
| 786 | **give in** | `verb` | 굴복하다 | 제출하다 | medium | **B** | 회의/일정, 회사/사무 | `unknown` |
| 787 | **give up** | `verb` | 포기하다 | 그만두다 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 788 | **go ahead** | `verb` | 추진하다 | 앞서가다 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 789 | **go over** | `verb` | 검토하다 | 살펴보다 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 790 | **go through** | `verb` | 겪다 | 통과되다, 살피다 | easy | **A** | 회사/사무, 구매/주문 | `verified` |
| 791 | **go with** | `verb` | 선택하다 | 어울리다 | easy | **A** | 구매/주문, 판매/마케팅 | `unknown` |
| 792 | **grow out of** | `verb` | 벗어나다 | 원인이 되다 | medium | **B** | 생산/제조, 일반 | `unknown` |
| 793 | **hand in** | `verb` | 제출하다 | 인계하다 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 794 | **hand out** | `verb` | 배포하다 | 나누어주다 | easy | **A** | 교육/행사, 판매/마케팅 | `verified` |
| 795 | **hang on** | `verb` | 기다리다 | 버티다 | easy | **A** | 고객서비스, 회사/사무 | `unknown` |
| 796 | **hold back** | `verb` | 저지하다 | 억제하다 | medium | **A** | 생산/제조, 금융/회계 | `verified` |
| 797 | **hold off** | `verb` | 미루다 | 가까이 못 오게 하다 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 798 | **hold on** | `verb` | 잠깐 기다리다 | 통화를 유지하다 | easy | **A** | 고객서비스, 호텔/식당 | `verified` |
| 799 | **hold up** | `verb` | 지연시키다 | 견디다 | medium | **A** | 배송/물류, 생산/제조 | `unknown` |
| 800 | **insist on** | `verb` | 고집하다 | 주장하다 | medium | **A** | 회의/일정, 구매/주문 | `unknown` |
| 801 | **keep on** | `verb` | 계속하다 | 고용을 유지하다 | easy | **A** | 생산/제조, 채용/인사 | `unknown` |
| 802 | **keep up with** | `verb` | 따라가다 | 보조를 맞추다 | easy | **A** | 기술/장비, 판매/마케팅 | `verified` |
| 803 | **lay off** | `verb` | 일시 해고하다 | 정리해고하다 | medium | **A** | 채용/인사, 회사/사무 | `verified` |
| 804 | **lead to** | `verb` | 초래하다 | 이어지다 | easy | **A** | 금융/회계, 생산/제조 | `verified` |
| 805 | **leave out** | `verb` | 빼다 | 생략하다 | easy | **A** | 회사/사무, 생산/제조 | `unknown` |
| 806 | **let down** | `verb` | 실망시키다 | 실망시키다 | medium | **A** | 회사/사무 | `unknown` |
| 807 | **line up** | `verb` | 줄을 서다 | 정렬시키다, 섭외하다 | easy | **A** | 교육/행사, 고객서비스 | `unknown` |
| 808 | **live up to** | `verb` | 부응하다 | 기대에 미치다 | medium | **A** | 고객서비스, 채용/인사 | `unknown` |
| 809 | **look after** | `verb` | 돌보다 | 관리하다 | easy | **A** | 고객서비스, 시설/건물 | `verified` |
| 810 | **look back on** | `verb` | 되돌아보다 | 회고하다 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 811 | **look down on** | `verb` | 깔보다 | 얕보다 | hard | **B** | 채용/인사 | `unknown` |
| 812 | **look for** | `verb` | 찾다 | 구하다 | easy | **A** | 채용/인사, 구매/주문 | `verified` |
| 813 | **look forward to** | `verb` | 학수고대하다 | 기대하다 | easy | **A** | 고객서비스, 회의/일정 | `verified` |
| 814 | **look into** | `verb` | 조사하다 | 검토하다 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 815 | **look out for** | `verb` | 주의하다 | 보호하다 | easy | **A** | 안전/보건, 시설/건물 | `unknown` |
| 816 | **look over** | `verb` | 훑어보다 | 검토하다 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 817 | **look through** | `verb` | 살펴보다 | 훑어 읽다 | easy | **A** | 회사/사무, 구매/주문 | `unknown` |
| 818 | **look up** | `verb` | 찾아보다 | 나아지다 | easy | **A** | 기술/장비, 금융/회계 | `unknown` |
| 819 | **look up to** | `verb` | 존경하다 | 우러러보다 | easy | **A** | 채용/인사, 교육/행사 | `unknown` |
| 820 | **make out** | `verb` | 알아보다 | 작성하다, 이해하다 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 821 | **make sure** | `verb` | 확인하다 | 확실하게 하다 | easy | **A** | 안전/보건, 회사/사무 | `verified` |
| 822 | **make up** | `verb` | 구성하다 | 보충하다, 화해하다 | easy | **A** | 생산/제조, 채용/인사 | `unknown` |
| 823 | **make up for** | `verb` | 만회하다 | 보상하다 | medium | **A** | 금융/회계, 고객서비스 | `verified` |
| 824 | **move on** | `verb` | 넘어가다 | 이직하다, 진행하다 | easy | **A** | 회의/일정, 채용/인사 | `unknown` |
| 825 | **opt out** | `verb` | 탈퇴하다 | 빠지다 | medium | **A** | 판매/마케팅, 고객서비스 | `unknown` |
| 826 | **pass away** | `verb` | 사망하다 | 사망하다 | medium | **A** | 회사/사무 | `unknown` |
| 827 | **pass out** | `verb` | 기절하다 | 배포하다 | medium | **B** | 교육/행사, 의료/건강 | `unknown` |
| 828 | **pay back** | `verb` | 갚다 | 상환하다 | easy | **A** | 금융/회계, 구매/주문 | `unknown` |
| 829 | **pay off** | `verb` | 성과를 거두다 | 전액 갚다 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 830 | **phase in** | `verb` | 단계적으로 도입하다 | 단계적으로 도입하다 | medium | **A** | 회사/사무 | `unknown` |
| 831 | **phase out** | `verb` | 단계적으로 폐지하다 | 단계적으로 폐지하다 | medium | **A** | 회사/사무 | `unknown` |
| 832 | **pick out** | `verb` | 골라내다 | 선택하다 | easy | **A** | 구매/주문, 판매/마케팅 | `unknown` |
| 833 | **pick up** | `verb` | 픽업하다 | 수거하다, 회복되다 | easy | **A** | 배송/물류, 금융/회계 | `verified` |
| 834 | **point out** | `verb` | 지적하다 | 언급하다 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 835 | **pull off** | `verb` | 해내다 | 성사시키다 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 836 | **pull through** | `verb` | 회복하다 | 극복하다 | hard | **B** | 금융/회계, 의료/건강 | `unknown` |
| 837 | **put away** | `verb` | 치우다 | 저축하다 | easy | **A** | 시설/건물, 금융/회계 | `unknown` |
| 838 | **put down** | `verb` | 적다 | 진압하다, 내려놓다 | easy | **A** | 회사/사무, 금융/회계 | `unknown` |
| 839 | **put forward** | `verb` | 제안하다 | 앞당기다 | medium | **A** | 회의/일정, 회사/사무 | `verified` |
| 840 | **put off** | `verb` | 연기하다 | 미루다 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 841 | **put on** | `verb` | 입다 | 상연하다, 가동하다 | easy | **A** | 교육/행사, 안전/보건 | `unknown` |
| 842 | **put out** | `verb` | 불을 끄다 | 출판하다, 생산하다 | easy | **A** | 안전/보건, 생산/제조 | `unknown` |
| 843 | **put together** | `verb` | 조립하다 | 기획구성하다 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 844 | **put up with** | `verb` | 참다 | 견디다 | medium | **A** | 고객서비스, 채용/인사 | `unknown` |
| 845 | **rely on** | `verb` | 의지하다 | 신뢰하다 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 846 | **rule out** | `verb` | 배제하다 | 제외하다 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 847 | **run into** | `verb` | 우연히 만나다 | 충돌하다, 겪다 | easy | **A** | 회사/사무, 배송/물류 | `unknown` |
| 848 | **run out of** | `verb` | 바닥나다 | 다 써버리다 | easy | **A** | 생산/제조, 구매/주문 | `verified` |
| 849 | **run over** | `verb` | 검토하다 | 초과하다, 치다 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 850 | **see to** | `verb` | 처리하다 | 돌보다 | medium | **A** | 회사/사무, 고객서비스 | `unknown` |
| 851 | **adverse** | `adjective` | 불리한 | 부정적인, 반대의 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 852 | **aggressive** | `adjective` | 공격적인 | 적극적인 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 853 | **agreeable** | `adjective` | 쾌적한 | 동의하는, 상냥한 | easy | **A** | 호텔/식당, 회사/사무 | `unknown` |
| 854 | **alert** | `adjective` | 경계하는 | 기민한 | easy | **A** | 안전/보건 | `unknown` |
| 855 | **allergic** | `adjective` | 알레르기가 있는 | 몹시 싫어하는 | medium | **B** | 의료/건강, 호텔/식당 | `unknown` |
| 856 | **alternative** | `adjective` | 대안의 | 양자택일의 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 857 | **ambiguous** | `adjective` | 모호한 | 다의적인 | medium | **A** | 회사/사무 | `unknown` |
| 858 | **ambitious** | `adjective` | 야심 찬 | 포부가 큰 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 859 | **amiable** | `adjective` | 상냥한 | 붙임성 있는 | medium | **B** | 채용/인사, 고객서비스 | `unknown` |
| 860 | **ample** | `adjective` | 풍부한 | 충분한 | medium | **A** | 시설/건물, 생산/제조 | `unknown` |
| 861 | **analytical** | `adjective` | 분석적인 | 체계적인 | medium | **A** | 채용/인사, 금융/회계 | `unknown` |
| 862 | **anonymous** | `adjective` | 익명의 | 특색 없는 | medium | **A** | 회사/사무, 고객서비스 | `unknown` |
| 863 | **antique** | `adjective` | 골동품의 | 고풍스러운 | easy | **A** | 호텔/식당, 판매/마케팅 | `unknown` |
| 864 | **approachable** | `adjective` | 가까이하기 쉬운 | 접근하기 쉬운 | easy | **A** | 채용/인사, 고객서비스 | `unknown` |
| 865 | **arbitrary** | `adjective` | 임의적인 | 독단적인 | hard | **A** | 회사/사무 | `unknown` |
| 866 | **authentic** | `adjective` | 진품의 | 진정한, 신뢰할 수 있는 | medium | **A** | 판매/마케팅, 호텔/식당 | `verified` |
| 867 | **automated** | `adjective` | 자동화된 | 자동화된 | medium | **A** | 회사/사무 | `unknown` |
| 868 | **autonomous** | `adjective` | 자율적인 | 자치의 | hard | **A** | 기술/장비, 생산/제조 | `unknown` |
| 869 | **bilateral** | `adjective` | 양자간의 | 쌍방의 | hard | **A** | 회사/사무, 회의/일정 | `unknown` |
| 870 | **bilingual** | `adjective` | 2개 국어를 구사하는 | 2개 국어를 구사하는 | medium | **A** | 회사/사무 | `unknown` |
| 871 | **binding** | `adjective` | 구속력 있는 | 의무적인 | medium | **A** | 구매/주문, 회사/사무 | `unknown` |
| 872 | **bold** | `adjective` | 대담한 | 선명한, 굵은 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 873 | **capable** | `adjective` | 유능한 | 역량 있는, ~할 수 있는 | easy | **A** | 채용/인사, 생산/제조 | `verified` |
| 874 | **celebrated** | `adjective` | 유명한 | 저명한 | medium | **A** | 교육/행사, 판매/마케팅 | `unknown` |
| 875 | **chronic** | `adjective` | 만성적인 | 장기적인 | medium | **B** | 의료/건강, 생산/제조 | `unknown` |
| 876 | **circular** | `adjective` | 원형의 | 순환하는 | easy | **A** | 생산/제조, 시설/건물 | `unknown` |
| 877 | **cognitive** | `adjective` | 인식의 | 인지적인 | hard | **B** | 교육/행사, 기술/장비 | `unknown` |
| 878 | **coherent** | `adjective` | 일관성 있는 | 조리 있는 | medium | **A** | 회사/사무, 회의/일정 | `verified` |
| 879 | **collaborative** | `adjective` | 협력적인 | 공동의 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 880 | **collective** | `adjective` | 집단적인 | 총체적인 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 881 | **commensurate** | `adjective` | 상응하는 | 비례하는 | hard | **A** | 채용/인사, 금융/회계 | `unknown` |
| 882 | **committed** | `adjective` | 헌신적인 | 전념하는 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 883 | **compliant** | `adjective` | 준수하는 | 순응하는 | medium | **A** | 생산/제조, 안전/보건 | `verified` |
| 884 | **compulsory** | `adjective` | 의무적인 | 강제적인 | medium | **A** | 교육/행사, 안전/보건 | `verified` |
| 885 | **conclusive** | `adjective` | 결정적인 | 확실한 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 886 | **consecutive** | `adjective` | 연속적인 | 잇따른 | medium | **A** | 회의/일정, 금융/회계 | `verified` |
| 887 | **conservative** | `adjective` | 보수적인 | 조심스러운 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 888 | **conspicuous** | `adjective` | 눈에 띄는 | 뚜렷한 | hard | **B** | 판매/마케팅, 일반 | `unknown` |
| 889 | **continuous** | `adjective` | 연속적인 | 끊임없는 | easy | **A** | 생산/제조, 기술/장비 | `unknown` |
| 890 | **cordial** | `adjective` | 다정한 | 진심 어린 | medium | **B** | 고객서비스, 호텔/식당 | `unknown` |
| 891 | **cumbersome** | `adjective` | 다루기 힘든 | 번거로운 | hard | **A** | 생산/제조, 회사/사무 | `unknown` |
| 892 | **customary** | `adjective` | 관례적인 | 통상적인 | medium | **A** | 회사/사무, 문화/일반 | `unknown` |
| 893 | **definitive** | `adjective` | 최종적인 | 결정적인 | medium | **A** | 회사/사무, 회의/일정 | `verified` |
| 894 | **deliberate** | `adjective` | 신중한 | 고의의 | medium | **A** | 회사/사무, 안전/보건 | `verified` |
| 895 | **delicate** | `adjective` | 섬세한 | 민감한, 취약한 | medium | **A** | 생산/제조, 회사/사무 | `verified` |
| 896 | **demanding** | `adjective` | 요구사항이 많은 | 까다로운, 힘든 | medium | **A** | 채용/인사, 고객서비스 | `verified` |
| 897 | **desperate** | `adjective` | 필사적인 | 자포자기의 | medium | **B** | 일반 | `unknown` |
| 898 | **diplomatic** | `adjective` | 외교적인 | 수완이 좋은 | medium | **A** | 회사/사무, 고객서비스 | `unknown` |
| 899 | **discrete** | `adjective` | 별개의 | 분리된 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 900 | **distinctive** | `adjective` | 독특한 | 특색 있는 | medium | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 901 | **diverse** | `adjective` | 다양한 | 여러 가지의 | easy | **A** | 채용/인사, 판매/마케팅 | `verified` |
| 902 | **domestic** | `adjective` | 국내의 | 가정의 | easy | **A** | 여행/교통, 금융/회계 | `verified` |
| 903 | **dominant** | `adjective` | 우세한 | 지배적인 | medium | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 904 | **drastic** | `adjective` | 과감한 | 급격한 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 905 | **dynamic** | `adjective` | 역동적인 | 활발한 | medium | **A** | 판매/마케팅, 회사/사무 | `verified` |
| 906 | **economic** | `adjective` | 경제의 | 수지맞는 | easy | **A** | 금융/회계 | `unknown` |
| 907 | **elaborate** | `adjective` | 정교한 | 공들인 | medium | **A** | 생산/제조, 기술/장비 | `verified` |
| 908 | **eminent** | `adjective` | 저명한 | 탁월한 | medium | **A** | 채용/인사, 교육/행사 | `verified` |
| 909 | **emphatic** | `adjective` | 강조하는 | 단호한 | medium | **A** | 회사/사무, 회의/일정 | `unknown` |
| 910 | **empirical** | `adjective` | 실증적인 | 경험에 따른 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 911 | **encouraging** | `adjective` | 고무적인 | 희망적인 | medium | **A** | 금융/회계, 회사/사무 | `unknown` |
| 912 | **equivalent** | `adjective` | 동등한 | 상당하는 | medium | **A** | 금융/회계, 생산/제조 | `verified` |
| 913 | **essential** | `adjective` | 필수적인 | 본질적인 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 914 | **ethical** | `adjective` | 윤리적인 | 도덕적인 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 915 | **evident** | `adjective` | 명백한 | 증거가 뚜렷한 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 916 | **exhaustive** | `adjective` | 철저한 | 완전한, 소모적인 | hard | **A** | 회사/사무, 생산/제조 | `verified` |
| 917 | **exotic** | `adjective` | 이국적인 | 색다른 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 918 | **expedient** | `adjective` | 방편의 | 유리한 | hard | **B** | 회사/사무 | `unknown` |
| 919 | **exponential** | `adjective` | 기하급수적인 | 기하급수적인 | medium | **A** | 회사/사무 | `unknown` |
| 920 | **explicit** | `adjective` | 명백한 | 노골적인 | medium | **A** | 회사/사무 | `verified` |
| 921 | **external** | `adjective` | 외부의 | 대외적인 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 922 | **extraordinary** | `adjective` | 비범한 | 대단한, 임시의 | easy | **A** | 교육/행사, 품질관리 | `verified` |
| 923 | **fierce** | `adjective` | 치열한 | 사나운 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 924 | **formidable** | `adjective` | 어마어마한 | 만만찮은 | hard | **B** | 판매/마케팅, 회사/사무 | `unknown` |
| 925 | **frugal** | `adjective` | 절약하는 | 소박한 | medium | **B** | 금융/회계, 일반 | `unknown` |
| 926 | **fundamental** | `adjective` | 근본적인 | 기초적인 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 927 | **genuine** | `adjective` | 진짜의 | 진실한 | easy | **A** | 판매/마케팅, 고객서비스 | `verified` |
| 928 | **grateful** | `adjective` | 감사하는 | 고마워하는 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 929 | **hazardous** | `adjective` | 위험한 | 유해한 | medium | **A** | 안전/보건, 배송/물류 | `verified` |
| 930 | **hectic** | `adjective` | 몹시 바쁜 | 열광적인 | medium | **A** | 회의/일정, 호텔/식당 | `verified` |
| 931 | **historic** | `adjective` | 역사적인 | 유서 깊은 | easy | **A** | 여행/교통, 호텔/식당 | `verified` |
| 932 | **hospitable** | `adjective` | 환대하는 | 친절한 | easy | **A** | 호텔/식당, 고객서비스 | `verified` |
| 933 | **hostile** | `adjective` | 적대적인 | 적대적인 | medium | **A** | 회사/사무 | `unknown` |
| 934 | **idle** | `adjective` | 가동되지 않는 | 게으른, 유휴의 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 935 | **imperative** | `adjective` | 필수적인 | 반드시 해야 하는, 명령적인 | medium | **A** | 회사/사무, 안전/보건 | `verified` |
| 936 | **inadvertent** | `adjective` | 부주의한 | 고의가 아닌 | hard | **A** | 회사/사무, 안전/보건 | `unknown` |
| 937 | **inaugural** | `adjective` | 취임의 | 개막의, 창간의 | medium | **A** | 교육/행사, 회사/사무 | `verified` |
| 938 | **incidental** | `adjective` | 부수적인 | 우발적인 | hard | **A** | 금융/회계, 회사/사무 | `unknown` |
| 939 | **inclusive** | `adjective` | 포괄적인 | 전부 포함된 | easy | **A** | 호텔/식당, 판매/마케팅 | `verified` |
| 940 | **incompatible** | `adjective` | 양립할 수 없는 | 호환되지 않는 | medium | **A** | 기술/장비, 회사/사무 | `unknown` |
| 941 | **indifferent** | `adjective` | 무관심한 | 그저 그런 | medium | **B** | 고객서비스, 채용/인사 | `unknown` |
| 942 | **indispensable** | `adjective` | 필수 불가결한 | 없어서는 안 될 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 943 | **informal** | `adjective` | 비공식의 | 격식 없는 | easy | **A** | 회의/일정, 교육/행사 | `unknown` |
| 944 | **ingenious** | `adjective` | 독창적인 | 기발한 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 945 | **inherent** | `adjective` | 내재된 | 고유의 | medium | **A** | 생산/제조, 회사/사무 | `unknown` |
| 946 | **intense** | `adjective` | 강렬한 | 치열한 | medium | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 947 | **interactive** | `adjective` | 대화형의 | 상호작용하는 | easy | **A** | 기술/장비, 교육/행사 | `verified` |
| 948 | **interim** | `adjective` | 임시의 | 과도기의, 중간의 | medium | **A** | 채용/인사, 회사/사무 | `verified` |
| 949 | **intricate** | `adjective` | 복잡한 | 정교한 | hard | **A** | 생산/제조, 기술/장비 | `unknown` |
| 950 | **invaluable** | `adjective` | 매우 귀중한 | 값을 매길 수 없는 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 951 | **invariable** | `adjective` | 변함없는 | 불변의 | medium | **A** | 생산/제조 | `unknown` |
| 952 | **liable** | `adjective` | 책임이 있는 | ~하기 쉬운 | medium | **A** | 금융/회계, 안전/보건 | `verified` |
| 953 | **lucrative** | `adjective` | 수익성이 좋은 | 돈벌이가 되는 | medium | **A** | 금융/회계, 판매/마케팅 | `verified` |
| 954 | **manual** | `adjective` | 수동의 | 육체노동의 | easy | **A** | 생산/제조, 기술/장비 | `verified` |
| 955 | **marginal** | `adjective` | 미미한 | 한계의, 가장자리의 | medium | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 956 | **memorable** | `adjective` | 기억할 만한 | 잊지 못할 | easy | **A** | 호텔/식당, 교육/행사 | `unknown` |
| 957 | **minimal** | `adjective` | 최소한의 | 극소의 | easy | **A** | 금융/회계, 생산/제조 | `verified` |
| 958 | **momentary** | `adjective` | 순간의 | 찰나의 | medium | **A** | 안전/보건 | `unknown` |
| 959 | **monetary** | `adjective` | 통화의 | 금융의, 화폐의 | medium | **A** | 금융/회계 | `unknown` |
| 960 | **monumental** | `adjective` | 기념비적인 | 엄청난 | medium | **A** | 건설/시설, 회사/사무 | `unknown` |
| 961 | **mutual** | `adjective` | 상호간의 | 공동의 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 962 | **negligible** | `adjective` | 무시해도 될 정도의 | 하찮은 | hard | **A** | 생산/제조, 금융/회계 | `unknown` |
| 963 | **noticeable** | `adjective` | 뚜렷한 | 현저한 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 964 | **notorious** | `adjective` | 악명 높은 | 악명 높은 | medium | **A** | 회사/사무 | `unknown` |
| 965 | **obsolete** | `adjective` | 시대에 뒤떨어진 | 구식의, 더이상쓸모없는 | medium | **A** | 기술/장비, 생산/제조 | `verified` |
| 966 | **ongoing** | `adjective` | 진행 중인 | 계속되는 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 967 | **optimal** | `adjective` | 최적의 | 가장 바람직한 | medium | **A** | 생산/제조, 기술/장비 | `verified` |
| 968 | **optional** | `adjective` | 선택적인 | 임의의 | easy | **A** | 구매/주문, 호텔/식당 | `verified` |
| 969 | **organic** | `adjective` | 유기농의 | 유기적인 | easy | **A** | 호텔/식당, 생산/제조 | `unknown` |
| 970 | **original** | `adjective` | 원래의 | 독창적인, 원본의 | easy | **A** | 생산/제조, 회사/사무 | `unknown` |
| 971 | **paramount** | `adjective` | 가장 중요한 | 최고의 | hard | **A** | 안전/보건, 회사/사무 | `verified` |
| 972 | **perceptive** | `adjective` | 통찰력 있는 | 지각하는 | medium | **A** | 채용/인사, 판매/마케팅 | `unknown` |
| 973 | **permissible** | `adjective` | 허용되는 | 무방한 | medium | **A** | 안전/보건, 회사/사무 | `unknown` |
| 974 | **perpetual** | `adjective` | 영속하는 | 끊임없는 | hard | **B** | 회사/사무, 금융/회계 | `unknown` |
| 975 | **pertinent** | `adjective` | 적절한 | 관련된 | hard | **A** | 회사/사무, 회의/일정 | `unknown` |
| 976 | **pivotal** | `adjective` | 중추적인 | 극히 중요한 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 977 | **plausible** | `adjective` | 그럴듯한 | 타당성 있는 | hard | **A** | 회사/사무, 금융/회계 | `unknown` |
| 978 | **pragmatic** | `adjective` | 실용적인 | 현실적인 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 979 | **precise** | `adjective` | 정밀한 | 정확한 | easy | **A** | 생산/제조, 금융/회계 | `verified` |
| 980 | **premature** | `adjective` | 시기상조의 | 너무 이른 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 981 | **premier** | `adjective` | 최고의 | 제1의 | medium | **A** | 호텔/식당, 판매/마케팅 | `verified` |
| 982 | **prevalent** | `adjective` | 널리 퍼진 | 유행하는 | medium | **A** | 판매/마케팅, 사회/일반 | `verified` |
| 983 | **pristine** | `adjective` | 자연 그대로의 | 오염되지 않은, 완전무결한 | medium | **A** | 호텔/식당, 시설/건물 | `unknown` |
| 984 | **proficient** | `adjective` | 능숙한 | 숙련된 | medium | **A** | 채용/인사, 교육/행사 | `verified` |
| 985 | **prominent** | `adjective` | 저명한 | 두드러진 | medium | **A** | 채용/인사, 시설/건물 | `verified` |
| 986 | **prone** | `adjective` | ~하기 쉬운 | 엎드린 | medium | **A** | 안전/보건, 생산/제조 | `unknown` |
| 987 | **prospective** | `adjective` | 장래의 | 유망한, 곧 있을 | easy | **A** | 채용/인사, 판매/마케팅 | `verified` |
| 988 | **prudent** | `adjective` | 신중한 | 빈틈없는 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 989 | **qualitative** | `adjective` | 정성적인 | 질적인 | medium | **A** | 생산/제조, 연구/개발 | `unknown` |
| 990 | **quantitative** | `adjective` | 정량적인 | 양적인 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 991 | **radical** | `adjective` | 근본적인 | 급진적인 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 992 | **rational** | `adjective` | 합리적인 | 이성적인 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 993 | **realistic** | `adjective` | 현실적인 | 실제적인 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 994 | **receptive** | `adjective` | 수용적인 | 잘 받아들이는 | medium | **A** | 고객서비스, 채용/인사 | `verified` |
| 995 | **reciprocal** | `adjective` | 상호간의 | 보답하는 | hard | **A** | 회사/사무, 회의/일정 | `unknown` |
| 996 | **repetitive** | `adjective` | 반복적인 | 단조로운 | medium | **A** | 생산/제조, 채용/인사 | `verified` |
| 997 | **resolute** | `adjective` | 단호한 | 결연한 | hard | **A** | 채용/인사, 회사/사무 | `unknown` |
| 998 | **restrictive** | `adjective` | 제한적인 | 구속하는 | medium | **A** | 회사/사무, 시설/건물 | `unknown` |
| 999 | **rigorous** | `adjective` | 엄격한 | 철저한 | medium | **A** | 품질관리, 생산/제조 | `verified` |
| 1000 | **routine** | `adjective` | 일상적인 | 정례의 | easy | **A** | 회사/사무, 안전/보건 | `verified` |
| 1001 | **rudimentary** | `adjective` | 기초적인 | 초보적인 | hard | **B** | 생산/제조, 기술/장비 | `unknown` |
| 1002 | **scarce** | `adjective` | 부족한 | 희귀한 | medium | **A** | 생산/제조, 구매/주문 | `unknown` |
| 1003 | **seasonal** | `adjective` | 계절적인 | 시즌 한정의 | easy | **A** | 판매/마케팅, 호텔/식당 | `verified` |
| 1004 | **selective** | `adjective` | 선별적인 | 까다로운 | medium | **A** | 채용/인사, 구매/주문 | `verified` |
| 1005 | **sensible** | `adjective` | 분별 있는 | 실용적인 | medium | **A** | 회사/사무, 일반 | `unknown` |
| 1006 | **sensitive** | `adjective` | 민감한 | 기밀의, 세심한 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1007 | **serene** | `adjective` | 평온한 | 맑게 갠 | medium | **B** | 호텔/식당, 여행/교통 | `unknown` |
| 1008 | **simultaneous** | `adjective` | 동시의 | 동반하는 | medium | **A** | 회의/일정, 기술/장비 | `unknown` |
| 1009 | **skeptical** | `adjective` | 회의적인 | 의심 많은 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 1010 | **sophisticated** | `adjective` | 정교한 | 세련된, 고급의 | medium | **A** | 기술/장비, 판매/마케팅 | `verified` |
| 1011 | **spontaneous** | `adjective` | 자발적인 | 즉흥적인 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 1012 | **standard** | `adjective` | 표준의 | 일반적인 | easy | **A** | 생산/제조, 품질관리 | `verified` |
| 1013 | **static** | `adjective` | 정적인 | 고정된 | medium | **A** | 기술/장비, 금융/회계 | `unknown` |
| 1014 | **straightforward** | `adjective` | 솔직한 | 간단명료한 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1015 | **stringent** | `adjective` | 엄격한 | 절박한 | medium | **A** | 품질관리, 안전/보건 | `verified` |
| 1016 | **subtle** | `adjective` | 미묘한 | 섬세한 | medium | **A** | 판매/마케팅, 일반 | `verified` |
| 1017 | **successive** | `adjective` | 연속적인 | 계승하는 | medium | **A** | 회의/일정, 금융/회계 | `verified` |
| 1018 | **superior** | `adjective` | 우수한 | 상급의 | easy | **A** | 품질관리, 채용/인사 | `verified` |
| 1019 | **supreme** | `adjective` | 최고의 | 궁극의 | medium | **B** | 회사/사무, 일반 | `unknown` |
| 1020 | **surplus** | `adjective` | 잉여의 | 과잉의 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 1021 | **sustainable** | `adjective` | 지속 가능한 | 환경친화적인 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 1022 | **systematic** | `adjective` | 체계적인 | 조직적인 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 1023 | **tangible** | `adjective` | 만질 수 있는 | 유형의, 실재하는 | medium | **A** | 금융/회계, 생산/제조 | `verified` |
| 1024 | **tedious** | `adjective` | 지루한 | 단조로운 | medium | **B** | 회사/사무, 생산/제조 | `unknown` |
| 1025 | **thorough** | `adjective` | 철저한 | 완전한 | easy | **A** | 품질관리, 안전/보건 | `verified` |
| 1026 | **thrilling** | `adjective` | 아주 신나는 | 흥분되는 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 1027 | **timely** | `adjective` | 시기적절한 | 때맞춘 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1028 | **transparent** | `adjective` | 투명한 | 명백한 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 1029 | **tremendous** | `adjective` | 엄청난 | 굉장한 | easy | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 1030 | **turbulent** | `adjective` | 격동의 | 난기류의 | hard | **B** | 여행/교통, 금융/회계 | `unknown` |
| 1031 | **ultimate** | `adjective` | 궁극적인 | 최후의 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 1032 | **unprecedented** | `adjective` | 전례 없는 | 파격적인 | medium | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 1033 | **unpredictable** | `adjective` | 예측할 수 없는 | 예측할 수 없는 | medium | **A** | 회사/사무 | `unknown` |
| 1034 | **variable** | `adjective` | 가변적인 | 변하기 쉬운 | medium | **A** | 금융/회계, 생산/제조 | `verified` |
| 1035 | **viable** | `adjective` | 생존 가능한 | 실행 가능한 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 1036 | **vibrant** | `adjective` | 활기찬 | 선명한 | medium | **A** | 판매/마케팅, 여행/교통 | `verified` |
| 1037 | **vigorous** | `adjective` | 활발한 | 강력한 | medium | **A** | 판매/마케팅, 회사/사무 | `verified` |
| 1038 | **volatile** | `adjective` | 변덕스러운 | 휘발성의, 불안정한 | hard | **B** | 금융/회계, 생산/제조 | `unknown` |
| 1039 | **vulnerable** | `adjective` | 취약한 | 상처받기 쉬운 | medium | **A** | 안전/보건, 기술/장비 | `verified` |
| 1040 | **abundant** | `adjective` | 풍부한 | 많은 | easy | **A** | 생산/제조, 일반 | `unknown` |
| 1041 | **acclaimed** | `adjective` | 호평을 받은 | 찬사를 받은 | medium | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 1042 | **advisable** | `adjective` | 권장되는 | 바람직한 | easy | **A** | 회사/사무, 안전/보건 | `unknown` |
| 1043 | **aesthetic** | `adjective` | 미적인 | 심미적인 | medium | **B** | 생산/제조, 판매/마케팅 | `unknown` |
| 1044 | **affluent** | `adjective` | 부유한 | 풍요로운 | medium | **B** | 금융/회계, 일반 | `unknown` |
| 1045 | **appreciable** | `adjective` | 상당한 | 눈에 띄는 | hard | **A** | 금융/회계, 생산/제조 | `unknown` |
| 1046 | **apprehensive** | `adjective` | 걱정하는 | 염려하는 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 1047 | **apt** | `adjective` | 적절한 | ~하기 쉬운 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 1048 | **arduous** | `adjective` | 몹시 힘든 | 고된 | hard | **B** | 생산/제조, 채용/인사 | `unknown` |
| 1049 | **artistic** | `adjective` | 예술적인 | 기교 있는 | easy | **A** | 교육/행사, 판매/마케팅 | `unknown` |
| 1050 | **astute** | `adjective` | 기민한 | 약삭빠른 | hard | **B** | 채용/인사, 금융/회계 | `unknown` |
| 1051 | **attainable** | `adjective` | 달성 가능한 | 도달할 수 있는 | easy | **A** | 회사/사무, 채용/인사 | `unknown` |
| 1052 | **authoritative** | `adjective` | 권위 있는 | 믿을 만한 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 1053 | **belated** | `adjective` | 뒤늦은 | 연체된 | medium | **A** | 회사/사무, 고객서비스 | `unknown` |
| 1054 | **beneficent** | `adjective` | 인정 많은 | 자비로운 | hard | **B** | 채용/인사 | `unknown` |
| 1055 | **blank** | `adjective` | 빈 | 여백의 | easy | **A** | 회사/사무 | `unknown` |
| 1056 | **booming** | `adjective` | 급성장하는 | 호황의 | easy | **A** | 금융/회계, 판매/마케팅 | `unknown` |
| 1057 | **bound** | `adjective` | 의무가 있는 | ~행의 | medium | **A** | 여행/교통, 회사/사무 | `unknown` |
| 1058 | **breathtaking** | `adjective` | 숨막히는 | 아주 멋진 | easy | **A** | 여행/교통, 호텔/식당 | `unknown` |
| 1059 | **brilliant** | `adjective` | 찬란한 | 명석한 | easy | **A** | 채용/인사, 교육/행사 | `unknown` |
| 1060 | **calm** | `adjective` | 차분한 | 잔잔한 | easy | **A** | 호텔/식당, 고객서비스 | `unknown` |
| 1061 | **candid** | `adjective` | 솔직한 | 자연스러운 | medium | **A** | 채용/인사, 회사/사무 | `unknown` |
| 1062 | **casual** | `adjective` | 격식 없는 | 우연한, 평상시의 | easy | **A** | 채용/인사, 호텔/식당 | `unknown` |
| 1063 | **central** | `adjective` | 중심의 | 핵심적인 | easy | **A** | 시설/건물, 회사/사무 | `unknown` |
| 1064 | **certain** | `adjective` | 확실한 | 어떤 | easy | **A** | 회사/사무 | `unknown` |
| 1065 | **charming** | `adjective` | 매력적인 | 호감 가는 | easy | **A** | 호텔/식당, 판매/마케팅 | `unknown` |
| 1066 | **clean** | `adjective` | 깨끗한 | 청결한 | easy | **A** | 시설/건물, 호텔/식당 | `unknown` |
| 1067 | **clever** | `adjective` | 영리한 | 기발한 | easy | **A** | 채용/인사, 기술/장비 | `unknown` |
| 1068 | **close** | `adjective` | 가까운 | 친밀한, 철저한 | easy | **A** | 시설/건물, 회사/사무 | `unknown` |
| 1069 | **cluttered** | `adjective` | 어수선한 | 혼잡한 | medium | **A** | 시설/건물, 회사/사무 | `unknown` |
| 1070 | **coastal** | `adjective` | 해안의 | 연안의 | easy | **A** | 여행/교통, 시설/건물 | `unknown` |
| 1071 | **comforting** | `adjective` | 위로가 되는 | 편안한 | easy | **A** | 고객서비스, 호텔/식당 | `unknown` |
| 1072 | **commercial** | `adjective` | 상업의 | 영리적인 | easy | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 1073 | **common** | `adjective` | 공통의 | 흔한 | easy | **A** | 회사/사무, 일반 | `unknown` |
| 1074 | **compact** | `adjective` | 소형의 | 조밀한 | easy | **A** | 생산/제조, 시설/건물 | `unknown` |
| 1075 | **comparable** | `adjective` | 필적하는 | 비교할 만한 | medium | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 1076 | **complete** | `adjective` | 완전한 | 완결된 | easy | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1077 | **complex** | `adjective` | 복잡한 | 합성의 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 1078 | **concerned** | `adjective` | 걱정하는 | 관련된 | easy | **A** | 회사/사무, 고객서비스 | `unknown` |
| 1079 | **concise** | `adjective` | 간결한 | 축약된 | medium | **A** | 회사/사무 | `unknown` |
| 1080 | **concrete** | `adjective` | 구체적인 | 콘크리트의 | medium | **A** | 회사/사무, 시설/건물 | `unknown` |
| 1081 | **conducive** | `adjective` | 도움이 되는 | 기여하는 | hard | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1082 | **congenial** | `adjective` | 마음이 맞는 | 쾌적한 | hard | **B** | 채용/인사, 호텔/식당 | `unknown` |
| 1083 | **constant** | `adjective` | 지속적인 | 불변의 | easy | **A** | 생산/제조, 기술/장비 | `unknown` |
| 1084 | **contemporary** | `adjective` | 현대의 | 동시대의 | medium | **A** | 문화/일반, 판매/마케팅 | `unknown` |
| 1085 | **conventional** | `adjective` | 전통적인 | 관습의 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 1086 | **convincing** | `adjective` | 설득력 있는 | 확신을 주는 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 1087 | **costly** | `adjective` | 비용이 많이 드는 | 손실이 큰 | easy | **A** | 금융/회계, 생산/제조 | `unknown` |
| 1088 | **crisp** | `adjective` | 선명한 | 바삭한, 상쾌한 | easy | **A** | 호텔/식당, 생산/제조 | `unknown` |
| 1089 | **customized** | `adjective` | 맞춤형의 | 주문제작의 | easy | **A** | 생산/제조, 판매/마케팅 | `unknown` |
| 1090 | **daily** | `adjective` | 매일의 | 일상의 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1091 | **damaged** | `adjective` | 손상된 | 파손된 | easy | **A** | 배송/물류, 품질관리 | `unknown` |
| 1092 | **daring** | `adjective` | 대담한 | 용감한 | medium | **B** | 판매/마케팅 | `unknown` |
| 1093 | **dazzling** | `adjective` | 눈부신 | 휘황찬란한 | medium | **A** | 판매/마케팅, 교육/행사 | `unknown` |
| 1094 | **deadly** | `adjective` | 치명적인 | 극도의 | medium | **B** | 안전/보건 | `unknown` |
| 1095 | **decent** | `adjective` | 괜찮은 | 품위 있는 | easy | **A** | 호텔/식당, 채용/인사 | `unknown` |
| 1096 | **definite** | `adjective` | 명확한 | 확실한 | easy | **A** | 회사/사무, 회의/일정 | `unknown` |
| 1097 | **descriptive** | `adjective` | 서술적인 | 설명적인 | medium | **A** | 회사/사무, 교육/행사 | `unknown` |
| 1098 | **devoted** | `adjective` | 헌신적인 | 전념하는 | easy | **A** | 채용/인사, 회사/사무 | `unknown` |
| 1099 | **different** | `adjective` | 다른 | 차이 있는 | easy | **A** | 일반, 생산/제조 | `unknown` |
| 1100 | **dim** | `adjective` | 어둑한 | 흐릿한 | easy | **B** | 시설/건물 | `unknown` |
| 1101 | **direct** | `adjective` | 직접적인 | 직행의 | easy | **A** | 여행/교통, 고객서비스 | `unknown` |
| 1102 | **disappointing** | `adjective` | 실망스러운 | 기대에 못 미치는 | easy | **A** | 고객서비스, 판매/마케팅 | `unknown` |
| 1103 | **disastrous** | `adjective` | 재난의 | 비참한 | hard | **B** | 안전/보건, 금융/회계 | `unknown` |
| 1104 | **disciplined** | `adjective` | 규율 있는 | 훈련된 | medium | **A** | 채용/인사, 생산/제조 | `unknown` |
| 1105 | **equitable** | `adjective` | 공평한 | 공정한 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 1106 | **faulty** | `adjective` | 결함 있는 | 불완전한 | easy | **A** | 생산/제조, 품질관리 | `unknown` |
| 1107 | **grand** | `adjective` | 웅장한 | 위대한, 원대한 | easy | **A** | 시설/건물, 호텔/식당 | `unknown` |
| 1108 | **guaranteed** | `adjective` | 보장된 | 확실한 | easy | **A** | 품질관리, 금융/회계 | `unknown` |
| 1109 | **imminent** | `adjective` | 임박한 | 촉박한 | medium | **A** | 회의/일정, 안전/보건 | `unknown` |
| 1110 | **judicious** | `adjective` | 신중한 | 판단력 있는 | hard | **A** | 회사/사무, 금융/회계 | `unknown` |
| 1111 | **abruptly** | `adverb` | 갑작스럽게 | 퉁명스럽게 | medium | **A** | 회사/사무, 일반 | `unknown` |
| 1112 | **accidentally** | `adverb` | 우연히 | 뜻하지 않게 | easy | **A** | 안전/보건, 회사/사무 | `unknown` |
| 1113 | **actively** | `adverb` | 적극적으로 | 활발히 | easy | **A** | 채용/인사, 판매/마케팅 | `verified` |
| 1114 | **allegedly** | `adverb` | 주장에 의하면 | 전해지는 바에 따르면 | hard | **B** | 회사/사무 | `unknown` |
| 1115 | **alternately** | `adverb` | 번갈아 | 교대로 | medium | **A** | 생산/제조, 회의/일정 | `unknown` |
| 1116 | **ambitiously** | `adverb` | 야심 차게 | 대망을 품고 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 1117 | **annually** | `adverb` | 매년 | 연례로 | easy | **A** | 회의/일정, 금융/회계 | `verified` |
| 1118 | **anonymously** | `adverb` | 익명으로 | 익명으로 | medium | **A** | 회사/사무 | `unknown` |
| 1119 | **apparently** | `adverb` | 보아하니 | 외견상으로는 | medium | **A** | 회사/사무 | `verified` |
| 1120 | **appropriately** | `adverb` | 적절하게 | 알맞게 | easy | **A** | 회사/사무, 채용/인사 | `verified` |
| 1121 | **arbitrarily** | `adverb` | 임의로 | 독단적으로 | hard | **A** | 회사/사무 | `unknown` |
| 1122 | **arguably** | `adverb` | 단언컨대 | 주장하건대 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 1123 | **authentically** | `adverb` | 진정으로 | 진품으로서 | medium | **A** | 판매/마케팅, 호텔/식당 | `unknown` |
| 1124 | **autonomously** | `adverb` | 자율적으로 | 독립하여 | hard | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1125 | **belatedly** | `adverb` | 뒤늦게 | 때늦게 | medium | **A** | 회사/사무, 고객서비스 | `unknown` |
| 1126 | **beneficially** | `adverb` | 유익하게 | 이롭게 | medium | **A** | 회사/사무 | `unknown` |
| 1127 | **boldly** | `adverb` | 대담하게 | 굵게 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 1128 | **briefly** | `adverb` | 간단히 | 잠시 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 1129 | **briskly** | `adverb` | 활발하게 | 기운차게, 빠르게 | medium | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 1130 | **broadly** | `adverb` | 대체로 | 널리 | medium | **A** | 회사/사무 | `unknown` |
| 1131 | **cautiously** | `adverb` | 조심스럽게 | 신중히 | easy | **A** | 안전/보건, 금융/회계 | `verified` |
| 1132 | **centrally** | `adverb` | 중심에 | 집중적으로 | easy | **A** | 시설/건물, 회사/사무 | `unknown` |
| 1133 | **chronologically** | `adverb` | 연대순으로 | 연대순으로 | medium | **A** | 회사/사무 | `unknown` |
| 1134 | **clearly** | `adverb` | 분명하게 | 명백히 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 1135 | **collaboratively** | `adverb` | 협력하여 | 합심하여 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 1136 | **comfortably** | `adverb` | 편안하게 | 안락하게 | easy | **A** | 호텔/식당, 여행/교통 | `unknown` |
| 1137 | **comparatively** | `adverb` | 비교적 | 상대적으로 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 1138 | **competitively** | `adverb` | 경쟁력 있게 | 경쟁적으로 | easy | **A** | 판매/마케팅, 금융/회계 | `verified` |
| 1139 | **completely** | `adverb` | 완전히 | 전적으로 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 1140 | **comprehensively** | `adverb` | 포괄적으로 | 종합적으로 | medium | **A** | 회사/사무, 교육/행사 | `verified` |
| 1141 | **conclusively** | `adverb` | 결정적으로 | 확정적으로 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 1142 | **confidentially** | `adverb` | 기밀로 | 은밀히 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 1143 | **consciously** | `adverb` | 의식적으로 | 자각하여 | medium | **A** | 채용/인사, 안전/보건 | `unknown` |
| 1144 | **consecutively** | `adverb` | 연속으로 | 연달아 | medium | **A** | 회의/일정, 금융/회계 | `verified` |
| 1145 | **conservatively** | `adverb` | 보수적으로 | 조심스럽게 | medium | **A** | 금융/회계, 회사/사무 | `verified` |
| 1146 | **conspicuously** | `adverb` | 눈에 띄게 | 현저히 | hard | **B** | 판매/마케팅, 일반 | `unknown` |
| 1147 | **constructively** | `adverb` | 건설적으로 | 발전적으로 | medium | **A** | 회사/사무, 회의/일정 | `verified` |
| 1148 | **continually** | `adverb` | 거듭하여 | 계속적으로 | easy | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1149 | **continuously** | `adverb` | 연속적으로 | 끊김 없이 | easy | **A** | 기술/장비, 생산/제조 | `verified` |
| 1150 | **conversely** | `adverb` | 반대로 | 역으로 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 1151 | **cordially** | `adverb` | 진심으로 | 정중히 | medium | **A** | 고객서비스, 호텔/식당 | `unknown` |
| 1152 | **correctly** | `adverb` | 올바르게 | 정확히 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 1153 | **courteously** | `adverb` | 공손하게 | 정중하게 | easy | **A** | 고객서비스, 채용/인사 | `verified` |
| 1154 | **critically** | `adverb` | 비판적으로 | 결정적으로, 위태롭게 | easy | **A** | 회사/사무, 안전/보건 | `verified` |
| 1155 | **crucially** | `adverb` | 결정적으로 | 중대하게 | medium | **A** | 회사/사무 | `unknown` |
| 1156 | **cumulatively** | `adverb` | 누적하여 | 점증적으로 | hard | **A** | 금융/회계 | `unknown` |
| 1157 | **customarily** | `adverb` | 관례상 | 통상적으로 | medium | **A** | 회사/사무 | `verified` |
| 1158 | **dedicatedly** | `adverb` | 헌신적으로 | 헌신적으로 | medium | **A** | 회사/사무 | `unknown` |
| 1159 | **deeply** | `adverb` | 깊이 | 대단히 | easy | **A** | 고객서비스, 회사/사무 | `unknown` |
| 1160 | **delicately** | `adverb` | 섬세하게 | 조심스럽게 | medium | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1161 | **dependably** | `adverb` | 신뢰성 있게 | 확실히 | easy | **A** | 고객서비스, 생산/제조 | `verified` |
| 1162 | **desperately** | `adverb` | 절박하게 | 필사적으로 | medium | **B** | 일반 | `unknown` |
| 1163 | **differentially** | `adverb` | 차등적으로 | 차등적으로 | medium | **A** | 회사/사무 | `unknown` |
| 1164 | **diplomatically** | `adverb` | 외교적으로 | 수완 좋게 | medium | **A** | 고객서비스, 회사/사무 | `unknown` |
| 1165 | **discreetly** | `adverb` | 신중하게 | 조심스럽게 | hard | **A** | 회사/사무 | `unknown` |
| 1166 | **distinctly** | `adverb` | 뚜렷하게 | 분명히 | medium | **A** | 판매/마케팅, 회사/사무 | `verified` |
| 1167 | **distinctively** | `adverb` | 독특하게 | 특색 있게 | medium | **A** | 판매/마케팅, 생산/제조 | `unknown` |
| 1168 | **diversely** | `adverb` | 다양하게 | 상이하게 | easy | **A** | 채용/인사, 판매/마케팅 | `unknown` |
| 1169 | **domestically** | `adverb` | 국내에서 | 가정적으로 | easy | **A** | 금융/회계, 판매/마케팅 | `verified` |
| 1170 | **dramatically** | `adverb` | 극적으로 | 비약적으로 | easy | **A** | 금융/회계, 판매/마케팅 | `verified` |
| 1171 | **drastically** | `adverb` | 과감하게 | 급격히 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 1172 | **durably** | `adverb` | 내구성 있게 | 튼튼하게 | easy | **A** | 생산/제조 | `verified` |
| 1173 | **dynamically** | `adverb` | 역동적으로 | 활발히 | medium | **A** | 기술/장비, 판매/마케팅 | `unknown` |
| 1174 | **eagerly** | `adverb` | 열망하여 | 간절히 | easy | **A** | 채용/인사, 고객서비스 | `unknown` |
| 1175 | **economically** | `adverb` | 경제적으로 | 알뜰하게 | easy | **A** | 금융/회계, 구매/주문 | `verified` |
| 1176 | **effectively** | `adverb` | 효과적으로 | 실질적으로 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 1177 | **elaborately** | `adverb` | 정교하게 | 공들여 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 1178 | **elegantly** | `adverb` | 우아하게 | 품위 있게 | easy | **A** | 호텔/식당, 판매/마케팅 | `unknown` |
| 1179 | **eloquently** | `adverb` | 웅변으로 | 설득력 있게 | hard | **B** | 회의/일정, 교육/행사 | `unknown` |
| 1180 | **eminently** | `adverb` | 대단히 | 탁월하게 | hard | **A** | 채용/인사, 회사/사무 | `unknown` |
| 1181 | **emphatically** | `adverb` | 단호하게 | 역설적으로 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1182 | **empirically** | `adverb` | 경험적으로 | 실증적으로 | hard | **A** | 기술/장비, 생산/제조 | `unknown` |
| 1183 | **entirely** | `adverb` | 완전히 | 전적으로 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 1184 | **equally** | `adverb` | 동등하게 | 평등하게 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 1185 | **essentially** | `adverb` | 본질적으로 | 기본적으로 | easy | **A** | 회사/사무, 생산/제조 | `verified` |
| 1186 | **ethically** | `adverb` | 윤리적으로 | 도덕상 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 1187 | **evenly** | `adverb` | 균등하게 | 고르게 | easy | **A** | 생산/제조, 금융/회계 | `verified` |
| 1188 | **evidently** | `adverb` | 분명히 | 눈에 띄게 | medium | **A** | 회사/사무 | `verified` |
| 1189 | **exceedingly** | `adverb` | 극도로 | 대단히 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 1190 | **excessively** | `adverb` | 지나치게 | 과도하게 | medium | **A** | 금융/회계, 안전/보건 | `unknown` |
| 1191 | **exemplarily** | `adverb` | 모범적으로 | 모범적으로 | medium | **A** | 회사/사무 | `unknown` |
| 1192 | **exhaustively** | `adverb` | 철저하게 | 남김없이 | hard | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1193 | **explicitly** | `adverb` | 명시적으로 | 노골적으로 | medium | **A** | 회사/사무, 회의/일정 | `verified` |
| 1194 | **exponentially** | `adverb` | 기하급수적으로 | 기하급수적으로 | medium | **A** | 회사/사무 | `unknown` |
| 1195 | **extensively** | `adverb` | 광범위하게 | 대대적으로 | easy | **A** | 시설/건물, 회사/사무 | `verified` |
| 1196 | **externally** | `adverb` | 외부적으로 | 대외적으로 | easy | **A** | 회사/사무, 금융/회계 | `unknown` |
| 1197 | **extraordinarily** | `adverb` | 비상하게 | 엄청나게 | easy | **A** | 판매/마케팅, 품질관리 | `unknown` |
| 1198 | **extremely** | `adverb` | 극도로 | 대단히 | easy | **A** | 고객서비스, 품질관리 | `verified` |
| 1199 | **feasibly** | `adverb` | 실현 가능하게 | 알맞게 | medium | **A** | 회사/사무, 생산/제조 | `unknown` |
| 1200 | **firmly** | `adverb` | 단단히 | 단호하게 | easy | **A** | 생산/제조, 회사/사무 | `verified` |
| 1201 | **as a matter of fact** | `phrase` | 사실은 | 실제로는 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1202 | **as a result of** | `phrase` | ~의 결과로 | ~로 인하여 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 1203 | **as far as I know** | `phrase` | 내가 아는 한 | 아는 바로는 | easy | **A** | 회사/사무, 회의/일정 | `unknown` |
| 1204 | **as long as** | `phrase` | ~하는 한 | ~하기만 하면 | easy | **A** | 구매/주문, 회사/사무 | `unknown` |
| 1205 | **as opposed to** | `phrase` | ~와는 대조적으로 | ~가 아니라 | medium | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 1206 | **as per your request** | `phrase` | 귀하의 요청에 따라 | 요청하신 대로 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1207 | **as soon as possible** | `phrase` | 가능한 한 빨리 | 가급적 속히 | easy | **A** | 고객서비스, 배송/물류 | `verified` |
| 1208 | **as well as** | `phrase` | ~뿐만 아니라 | ~와 마찬가지로 | easy | **A** | 회사/사무, 판매/마케팅 | `verified` |
| 1209 | **at all times** | `phrase` | 항상 | 언제나 | easy | **A** | 안전/보건, 시설/건물 | `verified` |
| 1210 | **at any rate** | `phrase` | 어쨌든 | 하여간 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1211 | **at first glance** | `phrase` | 언뜻 보기에 | 첫눈에 | medium | **A** | 회사/사무, 판매/마케팅 | `unknown` |
| 1212 | **at one's disposal** | `phrase` | ~의 뜻대로 이용할 수 있는 | 마음대로 처분할 수 있는 | hard | **A** | 회사/사무, 시설/건물 | `unknown` |
| 1213 | **at one's earliest convenience** | `phrase` | 형편이 닿는 대로 빨리 | 가장 편한 때에 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1214 | **at the expense of** | `phrase` | ~의 비용으로 | ~을 희생하여 | medium | **A** | 금융/회계, 생산/제조 | `unknown` |
| 1215 | **at the latest** | `phrase` | 늦어도 | 최대한 늦게 | easy | **A** | 회의/일정, 배송/물류 | `verified` |
| 1216 | **at the moment** | `phrase` | 현재 | 지금으로서는 | easy | **A** | 고객서비스, 회사/사무 | `unknown` |
| 1217 | **back and forth** | `phrase` | 왔다 갔다 | 앞뒤로 | easy | **A** | 여행/교통, 배송/물류 | `unknown` |
| 1218 | **because of** | `phrase` | ~ 때문에 | ~로 인해 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 1219 | **by all means** | `phrase` | 반드시 | 아무렴 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1220 | **by means of** | `phrase` | ~에 의하여 | ~라는 수단으로 | medium | **A** | 생산/제조, 기술/장비 | `unknown` |
| 1221 | **by no means** | `phrase` | 결코 ~가 아닌 | 절대로 아닌 | medium | **A** | 회사/사무 | `unknown` |
| 1222 | **by the time** | `phrase` | ~할 때까지는 | ~할 무렵에 | easy | **A** | 회의/일정, 배송/물류 | `verified` |
| 1223 | **comply with regulations** | `phrase` | 규정을 준수하다 | 법규를 지키다 | easy | **A** | 안전/보건, 회사/사무 | `verified` |
| 1224 | **due to circumstances beyond our control** | `phrase` | 불가항력적인 사정으로 인해 | 불가항력적인 사정으로 인해 | medium | **A** | 회사/사무 | `unknown` |
| 1225 | **each and every** | `phrase` | 하나하나 모두 | 각각의 모든 | easy | **A** | 채용/인사, 회사/사무 | `unknown` |
| 1226 | **either way** | `phrase` | 어느 쪽이든 | 어차피 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1227 | **enclosed please find** | `phrase` | 동봉된 서류를 확인해주십시오 | 동봉된 서류를 확인해주십시오 | medium | **A** | 회사/사무 | `unknown` |
| 1228 | **first of all** | `phrase` | 우선 | 무엇보다도 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 1229 | **for the time being** | `phrase` | 당분간 | 현재로서는 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 1230 | **from now on** | `phrase` | 이제부터는 | 향후 | easy | **A** | 회사/사무, 안전/보건 | `unknown` |
| 1231 | **hand in hand** | `phrase` | 협력하여 | 손에 손잡고 | easy | **A** | 회사/사무, 채용/인사 | `unknown` |
| 1232 | **in a timely manner** | `phrase` | 적시에 | 시기적절하게 | easy | **A** | 고객서비스, 배송/물류 | `verified` |
| 1233 | **in accordance with** | `phrase` | ~에 부합하여 | ~에 따라 | medium | **A** | 회사/사무, 생산/제조 | `verified` |
| 1234 | **in addition to** | `phrase` | ~에 더하여 | ~뿐만 아니라 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 1235 | **in advance** | `phrase` | 사전에 | 미리 | easy | **A** | 호텔/식당, 회의/일정 | `verified` |
| 1236 | **in agreement with** | `phrase` | ~와 합의하여 | ~와 일치하여 | medium | **A** | 회의/일정, 구매/주문 | `unknown` |
| 1237 | **in an effort to** | `phrase` | ~하려는 노력의 일환으로 | ~하기 위해 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 1238 | **in bulk** | `phrase` | 대량으로 | 포장하지 않고 | medium | **A** | 구매/주문, 배송/물류 | `unknown` |
| 1239 | **in charge of** | `phrase` | ~을 담당하는 | ~의 책임자인 | easy | **A** | 채용/인사, 회사/사무 | `verified` |
| 1240 | **in collaboration with** | `phrase` | ~와 협력하여 | ~와 공동으로 | easy | **A** | 회사/사무, 교육/행사 | `unknown` |
| 1241 | **in compliance with** | `phrase` | ~을 준수하여 | ~에 의거하여 | medium | **A** | 안전/보건, 회사/사무 | `verified` |
| 1242 | **in conclusion** | `phrase` | 결론적으로 | 끝으로 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1243 | **in conjunction with** | `phrase` | ~와 연계하여 | ~와 함께 | medium | **A** | 판매/마케팅, 교육/행사 | `verified` |
| 1244 | **in contrast to** | `phrase` | ~와 대조적으로 | ~와 달리 | medium | **A** | 판매/마케팅, 금융/회계 | `unknown` |
| 1245 | **in detail** | `phrase` | 상세하게 | 자세히 | easy | **A** | 회사/사무, 고객서비스 | `verified` |
| 1246 | **in effect** | `phrase` | 사실상 | 효력을 발휘하는 | medium | **A** | 회사/사무, 금융/회계 | `unknown` |
| 1247 | **in exchange for** | `phrase` | ~의 대가로 | ~와 교환하여 | easy | **A** | 구매/주문, 금융/회계 | `unknown` |
| 1248 | **in favor of** | `phrase` | ~을 찬성하여 | ~을 지지하여 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1249 | **in general** | `phrase` | 일반적으로 | 대체로 | easy | **A** | 회사/사무, 일반 | `unknown` |
| 1250 | **in honor of** | `phrase` | ~을 기념하여 | ~에게 경의를 표하여 | easy | **A** | 교육/행사, 호텔/식당 | `verified` |
| 1251 | **in keeping with** | `phrase` | ~에 부합하여 | ~에 따라 | medium | **A** | 회사/사무, 채용/인사 | `unknown` |
| 1252 | **in light of** | `phrase` | ~을 고려하여 | ~에 비추어 볼 때 | medium | **A** | 회사/사무, 금융/회계 | `verified` |
| 1253 | **in no time** | `phrase` | 순식간에 | 곧바로 | easy | **A** | 고객서비스, 배송/물류 | `unknown` |
| 1254 | **in order to** | `phrase` | ~하기 위하여 | ~하기 위하여 | medium | **A** | 회사/사무 | `verified` |
| 1255 | **in place of** | `phrase` | ~을 대신하여 | ~의 자리에 | easy | **A** | 채용/인사, 생산/제조 | `unknown` |
| 1256 | **in practice** | `phrase` | 실제로는 | 실행상 | medium | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1257 | **in recognition of** | `phrase` | ~을 인정하여 | ~의 공로를 치하하여 | medium | **A** | 채용/인사, 교육/행사 | `unknown` |
| 1258 | **in response to** | `phrase` | ~에 응하여 | ~에 대한 답변으로 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1259 | **in summary** | `phrase` | 요약하건대 | 간추려 말하면 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1260 | **in terms of** | `phrase` | ~의 관점에서 | ~에 관하여 | easy | **A** | 회사/사무, 금융/회계 | `verified` |
| 1261 | **in the event of** | `phrase` | ~가 발생할 경우에 | ~의 경우 | easy | **A** | 안전/보건, 보험/금융 | `verified` |
| 1262 | **in the long run** | `phrase` | 장기적으로는 | 결국에는 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 1263 | **in the meantime** | `phrase` | 그동안에 | 한편 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 1264 | **in the near future** | `phrase` | 가까운 장래에 | 조만간 | easy | **A** | 판매/마케팅, 회사/사무 | `unknown` |
| 1265 | **in touch with** | `phrase` | ~와 연락하는 | ~와 접촉하는 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1266 | **in writing** | `phrase` | 서면으로 | 문서상으로 | easy | **A** | 구매/주문, 회사/사무 | `verified` |
| 1267 | **keep in mind** | `phrase` | 명심하다 | 유념하다 | easy | **A** | 안전/보건, 회사/사무 | `verified` |
| 1268 | **keep track of** | `phrase` | 파악하다 | 추적기록하다 | easy | **A** | 생산/제조, 금융/회계 | `verified` |
| 1269 | **make a decision** | `phrase` | 결정을 내리다 | 판단하다 | easy | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1270 | **make an appointment** | `phrase` | 약속을 잡다 | 예약하다 | easy | **A** | 회의/일정, 고객서비스 | `verified` |
| 1271 | **no matter what** | `phrase` | 비록 무슨 일이 있어도 | 어찌 되었든 | easy | **A** | 회사/사무 | `unknown` |
| 1272 | **on a regular basis** | `phrase` | 정기적으로 | 규칙적으로 | easy | **A** | 생산/제조, 안전/보건 | `verified` |
| 1273 | **on behalf of** | `phrase` | ~을 대표하여 | ~을 대신하여 | easy | **A** | 회의/일정, 회사/사무 | `verified` |
| 1274 | **on board** | `phrase` | 탑승하여 | 동참하여 | easy | **A** | 여행/교통, 채용/인사 | `unknown` |
| 1275 | **on demand** | `phrase` | 요구에 따라 | 주문형의 | medium | **A** | 생산/제조, 고객서비스 | `unknown` |
| 1276 | **on duty** | `phrase` | 근무 중인 | 당직의 | easy | **A** | 채용/인사, 안전/보건 | `verified` |
| 1277 | **on schedule** | `phrase` | 예정대로 | 일정표에 맞추어 | easy | **A** | 회의/일정, 생산/제조 | `verified` |
| 1278 | **on the contrary** | `phrase` | 그와 반대로 | 오히려 | medium | **A** | 회의/일정, 회사/사무 | `unknown` |
| 1279 | **on the other hand** | `phrase` | 다른 한편으로는 | 반면에 | easy | **A** | 회사/사무, 회의/일정 | `verified` |
| 1280 | **on the whole** | `phrase` | 전반적으로 보아 | 대체로 | easy | **A** | 회사/사무, 금융/회계 | `unknown` |
| 1281 | **out of date** | `phrase` | 구식의 | 시대에 뒤떨어진 | easy | **A** | 기술/장비, 회사/사무 | `verified` |
| 1282 | **out of order** | `phrase` | 고장 난 | 작동하지 않는 | easy | **A** | 기술/장비, 시설/건물 | `verified` |
| 1283 | **out of stock** | `phrase` | 품절된 | 재고가 없는 | easy | **A** | 구매/주문, 판매/마케팅 | `verified` |
| 1284 | **play a role** | `phrase` | 역할을 하다 | 한몫하다 | easy | **A** | 회사/사무, 생산/제조 | `unknown` |
| 1285 | **prior to** | `phrase` | ~에 앞서 | ~전에 | medium | **A** | 회의/일정, 회사/사무 | `verified` |
| 1286 | **regardless of** | `phrase` | ~에 상관없이 | ~을 불문하고 | easy | **A** | 채용/인사, 구매/주문 | `verified` |
| 1287 | **side by side** | `phrase` | 나란히 | 협력하여 | easy | **A** | 생산/제조, 회사/사무 | `unknown` |
| 1288 | **so as to** | `phrase` | ~하기 위하여 | ~하도록 | easy | **A** | 회사/사무, 생산/제조 | `unknown` |
| 1289 | **sooner or later** | `phrase` | 조만간 | 머지않아 | easy | **A** | 회사/사무 | `unknown` |
| 1290 | **strictly speaking** | `phrase` | 엄격히 말하면 | 정확하게는 | medium | **A** | 회사/사무 | `unknown` |
| 1291 | **take into account** | `phrase` | 고려하다 | 참작하다 | easy | **A** | 금융/회계, 회사/사무 | `verified` |
| 1292 | **take into consideration** | `phrase` | 참작하다 | 고려에 넣다 | easy | **A** | 채용/인사, 회사/사무 | `unknown` |
| 1293 | **thanks to** | `phrase` | ~의 덕분에 | ~로 인하여 | easy | **A** | 고객서비스, 회사/사무 | `verified` |
| 1294 | **to date** | `phrase` | 지금까지 | 현재까지 | easy | **A** | 금융/회계, 생산/제조 | `verified` |
| 1295 | **to some extent** | `phrase` | 어느 정도까지는 | 다소 | medium | **A** | 회사/사무 | `unknown` |
| 1296 | **to the best of my knowledge** | `phrase` | 내가 아는 한 가장 정확하게는 | 내가 아는 한 가장 정확하게는 | medium | **A** | 회사/사무 | `unknown` |
| 1297 | **under consideration** | `phrase` | 고려 중인 | 검토 중인 | medium | **A** | 회사/사무, 채용/인사 | `verified` |
| 1298 | **under construction** | `phrase` | 공사 중인 | 시공 중인 | easy | **A** | 시설/건물 | `verified` |
| 1299 | **under warranty** | `phrase` | 보증 기간 중인 | 품질보증이 적용되는 | easy | **A** | 구매/주문, 고객서비스 | `verified` |
| 1300 | **up to date** | `phrase` | 최신의 | 최근의 | easy | **A** | 기술/장비, 회사/사무 | `verified` |

---

## 3. 공식 공개 근거 검증 어휘 (Verified: 총 406개)

ETS 공식 TOEIC 시험 준비 자료 및 공개 표본에서 직접 확인된 핵심 어휘군입니다.

| 번호 | 표제어 | 품사 | 공식 출처명 | 출처 URL |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **accountant** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 2 | **acquisition** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 3 | **administration** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 4 | **advisor** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 5 | **agent** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 6 | **alliance** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 7 | **analyst** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 8 | **authority** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 9 | **board** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 10 | **branch** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 11 | **brand** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 12 | **career** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 13 | **chairman** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 14 | **clerk** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 15 | **customer** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 16 | **director** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 17 | **employee** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 18 | **employer** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 19 | **expert** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 20 | **founder** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 21 | **head** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 22 | **inspector** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 23 | **investor** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 24 | **leader** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 25 | **officer** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 26 | **partner** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 27 | **president** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 28 | **recruiter** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 29 | **researcher** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 30 | **secretary** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 31 | **specialist** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 32 | **sponsor** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 33 | **supervisor** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 34 | **checklist** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 35 | **deadline** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 36 | **draft** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 37 | **handbook** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 38 | **instruction** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 39 | **manual** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 40 | **memorandum** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 41 | **notification** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 42 | **report** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 43 | **summary** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 44 | **account** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 45 | **capital** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 46 | **cash** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 47 | **discount** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 48 | **finance** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 49 | **fund** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 50 | **income** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 51 | **interest** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 52 | **loan** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 53 | **market** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 54 | **mortgage** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 55 | **penalty** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 56 | **pension** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 57 | **price** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 58 | **profit** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 59 | **refund** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 60 | **rent** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 61 | **salary** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 62 | **savings** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 63 | **tax** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 64 | **toll** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 65 | **wage** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 66 | **assembly** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 67 | **automation** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 68 | **factory** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 69 | **hardware** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 70 | **instrument** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 71 | **machine** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 72 | **plant** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 73 | **repair** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 74 | **sensor** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 75 | **cargo** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 76 | **catalog** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 77 | **container** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 78 | **courier** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 79 | **coupon** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 80 | **display** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 81 | **flight** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 82 | **luggage** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 83 | **merchandise** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 84 | **outlet** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 85 | **parcel** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 86 | **promotion** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 87 | **retailer** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 88 | **route** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 89 | **transit** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 90 | **venue** | `noun` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 91 | **accomplish** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 92 | **activate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 93 | **adapt** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 94 | **administer** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 95 | **amend** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 96 | **analyze** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 97 | **appoint** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 98 | **appraise** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 99 | **calculate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 100 | **cancel** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 101 | **certify** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 102 | **charge** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 103 | **commence** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 104 | **compute** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 105 | **construct** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 106 | **consult** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 107 | **deposit** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 108 | **determine** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 109 | **devise** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 110 | **discount** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 111 | **eliminate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 112 | **employ** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 113 | **enable** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 114 | **enclose** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 115 | **enlarge** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 116 | **ensure** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 117 | **equip** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 118 | **establish** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 119 | **estimate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 120 | **extend** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 121 | **forecast** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 122 | **hire** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 123 | **host** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 124 | **integrate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 125 | **issue** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 126 | **lease** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 127 | **locate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 128 | **merge** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 129 | **optimize** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 130 | **rectify** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 131 | **refund** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 132 | **regulate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 133 | **reinforce** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 134 | **reorganize** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 135 | **restructure** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 136 | **retrieve** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 137 | **schedule** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 138 | **scrutinize** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 139 | **secure** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 140 | **settle** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 141 | **ship** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 142 | **simplify** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 143 | **specialize** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 144 | **sponsor** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 145 | **stabilize** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 146 | **standardize** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 147 | **streamline** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 148 | **substitute** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 149 | **summarize** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 150 | **supplement** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 151 | **transform** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 152 | **translate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 153 | **transmit** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 154 | **undergo** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 155 | **undertake** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 156 | **validate** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 157 | **verify** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 158 | **waive** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 159 | **withdraw** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 160 | **yield** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 161 | **account for** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 162 | **adhere to** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 163 | **aim at** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 164 | **allow for** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 165 | **apply for** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 166 | **back up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 167 | **belong to** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 168 | **branch out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 169 | **break down** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 170 | **bring about** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 171 | **bring in** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 172 | **bring out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 173 | **bring up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 174 | **build up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 175 | **call back** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 176 | **call for** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 177 | **call off** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 178 | **carry out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 179 | **catch up with** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 180 | **check in** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 181 | **check out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 182 | **clean up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 183 | **clear up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 184 | **close down** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 185 | **come across** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 186 | **come by** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 187 | **come up with** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 188 | **cope with** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 189 | **count on** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 190 | **cut down on** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 191 | **deal with** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 192 | **depend on** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 193 | **drop by** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 194 | **drop off** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 195 | **end up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 196 | **figure out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 197 | **fill in** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 198 | **fill out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 199 | **find out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 200 | **focus on** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 201 | **follow up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 202 | **get along with** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 203 | **get through** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 204 | **give up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 205 | **go ahead** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 206 | **go over** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 207 | **go through** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 208 | **hand in** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 209 | **hand out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 210 | **hold back** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 211 | **hold on** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 212 | **keep up with** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 213 | **lay off** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 214 | **lead to** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 215 | **look after** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 216 | **look for** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 217 | **look forward to** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 218 | **look into** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 219 | **look over** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 220 | **make out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 221 | **make sure** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 222 | **make up for** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 223 | **pay off** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 224 | **pick up** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 225 | **point out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 226 | **put forward** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 227 | **put off** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 228 | **put together** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 229 | **rely on** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 230 | **rule out** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 231 | **run out of** | `verb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 232 | **adverse** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 233 | **authentic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 234 | **capable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 235 | **coherent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 236 | **collaborative** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 237 | **compliant** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 238 | **compulsory** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 239 | **consecutive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 240 | **conservative** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 241 | **definitive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 242 | **deliberate** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 243 | **delicate** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 244 | **demanding** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 245 | **diverse** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 246 | **domestic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 247 | **dynamic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 248 | **elaborate** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 249 | **eminent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 250 | **equivalent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 251 | **essential** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 252 | **exhaustive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 253 | **explicit** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 254 | **external** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 255 | **extraordinary** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 256 | **fundamental** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 257 | **genuine** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 258 | **grateful** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 259 | **hazardous** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 260 | **hectic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 261 | **historic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 262 | **hospitable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 263 | **imperative** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 264 | **inaugural** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 265 | **inclusive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 266 | **indispensable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 267 | **interactive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 268 | **interim** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 269 | **invaluable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 270 | **liable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 271 | **lucrative** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 272 | **manual** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 273 | **minimal** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 274 | **mutual** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 275 | **noticeable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 276 | **obsolete** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 277 | **ongoing** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 278 | **optimal** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 279 | **optional** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 280 | **paramount** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 281 | **pragmatic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 282 | **precise** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 283 | **premier** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 284 | **prevalent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 285 | **proficient** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 286 | **prominent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 287 | **prospective** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 288 | **prudent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 289 | **rational** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 290 | **realistic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 291 | **receptive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 292 | **repetitive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 293 | **rigorous** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 294 | **routine** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 295 | **seasonal** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 296 | **selective** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 297 | **sensitive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 298 | **sophisticated** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 299 | **standard** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 300 | **straightforward** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 301 | **stringent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 302 | **subtle** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 303 | **successive** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 304 | **superior** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 305 | **sustainable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 306 | **systematic** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 307 | **tangible** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 308 | **thorough** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 309 | **timely** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 310 | **transparent** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 311 | **ultimate** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 312 | **unprecedented** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 313 | **variable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 314 | **viable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 315 | **vibrant** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 316 | **vigorous** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 317 | **vulnerable** | `adjective` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 318 | **actively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 319 | **annually** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 320 | **apparently** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 321 | **appropriately** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 322 | **briefly** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 323 | **cautiously** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 324 | **clearly** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 325 | **collaboratively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 326 | **competitively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 327 | **completely** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 328 | **comprehensively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 329 | **conclusively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 330 | **confidentially** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 331 | **consecutively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 332 | **conservatively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 333 | **constructively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 334 | **continuously** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 335 | **correctly** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 336 | **courteously** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 337 | **critically** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 338 | **customarily** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 339 | **dependably** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 340 | **distinctly** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 341 | **domestically** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 342 | **dramatically** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 343 | **drastically** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 344 | **durably** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 345 | **economically** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 346 | **effectively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 347 | **entirely** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 348 | **equally** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 349 | **essentially** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 350 | **evenly** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 351 | **evidently** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 352 | **explicitly** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 353 | **extensively** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 354 | **extremely** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 355 | **firmly** | `adverb` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 356 | **as a result of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 357 | **as per your request** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 358 | **as soon as possible** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 359 | **as well as** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 360 | **at all times** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 361 | **at one's earliest convenience** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 362 | **at the latest** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 363 | **because of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 364 | **by all means** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 365 | **by the time** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 366 | **comply with regulations** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 367 | **first of all** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 368 | **for the time being** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 369 | **in a timely manner** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 370 | **in accordance with** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 371 | **in addition to** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 372 | **in advance** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 373 | **in charge of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 374 | **in compliance with** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 375 | **in conjunction with** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 376 | **in detail** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 377 | **in honor of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 378 | **in light of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 379 | **in order to** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 380 | **in response to** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 381 | **in terms of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 382 | **in the event of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 383 | **in the long run** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 384 | **in the meantime** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 385 | **in touch with** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 386 | **in writing** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 387 | **keep in mind** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 388 | **keep track of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 389 | **make an appointment** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 390 | **on a regular basis** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 391 | **on behalf of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 392 | **on duty** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 393 | **on schedule** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 394 | **on the other hand** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 395 | **out of date** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 396 | **out of order** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 397 | **out of stock** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 398 | **prior to** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 399 | **regardless of** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 400 | **take into account** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 401 | **thanks to** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 402 | **to date** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 403 | **under consideration** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 404 | **under construction** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 405 | **under warranty** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
| 406 | **up to date** | `phrase` | ETS Official TOEIC Test Preparation Materials | [링크](https://www.ets.org/toeic/test-takers/about/listening-reading.html) |
