import React, { useState } from "react";
import { saveAs } from "file-saver";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleCodeChange = (e) => {
    if (!isLocked) {
      setCode(e.target.value);
    }
  };

  const handleSave = () => {
    try {
      // Ask the user for a file extension
      const extension = prompt("Enter a file extension (e.g., .txt):");

      if (!extension) {
        // not specified extension use a default extension
        extension = ".txt";
      }

      const sanitizedFileName = fileName.replace(/["']/g, "");
      const blob = new Blob([code], { type: "text/plain" });

      // Concatenate the user-specified extension to the file name
      const fileNameWithExtension = sanitizedFileName + extension;

      saveAs(blob, fileNameWithExtension);
    } catch (error) {
      console.error("Error saving code:", error);
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Code copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
      });
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <div className="code-editor">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Basic Code Editor</h4>
        <div style={{padding:"10px"}}>
          <button
            className="code-editor__button0"
            onClick={toggleLock}
            style={{
              backgroundColor: isLocked ? "red" : "green",
              marginRight: "10px"
              
            }}
          >
            {!isLocked ? "Unlock" : "Lock"}
          </button>
          <button
            className="code-editor__button1"
            onClick={handleCopy}
           
          >
            Copy
          </button>
          <button
            className="code-editor__button"
            onClick={handleSave}
          
          >
            Save
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={handleCodeChange}
        readOnly={isLocked}
        placeholder="Enter your code here"
        className="code-editor__textarea"
      />
    </div>
  );
};

export default CodeEditor;
