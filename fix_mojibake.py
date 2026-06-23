#!/usr/bin/env python3
"""
Fix mojibake Vietnamese text in index.html - DEFINITIVE FIX.

The file contains U+FFFD (replacement character) paired with CP1252-misinterpreted
bytes. Each FFFD+CP1252_char pair maps to a specific Vietnamese character.

Pattern 1: FFFD + CP1252 char -> Vietnamese char (from E1 BB xx UTF-8 range)
Pattern 2: FFFD + already-correct char -> just remove FFFD (partial fix artifacts)
Pattern 3: A couple standalone garbled chars
"""

FILE_PATH = r"D:\Users\tuanla2\Documents\antigravity\keen-shannon\index.html"

def fix_file():
    with open(FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # ============================================================
    # STEP 1: Replace FFFD + CP1252_char pairs with Vietnamese chars
    # ============================================================
    # These are from the E1 BB xx UTF-8 range.
    # The E1 BB bytes were lost (became FFFD), and xx was read as CP1252.
    
    # CP1252 byte -> Unicode char mapping (only the 0x80-0x9F range that differs)
    # Build programmatically from the UTF-8 E1 BB xx table:
    
    fffd_pair_replacements = {
        # FFFD + CP1252 interpretation of byte -> correct Vietnamese char
        # E1 BB 80 = U+1EC0 (Ề) -> 0x80 in CP1252 = € (U+20AC)
        '\ufffd\u20ac': '\u1ec0',  # Ề
        # E1 BB 83 = U+1EC3 (ể) -> 0x83 in CP1252 = ƒ (U+0192)
        '\ufffd\u0192': '\u1ec3',  # ể
        # E1 BB 87 = U+1EC7 (ệ) -> 0x87 in CP1252 = ‡ (U+2021)
        '\ufffd\u2021': '\u1ec7',  # ệ
        # E1 BB 89 = U+1EC9 (ỉ) -> 0x89 in CP1252 = ‰ (U+2030)
        '\ufffd\u2030': '\u1ec9',  # ỉ
        # E1 BB 8B = U+1ECB (ị) -> 0x8B in CP1252 = ‹ (U+2039)
        '\ufffd\u2039': '\u1ecb',  # ị
        # E1 BB 91 = U+1ED1 (ố) -> 0x91 in CP1252 = ' (U+2018)
        '\ufffd\u2018': '\u1ed1',  # ố
        # E1 BB 93 = U+1ED3 (ồ) -> 0x93 in CP1252 = " (U+201C)
        '\ufffd\u201c': '\u1ed3',  # ồ
        # E1 BB 95 = U+1ED5 (ổ) -> 0x95 in CP1252 = • (U+2022)
        '\ufffd\u2022': '\u1ed5',  # ổ
        # E1 BB 97 = U+1ED7 (ỗ) -> 0x97 in CP1252 = — (U+2014)
        '\ufffd\u2014': '\u1ed7',  # ỗ
        # E1 BB 99 = U+1ED9 (ộ) -> 0x99 in CP1252 = ™ (U+2122)
        '\ufffd\u2122': '\u1ed9',  # ộ
        # E1 BB 9B = U+1EDB (ớ) -> 0x9B in CP1252 = › (U+203A)
        '\ufffd\u203a': '\u1edb',  # ớ
        # E1 BB 9F = U+1EDF (ở) -> 0x9F in CP1252 = Ÿ (U+0178)
        # But analysis shows FFFD+U+1EDF (already correct ở) = 3 times
        # This means ở was already partially fixed. Handle below.
    }
    
    for garbled, correct in fffd_pair_replacements.items():
        content = content.replace(garbled, correct)
    
    # ============================================================
    # STEP 2: Remove FFFD before already-correct Vietnamese chars
    # ============================================================
    # The partial fix decoded some chars correctly but left FFFD remnants.
    # FFFD + đ (U+0111) -> đ (just remove FFFD) - 51 times
    # FFFD + → (U+2192) -> → (just remove FFFD) - 20 times  
    # FFFD + ở (U+1EDF) -> ở (just remove FFFD) - 3 times
    # FFFD + space -> space (just remove FFFD) - 1 time
    
    content = content.replace('\ufffd\u0111', '\u0111')  # FFFD+đ -> đ
    content = content.replace('\ufffd\u2192', '\u2192')  # FFFD+→ -> →
    content = content.replace('\ufffd\u1edf', '\u1edf')  # FFFD+ở -> ở
    content = content.replace('\ufffd ', ' ')              # FFFD+space -> space
    
    # ============================================================
    # STEP 3: Fix standalone garbled chars (only 2 found)
    # ============================================================
    # Pos 8573: "NCB €" không" - the €" should be – (en-dash/em-dash)
    # €" = U+20AC U+201D. Original: E2 80 93 = – (en-dash, U+2013)
    # 0x80=€, 0x93=" -> CP1252 bytes 80 93 = first bytes of E2 80 93
    # Wait, E2 80 93 is the UTF-8 for – (U+2013)
    # But the E2 was already decoded correctly? No...
    # Actually: – (U+2013) = E2 80 93 in UTF-8
    # Read as CP1252: E2=â, 80=€, 93="
    # The â was already fixed back, leaving €"
    # So €" (U+20AC U+201D) -> – 
    content = content.replace('\u20ac\u201d', '\u2013')  # €" -> – (en-dash)
    
    # Pos 22805: "👉" emoji - \ufffd\u0178\u2019\u0081
    # 👉 = U+1F449 = F0 9F 91 89 in UTF-8
    # Read as CP1252: F0=ð, 9F=Ÿ(U+0178), 91='(U+2018), 89=‰(U+2030)
    # Partial fix converted some... the remnant is Ÿ'
    # After step 1, the \ufffd\u2018 should have been converted to ố
    # But in emoji context... let me check what the original was.
    # Actually from original file line 324: "👉 Phần này..."
    # The emoji was "Ÿ'👌" or similar. Let me handle the specific context:
    # Original: "\u0178\u2019\u0081" (from check_remaining output)
    # \u0178 = Ÿ (CP1252 0x9F), \u2019 = ' (CP1252 0x92), \u0081 = (CP1252 0x81)
    # UTF-8: 9F 92 81... hmm, that's not valid UTF-8 for an emoji.
    # 
    # Actually the original emoji 👉 = U+1F449 = F0 9F 91 89
    # F0 -> CP1252: ð (U+00F0), kept as-is or partially fixed
    # 9F -> CP1252: Ÿ (U+0178)
    # 91 -> CP1252: ' (U+2018)  
    # 89 -> CP1252: ‰ (U+2030)
    # But some of these were already partially decoded...
    # After my step 1: \ufffd\u2018 became ố, which is wrong for emoji.
    # Hmm, but in the original check output the emoji line was:
    # "Ÿ'👌 Phần này..." Wait no, from the original file view:
    # Line 324: "👉 Phần này không bắt bu™c nhưng..."
    # The original had: Ÿ'Ÿ  which... is confusing.
    # 
    # Let me just handle what's in the file. From the analysis output:
    # "Pos 22805: U+2019 in: le: italic;\">Ÿ'👌 Phần này khô"
    # So it seems like partial emojis. Let me check the actual current state.
    
    # Check for remaining emoji artifacts - handle Ÿ' pattern
    # The \u0178 (Ÿ) followed by \u2019 (') is probably remnants of 👉
    # Let me replace "Ÿ'" with "👉" if it's in the right context
    content = content.replace('\u0178\u2019\x81', '👉')  # Try this pattern
    content = content.replace('Ÿ\u2019\x81', '👉')  # Same but with literal Ÿ
    
    # ============================================================
    # STEP 4: Clean up any remaining lone FFFD characters
    # ============================================================
    # After all the pair replacements, there shouldn't be any FFFD left
    # But just in case, remove stray ones
    remaining_fffd = content.count('\ufffd')
    if remaining_fffd > 0:
        # Don't just delete them - they might be important
        pass  # We'll report them
    
    # ============================================================
    # WRITE AND VERIFY
    # ============================================================
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    
    # Verification
    suspicious_chars = set('\u2018\u2019\u201c\u201d\u2020\u2021\u2022\u2014\u2030\u2039\u203a\u0178\u0192\u20ac\u2122')
    
    remaining_suspicious = 0
    remaining_fffd = content.count('\ufffd')
    for ch in content:
        if ch in suspicious_chars:
            remaining_suspicious += 1
    
    # Write verification results to file
    verify_path = FILE_PATH.replace('index.html', 'fix_verification.txt')
    with open(verify_path, "w", encoding="utf-8") as f:
        f.write(f"Remaining FFFD: {remaining_fffd}\n")
        f.write(f"Remaining suspicious CP1252 chars: {remaining_suspicious}\n")
        
        if remaining_fffd > 0 or remaining_suspicious > 0:
            f.write("\nRemaining issues:\n")
            lines = content.split('\n')
            for i, line in enumerate(lines):
                for j, ch in enumerate(line):
                    if ch == '\ufffd' or ch in suspicious_chars:
                        start = max(0, j-20)
                        end = min(len(line), j+20)
                        ctx = line[start:end]
                        f.write(f"  Line {i+1}, col {j+1}: U+{ord(ch):04X} in: ...{ctx}...\n")
        
        f.write(f"\nTotal changes: original had {len(original)} chars, fixed has {len(content)} chars\n")
    
    # Print summary (safe ASCII only)
    print(f"Fix complete!")
    print(f"Remaining FFFD: {remaining_fffd}")
    print(f"Remaining suspicious: {remaining_suspicious}")
    print(f"Verification details: {verify_path}")


if __name__ == "__main__":
    fix_file()
