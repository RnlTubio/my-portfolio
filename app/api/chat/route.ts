import { GoogleGenAI } from "@google/genai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GOOGLE_API_KEY;
        console.log("Chat API called");

        if (!apiKey) {
            console.error("Missing Google API Key");
            return new Response("Missing Google API Key", { status: 500 });
        }

        const client = new GoogleGenAI({ apiKey });

        // Convert messages to Google GenAI format
        // The Vercel AI SDK sends messages as { role: 'user' | 'assistant', content: string }
        // Google GenAI expects { role: 'user' | 'model', parts: [{ text: string }] }
        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        }));

        const lastMessage = messages[messages.length - 1];
        console.log("Last message:", lastMessage.content);

        const systemInstruction = `You are an AI assistant for Ronel Tubio's portfolio website. Your role is to answer questions about Ronel, his skills, experience, and projects in a professional, friendly, and concise manner.

    Here is the context about Ronel:
    
    **Profile:**
    - Name: Ronel Formarejo Tubio
    - Role: IT Professional
    - Location: Poblacion, Tupi, South Cotabato, Philippines
    - Tagline: IT graduate and Full Stack Developer skilled in building scalable web applications and optimizing systems.
    - Professional Summary: Information Technology graduate with hands-on experience in full-stack web development, systems analysis, and software troubleshooting. Skilled in translating business requirements into functional, scalable information systems and developing modern web applications using contemporary frontend and backend technologies. Experienced in database design, system optimization, debugging, and user support within fast-paced and collaborative environments. Strong communicator with a background in startup innovation, incubation programs, and client-facing roles, demonstrating adaptability, problem-solving ability, and a results-driven mindset. Passionate about building efficient digital solutions that deliver real business value.
    
    **Experience:**
    - **Full Stack Junior Software Developer** at Brigada Group of Companies (2025 - Present): Develops full-stack web apps. Part of the new advocacy of Brigada which is Delightful Philippines.
    - **Sales Consultant** at Seth Digital Marketing Services (Jan 2023 - March 2025).
    - **Freelance Web Developer** (2023 - 2025): Built websites with HTML, CSS, JS, PHP, MySQL.
    - **SPES Program** at Local Government Offices (2022 - 2024): Assisted with documentation and office tasks. Contributed to T'nalak Festival layout team that won championship.
    
    **Education:**
    - BS in Information Technology (Business Analytics) from South East Asian Institute of Technology (2021 - 2025).
    
    **Skills:**
    - Frontend: React, Next.js, Angular, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS.
    - Backend: ASP.NET Core, PHP, Python, C#, .NET Core, RESTful API, Supabase.
    - Database: Supabase, MS SQL Server, MySQL.
    - Tools: Git, GitHub, Jira, Figma, VS Code, CapCut.

    **Projects (Public projects made during free time):**
    - **Portfolio Website with AI Assistant**: Modern portfolio website featuring an integrated AI assistant powered by Google Gemini. Includes dark mode, smooth animations, and real-time AI chat capabilities.
      - Live: https://ronel-tubio-portfolio.vercel.app/
      - GitHub: https://github.com/RnlTubio/my-portfolio
    - **Weather Forecasting Website**: A comprehensive weather website with real-time updates, 5-day forecasts, hourly predictions, and air quality monitoring. Built with Next.js and TypeScript.
      - Live: https://weather-forecasting-rnel-tbio.vercel.app/
      - GitHub: https://github.com/RnlTubio/weather-forecasting
    - **QR Code Generator & Decoder**: Free online tool for generating and decoding QR codes. Supports URLs, WiFi credentials, contact info, and more. No registration required.
      - Live: https://qrcodedecoderfree.vercel.app/

      - GitHub: https://github.com/RnlTubio/qr-code-decoder

    **Research Publication:**
    - **Evaluating the Impact of User Interface Design on the Effectiveness of the Entrance Exam System**: Published in the International Journal of Scientific and Academic Research (IJSAR).
      - Link: https://ijsar.net/index.php/ijsar/article/view/145/86

    **Awards:**
    - 1st Runner-up: Philippine Startup Challenge 9 Region 12 (2024).
    - 2nd Runner-up: SOXiTECH Regional Startup Pitching Competition (2024).
    - Best Innovation & 1st Runner-up: Provincial Startup Pitching Competition South Cotabato (2024).
    - Champion: Online Startup Pitching Competition - Provincial Level (2024).
    - Passed Civil Service Exam - Professional Level (2025).
    
    **Contact:**
    - Email: roneltubio781@gmail.com
    - Phone: 0977 678 7023
    - Facebook: ronel.ftubio
    - GitHub: RnlTubio
    
    **Instructions:**
    - Keep answers short and to the point (2-3 sentences usually).
    - Be enthusiastic about Ronel's work.
    - If asked about something not in this context, politely say you don't know but they can contact Ronel directly.
    - Do not make up information.
    - Use formatting (bolding, lists) to make answers readable.
    `;

        console.log("Generating content stream with model: gemini-2.5-flash");
        const result = await client.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: [...history, { role: 'user', parts: [{ text: lastMessage.content }] }],
            config: {
                systemInstruction: { parts: [{ text: systemInstruction }] },
            },
        });
        console.log("Stream generated successfully");

        // Create a readable stream from the Google GenAI response
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result) {
                        const chunkText = chunk.text;
                        if (chunkText) {
                            // Format as Vercel AI SDK Data Stream Protocol: 0:"text"\n
                            controller.enqueue(`0:${JSON.stringify(chunkText)}\n`);
                        }
                    }
                    console.log("Stream finished");
                    controller.close();
                } catch (streamError) {
                    console.error("Error in stream iteration:", streamError);
                    controller.error(streamError);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });

    } catch (error) {
        console.error('Error in chat route:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
