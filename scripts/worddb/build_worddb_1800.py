# -*- coding: utf-8 -*-
"""
Main pipeline script for DB-03.
Merges baseline_500 + nouns_420 + verbs_430 + adjectives_260 + adverbs_phrases_190.
Generates milestone snapshots (db_750, db_1000, db_1250, db_1500),
builds candidate_pool.json (2500 items including 700 C candidates),
and outputs the official release public/data/builtin_words_v1.json (1800 items).
"""
import json
import os
from datetime import datetime, timezone, timedelta

def main():
    print("=== [DB-03] Building Word Database 1800 Pipeline ===")

    # 1. Load baseline 500
    with open('data/worddb/baseline_500.json', 'r', encoding='utf-8') as f:
        b500_data = json.load(f)
    baseline_words = b500_data['words']
    print(f"1. Loaded baseline words: {len(baseline_words)}")

    # Ensure baseline words have officialEvidenceStatus & officialEvidence fields if missing
    for w in baseline_words:
        w['databaseVersion'] = 3
        if 'officialEvidenceStatus' not in w:
            w['officialEvidenceStatus'] = 'unknown'
        if 'officialEvidence' not in w:
            w['officialEvidence'] = []

    # 2. Load 4 new parts
    with open('data/worddb/nouns_420.json', 'r', encoding='utf-8') as f:
        n420 = json.load(f)
    print(f"2. Loaded nouns: {len(n420)}")

    with open('data/worddb/verbs_430.json', 'r', encoding='utf-8') as f:
        v430 = json.load(f)
    print(f"3. Loaded verbs: {len(v430)}")

    with open('data/worddb/adjectives_260.json', 'r', encoding='utf-8') as f:
        a260 = json.load(f)
    print(f"4. Loaded adjectives: {len(a260)}")

    with open('data/worddb/adverbs_phrases_190.json', 'r', encoding='utf-8') as f:
        ap190 = json.load(f)
    print(f"5. Loaded adverbs & phrases: {len(ap190)}")

    new_1300 = n420 + v430 + a260 + ap190
    print(f"Total new items: {len(new_1300)}")

    # Verify ID and word uniqueness
    all_release_words = list(baseline_words) + new_1300
    seen_ids = set()
    seen_lemmas_pos = set()

    for item in all_release_words:
        if item['id'] in seen_ids:
            raise ValueError(f"Duplicate ID found: {item['id']}")
        seen_ids.add(item['id'])
        
        lemma_pos = (item['lemma'].lower(), item['partOfSpeech'])
        if lemma_pos in seen_lemmas_pos:
            raise ValueError(f"Duplicate (lemma, partOfSpeech) found: {lemma_pos}")
        seen_lemmas_pos.add(lemma_pos)

        # STRICT QUALITY RULES FOR RELEASE:
        if item['confidenceGrade'] == 'C':
            raise ValueError(f"C-grade item leaked into release: {item['id']}")
        if not item.get('quizEligible', False):
            raise ValueError(f"quizEligible=False item leaked into release: {item['id']}")
        if item.get('status') != 'quiz_ready':
            raise ValueError(f"status != 'quiz_ready' in release item: {item['id']}")

    print(f"Total verified release words: {len(all_release_words)}")
    if len(all_release_words) != 1800:
        raise ValueError(f"Expected exactly 1800 words, got {len(all_release_words)}")

    # 3. Save Milestone Snapshots
    kst = timezone(timedelta(hours=9))
    now_kst = datetime.now(kst).isoformat(timespec='seconds')

    milestones = [
        ("data/worddb/db_750.json", all_release_words[:750]),
        ("data/worddb/db_1000.json", all_release_words[:1000]),
        ("data/worddb/db_1250.json", all_release_words[:1250]),
        ("data/worddb/db_1500.json", all_release_words[:1500]),
    ]

    for path, subset in milestones:
        meta = {
            "schemaVersion": 1,
            "databaseVersion": 4,
            "wordCount": len(subset),
            "generatedAt": now_kst,
            "words": subset
        }
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
        print(f"Saved milestone snapshot: {path} (count: {len(subset)})")

    # 4. Save Candidate Pool (2500 items = 1800 release + 700 C candidates)
    with open('data/worddb/candidates_c_700.json', 'r', encoding='utf-8') as f:
        c700 = json.load(f)
    print(f"Loaded C-grade candidates: {len(c700)}")

    candidate_pool = all_release_words + c700
    candidate_pool_meta = {
        "schemaVersion": 1,
        "databaseVersion": 4,
        "totalCandidateCount": len(candidate_pool),
        "releaseReadyCount": len(all_release_words),
        "cGradeCandidateCount": len(c700),
        "generatedAt": now_kst,
        "candidates": candidate_pool
    }
    with open('data/worddb/candidate_pool.json', 'w', encoding='utf-8') as f:
        json.dump(candidate_pool_meta, f, ensure_ascii=False, indent=2)
    print(f"Saved candidate pool: data/worddb/candidate_pool.json (total: {len(candidate_pool)})")

    # 5. Output Official Release JSON: public/data/builtin_words_v1.json
    release_meta = {
        "schemaVersion": 1,
        "databaseVersion": 4,
        "wordCount": len(all_release_words),
        "generatedAt": now_kst,
        "words": all_release_words
    }

    with open('public/data/builtin_words_v1.json', 'w', encoding='utf-8') as f:
        json.dump(release_meta, f, ensure_ascii=False, indent=2)
    print(f"Saved official release: public/data/builtin_words_v1.json (wordCount: {len(all_release_words)})")

    # Print distribution summary
    pos_counts = {}
    grade_counts = {}
    diff_counts = {}
    ev_counts = {}

    for w in all_release_words:
        pos = w['partOfSpeech']
        pos_counts[pos] = pos_counts.get(pos, 0) + 1
        
        g = w['confidenceGrade']
        grade_counts[g] = grade_counts.get(g, 0) + 1

        d = w['difficulty']
        diff_counts[d] = diff_counts.get(d, 0) + 1

        ev = w.get('officialEvidenceStatus', 'none')
        ev_counts[ev] = ev_counts.get(ev, 0) + 1

    print("\n--- Vocabulary Distribution Summary ---")
    print("Parts of Speech:", pos_counts)
    print("Confidence Grades:", grade_counts)
    print("Difficulties:", diff_counts)
    print("Official Evidence Status:", ev_counts)
    print("========================================")

if __name__ == '__main__':
    main()
