import { Cpu, Database, Server, Code, GitBranch, PenTool, Globe, Smartphone, Lock, Bot, Package, Layers } from 'lucide-react';

export const skills = {
  "Embedded Systems": [
    { name: "Microcontrollers", level: 90, icon: Cpu, description: "ESP8266, Arduino, LPC2148, Raspberry Pi" },
    { name: "Programming", level: 95, icon: Code, description: "Embedded C, Python, C++" },
    { name: "Protocols", level: 85, icon: GitBranch, description: "I2C, SPI, UART, GPIO, PWM" },
    { name: "Firmware Tools", level: 80, icon: PenTool, description: "Keil uVision, Arduino IDE, VS Code" },
  ],
  "Software & Web": [
    { name: "Frontend", level: 90, icon: Code, description: "HTML, CSS, JS, React, Next.js" },
    { name: "Backend", level: 85, icon: Server, description: "Node.js, Laravel, PHP" },
    { name: "Databases", level: 80, icon: Database, description: "MySQL, MongoDB" },
    { name: "CMS/E-commerce", level: 90, icon: Package, description: "Shopify, WordPress, WooCommerce" },
  ],
  "IoT & Cloud": [
    { name: "IoT Platforms", level: 85, icon: Globe, description: "ThingSpeak, MQTT, Firebase" },
    { name: "Cloud", level: 70, icon: Layers, description: "AWS, Vercel, Netlify, Hostinger" },
    { name: "Version Control", level: 95, icon: GitBranch, description: "Git & GitHub" },
    { name: "Circuit Design", level: 75, icon: Cpu, description: "Proteus, Fritzing" },
  ]
};
