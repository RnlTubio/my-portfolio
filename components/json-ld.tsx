export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ronel Formarejo Tubio",
        alternateName: "Ronel Tubio",
        description: "Full Stack Developer passionate about building modern, efficient, and innovative web applications.",
        url: "https://ronel-tubio-portfolio.vercel.app/",
        image: "https://ronel-tubio-portfolio.vercel.app/assets/profile.jpg",
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
            "https://github.com/RnlTubio",
            "https://www.facebook.com/ronel.ftubio",
            "https://www.linkedin.com/in/ronel-tubio/"
        ],
        worksFor: {
            "@type": "Organization",
            name: "Brigada Group of Companies"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
