// import React, { useState } from 'react';

// const Chatbot = ({ onClose }) => {
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponse(''); // Clear previous response

//     try {
//       const res = await fetch('http://localhost:4000/ask_doctor', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question }), // matches Flask request.json
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       setResponse(data.response || data.error || 'No response received.');
//     } catch (error) {
//       console.error('Error fetching response:', error);
//       setResponse(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-semibold mb-4">Dr.GPT Chatbot</h2>
//         <form onSubmit={handleSubmit} className="mb-4">
//           <textarea
//             className="w-full p-2 border rounded-md mb-2"
//             placeholder="Ask your question..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             rows={4}
//           />
//           <button
//             type="submit"
//             className="bg-[#5f6fff] text-white px-4 py-2 rounded-md hover:bg-[#4a55c6]"
//             disabled={loading || question.trim() === ''}
//           >
//             {loading ? 'Loading...' : 'Ask'}
//           </button>
//         </form>
//         {response && (
//           <div className="mt-4">
//             <p className="font-semibold">DoctorGPT:</p>
//             <p>{response}</p>
//           </div>
//         )}
//         <button onClick={onClose} className="mt-4 text-gray-600 hover:text-gray-800">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;






// import React, { useState } from "react";

// const Chatbot = ({ onClose }) => {
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState([]); // stores history
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!question.trim()) return;

//     // Add user's question to history
//     setMessages((prev) => [...prev, { sender: "You", text: question }]);

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:4000/ask_doctor", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ question }),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       const reply = data.response || data.error || "No response received.";

//       // Add bot's response to history
//       setMessages((prev) => [...prev, { sender: "DoctorGPT", text: reply }]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "DoctorGPT", text: `Error: ${error.message}` },
//       ]);
//     } finally {
//       setLoading(false);
//       setQuestion(""); // clear input
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 w-80 h-[28rem] bg-white rounded-lg shadow-lg flex flex-col z-50">
//       {/* Header */}
//       <div className="bg-[#5f6fff] text-white p-3 rounded-t-lg flex justify-between items-center">
//         <h2 className="font-semibold">Dr.GPT Chatbot</h2>
//         <button onClick={onClose} className="hover:text-gray-200">
//           ✕
//         </button>
//       </div>

//       {/* Chat messages */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-2">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`p-2 rounded-lg max-w-[80%] ${
//               msg.sender === "You"
//                 ? "bg-blue-100 self-end ml-auto"
//                 : "bg-gray-100 self-start"
//             }`}
//           >
//             <p className="text-xs font-semibold">{msg.sender}</p>
//             <p>{msg.text}</p>
//           </div>
//         ))}
//         {loading && <p className="text-sm text-gray-500">Typing...</p>}
//       </div>

//       {/* Input form */}
//       <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
//         <input
//           type="text"
//           className="flex-1 p-2 border rounded-md"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-[#5f6fff] text-white px-4 py-2 rounded-md hover:bg-[#4a55c6]"
//           disabled={loading}
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;\


import React, { useState, useEffect } from "react";
import { Menu, X, Pencil, Trash2, Check, XCircle } from "lucide-react";

function Chatbot({ onClose }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingChat, setEditingChat] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Load saved chats
  useEffect(() => {
    const saved = localStorage.getItem("chatbot_chats");
    if (saved) {
      setChats(JSON.parse(saved));
    }
  }, []);

  // Save chats
  useEffect(() => {
    localStorage.setItem("chatbot_chats", JSON.stringify(chats));
  }, [chats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // If no chat active, create one now
    if (!activeChat) {
      const newChat = {
        id: Date.now(),
        title: `Chat ${chats.length + 1}`,
        messages: [],
      };
      setChats((prev) => [newChat, ...prev]);
      setActiveChat(newChat.id);
      setMessages([]);
    }

    const newMessages = [
      ...messages,
      { sender: "You", text: question, time: new Date().toLocaleTimeString() },
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/ask_doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const reply = data.response || "No response received.";

      const updatedMessages = [
        ...newMessages,
        { sender: "DoctorGPT", text: reply, time: new Date().toLocaleTimeString() },
      ];
      setMessages(updatedMessages);

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat ? { ...chat, messages: updatedMessages } : chat
        )
      );
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "DoctorGPT", text: `Error: ${err.message}`, time: new Date().toLocaleTimeString() },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  const handleNewChat = () => {
    setActiveChat(null);
    setMessages([]);
  };

  const handleSwitchChat = (id) => {
    const chat = chats.find((c) => c.id === id);
    if (chat) {
      setActiveChat(id);
      setMessages(chat.messages);
    }
  };

  const handleDeleteChat = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChat === id) {
      setActiveChat(null);
      setMessages([]);
    }
  };

  const handleEditChat = (id, title) => {
    setEditingChat(id);
    setEditTitle(title);
  };

  const saveEditChat = (id) => {
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: editTitle } : c))
    );
    setEditingChat(null);
    setEditTitle("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 500,
        height: 500,
        zIndex: 9999,
      }}
      className="bg-white rounded-xl shadow-2xl flex overflow-hidden relative border"
    >
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-56 bg-gray-100 border-r flex flex-col transition-all">
          <div className="flex justify-between items-center p-3 bg-[#5f6fff] text-white">
            <span className="font-semibold">Chats</span>
            <button onClick={() => setSidebarOpen(false)} className="hover:text-gray-300">
              <X size={18} />
            </button>
          </div>
          <button
            onClick={handleNewChat}
            className="p-2 bg-[#5f6fff] text-white hover:bg-[#4a55c6] m-2 rounded-lg transition"
          >
            + New Chat
          </button>
          <div className="flex-1 overflow-y-auto px-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex justify-between items-center p-2 rounded-md cursor-pointer my-1 transition ${
                  chat.id === activeChat ? "bg-blue-200 font-semibold" : "hover:bg-gray-200"
                }`}
                onClick={() => handleSwitchChat(chat.id)}
              >
                {editingChat === chat.id ? (
                  <div className="flex gap-1 w-full">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 border rounded px-1"
                    />
                    <button onClick={() => saveEditChat(chat.id)}>
                      <Check size={16} className="text-green-600" />
                    </button>
                    <button onClick={() => setEditingChat(null)}>
                      <XCircle size={16} className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="truncate">{chat.title}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditChat(chat.id, chat.title);
                        }}
                      >
                        <Pencil size={14} className="text-gray-600 hover:text-blue-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat.id);
                        }}
                      >
                        <Trash2 size={14} className="text-gray-600 hover:text-red-600" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#5f6fff] text-white p-3 flex justify-between items-center shadow">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-2 hover:text-gray-200"
              >
                <Menu size={20} />
              </button>
            )}
            <h2 className="font-semibold">
              {chats.find((c) => c.id === activeChat)?.title || "Chat"}
            </h2>
          </div>
          <button onClick={onClose} className="hover:text-gray-200">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
          {messages.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-10">
              Start a new chat...
            </p>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[75%] shadow-sm ${
                msg.sender === "You"
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-white border"
              }`}
            >
              <p className="text-xs font-semibold text-gray-600">{msg.sender}</p>
              <p className="text-sm">{msg.text}</p>
              <p className="text-[10px] text-gray-400">{msg.time}</p>
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500">Typing...</p>}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2 bg-white">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-[#5f6fff] outline-none"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#5f6fff] text-white px-4 py-2 rounded-md hover:bg-[#4a55c6] transition"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
