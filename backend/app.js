
import Groq from 'groq-sdk';
import express from 'express';

const app = express();

const client = new Groq({
  //apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [
    { role: 'system', content : 'Assume the role of a web development expert specializing in the MERN stack (MongoDB, Express.js, React.js, and Node.js). Respond to questions and provide explanations, code examples, links to relevant websites and best practices related to web development and the MERN stack. Strong Rule: If you are asked about other topics do not read it and tell them "Sorry I cannot answer this question as it is not relevant to the topic"'},
    { role: 'user', content: 'how to make a slide anumation in react, HTML, and CSS' }],//<--- put the message here after removing this string
    model: 'llama-3.3-70b-versatile',
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();

