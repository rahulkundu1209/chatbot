import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

console.log("stuff1");

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "stuuff");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
