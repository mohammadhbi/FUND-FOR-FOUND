"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { client } from "@/lib/axios";
import axios from "axios";
const EditorComponent = () => {
  const editorRef = useRef<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  console.log(isEditorReady);

  useEffect(() => {
    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const List = (await import("@editorjs/list")).default;

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
                    "Introduce yourself, your team (if you have) and your background.",
                    "Briefly describe the long and short term goals of your brand and why it's important to you.",
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
                    "Share more about your brand and how contributions make a meaningful impact.",
                    "Explain why your brand matters to contributors and how it positively influences the world.",
                    "Showcase success stories and achievements if applicable.",
                    "Connect through authentic stories to build trust.",
                  ],
                },
              },
              {
                type: "paragraph",
                data: { text: "The Story" },
              },
              {
                type: "list",
                data: {
                  style: "unordered",
                  items: [
                    "Share the vision and journey behind your brand's creation.",
                  ],
                },
              },
            ],
          },
          onReady: () => {
            setIsEditorReady(true);
            console.log("Editor.js is ready!");
          },
        });
      }
    };

    initEditor();

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
    if (!editorRef.current) return;

    setLoading(true);
    try {
      const savedData = await editorRef.current.save();
      console.log("Saved data:", savedData);
      const token = localStorage.getItem("token");
      const Id = localStorage.getItem("brandId");
      const response = await client.post(
        "/editor-contents",
        {
          data: {
            Title: "Brand story",
            content: savedData,
            brand_form: [Id],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Data successfully saved to API");
        setIsSaved(true);
      } else {
        toast.error("Something went wrong while saving");
      }
    } catch (error) {
      console.error("❌ Error while saving:", error);
      if (axios.isAxiosError(error)) {
        console.log("❌ Response Data:", error.response?.data);
      }
      toast.error("An error occurred while saving");
    } finally {
      setLoading(false);
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
