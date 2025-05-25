
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { client } from "@/lib/axios";

const EditorJS = dynamic(() => import("../components/EditorInstance"), {
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
  const [selectedItem, setSelectedItem] = useState<EditorContentItem | null>(
    null
  );
  const [editorData, setEditorData] = useState<EditorContent | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    const fetchSummery = async()=>{
      try {
         const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const res = await client.get(`/editor-contents?filters[users_permissions_user][id][$eq]=1&populate=*`,
          {headers:{
               Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          }}
        );
         const summery = res.data.data;
        console.log("userId:", userId);
        console.log("Full response:", res.data);
        console.log("Extracted data:", res.data.data);
        setEditorData(summery);
        const mapped :EditorContentItem[] = summery.map((item: any) => ({
        id: item.id,
        Title: item.attributes?.Title ?? item.Title,
        content: item.attributes?.content ?? item.content,
        users_permissions_user: item.attributes?.users_permissions_user?.data?.attributes ?? item.users_permissions_user,
      }));

      console.log("🧪 Mapped Contents:", mapped);
      setContents(mapped);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSummery();
  },[]);
  const handleEditClick = (item: EditorContentItem) => {
    setSelectedItem(item);
    setEditorData(item.content);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedItem) return;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    await client.put("/editor-contents", {
      data: {
        Title: selectedItem.Title,
        content: editorData,
        users_permission_user:userId,
      },
    },
    {
 headers: {
              Authorization: ` Bearer ${token}`,
            },
    });
    setShowModal(false);
  };

  return (
    <div>
  {loading && <p>Loading...</p>}
  {!loading && contents.length === 0 && <p>No content available.</p>}

  {contents.map((item) => (
    <div key={item.id} className="relative mb-8 p-4 mt-7 rounded">
      {/* <h2 className="text-xl font-bold mb-2">{item.Title}</h2> */}

      


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
                    {typeof li === "string" ? li : (li as any).content ?? "[item]"}
                  </li>
                ))}
              </ul>
            );
          }

      
          return (
            <p key={block.id} className="italic text-gray-400">
              Unsupported block type: {block.type}
            </p>
          );
        })}
      </div>

    <div className="absolute top-0 left-15 flex gap-5 pb-3 ">
      <p className="text-2xl">About </p>
      
      <div
        onClick={() => handleEditClick(item)}
        className="text-[var(--color-primary)]  px-2.5 py-0.5 bg-gray-300 rounded cursor-pointer"
      >
        Edit
      </div>
    </div>
    </div>
  ))}

 
  {showModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-8 relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Edit Content
        </h2>

        <div className="min-h-[300px] max-h-[60vh] overflow-y-auto">
          <EditorJS
            data={editorData}
            onChange={(data: any) => setEditorData(data)}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
