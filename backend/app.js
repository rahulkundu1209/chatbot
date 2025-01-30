
import Groq from 'groq-sdk';
import express from 'express';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());
const GROQ_API_KEY = "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"

const client = new Groq({
  //apiKey: process.env['GROQ_API_KEY'], // <-- Uncommit this line and send a message asking for the envoirnment variable I can't put here
  apiKey: GROQ_API_KEY
});

app.post('/chat', async (req, res) => { // Made async
  try {
    const message = req.body;
    console.log("Received message:", message);
    const response = await getChatCompletion(message); // Added await
    res.json(response); // Better to use json() for JSON responses
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


async function getChatCompletion(message) {
  const chatcompletion = await client.chat.completions.create({
    messages: [
      { role: 'system', content: 'Assume the role of a web development expert specializing in the MERN stack (MongoDB, Express.js, React.js, and Node.js). Respond to questions and provide explanations, code examples, links to relevant websites and best practices related to web development and the MERN stack. Strong Rule: If you are asked about other topics do not read it and tell them "Sorry I cannot answer this question as it is not relevant to the topic"' },
      { role: 'user', content: message.content }],//<--- put the message here after removing this string
    model: 'llama-3.3-70b-versatile',
  });

  return chatcompletion.choices[0].message.content;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

