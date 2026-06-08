const fs = require('fs');
const path = require('path');

// Target file and paths
const sourceFile = path.join(__dirname, '..', 'toolnova_full_articles_for_ai_agent.md');
const outputDir = path.join(__dirname, '..', 'src', 'content', 'articles');

if (!fs.existsSync(sourceFile)) {
  console.error(`Error: Source file not found at ${sourceFile}`);
  process.exit(1);
}

const content = fs.readFileSync(sourceFile, 'utf8');

// The articles are separated by markdown dividers (---) and tool slug comments
const segments = content.split(/<!-- TOOL_SLUG:\s*/);

// Slug mapping to match src/lib/tools.ts
const slugMapping = {
  'reorder-pdf-pages': 'organize-pdf',
  'qr-url': 'qr-link',
  'base64-tool': 'base64-converter'
};

function parseInline(text) {
  // Bold formatting (**text**)
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
  // Italic formatting (*text*)
  text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  return text;
}

function mdToHtml(md) {
  // Normalize newlines
  let text = md.replace(/\r\n/g, '\n').trim();

  // Split into blocks by double newlines
  const blocks = text.split(/\n\n+/);
  const htmlBlocks = blocks.map(block => {
    block = block.trim();
    if (!block) return '';

    // Headers
    if (block.startsWith('### ')) {
      return `<h4 class="text-lg font-bold text-foreground mt-6 mb-3">${parseInline(block.slice(4))}</h4>`;
    }
    if (block.startsWith('## ')) {
      return `<h3 class="text-xl font-bold text-foreground mt-8 mb-4 border-r-4 border-primary pr-3">${parseInline(block.slice(3))}</h3>`;
    }
    if (block.startsWith('# ')) {
      return `<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">${parseInline(block.slice(2))}</h2>`;
    }

    // Unordered lists
    if (block.startsWith('- ') || block.startsWith('* ')) {
      const items = block.split(/\n[-*]\s+/).map((item, idx) => {
        let cleaned = item.trim();
        if (cleaned.startsWith('- ') || cleaned.startsWith('* ')) {
          cleaned = cleaned.slice(2);
        }
        return `<li class="mb-1">${parseInline(cleaned)}</li>`;
      });
      return `<ul class="list-disc list-inside space-y-1.5 my-4 pr-4 text-muted">${items.join('')}</ul>`;
    }

    // Ordered lists
    if (/^\d+\.\s+/.test(block)) {
      const items = block.split(/\n\d+\.\s+/).map((item, idx) => {
        let cleaned = item.trim();
        if (idx === 0) {
          cleaned = cleaned.replace(/^\d+\.\s+/, '');
        }
        return `<li class="mb-1">${parseInline(cleaned)}</li>`;
      });
      return `<ol class="list-decimal list-inside space-y-1.5 my-4 pr-4 text-muted">${items.join('')}</ol>`;
    }

    // Normal paragraph
    return `<p class="leading-relaxed text-muted mb-4">${parseInline(block)}</p>`;
  });

  return htmlBlocks.filter(Boolean).join('\n');
}

let parsedCount = 0;

for (let i = 1; i < segments.length; i++) {
  const segment = segments[i].trim();
  if (!segment) continue;

  const lines = segment.split('\n');
  const firstLine = lines[0];
  const slugRaw = firstLine.replace('-->', '').trim();
  const slug = slugMapping[slugRaw] || slugRaw;

  const remainingText = lines.slice(1).join('\n');

  // Extract TOOL_NAME
  const nameMatch = remainingText.match(/<!-- TOOL_NAME:\s*(.*?)\s*-->/);
  const toolName = nameMatch ? nameMatch[1].trim() : '';

  // Extract TOOL_CATEGORY
  const catMatch = remainingText.match(/<!-- TOOL_CATEGORY:\s*(.*?)\s*-->/);
  const toolCategory = catMatch ? catMatch[1].trim() : '';

  // Clean comment headers from content body
  let bodyText = remainingText
    .replace(/<!-- TOOL_NAME:\s*(.*?)\s*-->/g, '')
    .replace(/<!-- TOOL_CATEGORY:\s*(.*?)\s*-->/g, '')
    .trim();

  // Extract H1 title (# Title)
  const titleMatch = bodyText.match(/^#\s*(.*?)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  if (titleMatch) {
    bodyText = bodyText.replace(titleMatch[0], '').trim();
  }

  // Extract FAQs section (starts with ## أسئلة شائعة or similar, ends with next ## heading or end of file)
  const faqSectionRegex = /##\s*(أسئلة شائعة|الأسئلة الشائعة)[\s\S]*?(?=\n##\s|$)/i;
  const faqMatch = bodyText.match(faqSectionRegex);
  
  const faqs = [];
  if (faqMatch) {
    const faqContent = faqMatch[0];
    bodyText = bodyText.replace(faqContent, '').trim();

    // Parse individual FAQs starting with ###
    const faqParts = faqContent.split(/###\s*/);
    for (let j = 1; j < faqParts.length; j++) {
      const faqPart = faqParts[j].trim();
      const faqLines = faqPart.split('\n');
      const question = faqLines[0].trim();
      const answer = faqLines.slice(1).join('\n').trim();
      if (question && answer) {
        faqs.push({
          question: parseInline(question),
          answer: parseInline(answer)
        });
      }
    }
  }

  // Clean up trailing horizontal rules or spacing
  bodyText = bodyText.replace(/\n\s*---\s*$/, '').trim();

  // Convert markdown body to semantic styled HTML
  const htmlBody = mdToHtml(bodyText);

  const articleData = {
    slug,
    name: toolName,
    category: toolCategory,
    title,
    body: htmlBody,
    faqs
  };

  // Write to src/content/articles/<slug>/ar.json
  const dirPath = path.join(outputDir, slug);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(
    path.join(dirPath, 'ar.json'),
    JSON.stringify(articleData, null, 2),
    'utf8'
  );

  console.log(`Successfully parsed article for: ${slug} (${toolName}) with ${faqs.length} FAQs.`);
  parsedCount++;
}

console.log(`\nParsing Complete! Created ${parsedCount} article JSON files.`);
