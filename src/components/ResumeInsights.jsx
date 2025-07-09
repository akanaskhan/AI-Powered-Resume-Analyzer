import React from "react";
import { Card } from "./card";
const extractScore = (text) => {
  const match = text.match(/(\d{1,3})\/100/);
  return match ? parseInt(match[1]) : null;
};

export const ResumeInsights = ({ insights }) => {
  const formatSection = (content) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("##")) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-6">
            {line.replace("##", "").trim()}
          </h2>
        );
      }
      if (line.match(/^\*\*\d+\./)) {
        return (
          <h3
            key={index}
            className="text-xl font-semibold text-gray-800 mt-8 mb-4"
          >
            {line.replace(/\*\*/g, "").trim()}
          </h3>
        );
      }
      if (line.trim().startsWith("*")) {
        if (line.includes("**")) {
          const [, ...rest] = line.split("**");
          const subheading = rest[0];
          const remainingText = rest.slice(1).join("");
          return (
            <div
              key={index}
              className="flex mb-4 ml-4 items-center justify-between"
            >
              <div className="w-4 mt-2">•</div>
              <div className="flex-1">
                <span className="font-semibold text-gray-800">
                  {subheading}{" "}
                </span>
                <span className="text-gray-600 font-light">
                  {remainingText.replace(/\*/g, "").trim()}
                </span>
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="flex mb-4 ml-4 items-center">
            <div className="w-4 mt-2">•</div>
            <div className="flex-1 text-gray-600 font-light">
              {line.slice(1).trim().replace(/\*/g, "")}
            </div>
          </div>
        );
      }
      if (line.trim()) {
        return (
          <p
            key={index}
            className="text-gray-600 font-light mb-4 leading-relaxed"
          >
            {line.replace(/\*/g, "")}
          </p>
        );
      }
      return <div key={index} className="h-2" />;
    });
  };

  const score = extractScore(insights);

  return (
    <Card className=" bg-white shadow-md p-4 m-0   h-[660px] overflow-y-scroll">
      <div>
        <div className="text-center text-2xl text-gray-800">
          AI Resume Insights
        </div>
      </div>
      <div>
        {formatSection ? (
          <>
            {score !== null && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Job Relevance Score
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner relative">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${score}%` }}
                  ></div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-black drop-shadow-sm">
                    {score}%
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1 font-semibold">
                  {score}/100
                </p>
              </div>
            )}
            {formatSection(insights)}
          </>
        ) : (
          <div className="flex justify-center items-center mx-auto">
            <p>Your resume insights appears here..</p>
          </div>
        )}
        
      </div>
    </Card>
  );
};
