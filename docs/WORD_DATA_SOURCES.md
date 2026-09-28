# 기본 어휘 DB 출처 및 라이선스 감사

> 현재 공개 서비스명: 보카 스터디 / 이전 프로젝트명: 토익_스터디  
> 작성 기준: DB-PILOT-200 파일럿 구축 단계

---

## 1. 개요 및 원칙

본 프로젝트(보카 스터디 / Voca Study)는 어휘 데이터베이스 구축 시 다음 원칙을 엄격히 준수합니다.

1. **공식 시험 주관사(ETS, IIBC 등) 지식재산권 침해 방지**:
   - 공식 기출문제 문장, 교재 텍스트, 공식 1,800어 목록 크롤링, 교재 OCR, 어휘 순서, 공식 한국어 번역문 복제를 엄격히 금지합니다.
   - 공식 통계 및 공표 사실(업무·일상 상황 중심 약 1,800어 학습 범위 등)은 어휘 선정 방향성의 근거로만 참조합니다.
2. **독립적 어휘 풀 구축**:
   - 비즈니스 및 일상 실무 영역에서 널리 쓰이는 표준 어휘 표제어(Lemma)를 선정하고, 자체 검증된 한국어 뜻과 품사, 난이도를 부여합니다.
3. **외부 오픈 데이터 출처의 투명한 라이선스 고지**:
   - 표제어 검증 및 빈도 추정에 활용한 오픈소스/학술 데이터베이스의 라이선스 조건을 준수하며 원시 데이터의 앱 내 무단 배포를 금지합니다.

---

## 2. 외부 참조 출처 상세

### Princeton WordNet

- **용도**: 표제어(Lemma) 정규형 검증, 품사 분류 확인, 동의어(Synset) 및 동일 의미군 식별, 파생어 관계 보조 검증
- **라이선스**: WordNet 3.0 License
- **상업적 사용**: 허용
- **재배포 조건**: 저작권 고지문 및 면책 조항 보존 (WordNet 3.0 Copyright Notice)
- **앱에 복제하는 데이터**: 어휘 간의 최소 관계 식별 데이터(동의어 차단 목록)만 참조 추출
- **원문 설명문 복제**: 하지 않음 (WordNet의 영어 gloss 문장을 직접 번역하거나 복제하여 탑재하지 않음)

**WordNet 3.0 License Notice**:
```text
WordNet Release 3.0 This software and database is being provided to you, the LICENSEE, by Princeton University under the following license. By obtaining, using and/or copying this software and database, you agree that you have read, understood, and will comply with these terms and conditions.: Permission to use, copy, modify and distribute this software and database and its documentation for any purpose and without fee or royalty is hereby granted, provided that you agree to comply with the following copyright notices and statements...
```

---

### wordfreq

- **용도**: 일반 영어 코퍼스 기반 단어 사용 빈도 보조 점수 산정 (너무 희귀하거나 지엽적인 단어 제외, 후보 우선순위 산정 보조 신호)
- **코드 라이선스**: Apache-2.0
- **포함 데이터 라이선스**: CC BY-SA 4.0 및 개별 코퍼스 출처 조건 존재
- **사용 방식**: 개발 및 빌드 파이프라인 단계에서 후보 단어군 우선순위 필터링 보조 신호로만 활용
- **원시 데이터 앱 포함**: 하지 않음 (wordfreq의 원시 빈도 리스트나 Zipf frequency 데이터 파일을 앱 런타임에 직접 포함하거나 복제 배포하지 않음)

---

## 3. 자체 제작 어휘 데이터

- **한국어 뜻(mainMeaning, subMeanings)**: 4지선다 문제풀이용으로 간결하고 명확하게 자체 집필.
- **예문 및 방해 보기(Distractors)**: 알고리즘 엔진(`quizEngine`)에 의해 품사, 난이도, 동의어 차단 사전(`synonym_blocks_v1.json`) 규칙에 따라 브라우저 내에서 동적 생성.
- **출처 불명확 데이터**: 0건
- **외부 유료 종량제 API 활용**: 0건 (100% 로컬 및 오픈 검증 파이프라인)
