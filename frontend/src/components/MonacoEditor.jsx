import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../contexts/ThemeContext';

const MonacoEditor = ({ code, language, onCodeChange, readOnly = false, onErrorsChange }) => {
    const { theme } = useTheme();
    const editorRef = useRef(null);

    // Monaco editor theme mapping
    const getMonacoTheme = () => {
        switch (theme) {
            case 'dark': return 'vs-dark';
            case 'green': return 'hc-black'; // High contrast for green theme
            case 'light': return 'vs';
            default: return 'vs-dark';
        }
    };

    // Monaco editor language configuration
    const getMonacoLanguage = (lang) => {
        const languageMap = {
            javascript: 'javascript',
            // typescript: 'typescript',
            // python: 'python',
            // java: 'java',
            // cpp: 'cpp',
            // c: 'c',
            // csharp: 'csharp',
            // php: 'php',
            // ruby: 'ruby',
            // go: 'go',
            // rust: 'rust',
            // swift: 'swift',
            // kotlin: 'kotlin',
            // html: 'html',
            // css: 'css',
            // scss: 'scss',
            // less: 'less',
            // json: 'json',
            // xml: 'xml',
            // yaml: 'yaml',
            // markdown: 'markdown',
            // sql: 'sql',
            // shell: 'shell',
            // plaintext: 'plaintext'
        };
        return languageMap[lang] || 'plaintext';
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Configure editor options
        editor.updateOptions({
            fontSize: 14,
            lineHeight: 1.5,
            fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
            fontWeight: '400',
            lineNumbers: 'on',
            glyphMargin: true,
            folding: true,
            foldingHighlight: true,
            showFoldingControls: 'mouseover',
            selectOnLineNumbers: true,
            automaticLayout: true,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            renderWhitespace: 'boundary',
            renderControlCharacters: true,
            renderLineHighlight: 'all',
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            mouseWheelZoom: true,
            padding: { top: 10, bottom: 10 },
            bracketPairColorization: { enabled: true },
            guides: {
                indentation: true,
                highlightActiveIndentation: true
            }
        });

        // Add custom keybindings
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            // Prevent default save behavior
        });

        // Configure language-specific settings
        configureLanguageSettings(monaco);
        
        // Enable error diagnostics
        enableErrorDiagnostics(monaco, editor);
    };

    const configureLanguageSettings = (monaco) => {
        // JavaScript/TypeScript configuration with strict error checking
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            jsx: monaco.languages.typescript.JsxEmit.React,
            reactNamespace: 'React',
            allowJs: true,
            typeRoots: ['node_modules/@types'],
            // Enable strict error checking
            strict: true,
            noImplicitAny: true,
            noImplicitReturns: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            exactOptionalPropertyTypes: true,
            noImplicitOverride: true,
            noPropertyAccessFromIndexSignature: true,
            noUncheckedIndexedAccess: true,
            // Enable all error checks
            checkJs: true,
            allowSyntheticDefaultImports: true,
            skipLibCheck: false,
            forceConsistentCasingInFileNames: true
        });

   

       
    };

    const enableErrorDiagnostics = (monaco, editor) => {
        // Enable diagnostics for JavaScript/TypeScript
        const model = editor.getModel();
        
        if (model && (language === 'javascript' || language === 'typescript')) {
            // Force diagnostics update
            monaco.languages.typescript.getJavaScriptWorker().then(worker => {
                worker.getEmitOutput(model.uri.toString()).then(result => {
                    // This will trigger diagnostics
                });
            });
        }

        // Listen for model changes to update diagnostics
        const updateDiagnostics = () => {
            if (model && (language === 'javascript' || language === 'typescript')) {
                // Force a re-check of the model
                monaco.editor.setModelMarkers(model, 'typescript', []);
                
               
            }
        };

        // Update diagnostics on content change
        model?.onDidChangeContent(updateDiagnostics);
        
        // Initial diagnostics
        updateDiagnostics();
    };

    const handleEditorChange = (value) => {
        onCodeChange(value);
    };

    // Custom theme for green theme
    useEffect(() => {
        if (theme === 'green' && window.monaco) {
            window.monaco.editor.defineTheme('green-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: '', foreground: 'dcfce7', background: '052e16' },
                    { token: 'keyword', foreground: '22c55e' },
                    { token: 'string', foreground: '86efac' },
                    { token: 'number', foreground: '4ade80' },
                    { token: 'comment', foreground: '65a30d' },
                ],
                colors: {
                    'editor.background': '#052e16',
                    'editor.foreground': '#dcfce7',
                    'editor.lineHighlightBackground': '#14532d',
                    'editor.selectionBackground': '#22c55e40',
                    'editor.inactiveSelectionBackground': '#22c55e20',
                }
            });
        }
    }, [theme]);

    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                language={getMonacoLanguage(language)}
                theme={theme === 'green' ? 'green-theme' : getMonacoTheme()}
                value={code}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    readOnly: readOnly,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
                    lineNumbers: 'on',
                    folding: true,
                    minimap: { enabled: true },
                    wordWrap: 'on',
                    renderWhitespace: 'boundary',
                    matchBrackets: 'always',
                    tabSize: 2,
                    insertSpaces: true,
                    detectIndentation: true,
                    trimAutoWhitespace: true,
                    largeFileOptimizations: true,
                    formatOnPaste: true,
                    formatOnType: true,
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    parameterHints: { enabled: true },
                    hover: { enabled: true },
                    lightbulb: { enabled: true },
                    links: true,
                    contextmenu: true,
                    copyWithSyntaxHighlighting: true,
                    mouseWheelZoom: true,
                    smoothScrolling: true,
                    padding: { top: 15, bottom: 15 },
                    bracketPairColorization: { enabled: true },
                    guides: {
                        indentation: true,
                        highlightActiveIndentation: true,
                        bracketPairs: true
                    },
                    renderLineHighlight: 'all',
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    multiCursorModifier: 'alt',
                    accessibilitySupport: 'on'
                }}
                loading={
                    <div className="flex items-center justify-center h-full bg-bg-primary">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-text-primary">Loading Monaco Editor...</p>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default MonacoEditor;