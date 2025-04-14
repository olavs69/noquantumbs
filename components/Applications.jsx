"use client";

import { useEffect, useRef } from "react";
import {
  Pill,
  Microscope,
  LineChart,
  ShieldCheck,
  Rocket,
  Building2,
} from "lucide-react";

const ApplicationCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`reveal active relative bg-quantum-darker/50 overflow-hidden rounded-lg p-6 quantum-border hover:bg-quantum-blue/10 transition-colors duration-300 group ${className}`}
    >
      {/* Background glow effect that appears on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-quantum-blue/0 via-quantum-cyan/10 to-quantum-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center rounded-md bg-quantum-blue/10 p-2 mb-4 group-hover:bg-quantum-blue/20 transition-colors duration-300">
          <Icon className="h-6 w-6 text-quantum-blue group-hover:text-quantum-cyan transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold font-quantum mb-3 text-white">
          {title}
        </h3>
        <p className="text-gray-300 font-tech">{description}</p>
      </div>
    </div>
  );
};

const Applications = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }

      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const applications = [
    {
      title: "Healthcare & Medicine",
      description:
        "Accelerate drug discovery, optimize treatment protocols, and simulate molecular interactions with quantum precision.",
      icon: Pill,
      image:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      delay: 100,
    },
    {
      title: "Finance & Trading",
      description:
        "Optimize investment portfolios, detect fraud patterns, and predict market movements with quantum machine learning.",
      icon: LineChart,
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      delay: 200,
      className: "lg:translate-y-8",
    },
    {
      title: "Scientific Research",
      description:
        "Model complex quantum systems, simulate chemical reactions, and discover new materials with unprecedented accuracy.",
      icon: Microscope,
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      delay: 300,
    },
    {
      title: "Cybersecurity",
      description:
        "Create unbreakable encryption, detect network vulnerabilities, and secure communication with quantum protocols.",
      icon: ShieldCheck,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      delay: 400,
    },
    {
      title: "Aerospace & Defense",
      description:
        "Optimize flight paths, enhance navigation systems, and improve target recognition with quantum sensing.",
      icon: Rocket,
      image:
        "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      delay: 500,
      className: "lg:translate-y-8",
    },
    {
      title: "Smart Cities",
      description:
        "Optimize energy distribution, traffic flow, and emergency response with quantum computing algorithms.",
      icon: Building2,
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      delay: 600,
    },
  ];

  return (
    <section
      id="applications"
      className="py-20 relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-quantum-blue/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-quantum-cyan/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-quantum-purple/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={sectionRef}
          className="text-center mb-16 reveal"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-quantum tracking-wider">
            Quantum{" "}
            <span className="quantum-glow text-quantum-cyan">Applications</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 font-tech">
            Explore how quantum computing is transforming industries and
            creating new possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`reveal ${app.className || ""}`}
              style={{ transitionDelay: `${app.delay}ms` }}
            >
              <div className="h-full overflow-hidden rounded-lg quantum-border bg-quantum-darker/50 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-quantum-darker to-transparent"></div>

                  {/* Purple accent on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-quantum-purple transition-all duration-500 group-hover:w-full"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-quantum-blue/20 to-quantum-purple/20 mr-3 transition-all duration-300 group-hover:from-quantum-blue/30 group-hover:to-quantum-purple/30">
                      <app.icon className="h-5 w-5 text-quantum-cyan" />
                    </div>
                    <h3 className="text-xl font-quantum font-bold text-quantum-cyan">
                      {app.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 font-tech">{app.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Applications;
