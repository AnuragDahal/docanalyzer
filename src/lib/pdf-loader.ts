import PDFParser from "pdf2json";

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, true); // 1 means text content only

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("PDF Parser Error:", errData.parserError);
      reject(new Error("Failed to parse PDF"));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        // pdf2json returns URL-encoded text, so we need to decode it
        const text = pdfParser.getRawTextContent();
        resolve(text);
      } catch (err) {
        reject(err);
      }
    });

    try {
      pdfParser.parseBuffer(buffer);
    } catch (err) {
      reject(err);
    }
  });
}
