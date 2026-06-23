#!/usr/bin/env python3
"""Analyze current state of the file after first fix pass."""
import sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

FILE_PATH = r"D:\Users\tuanla2\Documents\antigravity\keen-shannon\index.html"
OUTPUT_FILE = r"D:\Users\tuanla2\Documents\antigravity\keen-shannon\analysis_output.txt"

with open(FILE_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# CP1252 suspicious chars
CP1252_BYTE_TO_UNICODE = {
    0x80: '\u20ac', 0x83: '\u0192', 0x86: '\u2020', 0x87: '\u2021',
    0x89: '\u2030', 0x8b: '\u2039', 0x91: '\u2018', 0x92: '\u2019',
    0x93: '\u201c', 0x94: '\u201d', 0x95: '\u2022', 0x97: '\u2014',
    0x99: '\u2122', 0x9b: '\u203a', 0x9f: '\u0178',
}
UNICODE_TO_CP1252_BYTE = {v: k for k, v in CP1252_BYTE_TO_UNICODE.items()}

lines_out = []

# Count FFFD and suspicious chars
fffd_count = content.count('\ufffd')
lines_out.append(f"Total FFFD chars: {fffd_count}")

for ch_code in sorted(UNICODE_TO_CP1252_BYTE.keys(), key=ord):
    count = content.count(ch_code)
    if count > 0:
        lines_out.append(f"  U+{ord(ch_code):04X} (CP1252 byte 0x{UNICODE_TO_CP1252_BYTE[ch_code]:02X}): {count} occurrences")

# Show specific garbled lines
lines_out.append(f"\nLine 29: {repr(content.split(chr(10))[28])}")
lines_out.append(f"Line 51: {repr(content.split(chr(10))[50])}")
lines_out.append(f"Line 67: {repr(content.split(chr(10))[66])}")

# Find all FFFD+next_char pairs
fffd_pairs = {}
for i, ch in enumerate(content):
    if ch == '\ufffd' and i + 1 < len(content):
        next_ch = content[i+1]
        pair = '\ufffd' + next_ch
        if pair not in fffd_pairs:
            fffd_pairs[pair] = 0
        fffd_pairs[pair] += 1

lines_out.append(f"\nFFD pairs found:")
for pair, count in sorted(fffd_pairs.items(), key=lambda x: -x[1]):
    next_ch = pair[1]
    lines_out.append(f"  FFFD+U+{ord(next_ch):04X}: {count} times")

# Find standalone suspicious chars (not preceded by FFFD)
lines_out.append(f"\nStandalone suspicious chars (not after FFFD):")
for i, ch in enumerate(content):
    if ch in UNICODE_TO_CP1252_BYTE and (i == 0 or content[i-1] != '\ufffd'):
        start = max(0, i-15)
        end = min(len(content), i+15)
        ctx = content[start:end].replace('\n', '\\n').replace('\r', '')
        lines_out.append(f"  Pos {i}: U+{ord(ch):04X} in: {ctx}")

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write('\n'.join(lines_out))

print(f"Analysis written to {OUTPUT_FILE}")
