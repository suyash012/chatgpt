import React, { useState } from 'react'
import Chatgpt from './chatgpt'

export default function Rightpanel() {
  const Chat_name2 = [
    { id: 1, ChatName: "write the queries", Day: "Plan a trip" },
    { id: 2, ChatName: "write the queries", Day: "help me pick" },
    { id: 3, ChatName: "write the queries", Day: "that goes with a kitten" },
    { id: 4, ChatName: "that goes with a kitten", Day: "write the message " }
  ]

  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState([])

  const sendMessage = async () => {
    const API_KEY = process.env.REACT_API_KEY // Replace with your actual API key
    const url = "https://api.openai.com/v1/chat/completions";
    const token = `Bearer ${API_KEY}`;
    const model = "gpt-3.5-turbo";
    const messages = [
      ...allMessages,
      { "role": "user", "content": message }
    ];

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ model, messages })
      });

      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;
      setAllMessages([...allMessages, { "role": "user", "content": message }, { "role": "assistant", "content": assistantResponse }]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='flex-1 flex flex-col h-screen w-screen'>
      <h1 className='my-4 mx-2 font-bold text-lg'>ChatGPT <span className='text-neutral-400'>3.5</span></h1>
      <div className='center flex flex-col items-center my-44'>
        <Chatgpt messages={allMessages} />
        <h1 className='font-bold text-2xl'>how can i help you today?</h1>
      </div>
      <div className=' flex flex-wrap h-16 justify-center gap-2 cursor-pointer w-4/5 mx-28 mt-22 my-20'>
        {Chat_name2.map(chat => (
          <div className='border border-solid border-neutral-400 rounded-md text-center' key={chat.id}>
            <h1 className='text-neutral-500 font-bold'>{chat.Day}</h1>
            <p>{chat.ChatName}</p>
          </div>
        ))}
        <div className="bar mx-48 w-4/6 flex gap-2">
          <input
            type="text"
            className='h-10 w-full rounded-md border border-solid border-neutral-500 relative'
            placeholder='Message ChatGPT'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className='text-white dark:text-black border border-solid h-9 rounded-lg w-10 hover:bg-white'
            onClick={sendMessage}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
        <div>
          <p className='text-neutral-500 text-sm'>ChatGPT can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  )
}