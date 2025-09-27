import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import slugify from "slugify";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content", "blog");
const OG_DIR = path.join(ROOT, "public", "og");
const SITE_URL = process.env.SITE_URL || "https://kasiaihub.com";

if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
if (!fs.existsSync(OG_DIR)) fs.mkdirSync(OG_DIR, { recursive: true });

const topics = [
  "Why AI matters for entrepreneurs in South Africa",
  "A short history of AI: From rules to deep learning to GPTs",
  "Understanding AI: Key terms explained simply",
  "How AI drives small business growth (local SA examples)",
  "Practical AI stack for startups in 2025",
  "Prompt engineering basics for teams",
  "Building reusable AI workflows and SOPs",
  "AI in marketing: content, ads, and analytics",
  "AI in operations: automation and workflows",
  "AI in sales: CRM, outreach, and proposals",
  "AI ethics & safety for SMEs",
  "Township entrepreneurs & AI: local opportunities"
];

const refs = [
  { name: "Stanford HAI", url: "https://hai.stanford.edu/" },
  { name: "MIT Sloan – AI", url: "https://mitsloan.mit.edu/ideas-made-to-matter/topic/artificial-intelligence" },
  { name: "McKinsey – AI Insights", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights" },
  { name: "OECD.AI", url: "https://oecd.ai/en/" },
  { name: "OpenAI Blog", url: "https://openai.com/research" },
  { name: "Google AI Blog", url: "https://ai.googleblog.com/" },
  { name: "Harvard Business Review – AI", url: "https://hbr.org/topic/artificial-intelligence" },
  { name: "World Bank – Digital Development", url: "https://www.worldbank.org/en/topic/digitaldevelopment" }
];

const internalAnchors = [
  { text: "AI Training for Entrepreneurs in South Africa", href: "/" },
  { text: "Practical AI Programme", href: "/programs" },
  { text: "Blog index", href: "/blog" },
  { text: "Community Q&A", href: "/community" },
  { text: "Book a session", href: "/book" }
];

function uniqueSlug(base) {
  let s = slugify(base, { lower: true, strict: true });
  const fp = (k) => path.join(BLOG_DIR, `${k}.mdx`);
  let i = 1;
  while (fs.existsSync(fp(s))) { s = `${s}-${i++}`; }
  return s;
}

async function makeOne(titleBase, index) {
  const title = `${titleBase} (${new Date().toISOString().slice(0,10)})`;
  const cleanTitle = title.replace(/\(.+\)$/, "").trim();
  const slug = uniqueSlug(cleanTitle);
  // Stagger published dates backwards so they look natural
  const dt = new Date(Date.now() - index * 86400000); // index days ago
  const date = dt.toISOString();

  const prompt = `
Write a 1,600–2,200 word blog post for South African SMEs:
- Title: ${cleanTitle}
- Voice: practical, clear, encouraging; avoid hype.
- Structure:
  * Intro with SA-local angle and outcome
  * 5–8 sections with H2/H3s and bullet lists
  * "Action steps" (numbered) that readers can do today
  * "Internal links" section with these exact anchors:
    ${internalAnchors.map(a => `- [${a.text}](${a.href})`).join("\n")}
  * "Further reading" section with these exact external links:
    ${refs.map(r => `- [${r.name}](${r.url})`).join("\n")}
  * 5 FAQs (Q&A)
  * CTA to join "Kasi AI Hub – Practical AI Programme"
- Keep paragraphs short. Use plain language.
Return JSON with keys: excerpt, tags (8 items), body (Markdown).
  `;

  // TEXT
  const bodyData = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      model:"gpt-4o-mini",
      messages:[{role:"user", content: prompt}],
      temperature:0.6
    })
  }).then(r=>r.json());

  const parsed = JSON.parse(bodyData.choices[0].message.content);

  // IMAGE
  const imagePrompt = `Flat, minimal cover artwork for blog titled "${cleanTitle}". Abstract circuits + African geometric motifs, clean vector style, high contrast, no text, 1200x630.`;
  const imgRes = await fetch("https://api.openai.com/v1/images/generations",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      model:"gpt-image-1",
      prompt:imagePrompt,
      size:"1200x630"
    })
  }).then(r=>r.json());

  const b64 = imgRes.data[0].b64_json;
  const imgName = `${slug}.jpg`;
  fs.writeFileSync(path.join(OG_DIR, imgName), Buffer.from(b64, "base64"));

  const mdx = matter.stringify(parsed.body, {
    title: cleanTitle,
    date,
    excerpt: parsed.excerpt,
    tags: parsed.tags,
    cover: `/og/${imgName}`,
    canonical: `${SITE_URL}/blog/${slug}`
  });

  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.mdx`), mdx, "utf8");
}

for (let i = 0; i < topics.length; i++) {
  // Space them 0..11 days back so timestamps look organic
  await makeOne(topics[i], topics.length - i - 1);
}
