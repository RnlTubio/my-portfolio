export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ronel Formarejo Tubio",
        alternateName: "Ronel Tubio",
        description: "Full Stack Developer passionate about building modern, efficient, and innovative web applications.",
        url: "https://ronel-tubio-portfolio.vercel.app/my-portfolio",
        jobTitle: "Full Stack Developer",
        knowsAbout: [
            "Web Development",
            "Full Stack Development",
            "Next.js",
            "React",
            "API Development",
            "Frontend Development",
            "Backend Development",
            "Software Engineering",
            "PHP Development"
        ],
        sameAs: [
            // Add your social media profiles here
            // "https://github.com/yourusername",
            // "https://linkedin.com/in/yourusername",
            // "https://twitter.com/yourusername",
        ],
        worksFor: {
            "@type": "Organization",
            name: "Freelance Developer" // Update with your current employer if applicable
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
