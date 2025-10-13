'use client';

import React, { useState, useRef, useEffect } from 'react';
import { about, skills, projects, contact } from '@/lib/data';

const commands = {
  help: 'Available commands: help, about, skills, projects, contact, clear',
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
  }
};

const WelcomeMessage = () => (
    <>
        <div>Welcome to Mohan Kilari's portfolio!</div>
        <div className="h-4" />
        <div>Type 'help' to see a list of available commands.</div>
        <pre className="mt-4 whitespace-pre-wrap font-code">
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
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    let output: React.ReactNode;

    if (command in commands) {
      const result = commands[command as keyof typeof commands];
      if (typeof result === 'function') {
        const funcResult = result();
        if (funcResult === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }
        output = <pre className="whitespace-pre-wrap">{funcResult}</pre>;
      } else {
        output = result;
      }
    } else if (command === '') {
        output = '';
    }
    else {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    setHistory([...history, { command: input, output }]);
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
          <div className="text-foreground/90 whitespace-pre-wrap">{item.output}</div>
        </div>
      ))}

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
          className="flex-1 bg-transparent border-none text-foreground focus:outline-none ml-2"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
        />
         <span className="w-2 h-4 bg-foreground cursor-blink" />
      </form>
      <div ref={endOfHistoryRef} />
    </div>
  );
}
