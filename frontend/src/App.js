import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [questionHistory, setQuestionHistory] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        // Save user question in history
        setQuestionHistory([...questionHistory, input]);

        // Check if the question is related to MERN
        const isMernRelated = /mern/i.test(input);

        try {
            const response = await axios.post("http://localhost:5000/chat", { message: input });

            const botMessage = {
                sender: "bot",
                text: isMernRelated ? response.data.reply : "Sorry, from a different topic",
            };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    const clearChat = () => {
        setMessages([]); // Clear the chat-box
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <h3>Previous Questions</h3>
                <ul>
                    {questionHistory.map((question, index) => (
                        <li key={index} className="sidebar-item">{question}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-container">
                <h2>MERN Chatbot</h2>
                <div className="chat-box">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender}>
                            <div className="message">
                                <span>{msg.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something about MERN..."
                    />
                    <button onClick={sendMessage}>Send</button>
                    <button className="clear-btn" onClick={clearChat}>Clear Chat</button>
                </div>
            </div>
        </div>
    );
}

export default App;
