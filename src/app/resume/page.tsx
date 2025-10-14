'use client';

import React, { useState } from 'react';
import { Download, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

const LatexResume = () => {
  const [isLoading, setIsLoading] = useState(false);

  const latexCode = `\\documentclass[11pt,a4paper]{article}

% Required packages
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{hyperref}
\\usepackage{fontawesome5}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{tabularx}
\\usepackage{datetime}

% Define colors
\\definecolor{primary}{RGB}{70, 130, 180} % SteelBlue
\\definecolor{textgray}{RGB}{42, 42, 42} % Dark Gray

% Page geometry
\\geometry{
    left=1.8cm,
    right=1.8cm,
    top=1.8cm,
    bottom=1.8cm
}

% Hyperlink setup
\\hypersetup{
    colorlinks=true,
    linkcolor=primary,
    filecolor=primary,
    urlcolor=primary,
}

% Custom section styling
\\titleformat{\\section}
    {\\Large\\bfseries\\color{textgray}}
    {}{0em}
    {}[\\vspace{-0.5em}\\rule{\\textwidth}{1.5pt}\\vspace{0.2em}]

% Header styling
\\newcommand{\\headername}[1]{{\\Huge\\bfseries\\color{textgray} #1}}
\\newcommand{\\headerrole}[1]{{\\Large\\color{primary} #1}}

% Spacing commands
\\newcommand{\\sectionspace}{\\vspace{0.8em}}
\\newcommand{\\itemspace}{\\vspace{0.3em}}

% Start document
\\begin{document}

% Header
\\begin{center}
    \\headername{MOHAN KILARI}\\\\[0.3em]
    \\headerrole{Embedded Systems & IoT Developer}
\\end{center}

% Contact Information
\\begin{center}
\\small
\\begin{tabular}{l c l}
    \\faPhone\\ +91 8121988257 & \\quad\\quad &
    \\faEnvelope\\ \\href{mailto:kilarimohansai@gmail.com}{kilarimohansai@gmail.com} \\\\
    \\faLinkedin\\ \\href{https://www.linkedin.com/in/mohan-kilari-207a131a2/}{linkedin.com/in/mohan-kilari} & \\quad\\quad &
    \\faGithub\\ \\href{https://github.com/Mohan-gtihub/}{github.com/Mohan-gtihub}
\\end{tabular}
\\end{center}

\\sectionspace

% Professional Summary
\\section*{Professional Summary}
I am an Embedded Systems and IoT Developer with a background in full-stack and Shopify development. I started my career in web development and later transitioned into embedded systems after discovering my interest in hardware programming, microcontrollers, and real-world problem solving through electronics. I now work across hardware + firmware + cloud + web, building complete technology solutions.

\\sectionspace

% Technical Proficiencies
\\section*{Technical Proficiencies}
\\begin{description}[style=nextline,leftmargin=0em,itemsep=0.2em]
    \\item[Embedded \\& Linux:] C/C++, Linux Internals, ESP8266, Arduino, Raspberry Pi, LPC2148 ARM7, RT-Linux, I2C, SPI, UART, GPIO, PWM, Keil uVision, Proteus.
    \\item[Software \\& Web:] JavaScript, PHP, Python, Node.js, Laravel, React, Next.js, HTML, CSS, MySQL, MongoDB, Firebase, Git, GitHub.
    \\item[E-commerce \\& Cloud:] Shopify Development, WooCommerce, ThingSpeak, MQTT, AWS, Vercel, Netlify.
\\end{description}

\\sectionspace

% Academic Credentials
\\section*{Academic Credentials}
\\textbf{Bachelor of Technology in Electronics \\& Communications}\\\\
Chaitanya Engineering College | Graduated: 2022

\\sectionspace

% Professional Experience
\\section*{Professional Experience}
\\textbf{Frontend Developer} \\hfill Jan 2024 - Present\\\\
Messold Technologies
\\begin{itemize}[leftmargin=1em,itemsep=0.1em]
    \\item Engineered frontend solutions for 20+ Shopify websites.
    \\item Implemented performance optimization strategies.
\\end{itemize}

\\itemspace

\\textbf{Frontend Developer} \\hfill Jan 2022 - Jan 2024\\\\
Black Vision Pvt Ltd.
\\begin{itemize}[leftmargin=1em,itemsep=0.1em]
    \\item Led Shopify platform migration and optimization for key clients.
    \\item Developed custom e-commerce solutions and mentored junior developers.
\\end{itemize}

\\sectionspace

% Notable Projects
\\section*{Notable Projects}
\\textbf{Embedded Systems}
\\begin{itemize}[leftmargin=1em,itemsep=0.1em]
    \\item \\textbf{Handheld Gaming Console:} Built a mini console with an Arduino, incorporating button controls and OLED graphics.
    \\item \\textbf{Smart Ultrasonic Distance Monitor:} An IoT-based distance tracker with live cloud data visualization on ThingSpeak.
    \\item \\textbf{RFID Smart Lock System:} Designed a security system using RFID authentication with an RC522 module and Arduino.
\\end{itemize}

\\itemspace

\\textbf{Web Development}
\\begin{itemize}[leftmargin=1em,itemsep=0.1em]
    \\item \\textbf{Intoobox.com Migration:} Migrated a large Laravel e-commerce site to Shopify, improving performance by 40\\%.
    \\item \\textbf{E-commerce Solutions:} Developed and maintained multiple Shopify stores including KapdaTailor.com, IndySutra.com, and PowerSutra.com.
\\enditemize}

\\end{document}
`;

  const downloadPDF = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://texlive.net/cgi-bin/latexcgi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `formula=${encodeURIComponent(latexCode)}&return=pdf`,
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mohan-kilari-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. You can still download the LaTeX file and compile it on Overleaf.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadLatex = () => {
    const element = document.createElement('a');
    const file = new Blob([latexCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'mohan-kilari-resume.tex';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
             <div className="flex justify-between items-start mb-4">
                <div>
                    <CardTitle className="text-2xl font-bold">LaTeX Resume</CardTitle>
                    <CardDescription>A professional resume generated from LaTeX code.</CardDescription>
                </div>
                 <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                      <ArrowLeft />
                    </Link>
                </Button>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={downloadPDF}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                Download PDF
              </Button>
              <Button
                onClick={downloadLatex}
                variant="outline"
              >
                <Download size={16} />
                Download .tex
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-lg border">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap font-code">
                {latexCode}
              </pre>
            </div>
            <div className="mt-6 text-muted-foreground">
              <h2 className="text-lg font-semibold text-foreground mb-2">How to Use:</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Click "Download PDF" to get the compiled resume directly.</li>
                <li>
                  Alternatively, download the LaTeX source (`.tex`) file and compile it yourself using an online editor like{' '}
                  <a href="https://www.overleaf.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Overleaf
                  </a> or a local LaTeX installation.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LatexResume;
