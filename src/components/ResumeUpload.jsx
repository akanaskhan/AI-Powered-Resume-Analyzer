// ResumeUpload.jsx
import React, { useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Loader2, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Textarea } from "./card";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function analyzeWithGemini(text) {
  try {
    const prompt = `You are an expert resume analyzer. Return only  summary, strengths, weaknesses, and a score out of 100 based on job market relevance and all these in detail and also give feedback.\n\n${text}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return await response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "❌Please try again later.";
  }
}

function ResumeUpload({ setResumeText, setAiInsights }) {
  const fileInputRef = useRef();
  const [localText, setLocalText] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = async () => {
        const simulatedText = jobDescription;
        setResumeText(simulatedText);
        setLocalText(simulatedText);
        setFileUploaded(true);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleAnalyzeClick = async () => {
    if (!localText) return;
    setLoading(true);
    const insights = await analyzeWithGemini(localText);
    setAiInsights(insights);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-gray-800 mx-auto">
            Upload Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-xl cursor-pointer bg-gray-100 hover:bg-gray-200 border-gray-200 hover:border-purple-200 transition-all duration-300">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-medium">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PDF or DOCX (MAX. 10MB)</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          {fileUploaded && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              Selected: {fileName}
            </p>
          )}
        </CardContent>
      </Card>

      

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-gray-800">
            Job Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste the job description here..."
            className="min-h-[200px] border-gray-200 focus:border-purple-200 bg-white/60 placeholder:text-gray-400"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </CardContent>
      </Card>


      <div className="flex justify-center">
        <button
          onClick={handleAnalyzeClick}
          className="w-full  bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-3 text-white flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              Analyzing <Loader2 className="animate-spin mr-2 h-4 w-4" />
            </>
          ) : (
            "Start Analyzing"
          )}
        </button>
      </div>
    </div>
  );
}

export default ResumeUpload;
