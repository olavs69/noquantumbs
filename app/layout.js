import "./globals.css";

export const metadata = {
  title: "NoQuantumBS - Cutting Through Quantum Hype",
  description: "No BS Quantum Assessments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/logo.png"
          sizes="any"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
