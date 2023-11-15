// ChatBubble.tsx
import React, { useState, useEffect } from "react";
import "./ChatBubble.css";

type ChatBubbleProps = {
  text: string;
  hasTail?: boolean;
};

const ChatBubble = ({ text, hasTail }: ChatBubbleProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Apply the fade-in animation when the component mounts
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Apply the fade-out animation when the text changes
    if (text === "") {
      setIsVisible(false);
    }
  }, [text]);

  const chatBubbleClasses = `chat ${hasTail ? "chat-start" : "chat"} ${
    isVisible ? "" : "not-visible"
  }`;

  return (
    <div className={chatBubbleClasses}>
      <div className="chat-bubble bg-base-100 text-black ">{text}</div>
    </div>
  );
};

export default ChatBubble;
