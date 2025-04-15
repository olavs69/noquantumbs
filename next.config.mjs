/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dunogj9on/**", // Allow any image from this Cloudinary account path
      },
      // You can add other allowed domains here
    ],
  },
  // Add other configurations here if they exist
  serverExternalPackages: ["@vscode/vscode-languagedetection"],
};

export default nextConfig;
