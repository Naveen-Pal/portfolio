---
layout: ../../layouts/post.astro
title: "StudySahayak - AI-Powered Content Repurposing"
description: "An AI system that auto-transforms existing content (lectures, case studies, assignments) into multiple formats like short-form notes, quizzes, and summaries without manual rework."
pubDate: "2024-03-26"
image:
  url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2000"
  alt: "Laptop on a desk for studying"
tags: ["AI", "Flask", "MongoDB", "Python"]
links:
  - url: "https://github.com/Naveen-Pal/StudySahayak"
    text: "View on GitHub"
    class: "btn-dark"
---

**StudySahayak** is an AI-powered content repurposing and localization system. The primary goal of this platform is to automatically transform raw existing educational content such as lecture videos, case studies, or text assignments into multiple accessible formats (like structured notes, localized translations, and interactive quizzes) without any manual rework.

### Tech Stack

- **Backend:** Python + Flask
- **Database:** MongoDB (via MongoDB Atlas)
- **AI Engine:** Google Gemini API for all LLM processing
- **Authentication:** JWT (JSON Web Tokens) for secure, stateless user sessions
- **Data Formats:** JSON API responses, text, video, and PDF parsing

## Core Features & Endpoints

StudySahayak is built entirely as an API-first backend service. Here is how the system handles the core study loop:

### 1. Unified Content Upload (`/api/upload`)
Users can upload content in various formats Video, PDF, or raw Text. 
- For **Video/Speech**, the system automatically generates a transcription.
- For **Text/PDF**, it extracts the core content.
- It then uses the Gemini LLM alongside specialized web-search agents to generate a well-structured, detailed document from the raw input. This finalized document is safely stored in MongoDB and associated with the user's ID.

### 2. Intelligent Summarization (`/api/summary`)
By passing a `contentid` and a target `language`, the API leverages AI to compress long-form content into an easy-to-read summary, fully localized if necessary. 

### 3. Auto-Quiz Generation (`/api/quiz`)
Given a piece of content, StudySahayak can automatically spin up interactive quizzes. The user can specify the exact number of questions they want to practice (up to a max limit), and the LLM will generate contextual, subject-accurate questions in proper JSON format.

### 4. Structured Notes (`/api/notes`)
One of the most useful endpoints. It takes complex source material and formats it into distinct, easy-to-read structured class notes highly optimized for quick revision.

## Security & Architecture

The entire application relies on robust **JWT authentication**. Every request must carry a valid token, securely tying all generated content, summaries, and quizzes exclusively to the originating user's MongoDB profile. 

This project was a fantastic deep dive into building production-ready wrapper APIs around modern LLMs like Gemini, while handling varying data formats (PDFs, raw strings, video transcriptions) concurrently!
