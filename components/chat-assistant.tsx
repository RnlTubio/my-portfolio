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

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            {/* Floating Action Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                size="icon"
                aria-label={isOpen ? "Close chat" : "Open chat assistant"}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageCircle className="h-6 w-6" />
                )}
            </Button>

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
                                            Ask me about his skills, experience, or how to contact
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
                                            {m.content}
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
