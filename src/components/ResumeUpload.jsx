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
    const prompt = `You are an expert resume analyzer. Return summary, strengths, weaknesses, and a score out of 100 based on job market relevance. Be detailed.\n\n${text}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const output = response.candidates[0].content.parts[0].text;
    return output;
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
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      if (!jobDescription.trim()) {
        alert("Please enter the job description before uploading the resume.");
        return;
      }

      setFileName(file.name);
      setShowProgress(true);
      setProgress(0);
      setFileUploaded(false);

      // Simulate progress bar animation (3 seconds)
      let percent = 0;
      const progressInterval = setInterval(() => {
        percent += 2;
        setProgress(percent);
        if (percent >= 100) {
          clearInterval(progressInterval);
          setShowProgress(false);
          setFileUploaded(true);
        }
      }, 60);

      const reader = new FileReader();
      reader.onload = () => {
        const simulatedText = jobDescription;
        setResumeText(simulatedText);
        setLocalText(simulatedText);
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleAnalyzeClick = async () => {
    if (!localText) return;

    setLoading(true);
    try {
      const insights = await analyzeWithGemini(localText);
      setAiInsights(insights);
    } catch (error) {
      console.error("Analysis Error:", error);
      setAiInsights("❌ Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-gray-800 mx-auto ">
            {!fileUploaded ? "Upload Resume" : "Resume Uploaded"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!fileUploaded && (
            <div className="flex items-center justify-center w-full transition-all ease-out">
              <label className="flex flex-col items-center justify-center w-full h-40 border border-dashed rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-100 border-gray-200 hover:border-purple-200 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PDF (MAX. 10MB)</p>
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
          )}

          {showProgress && (
            <div className="mt-4 w-full">
              <div className="h-4 relative rounded-full overflow-hidden bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center text-gray-700 mt-1">{progress}%</p>
            </div>
          )}

          {fileUploaded && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              Selected: <span className="font-semibold text-gray-700">{fileName}</span>
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <button
          onClick={handleAnalyzeClick}
          className="w-3/5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-3 text-white flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Analyzing...
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
