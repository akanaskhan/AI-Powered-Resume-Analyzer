import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import { ResumeInsights } from "./components/ResumeInsights";
import { Upload, Github, Linkedin, Mail, Globe } from 'lucide-react';


function App() {
  const [resumeText, setResumeText] = useState("");
  const [aiInsights, setAiInsights] = useState("Your Insights Apperars Here...");

  return (
    <div className="h-screen bg-gray-100  overflow-auto  lg:overflow-auto ">
      <div className=" p-8 px-8 lg:px-24">

      <h1 className="text-3xl font-bold text-center mb-6 font-sans">
        AI-Powered Resume Analyzer
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 space-x-1 space-y-3 xl:space-y-0  lg:space-x-10">
        <div className="w-full">
          
        <ResumeUpload
          setResumeText={setResumeText}
          setAiInsights={setAiInsights}
          />
          </div>
        <div className="p-0 m-0 w-full h-auto">{aiInsights && <ResumeInsights insights={aiInsights} />}</div>
      </div>

              </div>
       <footer className="mt-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg font-light text-gray-600">Connect with me</p>
            <div className="flex space-x-8">
              <a href="https://github.com/akanaskhan/AI-Powered-Resume-Analyzer" className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/muhammad-anas-khan786
              " target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:muhammadanaskhanak@gmail.com
              "
              className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://akanaskhan.vercel.app
              " target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                <Globe className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-gray-400 font-light">
              © {new Date().getFullYear()} Anas Khan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
