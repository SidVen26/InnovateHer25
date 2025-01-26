"use client";
import AppName from './AppName';
import Chatt from './Chatt';
import Headings from './Headers';
import SearchBar from './SearchBar';
import Button from './Button';
import { useState } from 'react';
import Groq from 'groq-sdk'; // Correctly importing Groq

export default function ChatBot() {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    return (
      <div>
        <h1>Configuration Error</h1>
        <p>API Key is missing. Please set `NEXT_PUBLIC_GROQ_API_KEY` in your environment configuration file.</p>
      </div>
    );
  }

  const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  interface ChatMessage {
    prompt: string;
    response: string;
  }

  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    setLoading(true);
    const chatPrompt = `You: ${inputValue}`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: inputValue,
          },
        ],
        model: 'llama3-8b-8192',
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';

      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      setChatMessages([...chatMessages, newChatMessage]);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      setChatMessages([...chatMessages, { prompt: chatPrompt, response: 'Error fetching chat completion' }]);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <h1>ChatBot</h1>
      <AppName>
        <div>
          <span>Help bot </span>ChatBot
        </div>
      </AppName>
      
      <div>
        <Headings>
          <div>
            <h1>Hi, Welcome.</h1>
          </div>
          <div>
            <h3>How can I help you today?</h3>
          </div>
        </Headings>
      </div>
      
      <div className="chat-container">
        <Chatt>
          {chatMessages.map((message, index) => (
            <div key={index} className="chat-message">
              <p><strong>{message.prompt}</strong></p>
              <p>{message.response}</p>
            </div>
          ))}
        </Chatt>
      </div>
      
      <div className="searchBar-container">
        <SearchBar>
          <textarea
            className="search-input"
            placeholder="Enter your text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            textContent={loading ? 'Loading...' : 'Send'}
            handleClick={handleSend}
          />
        </SearchBar>
      </div>
    </>
  );
}




/*"use client";
import AppName from './AppName';
import Chatt from './Chatt';
import Headings from './Headers';
import SearchBar from './SearchBar';
import Button from './Button';
import { useState } from 'react';
import Groq from 'groq-sdk';

export default function ChatBot() {

  const apiKey = process.env.NEXT_REACT_APP_GROQ_API_KEY;

if (!apiKey) {
  throw new Error('Missing API Key: Set VITE_REACT_APP_GROQ_API_KEY in your .env file');
}

console.log('API Key:', apiKey);

  const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  interface ChatMessage {
    prompt: string;
    response: string;
  }

  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    setLoading(true);
    const chatPrompt = `You: ${inputValue}`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: inputValue,
          },
        ],
        model: 'llama3-8b-8192',
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';

      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      setChatMessages([...chatMessages, newChatMessage]);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      setChatMessages([...chatMessages, { prompt: chatPrompt, response: 'Error fetching chat completion' }]);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <h1>ChatBot</h1>
      <AppName>
        <div>
          <span>Help bot </span>ChatBot
        </div>
      </AppName>
      
      <div>
        <Headings>
          <div>
            <h1>Hi, Welcome.</h1>
          </div>
          <div>
            <h3>How can I help you today?</h3>
          </div>
        </Headings>
      </div>
      
      <div className="chat-container">
        <Chatt>
          {chatMessages.map((message, index) => (
            <div key={index} className="chat-message">
              <p><strong>{message.prompt}</strong></p>
              <p>{message.response}</p>
            </div>
          ))}
        </Chatt>
      </div>
      
      <div className="searchBar-container">
        <SearchBar>
          <textarea
            className="search-input"
            placeholder="Enter your text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            textContent={loading ? 'Loading...' : 'Send'}
            handleClick={handleSend}
          />
        </SearchBar>
      </div>
    </>
  );
}*/

