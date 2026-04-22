---
layout: ../../layouts/post.astro
title: 'Post Template & Style Guide'
author: Naveen Pal
description: 'A reference guide for creating beautiful markdown posts with standard boundaries and premium formatting.'
image:
    url: "/post/template-banner.png"
    alt: "Template Banner"
pubDate: 2026-04-22
links: 
    - { url: "https://github.com/Naveen-Pal", text: "View GitHub", class: "btn-dark" }
tags: ["Template", "Guide", "Style"]
---

# Welcome to Your New Post Template

This document serves as a guide to ensure all your markdown posts look stunning and "properly visible" using the updated premium layout styles.

## 1. Headings and Structure

Use headings (H1-H6) to organize your content. The layout automatically adds borders and spacing to keep things clean.

### Sub-headings are styled with accent borders
This helps guide the reader's eye through different sections.

## 2. Standard Image Boundaries

One of the key improvements is how images are handled. All images now have:
- **Automatic Centering**: They will be centered within the content area.
- **Defined Boundaries**: A subtle border and padding (Polaroid style) makes them stand out.
- **Premium Shadows**: Deep, soft shadows for a modern look.
- **Hover Effects**: Try hovering over an image (if viewed in the browser) to see a subtle lift effect.

![Sample Image Boundary Showcase](https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80)

> **Tip:** You can use standard markdown syntax `![alt](url)` or HTML `<img>` tags. Both will respect the container boundaries and styling.

## 3. Code Blocks and Inline Code

Technical posts benefit from clear, legible code blocks.

```javascript
// This is a beautiful code block
function welcomeUser(name) {
  console.log(`Hello, ${name}! Your posts look great.`);
}

welcomeUser('Naveen');
```

You can also use `inline code` for variable names or short commands.

## 4. Tables and Lists

Lists and tables are essential for structured data.

### Standardized Table
| Feature | Benefit |
| :--- | :--- |
| **Max Width 100%** | Prevents content from going out of the Md div |
| **Inter Font** | Modern, premium typography |
| **Responsive** | Looks great on mobile and desktop |

### Beautiful Lists
- Item one with a primary color marker.
- Item two with nested lists:
    - Sub-item A
    - Sub-item B
- Item three.

## 5. Blockquotes for Emphasis

> "The details are not the details. They make the design." — Charles Eames

Blockquotes are styled with a left accent border and a subtle background to make important quotes pop.

---

## Conclusion

Happy writing! Use this template as a starting point for all your future posts to maintain a consistent, high-quality look across your portfolio.
