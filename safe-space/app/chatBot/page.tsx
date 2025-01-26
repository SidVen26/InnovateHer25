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
    role: 'user'| 'assistant'|'system';
    content: string;
  }
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content:
        "Be a chatbot focused on providing calm, quick consise responses to help to women who are expressing need in a time of crisis. Crises include domestic violence, birth control/abortion care, access to women's shelters due to expected homelessness, and advice on dealing with unsafe situations.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  // State to track whether the chat is visible
  const [isChatVisible, setIsChatVisible] = useState(true);

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev); // Toggle the visibility
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    setLoading(true);

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
    };

    const updatedMessages = [...chatMessages, newUserMessage];

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: updatedMessages,
        model: 'llama-3.3-70b-versatile',
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';

      const newAssistantMessage: ChatMessage = {
        role: 'assistant',
        content: responseContent,
      };

      setChatMessages([...updatedMessages, newAssistantMessage]);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'There was an error processing your request. Please try again later.',
      };
      setChatMessages([...updatedMessages, errorMessage]);
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
          <span>Women's Crisis Help</span> ChatBot
        </div>
      </AppName>

      {/* Hide Chat Button */}
      <div className="hide-chat-button">
        <button onClick={toggleChatVisibility}>
          {isChatVisible ? 'Hide Chat' : 'Show Chat'}
        </button>
      </div>

      {/* Conditionally Render Chat UI */}
      {isChatVisible && (
        <>
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
              {chatMessages
                .filter((message) => message.role !== 'system') // Hide system messages
                .map((message, index) => (
                  <div key={index} className={`chat-message ${message.role}`}>
                    <p>
                      <strong>
                        {message.role === 'user' ? 'You' : 'Assistant'}:
                      </strong>{' '}
                      {message.content}
                    </p>
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
      )}
    </>
  );
}



  /*return (
    <>
      <h1>ChatBot</h1>
      <AppName>
        <div>
          <span>Women's Crisis Help</span> ChatBot
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
          {chatMessages
          .filter((message) => message.role !== 'system') // Filter out system messages     
          .map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <p><strong>{message.role === 'user' ? 'You' : message.role === 'assistant' ? 'Assistant' : 'System'}:</strong> {message.content}</p>
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

 /* const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);*/

  /*const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

