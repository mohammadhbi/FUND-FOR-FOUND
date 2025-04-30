"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import { toast } from "react-toastify";
import axios from "axios";

const EditorComponent = () => {
  const editorRef = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const [isSaved,setIsSaved]=useState(false);


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
              data: { text: "Short Summary" },
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
              data: { text: "The Impact" },
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
              data: { text: "The story" },
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
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSave = async () => {
    if (editorRef.current) {
      setLoading(true);
      setError(null);
      try {
        const savedData = await editorRef.current.save();
        setEditorData(savedData);
        console.log("saved data", savedData);

        const response = await axios.post(
          "https://my-strapi-project-lm3x.onrender.com/api/editor-contents",
          { data: {
            Title: "Brand story",
            content: savedData
          } }
        );
        console.log("server response:", response.data);
        if (response.status === 200 || response.status === 201) {
          toast.success("Data successfully saved to API");
          setIsSaved(true);
        } else {
          toast.error("Something went wrong while saving");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while saving data");
        // setError(err);
        // if (axios.isAxiosError(error)) {
        //   console.error("Server said:", error.response?.data);
        // }
        console.log(editorData,error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto border border-purple-300 rounded-xl shadow-sm p-4 space-y-4">
      <div
        id="editorjs"
        className="prose prose-sm max-h-72 overflow-y-auto p-3 border border-gray-200 rounded-md"
      />

      <div className="flex justify-end gap-2">
        <button
          disabled={loading}
          className="px-10 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          onClick={handleSave}
          disabled={loading || isSaved}
          className={`px-10 py-2 text-white rounded-md ${
             isSaved
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[var(--color-primary)] hover:bg-purple-700"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditorComponent;
