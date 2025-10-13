'use client';

import React, { useState, useRef, useEffect } from 'react';
import { about, skills, projects, contact } from '@/lib/data';

const themes = ['dark', 'matrix', 'dracula', 'solarized-dark'];

const Typewriter = ({ text, onComplete }: { text: React.ReactNode, onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const textContent = typeof text === 'string' ? text : (text as React.ReactElement)?.props?.children?.toString() || '';
  const typingDelay = 10;

  useEffect(() => {
    if (textContent.length === 0) {
      onComplete();
      return;
    }
    
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + textContent.charAt(i));
      i++;
      if (i > textContent.length) {
        clearInterval(intervalId);
        onComplete();
      }
    }, typingDelay);

    return () => clearInterval(intervalId);
  }, [textContent, onComplete, typingDelay]);
  
  if (typeof text !== 'string') return text;
  
  return <pre className="whitespace-pre-wrap">{displayedText}</pre>;
};


const commands = {
  help: 'Available commands: help, about, skills, projects, contact, clear, theme, date, whoami',
  about: about,
  skills: () => {
    let output = '--- Skills ---\n\n';
    for (const category in skills) {
      output += `\n[${category}]\n`;
      skills[category as keyof typeof skills].forEach((skill: { name: string; description: string; }) => {
        output += `  ${skill.name.padEnd(25)} - ${skill.description}\n`;
      });
    }
    return output;
  },
  projects: () => {
    let output = '--- Projects ---\n\n';
    output += '\n[Embedded Systems]\n';
    projects.embedded.forEach(p => {
        output += `  ${p.name.padEnd(35)} - ${p.description} (Tech: ${p.tech})\n`;
    });
    output += '\n[Web Development]\n';
    projects.web.forEach(p => {
        output += `  ${p.name.padEnd(35)} - ${p.description} (Tech: ${p.tech})\n`;
    });
    return output;
  },
  contact: () => {
    return `--- Contact ---\n
  Email:    ${contact.email}
  Phone:    ${contact.phone}
  LinkedIn: ${contact.linkedin}
  GitHub:   ${contact.github}
`;
  },
  clear: () => {
    return 'clear';
  },
  theme: (args?: string[]) => {
    if (args && args.length > 0) {
        const themeName = args[0].toLowerCase();
        if (themes.includes(themeName)) {
            return `theme:${themeName}`;
        }
        return `Theme '${themeName}' not found. Available themes: ${themes.join(', ')}`;
    }
    return `Usage: theme <theme_name>. Available themes: ${themes.join(', ')}`;
  },
  date: () => new Date().toString(),
  whoami: () => 'guest',
};

const WelcomeMessage = () => (
    <>
        <div>Welcome to Mohan Kilari's portfolio!</div>
        <div className="h-4" />
        <div>Type 'help' to see a list of available commands.</div>
        <pre className="mt-4 whitespace-pre-wrap font-code text-primary">
{` _ __ ___   ___  _ __   __ _  ___| |__  
| '_ \` _ \\ / _ \\| '_ \\ / _\` |/ __| '_ \\ 
| | | | | | (_) | | | | (_| | (__| | | |
|_| |_| |_|\\___/|_| |_|\\__,_|\\___|_| |_|
                                      
`}
        </pre>
    </>
);

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([
    { command: '', output: <WelcomeMessage /> }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  
  const { setTheme } = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isTyping) {
        endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
    }
  }, [history, isTyping]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (commandHistory.length > 0) {
              const newIndex = historyIndex >= 0 ? Math.max(0, historyIndex - 1) : commandHistory.length - 1;
              setHistoryIndex(newIndex);
              setInput(commandHistory[newIndex]);
          }
      } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex !== -1) {
              if (historyIndex < commandHistory.length - 1) {
                  const newIndex = historyIndex + 1;
                  setHistoryIndex(newIndex);
                  setInput(commandHistory[newIndex]);
              } else {
                  setHistoryIndex(-1);
                  setInput('');
              }
          }
      }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isTyping) return;

    const trimmedInput = input.trim();
    const [command, ...args] = trimmedInput.toLowerCase().split(' ');
    let output: React.ReactNode;

    if (command in commands) {
      const commandFn = commands[command as keyof typeof commands];
      const result = typeof commandFn === 'function' ? commandFn(args) : commandFn;

      if (result === 'clear') {
          setHistory([]);
      } else if (typeof result === 'string' && result.startsWith('theme:')) {
          const newTheme = result.split(':')[1];
          setTheme(newTheme);
          output = `Theme changed to ${newTheme}`;
      }
      else {
        output = result;
      }
    } else if (command === '') {
        output = '';
    }
    else {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    if (trimmedInput) {
        setCommandHistory(prev => [trimmedInput, ...prev.filter(c => c !== trimmedInput)]);
    }
    setHistoryIndex(-1);
    
    setIsTyping(true);
    setHistory(prev => [...prev, { command: input, output: <Typewriter text={output} onComplete={() => setIsTyping(false)} /> }]);
    setInput('');
  };

  return (
    <div
      className="w-full h-[85vh] bg-background border border-border rounded-lg p-4 font-code text-sm overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, index) => (
        <div key={index}>
          {item.command && (
            <div className="flex items-center">
              <span className="text-primary">user@kilari.dev:~$</span>
              <span className="ml-2">{item.command}</span>
            </div>
          )}
          <div className="text-foreground/90">{item.output}</div>
        </div>
      ))}

      {!isTyping && (
          <form onSubmit={handleFormSubmit} className="flex items-center">
            <label htmlFor="terminal-input" className="text-primary">
              user@kilari.dev:~$
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none text-foreground focus:outline-none ml-2"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isTyping}
            />
             <span className="w-2 h-4 bg-foreground cursor-blink" />
          </form>
      )}
      <div ref={endOfHistoryRef} />
    </div>
  );
}

// Dummy useTheme to avoid breaking the component without the actual provider
// The real one will come from the layout file
const useTheme = () => {
    return {
        setTheme: (theme: string) => {
            if (typeof document !== 'undefined') {
                document.documentElement.setAttribute('data-theme', theme);
            }
        }
    }
};
