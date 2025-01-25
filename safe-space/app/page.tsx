// app/page.tsx

import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 shadow-md bg-black text-white">
        <div className="text-xl font-bold">MyApp</div>
        <div className="space-x-6">
          <a href="#landing" className="hover:underline">Home</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#about" className="hover:underline">About</a>
        </div>
        <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200">
          Log In
        </button>
      </nav>

      {/* Landing Section */}
      <section id="landing" className="h-screen flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-lg text-gray-700 max-w-xl">
          This is a brief introduction to what our app does. Making your life easier, one step at a time.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="h-screen flex flex-col justify-center items-center text-center p-10 bg-gray-100">
        <h2 className="text-4xl font-semibold mb-4">Features</h2>
        <p className="text-lg text-gray-700 max-w-xl">
          Our app provides various features including automation, intelligent suggestions, and seamless integration.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-semibold mb-4">About MyApp</h2>
        <p className="text-lg text-gray-700 max-w-xl">
          MyApp is designed to help users manage tasks efficiently. We focus on simplicity and ease of use.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
