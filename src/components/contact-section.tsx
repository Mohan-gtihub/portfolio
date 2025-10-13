"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Linkedin, Send, Mail, Phone } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="flex flex-col items-start space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Have a project in mind or just want to connect? Drop me a line.
        </p>
      </div>
      <Card>
        <div className="grid md:grid-cols-2">
            <CardContent className="p-6 md:p-8 border-b md:border-r md:border-b-0">
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell me about your project or inquiry..." className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </Button>
                    </form>
                </Form>
            </CardContent>
             <div className="p-6 md:p-8 flex flex-col justify-center items-start text-left">
                 <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl">Connect with Me</CardTitle>
                    <CardDescription>
                        Find me on other platforms or contact me directly.
                    </CardDescription>
                 </CardHeader>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <a href="https://github.com/Mohan-Kilari" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                    </a>
                     <a href="https://www.linkedin.com/in/mohan-kilari" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                    </a>
                    <a href="mailto:kilarimohansai@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="h-5 w-5" />
                        <span>kilarimohansai@gmail.com</span>
                    </a>
                     <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="h-5 w-5" />
                        <span>+91 8121988257</span>
                    </div>
                </div>
             </div>
        </div>
      </Card>
    </section>
  );
}
