// app/page.tsx
'use client';
import React from "react";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 shadow-md bg-black text-white">
        <div className="text-xl font-bold">Safe Space</div>
        <div className="space-x-6">
          <a href="#landing" className="hover:underline">Home</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#about" className="hover:underline">About</a>
        </div>
        {/* <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
          Log In
        </button> */}
        <div className="flex space-x-2">
          <a href="/api/auth/login?returnTo=/chatBot" className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
            Log In
          </a>
          {/* <a href="/api/auth/logout" className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
            Log Out
          </a> */}
        </div>
      </nav>

      {/* Landing Section */}
      <section id="landing" className="h-screen flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Safe Space</h1>
        <p className="text-lg text-gray-700 max-w-xl">
          An online space for women by women to find support and resources.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="h-screen flex flex-col justify-center items-center text-center p-10 bg-gray-100">
        <h2 className="text-4xl font-semibold mb-4">Features</h2>
        <p className="text-lg text-gray-700 max-w-xl">
          Our app provides various features to ensure women can find support and resources when they are in unsafe or uncomfortable situations, 
          with a chat-bot focused on providing calm, quick consise responses to help to women who are expressing need in a time of crisis, a map personilized to find women focused resources, 
          and a abundant list of resources for any crisis situation.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-semibold mb-4">Why We Created Safe Space</h2>
        <p className="text-lg text-gray-700 max-w-xl">
        An average of 24 people per minute are victims of rape, physical violence or stalking by an intimate partner in the United States — 
        more than 12 million women and men over the course of a single year. Our app is designed with the hopes of helping women or really anyone in crisis locate resources, 
        find a community, and feel seen and safe.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
