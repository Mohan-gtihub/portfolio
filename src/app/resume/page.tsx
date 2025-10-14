'use client';

import React, { useState } from 'react';
import { Download, Loader2, ArrowLeft, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { about, skills, projects, contact } from '@/lib/data';

const LatexResumePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLatex, setShowLatex] = useState(false);

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
    \\faPhone\\ ${contact.phone} & \\quad\\quad &
    \\faEnvelope\\ \\href{mailto:${contact.email}}{${contact.email}} \\\\
    \\faLinkedin\\ \\href{${contact.linkedin}}{linkedin.com/in/mohan-kilari} & \\quad\\quad &
    \\faGithub\\ \\href{${contact.github}}{github.com/Mohan-gtihub}
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
\\end{itemize}

\\end{document}
`;

  const downloadPDF = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latexCode }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`PDF generation failed: ${errorText}`);
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
      alert('Failed to generate PDF. You can still download the LaTeX file.');
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
  
  const professionalExperience = [
      {
          role: "Frontend Developer",
          company: "Messold Technologies",
          period: "Jan 2024 - Present",
          points: [
              "Engineered frontend solutions for 20+ Shopify websites.",
              "Implemented performance optimization strategies."
          ]
      },
      {
          role: "Frontend Developer",
          company: "Black Vision Pvt Ltd.",
          period: "Jan 2022 - Jan 2024",
          points: [
              "Led Shopify platform migration and optimization for key clients.",
              "Developed custom e-commerce solutions and mentored junior developers."
          ]
      }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
           <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft />
              </Link>
            </Button>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowLatex(!showLatex)} size="icon" aria-label="Toggle LaTeX view">
                <Code />
            </Button>
            <Button onClick={downloadPDF} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : <Download />}
              Download PDF
            </Button>
            <Button onClick={downloadLatex} variant="secondary">
              <Download />
              Download .tex
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl p-4 md:p-8">
        {showLatex ? (
            <div className="bg-muted/30 p-4 rounded-lg border my-8">
                 <h2 className="text-xl font-bold mb-4">Raw LaTeX Code</h2>
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap font-code">
                    {latexCode}
                </pre>
            </div>
        ) : (
        <div className="bg-card p-8 md:p-12 rounded-lg shadow-2xl border border-border/50 my-8">
          {/* Header */}
          <header className="text-center border-b border-border pb-6 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">MOHAN KILARI</h1>
            <p className="text-xl md:text-2xl text-primary mt-2">Embedded Systems & IoT Developer</p>
          </header>

          {/* Contact */}
          <section className="text-center text-sm text-muted-foreground mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href={`tel:${contact.phone}`} className="hover:text-accent">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="hover:text-accent">{contact.email}</a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
          </section>

          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">Professional Summary</h2>
            <p className="text-foreground/90 leading-relaxed">{about.trim().replace(/\n/g, ' ')}</p>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">Technical Proficiencies</h2>
            {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="mb-4">
                    <h3 className="font-semibold text-lg text-accent mb-2">{category}</h3>
                    <p className="text-foreground/90">
                        {(skillList as {name: string}[]).map(skill => skill.name).join(', ')}.
                    </p>
                </div>
            ))}
          </section>

          {/* Experience */}
          <section className="mb-8">
              <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">Professional Experience</h2>
              {professionalExperience.map((job, index) => (
                  <div key={index} className="mb-6">
                      <div className="flex justify-between items-baseline">
                          <h3 className="text-lg font-semibold">{job.role}</h3>
                          <p className="text-sm text-muted-foreground">{job.period}</p>
                      </div>
                      <p className="text-md text-accent">{job.company}</p>
                      <ul className="list-disc list-inside mt-2 text-foreground/90 space-y-1">
                          {job.points.map((point, i) => <li key={i}>{point}</li>)}
                      </ul>
                  </div>
              ))}
          </section>
          
           {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">Academic Credentials</h2>
            <h3 className="text-lg font-semibold">Bachelor of Technology in Electronics & Communications</h3>
            <p className="text-md text-muted-foreground">Chaitanya Engineering College | Graduated: 2022</p>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-primary pb-2 mb-4">Notable Projects</h2>
            <div className="space-y-6">
              <div>
                  <h3 className="font-semibold text-lg text-accent mb-2">Embedded Systems</h3>
                  <ul className="list-disc list-inside space-y-2">
                      {projects.embedded.map((p, i) => (
                          <li key={i}><span className="font-semibold">{p.name}:</span> {p.description} <span className="text-xs text-muted-foreground">({p.tech})</span></li>
                      ))}
                  </ul>
              </div>
              <div>
                  <h3 className="font-semibold text-lg text-accent mb-2">Web Development</h3>
                  <ul className="list-disc list-inside space-y-2">
                      {projects.web.map((p, i) => (
                          <li key={i}><span className="font-semibold">{p.name}:</span> {p.description} <span className="text-xs text-muted-foreground">({p.tech})</span></li>
                      ))}
                  </ul>
              </div>
            </div>
          </section>
        </div>
        )}
      </main>
    </div>
  );
};

export default LatexResumePage;
