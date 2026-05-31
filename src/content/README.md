# Content Maintenance

## UI copy

- Global UI labels live in src/i18n/messages.js.
- Use that file for chrome, navigation, empty states, and button labels.

## Structured content

- Domain data is split by locale instead of being packed into one huge file.
- Current pattern:
  - src/content/data/characters.json
  - src/content/data/characters.en.json
  - src/content/data/characters.it.json
  - src/content/data/regions.json
  - src/content/data/regions.en.json
  - src/content/data/regions.it.json
  - src/content/data/timeline.json
  - src/content/data/timeline.en.json
  - src/content/data/timeline.it.json
  - src/content/data/records.json
  - src/content/data/records.en.json
  - src/content/data/records.it.json
  - src/content/data/sections.json
  - src/content/data/sections.en.json
  - src/content/data/sections.it.json
- The loader falls back to zh-TW if a locale-specific file does not exist.

## Articles

- zh-TW articles can stay directly under src/content/articles.
- Locale-specific articles live in folders such as:
  - src/content/articles/en/
  - src/content/articles/it/
- Keep the same slug filename across locales if the article is the same work.
- Add line: lore or line: story in frontmatter to decide which library lane the article belongs to.
- Example:
  - src/content/articles/first-note.md
  - src/content/articles/en/first-note.md
  - src/content/articles/it/first-note.md
  - src/content/articles/story-of-ashes.md
  - src/content/articles/en/story-of-ashes.md
  - src/content/articles/it/story-of-ashes.md

## Long-text safety

- Cards that can vary by translation length use flex column layouts so CTA links stay anchored at the bottom.
- Panels and article bodies scroll inside local containers instead of forcing body scroll.
- If one locale becomes much longer, prefer adding paragraphs or cards instead of squeezing type smaller.

## Recommended rule

- UI in messages.js
- Structured lists in locale-split JSON files by domain
- Long-form writing in locale-split Markdown files by slug
- Use the lore lane for setting/reference writing and the story lane for narrative正文