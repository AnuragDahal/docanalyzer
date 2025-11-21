import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPdf } from '@/lib/pdf-loader';
import { analyzeDocument } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const rulesString = formData.get('rules') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!rulesString) {
      return NextResponse.json({ error: 'No rules provided' }, { status: 400 });
    }

    const rules = JSON.parse(rulesString);
    
    if (!Array.isArray(rules) || rules.length === 0) {
        return NextResponse.json({ error: 'Invalid rules format' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Check file size (limit to 500KB to avoid RangeError/token limits)
    if (buffer.length > 500 * 1024) {
        return NextResponse.json({ error: 'File size exceeds 500KB limit. Please upload a smaller PDF.' }, { status: 400 });
    }

    const text = await extractTextFromPdf(buffer);

    if (!text.trim()) {
        return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 400 });
    }

    // Truncate text to ensure it fits within context window and doesn't cause issues
    const truncatedText = text.slice(0, 30000);

    const analysis = await analyzeDocument(truncatedText, rules);

    return NextResponse.json({ results: analysis });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
