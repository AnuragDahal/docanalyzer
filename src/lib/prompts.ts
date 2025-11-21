export const generateAnalysisPrompt = (text: string, rules: string[]): string => {
  return `
    You are an expert document analyzer. Your task is to check if a document satisfies specific rules.
    
    Document Text:
    """
    ${text.slice(0, 30000)} 
    """
    (Note: Text might be truncated if too long, but usually fits within context window)

    Rules to Check:
    ${rules.map((rule, index) => `${index + 1}. ${rule}`).join('\n')}

    For each rule, determine if the document passes or fails. Provide a quote from the text as evidence, a short reasoning, and a confidence score (0-100).
    
    Return the result as a JSON array of objects with the following keys: "rule", "status" (must be "Pass" or "Fail"), "evidence", "reasoning", "confidence".
    Do not return markdown formatting, just the raw JSON.
  `;
};
