'use client';
import { contact } from '@/lib/data';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Get In Touch</h2>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-around items-center gap-8">
              <div className="flex flex-col gap-4">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-accent hover:underline">
                  <Mail />
                  <span>{contact.email}</span>
                </a>
                <div className="flex items-center gap-2">
                  <Phone />
                  <span>{contact.phone}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" asChild>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer">
                    <Github />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
