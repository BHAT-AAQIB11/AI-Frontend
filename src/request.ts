export const exampleMk: string = `
# Comprehensive Guide to Markdown Document Structure

Welcome to the ultimate reference document for Markdown. This comprehensive guide serves as an extensive showcase of Markdown syntax, layout practices, and content structuring. 

---

## 1. Core Structural Elements

Markdown is designed to be highly readable in its raw form. The syntax stays out of the way of the content, allowing writers to focus on text rather than formatting tags.

### 1.1 Headings and Hierarchies
Headings organize the structure of your document. In Markdown, headings are created using the hash symbol (\`#\`). The number of hashes dictates the heading level, from H1 to H6.

\`\`\`markdown
# Level 1 Heading (Main Title)
## Level 2 Heading (Major Section)
### Level 3 Heading (Sub-section)
#### Level 4 Heading (Detailed Breakdowns)
##### Level 5 Heading (Minor Sub-section)
###### Level 6 Heading (Deepest Nested Context)
\`\`\`

### 1.2 Text Emphasis Styles
Adding emphasis changes the visual weight of words to guide the reader's eye.

*   **Italics**: Wrap text in a single asterisk \`*italic*\` or underscore \`_italic_\`.
*   **Bold**: Wrap text in double asterisks \`**bold**\` or underscores \`__bold__\`.
*   **Strikethrough**: Wrap text in double tildes \`~~strikethrough~~\`.
*   **Combined Emphasis**: Combine symbols to create \`***bold and italicized***\` text blocks.

### 1.3 Blockquotes
Blockquotes highlight quoted passages or isolate callout text from the main thread.

> "The true sign of intelligence is not knowledge but imagination." 
> 
> — *Albert Einstein*

You can also nest blockquotes inside each other:
> Main level context
>> Deeply nested secondary context

---

## 2. Lists and Navigation

Lists break down complex data into scannable chunks. Markdown supports both sequential and non-sequential listings.

### 2.1 Unordered Lists
Use asterisks (\`*\`), minuses (\`-\`), or pluses (\`+\`) followed by a space to create bulleted items. Sub-items are created by indenting four spaces or using a single tab.

*   **Front-End Technologies**
    *   HTML5 & CSS3
    *   TypeScript Ecosystem
    *   Framework Architecture
        *   React Framework
        *   Vue Ecosystem
*   **Back-End Systems**
    *   Node.js runtimes
    *   Python applications

### 2.2 Ordered Lists
Ordered lists use standard numbers followed by a period. The actual numbers you type do not matter; the Markdown parser automatically numbers them sequentially during rendering.

1.  Initialize the project repository.
2.  Install dependencies using your package manager.
3.  Configure the environment variables.
1.  Launch the development server. (Even if written as "1", it renders as "4").

### 2.3 Task Lists
Task lists require a space inside the brackets for incomplete tasks, and an uppercase "X" for completed tasks.

- [x] Complete system documentation architecture
- [x] Review pull requests for core layout engine
- [ ] Implement dark mode styles across components
- [ ] Run end-to-end integration tests

---

## 3. Data Presentation Tables

Tables organizing two-dimensional datasets use pipes (\`|\`) and hyphens (\`-\`). Colons (\`:\`) control the text alignment within the columns.

| Feature ID | System Module | Status Flag | Target Milestone |
| :--- | :---: | ---: | :---: |
| **SYS-101** | Authentication | \`Stable\` | Q1 Release |
| **SYS-102** | Database Sync | \`Beta\` | Q2 Release |
| **SYS-204** | API Gateway | \`Deprecating\` | Q3 Release |
| **SYS-409** | Reporting Engine | \`Planning\` | Q4 Release |

---

## 4. Code Blocks and Technical Syntax

Technical documentation relies heavily on inline code blocks and fenced code segments to preserve spacing and highlight syntax.

### 4.1 Inline Code
Use single backticks to isolate configuration options, file names, or short functions directly inside a paragraph. For example, use \`npm run build\` to compile assets inside the \`/dist/\` directory.

### 4.2 Fenced Code Blocks
Use triple backticks (\`\`\` \`\`\`) before and after code blocks to format multi-line scripts. Specifying the language enables syntax highlighting.

#### JavaScript / Node.js
\`\`\`javascript
// Express Server Setup Example
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/api/v1/status', (req, res) => {
    res.status(200).json({
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(\`Server running efficiently on port \${PORT}\`);
});
\`\`\`

#### Python Data Script
\`\`\`python
import json
import datetime

def generate_report(data_summary):
    """Parses a structured dictionary to yield system statuses."""
    report_metadata = {
        "generated_at": str(datetime.datetime.now()),
        "processed_records": len(data_summary),
        "valid": True
    }
    return json.dumps(report_metadata, indent=4)

# Example Execution
print(generate_report([10, 20, 30, 40]))
\`\`\`

---

## 5. Hyperlinks and Media Anchors

Markdown uses distinct patterns for linking to internal resources or external sites.

### 5.1 Standard Links
An inline link combines brackets for the anchor text and parentheses for the URL destination:
*   Visit the official [Markdown Guide](https://www.markdownguide.org) to master formatting styles.
*   Access the secure [GitHub Documentation portal](https://docs.github.com) for developer workflows.

### 5.2 Reference Links
Reference links keep paragraphs clean by placing URLs at the bottom of the document instead of inline.

This layout uses [Google Style Guidelines][1] alongside [StackOverflow community solutions][2] to optimize line wrapping and clean formatting standards.: https://google.github.io/styleguide/docguide/style.html: https://stackoverflow.com

---

## 6. Mathematical Equations and Formulas

Many Markdown parsers support LaTeX syntax using dollar signs (\`\$\`) for formulas.

### 6.1 Inline Math
The classic formula for a line is expressed inline as y = mx + b.

### 6.2 Block Math
For complex expressions, use double dollar signs to center the equation on its own line:

\\[\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}\\]

---

## Summary Matrix

*   **Readability**: Clean syntax mirrors plain-text layout frameworks.
*   **Portability**: Transpiles to valid HTML across systems seamlessly.
*   **Maintainability**: Eliminates complex tag management.
`;

export async function getAIResponse(prompt: string) {
  const postData = {
    model: "qwen3b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: false,
  };
  try {
    const res = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
