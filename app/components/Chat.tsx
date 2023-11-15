"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

const Chat = () => {
  const [messages, setMessages] = useState<
    { text: string; hasTail: boolean }[]
  >([]);
  const [inputText, setInputText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageTimeouts = useRef<NodeJS.Timeout[]>([]);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Make the chat container focusable by setting its tabIndex
    if (chatContainerRef.current) {
      chatContainerRef.current.tabIndex = -1;
      // Focus the chat container on mount
      chatContainerRef.current.focus();
    }

    // Clear timeouts on unmount
    return () => {
      messageTimeouts.current.forEach(clearTimeout);
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Reset the typing timer when inputText changes
    if (inputText.trim() !== "") {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }

      // Start a new timer
      typingTimerRef.current = setTimeout(() => {
        // Clear messages after 2 seconds of no typing
        setMessages([]);
      }, 3000); // Adjust the time as needed
    }
  }, [inputText]);

  const handleContainerKeyDown = (event: KeyboardEvent) => {
    // Redirect the focus to the hidden input whenever a key is pressed
    inputRef.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputText.trim()) {
      // Add a new message with no tail (since it will move up)
      setMessages([...messages, { text: inputText, hasTail: false }]);
      // Schedule message removal in 5 seconds
      messageTimeouts.current.push(
        setTimeout(() => {
          setMessages((currentMessages) => currentMessages.slice(1));
        }, 10000)
      );
      // Clear the input field
      setInputText("");
    }
  };

  return (
    <div
      ref={chatContainerRef}
      className="chroma-key-green h-[100vh] flex flex-col justify-end p-12"
      onKeyDown={
        handleContainerKeyDown as unknown as (
          event: React.KeyboardEvent<HTMLDivElement>
        ) => void
      }
    >
      <div className="flex-1 overflow-y-auto flex flex-col justify-end">
        {messages.map((msg, index) => (
          <ChatBubble key={index} text={msg.text} hasTail={false} />
        ))}
        {/* This bubble shows the text being typed in real time */}
        {inputText && <ChatBubble text={inputText} hasTail={true} />}
      </div>
      {/* Hidden input field */}
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="fixed top-0 left-0 w-1 h-1 opacity-0"
        placeholder="Type a message..."
        aria-hidden="true"
      />
    </div>
  );
};

export default Chat;
