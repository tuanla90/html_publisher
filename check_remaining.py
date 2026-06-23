#!/usr/bin/env python3
"""Scan for all remaining wrong Vietnamese text patterns."""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

FILE_PATH = r"D:\Users\tuanla2\Documents\antigravity\keen-shannon\index.html"
OUTPUT = r"D:\Users\tuanla2\Documents\antigravity\keen-shannon\scan_results.txt"

with open(FILE_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# These are wrong Vietnamese sequences that my first fix produced
# by replacing FFFD+CP1252 pairs with wrong chars
# The issue: some FFFD+' (U+2018) should have been đ (from C4 91)
# but got converted to ố (from E1 BB 91)
# And some FFFD+™ (U+2122) should have been parts of other sequences
# but got converted to ộ (from E1 BB 99)

# Let's find all nonsensical Vietnamese combinations
wrong_patterns = [
    # ố where đ should be (ố was from FFFD+0x91, but some 0x91 should have been đ)
    ('ốộ', 'độ'),       # tiến ốộ -> tiến độ
    ('ốể', 'để'),       # ốể -> để
    ('ốã', 'đã'),       # ốã -> đã  
    ('ốược', 'được'),   # ốược -> được
    ('ốúng', 'đúng'),   # ốúng -> đúng
    ('ốặt', 'đặt'),     # ốặt -> đặt
    ('ốặc', 'đặc'),     # ốặc -> đặc
    ('ốầu', 'đầu'),     # ốầu -> đầu
    ('ốề', 'đề'),       # ốề -> đề
    ('ốưa', 'đưa'),     # ốưa -> đưa
    ('ốào', 'đào'),     # ốào -> đào
    ('ốiều', 'điều'),   # ốiều -> điều
    ('ốịnh', 'định'),   # ốịnh -> định
    ('ốoạn', 'đoạn'),   # ốoạn -> đoạn
    ('ốoán', 'đoán'),   # ốoán -> đoán
    ('ốơn', 'đơn'),     # ốơn -> đơn
    ('ốây', 'đây'),     # ốây -> đây
    ('ốông', 'đông'),   # ốông -> đông
    ('ốó', 'đó'),       # ốó -> đó
    ('ốo', 'đo'),       # ốo -> đo (thang đo)
    ('ốọc', 'đọc'),     # ốọc -> đọc
    ('ốối', 'đối'),     # ốối -> đối  
    ('Ốộ', 'Độ'),       # Ốộ -> Độ
    ('Ốổi', 'Đổi'),     # Ốổi -> Đổi
    ('Ốịnh', 'Định'),   # Ốịnh -> Định
    ('Ốể', 'Để'),       # Ốể -> Để
    
    # ộ where standalone should be different
    # Actually check for ộ in wrong contexts too
    
    # ồ where it shouldn't be
    ('ốồng', 'đồng'),   # if this appears
    ('ốồ', 'đồ'),       # biểu đồ -> biểu ốồ?
]

lines = content.split('\n')
results = []

for pattern, correct in wrong_patterns:
    count = content.count(pattern)
    if count > 0:
        results.append(f"FOUND: '{pattern}' -> '{correct}' ({count} times)")
        for i, line in enumerate(lines):
            if pattern in line:
                col = line.index(pattern)
                start = max(0, col - 15)
                end = min(len(line), col + len(pattern) + 15)
                ctx = line[start:end]
                results.append(f"  Line {i+1}: ...{ctx}...")

# Also search for any remaining suspicious chars
suspicious = set('\u2018\u2019\u201c\u201d\u2020\u2021\u2022\u2014\u2030\u2039\u203a\u0178\u0192\u20ac\u2122\ufffd')
for i, line in enumerate(lines):
    for j, ch in enumerate(line):
        if ch in suspicious:
            start = max(0, j-15)
            end = min(len(line), j+15)
            ctx = line[start:end]
            results.append(f"SUSPICIOUS: Line {i+1}, col {j+1}: U+{ord(ch):04X} in: ...{ctx}...")

# Also check for common wrong Vietnamese words that might have been produced
# by the incorrect ố-for-đ substitution
wrong_words = [
    'ốộ', 'ốội', 'ốốc', 'ốối', 'ốống', 'ốộng', 'ốốt',
    'ốồ', 'ốồng', 'ốồn', 'ốồi',
    'ốổ', 'ốổi', 'ốổng',
    'ốệ', 'ốệu', 'ốệp', 'ốện', 'ốệt',
    'ốể', 'ốểu', 'ốểm',
    'ốị', 'ốịch', 'ốịnh',
    'ốỉ', 'ốỉnh',
    'ốã', 'ốà', 'ốá', 'ốảo', 'ốắt', 'ốặt',
    'ốầu', 'ốề', 'ốền', 'ốếm', 'ốến',
    'ốì', 'ốú', 'ốừ', 'ốư', 'ốược', 'ốưa',
    'ốào', 'ốặc', 'ốiều', 'ốoạn', 'ốoán',
    'ốúng', 'ốơn', 'ốây', 'ốông', 'ốọc', 'ốó',
]

for w in wrong_words:
    if w in content:
        count = content.count(w)
        for i, line in enumerate(lines):
            if w in line:
                col = line.index(w)
                start = max(0, col - 10)
                end = min(len(line), col + len(w) + 10)
                ctx = line[start:end]
                results.append(f"WRONG_WORD: '{w}' at Line {i+1}: ...{ctx}...")

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write('\n'.join(results))

print(f"Results written to {OUTPUT}")
print(f"Total issues found: {len(results)}")
