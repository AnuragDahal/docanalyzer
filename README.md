# PDF Document Analyzer

A simple web application that allows users to upload a PDF and define rules to check against using AI (Google Gemini).

## Features

- **PDF Upload**: Drag and drop or select a PDF file (2-10 pages recommended).
- **Custom Rules**: Define up to 5 specific rules for the document to satisfy.
- **AI Analysis**: Uses Google Gemini 1.5 Flash to analyze the document.
- **Detailed Results**: View Pass/Fail status, evidence from the text, reasoning, and confidence score.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI**: Google Gemini (`@google/generative-ai`)
- **PDF Parsing**: `pdf-parse`

## Getting Started

1.  **Clone the repository** (or download the code).
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Set up Environment Variables**:
    - Create a `.env.local` file in the root directory.
    - Add your Google Gemini API Key:
      ```env
      GEMINI_API_KEY=your_api_key_here
      ```
4.  **Run the development server**:
    ```bash
    pnpm dev
    ```
5.  **Open the app**:
    - Navigate to `http://localhost:3000` in your browser.

## Usage

1.  Upload a PDF document.
2.  Enter rules (e.g., "Must mention a date", "Must have a signature").
3.  Click "Check Document".
4.  Review the analysis results.
