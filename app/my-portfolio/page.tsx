"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Facebook,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  LineChart,
  GitBranch,
  FileText,
  Moon,
  Sun,
} from "lucide-react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(savedTheme);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const skills = {
    frontend: [
      "React",
      "Next.js",
      "Angular",
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "Bootstrap",
      "Tailwind CSS",
    ],
    backend: [
      "ASP.NET Core",
      "PHP",
      "Python",
      "Java",
      "C#",
      ".NET Core",
      "RESTful API",
      "Entity Framework Core",
      "JWT",
      "Multi-Tenant Architecture",
      "Supabase",
    ],
    database: [
      "Supabase",
      "Microsoft SQL Server",
      "MySQL",
      "Database Design",
      "Query Optimization",
      "EF Core Migrations",
    ],
    dataScience: ["Power BI", "R Programming", "Microsoft Excel"],
    tools: [
      "Git",
      "GitHub",
      "Jira",
      "Visual Studio",
      "VS Code",
      "Figma",
      "Canva",
      "Sourcetree",
    ],
  };

  const experience = [
    {
      title: "Full Stack Junior Software Developer",
      company: "Brigada Group of Companies",
      period: "2025 - Present",
      description:
        "Develop and maintain full-stack web applications using ASP.NET Core and Angular. Collaborate on user-friendly, responsive, and scalable solutions.",
    },
    {
      title: "Sales Consultant",
      company: "Seth Digital Marketing Services",
      period: "Jan 2023 - March 2025",
      description:
        "Promoted Converge ICT internet plans, engaged clients through various channels, and processed service requests.",
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2023 - 2025",
      description:
        "Built responsive websites using HTML, CSS, JavaScript, PHP, and MySQL. Assisted students with capstone projects including database design and system debugging.",
    },
    {
      title: "SPES Program",
      company: "Local Government Offices",
      period: "2022 - 2024",
      description:
        "Assisted with documentation and office tasks. Contributed to T'nalak Festival layout team that won championship.",
    },
  ];

  const awards = [
    {
      title: "1st Runner-up - Philippine Startup Challenge 9 Region 12",
      year: "2024",
      description: "Regional Level Pitching Competition",
    },
    {
      title:
        "2nd Runner-up - SOXiTECH Regional Startup Pitching Competition Region 12",
      year: "2024",
      description: "Venue: Sultan Kudarat State University",
    },
    {
      title:
        "Best Innovation & 1st Runner-up - Provincial Startup Pitching Competition South Cotabato",
      year: "2024",
      description: "Provincial Startup Pitching Competition",
    },
    {
      title:
        "Champion - Online Startup Pitching Competition - Provincial Level on South Cotabato",
      year: "2024",
      description: "Recognized for innovative project presentation",
    },
    {
      title: "Civil Service Exam - Professional Level",
      year: "2025",
      description: "Successfully passed",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300"
      style={{
        fontFamily:
          'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Ronel F. Tubio
            </h1>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-6">
                {["About", "Experience", "Skills", "Awards", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setActiveSection(item.toLowerCase())}
                      className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                        activeSection === item.toLowerCase()
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </nav>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              <img
                src="/assets/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Ronel F. Tubio
            </h2>
            <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
              Full Stack Web Developer
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Award-winning developer specializing in ASP.NET Core and Angular,
              with recognition in multiple startup competitions. Passionate
              about building scalable solutions and exploring AI automation.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => setActiveSection("contact")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get in Touch
            </Button>
            <Button
              variant="outline"
              className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setActiveSection("experience")}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              View Experience
            </Button>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <Tabs
          value={activeSection}
          onValueChange={setActiveSection}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-slate-100">
                  <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  I'm a Full Stack Developer with hands-on experience in ASP.NET
                  Zero (ASP.NET Core, ABP Framework) and Angular. My work has
                  been recognized in multiple startup competitions, including
                  winning 1st Runner-up at the Philippine Startup Challenge 9 on
                  Region 12 last 2024.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Currently, I'm learning AI automation and n8n to build
                  smarter, more efficient systems. I'm passionate about content
                  creation, technology, and continuous learning, always seeking
                  opportunities to enhance my skills and contribute to
                  innovation.
                </p>
                <div className="pt-4 border-t dark:border-slate-700">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 dark:text-slate-100">
                    <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Education
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg border dark:border-slate-800">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                      Bachelor of Science in Information Technology
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Specialized in Business Analytics
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      South East Asian Institute of Technology (2021 - 2025)
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t dark:border-slate-700">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 dark:text-slate-100">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Research Publication
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg border dark:border-slate-800">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Published in the International Journal of Scientific and
                      Academic Research (IJSAR):
                      <span className="font-medium">
                        {" "}
                        "Evaluating the Impact of User Interface Design on the
                        Effectiveness of the Entrance Exam System"
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="experience" className="space-y-4">
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-slate-100">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                          {job.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {job.company}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 whitespace-nowrap"
                      >
                        {job.period}
                      </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                    <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Frontend Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                    <Database className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    Backend Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                    <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Database Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.database.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                    <LineChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Data Science & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.dataScience.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm md:col-span-2 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                    <GitBranch className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    Tools & Collaboration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="awards" className="space-y-4">
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-slate-100">
                  <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  Awards & Recognition
                </CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Achievements in startup competitions and professional
                  certifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 p-4 rounded-lg border-l-4 border-yellow-500 dark:border-yellow-400"
                  >
                    <div className="flex items-start gap-3">
                      <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                          {award.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          {award.description}
                        </p>
                        <Badge className="mt-2 bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300 border-0">
                          {award.year}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contact" className="space-y-4">
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-slate-100">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Get in Touch
                </CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Feel free to reach out for collaborations or opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border dark:border-slate-800">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Email
                      </p>
                      <a
                        href="mailto:roneltubio781@gmail.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        roneltubio781@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border dark:border-slate-800">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Phone
                      </p>
                      <a
                        href="tel:09776787023"
                        className="text-green-600 dark:text-green-400 hover:underline font-medium"
                      >
                        0977 678 7023
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border dark:border-slate-800">
                    <Facebook className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Facebook
                      </p>
                      <a
                        href="https://www.facebook.com/ronel.ftubio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        ronel.ftubio
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border dark:border-slate-800">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Location
                      </p>
                      <p className="text-purple-600 dark:text-purple-400 font-medium">
                        Poblacion, Tupi, South Cotabato
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 border-t dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 dark:text-slate-500">
            © 2025 Ronel F. Tubio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
