# Blog Post Writing Guide (MDX)

This repo uses MDX files in `content/blog/`. Each post includes frontmatter for metadata and clean Markdown for the article body.

## Quick start (copy this checklist)

- Create a new file in `content/blog/` using `kebab-case.mdx`.
- Add the frontmatter template at the top (must be wrapped by `---`).
- Write the article body in MDX with clear section headings.
- Use a short excerpt (1–2 sentences) and a single cover image path.
- Optional: add a multi-language code block using `CodeTabs`.
- Keep the post readable: short paragraphs, clear headings, and simple lists.
- Remove any auto-generated headings like “Main section 1/2”; use meaningful titles.

## File location and naming

- Location: `content/blog/`
- Filename: `kebab-case-title.mdx` (example: `shipping-an-ai-feature-in-30-days.mdx`)

## Frontmatter template (required, must match exactly)

```
---
title: "Your post title"
date: "YYYY-MM-DD"
readTime: "X min read"
author: "Author Name"
excerpt: "One or two sentences that summarize the post. This shows above the article body."
cover: "/blog/cover-your-image.svg"
tags: ["TagOne", "TagTwo", "TagThree"]
---
```

Notes:
- `title` renders as the main H1 in the UI.
- `date` and `read time` show above the title.
- `author` appears near the read time/date line.
- `excerpt` shows as a short paragraph before the article body.
- `cover` is used in the blog cards and at the top of the article page.
- `tags` appear as pills under the excerpt.
- `readTime` is manual and must be provided (example: `\"6 min read\"`).

## Article page layout (current UI order)

The article page renders metadata in this order:

1) Cover image  
2) Estimated read time (taken directly from frontmatter)  
3) Title  
4) Share actions (LinkedIn, X, Copy link)  
5) Excerpt  
6) Tag pills  
7) Article body

## Recommended article structure (use this exact flow)

```
## Context

1-2 short paragraphs that explain the "why".

## Main section 1

A few short paragraphs with clear, direct sentences.

## Main section 2

Include at least one list and one short code block when relevant.

> One short blockquote for emphasis.

## Final takeaway

End with a single strong sentence.
```

## Style guidelines (strict)

- Keep paragraphs short (3–4 sentences). No walls of text.
- Use clear headings and avoid deep nesting (max H2 + H3).
- Prefer simple lists (`-`) over custom bullet symbols.
- Avoid emojis and excessive formatting.
- Use hyphenated terms consistently (example: \"30-day plan\").
- Use fenced code blocks with a language tag (example: ```js, ```python, ```java, ```r).
- Keep headings short and sentence‑case.
- Avoid giant blocks of text; prefer 3–4 sentences per paragraph.
- Do not include inline citations in the body. All sources go in the Sources section.
- For the Sources section, wrap links in a `<ul className="sources-list">` so sources are left-aligned and not justified.

## Code tabs (multi-language)

For multi-language examples, use the `CodeTabs` component in MDX.

```
import CodeTabs from "../../src/components/CodeTabs";

<CodeTabs
  tabs={[
    {
      label: "JavaScript",
      language: "javascript",
      code: `const input = await getUserData(userId);
const prompt = buildPrompt(input);
const response = await callModel(prompt);
const result = postprocess(response);
await saveResult(result);
render(result);`
    },
    {
      label: "Python",
      language: "python",
      code: `input_data = get_user_data(user_id)
prompt = build_prompt(input_data)
response = call_model(prompt)
result = postprocess(response)
save_result(result)
render(result)`
    }
  ]}
/>
```

## Images (where to store and how to link)

- Store images in `public/blog/<post-slug>/`.
- Link images with absolute paths in MDX.
- Recommended cover size: **1200 × 700 px (16:9)** for clean cropping in cards and article hero.

Example:

```
![Diagram of the pipeline](/blog/shipping-an-ai-feature-in-30-days/diagram.png)
```

## What not to do

- Do not remove the `---` frontmatter wrapper.
- Do not use custom bullet symbols (use `-`).
- Do not embed huge HTML blocks; keep it readable and portable.
- Do not paste raw HTML tables; use Markdown lists instead.
- Do not use placeholder headings like “Main section 1/2”.
- Do not leave `readTime` empty.
- Do not insert URLs as bare text; use markdown links.

## Example snippet

```
## Context

Shipping fast does not mean skipping quality. It means cutting scope to what can be learned quickly.

- Define one user outcome.
- Build the thinnest end-to-end slice.
- Measure the outcome immediately.

> A narrow release beats a broad plan.
```
