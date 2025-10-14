'use client';

import React, { useState, useRef, useEffect } from 'react';
import { about, skills, projects, contact, banner } from '@/lib/data';
import { useTheme } from 'next-themes';

const themes = ['dark', 'matrix', 'dracula', 'solarized-dark'];

const Typewriter = ({ text, onComplete }: { text: React.ReactNode, onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node) && node.props.children) {
      return React.Children.toArray(node.props.children).map(getTextContent).join('');
    }
    return '';
  };
  
  const textContent = typeof text === 'string' ? text : getTextContent(text);
  const isComplex = typeof text !== 'string';
  const typingDelay = 5;

  useEffect(() => {
    if (isComplex) {
      // For complex elements (like with HTML), show immediately.
      if (React.isValidElement(text)) {
         setDisplayedText((text.props.dangerouslySetInnerHTML?.__html || ''));
      }
      onComplete();
      return;
    }

    // For simple strings, use typewriter effect.
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + textContent.charAt(i));
      i++;
      if (i >= textContent.length) {
        clearInterval(intervalId);
        onComplete();
      }
    }, typingDelay);

    return () => clearInterval(intervalId);
  }, [text, textContent, onComplete, isComplex]);
  
  if (isComplex) {
    return <div dangerouslySetInnerHTML={{ __html: displayedText }} />;
  }
  
  return <pre className="whitespace-pre-wrap">{displayedText}</pre>;
};


const commands: { [key: string]: (args?: string[]) => React.ReactNode } = {
  help: () => (
    <pre className="whitespace-pre-wrap">
      {'Available commands:\n\n'}
      {'help'.padEnd(15)}Show this help message{'\n'}
      {'about'.padEnd(15)}Display my professional summary{'\n'}
      {'skills'.padEnd(15)}List my technical skills{'\n'}
      {'projects'.padEnd(15)}Showcase my projects{'\n'}
      {'contact'.padEnd(15)}Display my contact information{'\n'}
      {'theme'.padEnd(15)}Change the terminal theme{'\n'}
      {'banner'.padEnd(15)}Display the welcome banner{'\n'}
      {'date'.padEnd(15)}Show the current date{'\n'}
      {'whoami'.padEnd(15)}Display current user{'\n'}
      {'clear'.padEnd(15)}Clear the terminal screen
    </pre>
  ),
  about: () => about,
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
  Email:    <a href="mailto:${contact.email}" class="text-accent hover:underline">${contact.email}</a>
  Phone:    ${contact.phone}
  LinkedIn: <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">${contact.linkedin.replace('https://www.','')}</a>
  GitHub:   <a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">${contact.github.replace('https://','')}</a>
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
  banner: () => banner,
};

const WelcomeMessage = () => (
    <>
        <pre className="whitespace-pre-wrap font-code text-primary">{banner}</pre>
        <div>Welcome to my interactive portfolio.</div>
        <div className="h-2" />
        <div>Type 'help' to see a list of available commands.</div>
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
              if (newIndex >= 0) {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
              }
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
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const matchingCommands = Object.keys(commands).filter(c => c.startsWith(input));
        if (matchingCommands.length === 1) {
            setInput(matchingCommands[0]);
        }
      }
  };

  const processOutput = (output: React.ReactNode): React.ReactNode => {
    if (typeof output === 'string' && output.includes('<a')) {
        return <div dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, '<br />') }} />;
    }
     if (typeof output === 'string') {
      return <pre className="whitespace-pre-wrap">{output}</pre>;
    }
    return output;
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
          setInput('');
          return;
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
    
    const processedOutput = processOutput(output);
    
    const newHistoryEntry = { 
        command: input, 
        output: <Typewriter text={processedOutput} onComplete={() => setIsTyping(false)} /> 
    };

    if (output) {
        setIsTyping(true);
        setHistory(prev => [...prev, { command: input, output: <Typewriter text={processedOutput} onComplete={() => setIsTyping(false)} /> }]);
    } else {
        setHistory(prev => [...prev, { command: input, output: '' }]);
    }

    setInput('');
  };

  return (
    <div className="w-full max-w-4xl h-[90vh] shadow-2xl rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 flex flex-col">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-t-lg p-2 flex items-center">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-sm text-gray-400 font-code">
                Mohan Kilari - Portfolio
            </div>
        </div>
        <div
        className="flex-1 p-4 font-code text-sm overflow-y-auto"
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
    </div>
  );
}
