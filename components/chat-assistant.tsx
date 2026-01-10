"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const mobileMessages = [
    "Hi there! 👋",
    "I'm Ronel's AI 🤖",
    "Curious about him? ✨",
    "Let's chat! 💬",
    "Ask me about Ronel ✨",
];

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
        useChat({
            id: 'ronel-portfolio-chat',
            api: '/api/chat',
            onError: (error) => {
                console.error('Chat error:', error);
            },
            onFinish: (message) => {
                console.log('Message finished:', message);
            },
        });
    const scrollRef = useRef<HTMLDivElement>(null);

    // Mobile looping text state
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    // Persist chat open state
    useEffect(() => {
        const savedState = localStorage.getItem('chatIsOpen');
        if (savedState === 'true') {
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatIsOpen', isOpen.toString());
    }, [isOpen]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentMessageIndex((prev) => (prev + 1) % mobileMessages.length);
                setFade(true);
            }, 500); // Wait for fade out before changing text
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            {/* Floating Chat Button */}
            <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
                {/* Mobile Looping Text - Only visible when closed and on mobile */}
                {!isOpen && (
                    <div className={`sm:hidden bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        {mobileMessages[currentMessageIndex]}
                    </div>
                )}

                {!isOpen ? (
                    <div className="relative group">
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl sm:rounded-2xl rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 animate-pulse" />

                        {/* Message bubble container - responsive design */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative flex items-center gap-3 bg-white dark:bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105
                                       sm:rounded-2xl sm:px-4 sm:py-3
                                       rounded-full p-3"
                            aria-label="Open chat assistant"
                        >
                            <Avatar className="h-10 w-10 sm:ring-2 sm:ring-blue-500 sm:ring-offset-2 ring-2 ring-blue-500">
                                <AvatarImage src="/assets/profile.jpg" alt="Chat with Ronel" />
                                <AvatarFallback className="bg-blue-600">RT</AvatarFallback>
                            </Avatar>

                            {/* Text - hidden on mobile, shown on sm+ screens */}
                            <div className="hidden sm:flex flex-col items-start pr-1">
                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    Chat with me!
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Ask me about Ronel
                                </span>
                            </div>

                            {/* Icon - hidden on mobile, shown on sm+ screens */}
                            <MessageCircle className="hidden sm:block h-5 w-5 text-blue-600 dark:text-blue-400" />

                            {/* Notification badge for mobile */}
                            <div className="absolute -top-1 -right-1 sm:hidden">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            </div>
                        </button>
                    </div>
                ) : (
                    <Button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                        size="icon"
                        aria-label="Close chat"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                )}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-20 right-4 z-50 w-[350px] sm:w-[400px] h-[500px] shadow-xl flex flex-col border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <CardHeader className="p-4 border-b dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-t-xl">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/assets/profile.jpg" alt="AI Assistant" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-sm">Ronel's Assistant</p>
                                <p className="text-xs text-slate-500 font-normal">
                                    Ask me anything about Ronel!
                                </p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4" ref={scrollRef}>
                            <div className="space-y-4">
                                {messages.length === 0 && (
                                    <div className="text-center text-slate-500 text-sm mt-8 space-y-2">
                                        <Bot className="h-12 w-12 mx-auto opacity-20" />
                                        <p>Hi! I'm Ronel's AI assistant.</p>
                                        <p>
                                            Ask me about his skills, experience, projects, or how to contact
                                            him.
                                        </p>
                                    </div>
                                )}
                                {messages.map((m: { id: string; role: string; content: string }) => (
                                    <div
                                        key={m.id}
                                        className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                    >
                                        <Avatar className="h-8 w-8 mt-1">
                                            {m.role === "user" ? (
                                                <AvatarFallback>
                                                    <User className="h-4 w-4" />
                                                </AvatarFallback>
                                            ) : (
                                                <>
                                                    <AvatarImage src="/assets/profile.jpg" />
                                                    <AvatarFallback>AI</AvatarFallback>
                                                </>
                                            )}
                                        </Avatar>
                                        <div
                                            className={`rounded-lg p-3 text-sm max-w-[80%] ${m.role === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                                                }`}
                                        >
                                            {m.role === "user" ? (
                                                m.content
                                            ) : (
                                                <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                                                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                                                            li: ({ children }) => <li className="mb-1">{children}</li>,
                                                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                                            a: ({ children, href }) => (
                                                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                    {children}
                                                                </a>
                                                            ),
                                                        }}
                                                    >
                                                        {m.content}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <Avatar className="h-8 w-8 mt-1">
                                            <AvatarImage src="/assets/profile.jpg" />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-sm flex items-center gap-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                            <span
                                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.2s" }}
                                            />
                                            <span
                                                className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.4s" }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {error && (
                                    <div className="flex gap-3">
                                        <Avatar className="h-8 w-8 mt-1">
                                            <AvatarFallback className="bg-red-500">!</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
                                            {error.message.includes('429') || error.message.includes('Rate Limit')
                                                ? "⏰ The AI assistant is currently unavailable due to high usage. Please try again later or contact Ronel directly."
                                                : "Sorry, something went wrong. Please try again later."}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-950 rounded-b-xl">
                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full items-center gap-2"
                        >
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim()}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
