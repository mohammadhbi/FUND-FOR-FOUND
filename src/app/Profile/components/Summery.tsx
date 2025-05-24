// "use client";
// import { client } from "@/lib/axios";
// import { useEffect, useState } from "react";

// interface EditorContent {
//   id: number;
//   documentId: string;
//   Title: string;
//   content: any;
// }
// const EditorJS = dynamic(() => import("@/components/EditorInstance"), {
//   ssr: false,
// });

// export default function Summary() {
//   const [contents, setContents] = useState<EditorContent[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selecetedItem, setSelecetedItem] = useState<EditorContentItem | null>(
//     null
//   );
//   const [editorData, setEditorData] = useState<any>(null);
//   const [showModal, setShowModal] = useState(false);

// useEffect(()=>{
//     const fetchData = async()=>({

//     })
// })

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const renderContentText = (content: any) => {
//     if (!content || !content.blocks) return null;

//     return content.blocks.map((block: any) => {
//       if (block.type === "paragraph") {
//         return <p key={block.id}>{block.data.text}</p>;
//       }
//       if (block.type === "list") {
//         return (
//           <ul key={block.id}>
//             {block.data.items.map((item: any, index: number) => (
//               <li key={index}>{item.content}</li>
//             ))}
//           </ul>
//         );
//       }

//       return null;
//     });
//   };

//   return (
//     <div className="mt-5 w-[90%] mx-auto ">
//       <div className="absolute mt-4.5 ml-25 text-[var(--color-primary)] px-2.5 py-0.5 bg-gray-300 rounded">
//         Edit
//       </div>
//       {contents.map((item) => (
//         <div key={item.id} className="mb-8 p-4 flex flex-col">
//           <h2 className="text-xl font-bold mb-2">About</h2>
//           <div className="text-sm bg-gray-100 p-2 rounded overflow-auto">
//             {renderContentText(item.content)}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { client } from "@/lib/axios";

const EditorJS = dynamic(() => import("../components/EditorInstance"), {
  ssr: false,
});

interface EditorContentItem {
  id: number;
  Title: string;
  content: any;
}

export default function Summary() {
  const [contents, setContents] = useState<EditorContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EditorContentItem | null>(
    null
  );
  const [editorData, setEditorData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await client.get("/editor-contents");
      const raw = res.data.data;

      const mapped = raw.map((item: any) => ({
        id: item.id,
        Title: item.Title ?? item.attributes?.Title,
        content: item.content ?? item.attributes?.content,
      }));

      setContents(mapped);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEditClick = (item: EditorContentItem) => {
    setSelectedItem(item);
    setEditorData(item.content);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedItem) return;
    await client.put("/editor-contents", {
      data: {
        Title: selectedItem.Title,
        content: editorData,
      },
    });
    setShowModal(false);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {contents.map((item) => (
        <div key={item.id} className="relative mb-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">{item.Title}</h2>

          <div className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {item.content?.blocks?.map((block: any) => {
              if (block.type === "paragraph")
                return <p key={block.id}>{block.data.text}</p>;
              if (block.type === "list")
                return (
                  <ul key={block.id}>
                    {block.data.items.map((li: any, i: number) => (
                      <li key={i}>{li.content}</li>
                    ))}
                  </ul>
                );
              return null;
            })}
          </div>

          <div
            onClick={() => handleEditClick(item)}
            className="absolute mt-4.5 ml-25 text-[var(--color-primary)] px-2.5 py-0.5 bg-gray-300 rounded cursor-pointer"
          >
            Edit
          </div>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-8 relative">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
              Edit Content
            </h2>

            {/* EditorJS Instance */}
            <div className="min-h-[300px] max-h-[60vh] overflow-y-auto">
              <EditorJS
                data={editorData}
                onChange={(data: any) => setEditorData(data)}
              />
            </div>

            {/* Action Buttons */}
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
