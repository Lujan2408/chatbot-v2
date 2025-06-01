import type { GenerateContentResponse } from "@google/genai";

function extractTextFromResponse(textPart: GenerateContentResponse): string {
  return (
    textPart.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      ?.filter((t): t is string => typeof t === "string")
      ?.join("") ?? ""
  );
}

export default extractTextFromResponse