import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <Navbar />
      {/* Background with gradient matching main site */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom, #000c1a, #001833)" }}
      ></div>

      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleColor="#1EAEDB"
          particleDensity={70}
          speed={0.5}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-9xl font-bold text-white mb-4 font-quantum quantum-glow">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-medium text-quantum-cyan mb-8 font-quantum">
          Page Not Found
        </h2>
        <p className="text-white/70 text-lg max-w-md mx-auto mb-8 font-tech">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-quantum-dark/50 hover:bg-quantum-blue/20 text-quantum-cyan font-medium transition-all duration-300 border border-quantum-blue/30 backdrop-blur-sm font-tech quantum-border"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
