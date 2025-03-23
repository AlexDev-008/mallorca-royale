import { useEffect } from "react";

export function AnimatedSection({ children }) {
    useEffect(() => {
        const elements = document.querySelectorAll(".fade-in");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }else{
                        entry.target.classList.remove("show");
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return <div className="fade-in">{children}</div>;
}
