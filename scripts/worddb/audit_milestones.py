# -*- coding: utf-8 -*-
"""
Verify milestone snapshots integrity (db_750, db_1000, db_1250, db_1500).
"""
import json
import os

milestones = [
    ("data/worddb/db_750.json", 750),
    ("data/worddb/db_1000.json", 1000),
    ("data/worddb/db_1250.json", 1250),
    ("data/worddb/db_1500.json", 1500),
]

for path, expected_count in milestones:
    assert os.path.exists(path), f"Missing milestone file: {path}"
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    assert data['databaseVersion'] == 3, f"Wrong databaseVersion in {path}"
    assert data['wordCount'] == expected_count, f"Wrong wordCount in {path}"
    assert len(data['words']) == expected_count, f"Wrong length of words in {path}"
    
    # Check C grade = 0
    c_grades = [w for w in data['words'] if w['confidenceGrade'] == 'C']
    assert len(c_grades) == 0, f"Found C-grade words in {path}"
    
    print(f"Milestone {expected_count} verification: PASS (words={len(data['words'])}, C_grade=0)")

print("All milestone snapshots verified successfully!")
