# Content Editing Guide

You can now update portfolio content in `content/*.md` files without editing `index.html`.

## File map

- `content/about.md` - hero/about section
- `content/impact.md` - impact cards
- `content/experience.md` - work experience cards
- `content/stack.md` - tech stack categories and pills
- `content/projects.md` - featured projects
- `content/writing.md` - writing platforms
- `content/oss.md` - open source contributions
- `content/certs.md` - education and certifications
- `content/contact.md` - contact block
- `content/links.md` - shared links and nav CTA email
- `content/footer.md` - footer copy and social links

## Format rules

- Top lines are section-level fields in `key: value` format.
- Repeating items are separated by a line with exactly `---`.
- Inside each item block, use one `key: value` per line.
- For multi-point bullet lists (experience), use `||` between bullet items.
- For comma lists (stack pills, tags), separate values with commas.

## Example (projects)

```md
sectionLabel: Open source
sectionTitle: Featured projects
sectionSub: Production-grade templates built from real systems.

---
icon: 🔍
name: production-rag-kit
desc: Enterprise RAG template with evals and observability.
tags: RAG, LangChain, Weaviate, GPT-4
url: https://github.com/username/production-rag-kit
```

## Uploading a profile photo

Drop a photo file named `avatar` into the `content/` folder. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

```
content/avatar.jpg   ← just add this file
```

The site will automatically detect it and replace the PS initials with your photo. No code changes needed. If the file is removed, the PS initials return automatically.

## Multi-paragraph bio

In `content/about.md`, the `bio` value supports multiple paragraphs. Wrap the whole value in double quotes and separate paragraphs with a blank line:

```md
bio: "First paragraph here.

Second paragraph here.

Third paragraph here."
```

## Notes

- Keep keys exactly as they are in existing files.
- If a content file fails to load, the site falls back to the inline HTML content.
- After edits, refresh the page to see updates.
