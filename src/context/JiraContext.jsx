// src/GlobalStateContext.js
import React, { createContext, useState } from "react";

// Create a context
const JiraToggle = createContext();

// Create a provider component
const JiraContext = ({ children }) => {
  const [isJiraOpen, setIsJiraOpen] = useState(false);

  return (
    <JiraToggle.Provider value={{ isJiraOpen, setIsJiraOpen }}>
      {children}
    </JiraToggle.Provider>
  );
};

export { JiraToggle, JiraContext };
