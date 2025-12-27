"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setErrorMessage("");

        if (!formRef.current) return;

        // Rate Limiting Check (30 minutes)
        const lastSent = localStorage.getItem("lastContactSent");
        if (lastSent) {
            const timeDiff = Date.now() - parseInt(lastSent);
            if (timeDiff < 30 * 60 * 1000) {
                setStatus("error");
                setErrorMessage("Please wait 30 minutes before sending another message.");
                setLoading(false);
                return;
            }
        }

        // CAPTCHA Check
        if (!captchaToken) {
            setStatus("error");
            setErrorMessage("Please complete the CAPTCHA verification.");
            setLoading(false);
            return;
        }

        try {
            // Check if env vars are set
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error("EmailJS configuration is missing. Please check your environment variables.");
            }

            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );

            setStatus("success");
            localStorage.setItem("lastContactSent", Date.now().toString());
            formRef.current.reset();
            recaptchaRef.current?.reset();
            setCaptchaToken(null);
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-slate-100">
                    <Mail
                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                    />
                    Send a Message
                </CardTitle>
                <CardDescription className="dark:text-slate-400">
                    Have a project in mind or just want to say hi? Fill out the form below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {status === "success" ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Message Sent!</h3>
                        <p className="text-slate-600 dark:text-slate-300 max-w-xs">
                            Thank you for reaching out. I'll get back to you as soon as possible.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setStatus("idle")}
                            className="mt-4"
                        >
                            Send Another Message
                        </Button>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="user_name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Name
                                </label>
                                <Input
                                    id="user_name"
                                    name="user_name"
                                    placeholder="Your Name"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="user_email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Email
                                </label>
                                <Input
                                    id="user_email"
                                    name="user_email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Subject
                            </label>
                            <Input
                                id="subject"
                                name="subject"
                                placeholder="What is this regarding?"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Message
                            </label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Your message here..."
                                className="min-h-[150px]"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="flex justify-center">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                onChange={(token) => setCaptchaToken(token)}
                            />
                        </div>

                        {status === "error" && (
                            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md flex items-start gap-3 text-red-800 dark:text-red-300 text-sm">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
