// Long-form prompt strings used in PromptBlock components across blog articles.
// Backticks inside template literals are escaped as \`.

export const htmlStudyDocPrompt = `# Prompt: Build a Tabbed HTML Interview Prep Doc

## What you are building

A self-contained HTML file that opens in any browser. It has a sticky tab navigation sidebar, keyboard arrow support, and collapsible Q&A cards. The content is a company-specific technical interview brief — the equivalent of a CIA station report but for an engineering interview. The goal is to walk into any technical call and sound like you have been thinking about their problem for a week.

Use this prompt with Claude (claude.ai or Claude Code) or GPT-4o. Paste everything below, fill in the variables, and run it. Claude will do web research and write the document in one pass. GPT will need the research done separately and pasted in.

---

## Variables — fill these in before you paste

\`\`\`
COMPANY_NAME:        [the company name]
PRODUCT_DESCRIPTION: [one sentence — what the product actually does, in your words]
ROLE_TITLE:          [the role you are interviewing for]
INTERVIEWER_NAME:    [the interviewer's full name]
INTERVIEWER_TITLE:   [their title — e.g. Co-founder and CTO, Staff Engineer, Engineering Manager]
YOUR_NAME:           [your name]
INTERVIEW_DURATION:  [e.g. 60 minutes]
INTERVIEW_TYPE:      [e.g. technical deep dive / system design / behavioral / full loop]
ASSIGNED_READING:    [any articles, repos, or docs they asked you to read — paste titles and URLs]
YOUR_PROJECTS:       [3-5 projects or roles you want to reference — names only, one line each]
DOMAIN:              [the technical domain — e.g. "LLM infrastructure" or "fintech payments" or "developer tooling"]
COMPANY_WEBSITE:     [URL]
INTERVIEWER_LINKEDIN:[URL if you have it]
\`\`\`

---

## Instructions for Claude or GPT

You are building a tabbed HTML study document for a technical interview. Read every instruction below before you write a single line. Do not start with the HTML until you have done the research.

### Step 1 — Research first

Before writing the document, research the following in order. Use web search for each.

**Company intelligence:**
- Read the company's homepage, pricing page, and any customer-facing documentation. Note the exact language they use to describe their product and their users' pain.
- Read Trustpilot or G2 reviews if they exist. Customer reviews contain the real product story — failure modes, what users actually care about, language that the marketing page sanitizes.
- Search \`[COMPANY_NAME] funding Pitchbook OR Crunchbase\` and note funding stage, amount, investors, and headcount.
- Search \`[COMPANY_NAME] job postings site:linkedin.com OR site:wellfound.com\`. Job postings written by engineers name the actual tech stack. Extract tools, frameworks, and languages.
- Search for any engineering blog, GitHub org, or technical talks associated with the company.
- Note one specific, non-obvious thing from their site or product that reveals an architectural decision or product bet. This is the detail you will reference in the call.

**Founder and interviewer intelligence:**
- Read the interviewer's LinkedIn profile. Note their educational background, previous companies, and how long they have been at this company.
- Read their last 10 to 15 LinkedIn posts if they post publicly. Note any technical opinions, frameworks they reference, or problems they find interesting.
- Note the origin story of the company if it is personal to the founders. This shapes their relationship to the mission.

**Domain intelligence:**
- Search the current state of the technical domain in [DOMAIN]. What are the main platforms, frameworks, or tools? What are the dominant failure modes? What are the key metrics that practitioners care about?
- Search any recent developments in the domain from the last 60 days.
- If there is assigned reading, search for the actual source material and summarize the core arguments with specific quotes. Do not summarize summaries.

**Competitive landscape:**
- Search \`[COMPANY_NAME] competitors OR alternatives\` and identify 3 to 5 competitors. Note how [COMPANY_NAME] differentiates.

---

### Step 2 — Build the document

After research, write the HTML document. The document must have all of the following tabs in this order. Each tab is a \`<section>\` element with a matching nav button.

**Tab 01 — The Briefing**
- What the company actually does, in one sharp paragraph written in your words not their marketing copy
- Why the problem they are solving is genuinely hard (3 to 5 bullet points of real technical or market constraints)
- Key numbers: funding, headcount, coverage, stated metrics they publish publicly
- The one specific quote or product decision from the site that reveals their architectural bet — highlight this
- Tech stack: list every tool you can confirm with a source; mark guesses explicitly as guesses
- The assigned reading framed as a signal about what the interviewer cares about — what worldview do the readings share?

**Tab 02 — Assigned Reading [one tab per piece of reading]**
Create a separate tab for each assigned article, repo, or document. For each:
- What it is arguing in one sentence
- The 3 to 5 ideas worth carrying into your answers, with your reaction to each — not just a summary
- The specific quotes worth memorizing (under 15 words each)
- A 45-second verbal answer you could give if asked "what did you take from this?"
- Two or three rebuttals to likely pushback questions

**Tab 03 — The Technical Domain**
- A full explanation of the technical stack or domain the company operates in
- Key concepts, terminology, and metrics that practitioners use
- The current state of the tooling landscape with specific platforms, trade-offs, and crossover points
- The failure modes — what kills projects in this domain
- What the target company's specific version of these challenges looks like

**Tab 04 — Likely Questions From [INTERVIEWER_NAME]**
- 8 to 10 questions the interviewer is likely to ask, as collapsible cards
- Each card has: the question, the shape of a strong answer (bullet points), what not to say, and how to connect the answer back to your own projects
- Include at least one values question, one architectural decision question, one failure / mistake question, and one why here question

**Tab 05 — Questions For [INTERVIEWER_NAME]**
- 15 to 20 questions organized into three groups: architecture and system design, evals and reliability, company and role trajectory
- For each question, note what signal it sends about how you think
- Mark 4 to 6 as must ask and the rest as if time allows

**Tab 06 — Your Article Pick**
Only include this tab if the company asked you to bring a piece of writing to share. Otherwise omit it.
- Primary recommendation with rationale
- Three key takeaways formatted as copy-pasteable email text
- Two backup options ranked with pros and cons
- What not to bring and why

**Tab 07 — Your Positioning**
- A table mapping each of your projects or roles to a specific concern or requirement of this role
- Your one-sentence professional framing for this interview
- The two or three things to say that are direct, slightly uncomfortable, and very hard to fake
- What not to do in this conversation (4 to 5 specific anti-patterns)
- A 30-second pre-call ritual

**Tab 08 — Domain Guardrails**
Replace this tab label with the relevant regulatory or compliance domain for the company (e.g. "Healthcare / Compliance"). If there is no relevant compliance domain, replace it with a Competitive Landscape tab instead.
- What is in scope and what is not
- The concrete engineering patterns that matter (audit trails, encryption, access controls, data retention)
- The honest answer to "I don't know" moments in this area
- The interesting tension worth bringing up proactively

---

### Step 3 — HTML requirements

The HTML file must:

- Be fully self-contained — no external dependencies except Google Fonts loaded via CDN
- Load these fonts: one distinctive serif display font (Fraunces, PT Serif, or Playfair Display) and one clean sans or mono body font
- Use CSS variables for all colors with a named palette (paper, ink, accent, rule, highlight)
- Have a sticky left-sidebar tab navigation on desktop and a horizontal scrolling tab bar on mobile (breakpoint at 880px)
- Have keyboard arrow key support: left arrow goes to the previous tab, right arrow goes to the next
- Have collapsible Q&A cards using \`<details>\` and \`<summary>\` elements — no JavaScript needed for expand/collapse
- Wrap any \`history.replaceState\` calls in try/catch to handle sandboxed iframe environments
- Have a masthead with: the company name in a large display serif, a one-line subtitle, and a metadata grid showing company, role, interviewer, and round
- Have a footer with the brief number, a confidential tag, and a keyboard navigation hint
- Render code blocks with a dark background and monospace font
- Have a two-column grid inside panels where comparison content benefits from it
- Highlight important phrases with a subtle inline highlighter style (yellow tint background)
- Have callout boxes with a left border accent and a small caps label (e.g. KEY INSIGHT or DO NOT SAY THIS)
- Print cleanly: all panels visible, nav hidden, page break between major sections

Do not use:
- Bootstrap, Tailwind, or any CSS framework
- Any JavaScript library or CDN-loaded script
- \`localStorage\` or \`sessionStorage\`
- Generic color schemes (purple gradients, white backgrounds, system fonts)
- Bullet points in the masthead or section introductions — prose only there

---

### Step 4 — Content voice and style

Write the content as a technically confident senior engineer briefing themselves the night before a call. Not a student. Not a content marketer.

- Dense and direct. Say the thing.
- Short paragraphs inside panels. Three to five sentences is the default.
- Specific numbers, specific tools, specific quotes where available. Vague claims are useless under pressure.
- When a stack claim is uncertain, mark it explicitly: "likely X, confirm in the call."
- When advice is uncomfortable, say it anyway.
- Highlight the one non-obvious insight per section — the thing that separates someone who read carefully from someone who skimmed.

---

### Step 5 — Output

Produce the complete HTML file. No preamble before it. No explanation after it. Just the document.

The file should be named: \`[COMPANY_NAME_LOWERCASE]-study.html\`

When you are done, confirm the tab count and list the tab names.

---

## How to use this with Claude vs GPT

**With Claude (recommended):**
Paste the full prompt above with your variables filled in. Claude will run web searches as part of the response and write the document in one pass. If the first pass misses something, ask it to update a specific tab rather than regenerating the whole document.

**With GPT-4o:**
GPT does not have persistent web search the same way. Before pasting the prompt, do your own research using the search sequence in Step 1 and paste your notes as context before the prompt. Then say: "Using the research notes above, follow the instructions below to build the HTML document."

**With Claude Code:**
Save the prompt as \`BRIEF.md\` in your project directory. Then run:

\`\`\`
claude "Read BRIEF.md and execute the instructions to build the company study doc."
\`\`\`

Claude Code will read the brief, run searches via web tools if available, and write the file directly to disk.

---

## Maintenance

After each interview, update the doc with:
- What questions actually came up (add to the Q&A tab)
- What you wish you had known (add a post-mortem callout in the relevant tab)
- What the interviewer actually cared about (update the positioning tab)

Over time the doc becomes a template with real data instead of guesses. That is the whole point.`;
