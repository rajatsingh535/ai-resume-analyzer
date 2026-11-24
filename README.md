# AI Resume Analyzer

An AI-powered resume analysis and job application tracking web application built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Drag & Drop Resume Upload**: Upload `.txt` or `.pdf` resumes or paste resume text directly for instant analysis.
- **ATS Compatibility Score**: Circular progress gauge with color-coded rating (`Excellent`, `Good`, `Needs Work`) and section-by-section scores.
- **Keyword Cloud**: Visualizes matched vs. missing industry keywords with importance indicators.
- **Actionable Feedback**: Tabbed diagnostic report covering Overview, Keywords, Experience, Skills, and Improvements, plus tailored job role matches.
- **Kanban Job Application Tracker**: Drag-and-drop pipeline across five stages (`Applied`, `Phone Screen`, `Interview`, `Offer`, `Rejected`) with a modal form to add new applications.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Next.js Route Handlers (`/api/analyze`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Build for Production

```bash
npm run build
npm start
```
