"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";

const EditorComponent = () => {
  const editorRef = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState(null);
console.log(editorData);
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          paragraph: Paragraph,
          list: List,
        },
        data: {
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Short Summary",
              },
            },
            {
              type: "list",
              data: {
                style: "unordered",
                items: [
                  "Introduce yourself, your team(if you have) and your background.",
                  "Briefly describe about the long term and short term goal of your brand and why it's important to you.",
                ],
              },
            },
            {
              type: "paragraph",
              data: {
                text: "The Impact",
              },
            },
            {
              type: "list",
              data: {
                style: "unordered",
                items: [
                  "Share more about your brand and highlight how contributions can make a meaningful impact",
                  "Explain why your brand is important to contributors and how it positively influences the world",
                  "Showcase your brand's proven success and past achievements, if applicable",
                  "Help people connect with your brand's mission and build trust by sharing authentic stories and experiences",
                ],
              },
            },
            {
              type: "paragraph",
              data: {
                text: "The story",
              },
            },
            {
              type: "list",
              data: {
                style: "unordered",
                items: [
                  "Share the vision of your organization and the journey that led to its establishment",
                ],
              },
            },
          ],
        },
        onReady: () => {
          console.log("Editor.js is ready!");
        },
      });
    }

    return () => {
        if (editorRef.current && typeof editorRef.current.destroy === "function") {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };      
  }, []);

  const handleSave = async () => {
    if (editorRef.current) {
        const savedData = await editorRef.current.save();
        setEditorData(savedData); 
        console.log("Saved data:", savedData);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto border border-purple-300 rounded-xl shadow-sm p-4 space-y-4">
  
      <div
        id="editorjs"
        className="prose prose-sm max-h-72 overflow-y-auto p-3 border border-gray-200 rounded-md"
      />

      <div className="flex justify-end gap-2">
        <button className="px-10 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
          Edit
        </button>
        <button
          onClick={handleSave}
          className="px-10 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-purple-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditorComponent;

