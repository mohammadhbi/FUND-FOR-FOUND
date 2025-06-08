"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { client } from "@/lib/axios";


const EditorJS = dynamic(() => import("./EditorInstanceP"), {
  ssr: false,
});

interface EditorBlock {
  id: string;
  type: string;
  data: {
    text?: string;
    items?: string[] | { content: string }[];
    [key: string]: any;
  };
}

interface EditorContent {
  time: number;
  blocks: EditorBlock[];
  version: string;
}

interface EditorContentItem {
  id: number;
  Title: string;
  content: EditorContent;
  users_permissions_user?: {
    id: number;
    username: string;
    email: string;
  };
}

export default function Summary() {
  const [contents, setContents] = useState<EditorContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  




  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const res = await client.get(
          `/editor-contents?filters[users_permissions_user][id][$eq]=${userId}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const summary = res.data.data;
        const mapped: EditorContentItem[] = summary.map((item: any) => ({
          id: item.id,
          Title: item.attributes?.Title ?? item.Title,
          content: item.attributes?.content ?? item.content,
          users_permissions_user:
            item.attributes?.users_permissions_user?.data?.attributes ??
            item.users_permissions_user,
        }));
        setContents(mapped);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSummary();
  }, []);

  

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && contents.length === 0 && <p>No content available.</p>}

      {contents.map((item) => (
        <div key={item.id} className="relative mb-8 p-4 mt-7 rounded">
          <div className="text-sm bg-gray-100 p-2 rounded overflow-auto space-y-2 mt-8 mx-auto">
            {item.content?.blocks?.map((block: any) => {
              if (block.type === "paragraph") {
                return <p key={block.id}>{block.data.text}</p>;
              }
              if (block.type === "list") {
                return (
                  <ul key={block.id} className="list-disc ml-5">
                    {block.data.items.map((li: string, i: number) => (
                      <li key={i}>
                        {typeof li === "string"
                          ? li
                          : li.content ?? "[item]"}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "header") {
                return (
                  <h3 key={block.id} className="text-lg font-semibold">
                    {block.data.text}
                  </h3>
                );
              }
              return (
                <p key={block.id} className="italic text-gray-400">
                  Unsupported block type: {block.type}
                </p>
              );
            })}
          </div>

          <div className="absolute top-0 left-15 flex gap-3 pb-3">
            <p className="text-xl">About</p>
            {/* <button
              onClick={() => handleEditClick(item)}
              className="text-xs bg-[var(--color-primary-75)] text-[var(--color-primary)] px-2 py-1.5 rounded shadow-sm hover:shadow-md transition flex "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit
            </button> */}
          </div>
        </div>
      ))}

      {/* {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white max-w-xl w-full mx-auto rounded-xl shadow-lg border border-gray-200 p-5 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Edit Summary
            </h2>
            <div
              id="editorjs"
              className="min-h-[250px] max-h-[350px] overflow-y-auto border border-gray-200 rounded-md p-3"
            />
            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaved}
                className={`px-4 py-1 text-sm rounded text-white transition ${
                  isSaved
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[var(--color-primary)] hover:bg-purple-700"
                }`}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
