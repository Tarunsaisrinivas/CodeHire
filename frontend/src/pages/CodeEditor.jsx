import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function CodeEditor() {
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState([]);

  const runCode = () => {
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => logs.push({ type: "log", message: args.join(" ") });
    console.error = (...args) => logs.push({ type: "error", message: args.join(" ") });

    try {
      // Use Function constructor to get real syntax errors (with line numbers)
      const fn = new Function(code);
      const result = fn();

      if (result !== undefined && logs.length === 0) {
        logs.push({ type: "return", message: String(result) });
      }
    } catch (err) {
      // Recreate realistic JS engine style error message
      const formattedError = [
        "ERROR!",
        `/tmp/main.js:1`,
        ...code.split("\n").slice(0, 2), // Show first 2 lines for context
        " ".repeat(err.columnNumber - 1 || 0) + "^",
        "",  
        `${err.name}: ${err.message}`,
      ].join("\n");

      logs.push({ type: "error", message: formattedError });
    } finally {
      console.log = originalLog;
      console.error = originalError;
      setOutput(logs);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-gray-800 text-white font-bold text-lg">
        React Code Editor (CodeMirror)
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Editor */}
        <div className="w-1/2 border-r border-gray-300 flex flex-col">
          <div className="flex-1">
            <CodeMirror
              value={code}
              height="80vh"
              extensions={[javascript({ jsx: true })]}
              theme="dark"
              onChange={(value) => setCode(value)}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                autocompletion: true,
              }}
            />
          </div>
          <div className="p-4 bg-gray-200 flex justify-end">
            <button
              onClick={runCode}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              ▶ Run Code
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="w-1/2 bg-black font-mono p-4 overflow-y-auto">
          <div className="text-white mb-2 font-semibold">Console Output:</div>
          <div>
            {output.length === 0 ? (
              <div className="text-gray-400">No output yet...</div>
            ) : (
              output.map((item, index) => (
                <div
                  key={index}
                  className={`whitespace-pre-wrap ${
                    item.type === "log"
                      ? "text-green-400"
                      : item.type === "error"
                      ? "text-red-500"
                      : "text-blue-400"
                  }`}
                >
                  {item.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
