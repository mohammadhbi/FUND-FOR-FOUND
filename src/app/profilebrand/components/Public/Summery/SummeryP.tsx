// "use client";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { client } from "@/lib/axios";


// const EditorJS = dynamic(() => import("../Summery/EditorInstanceP"), {
//   ssr: false,
// });

// interface EditorBlock {
//   id: string;
//   type: string;
//   data: {
//     text?: string;
//     items?: string[] | { content: string }[];
//     [key: string]: any;
//   };
// }

// interface EditorContent {
//   time: number;
//   blocks: EditorBlock[];
//   version: string;
// }

// interface EditorContentItem {
//   id: number;
//   Title: string;
//   content: EditorContent;
//   users_permissions_user?: {
//     id: number;
//     username: string;
//     email: string;
//   };
// }

// export default function Summary() {
//   const [contents, setContents] = useState<EditorContentItem[]>([]);
//   const [loading, setLoading] = useState(false);
  




//   // useEffect(() => {
//   //   const fetchSummary = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
       
//   //       const res = await client.get(
//   //         `/editor-contents?filters[brand-forms][id][$eq]=${brandId}&populate=*`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //             "Content-Type": "application/json",
//   //           },
//   //         }
//   //       );
//   //       const summary = res.data.data;
//   //       const mapped: EditorContentItem[] = summary.map((item: any) => ({
//   //         id: item.id,
//   //         Title: item.attributes?.Title ?? item.Title,
//   //         content: item.attributes?.content ?? item.content,
//   //         users_permissions_user:
//   //           item.attributes?.users_permissions_user?.data?.attributes ??
//   //           item.users_permissions_user,
//   //       }));
//   //       setContents(mapped);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };
//   //   fetchSummary();
//   // }, []);

  

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {!loading && contents.length === 0 && <p>No content available.</p>}

//       {contents.map((item) => (
//         <div key={item.id} className="relative mb-8 p-4 mt-7 rounded">
//           <div className="text-sm bg-gray-100 p-2 rounded overflow-auto space-y-2 mt-8 mx-auto">
//             {item.content?.blocks?.map((block: any) => {
//               if (block.type === "paragraph") {
//                 return <p key={block.id}>{block.data.text}</p>;
//               }
//               if (block.type === "list") {
//                 return (
//                   <ul key={block.id} className="list-disc ml-5">
//                     {block.data.items.map((li: string, i: number) => (
//                       <li key={i}>
//                         {typeof li === "string"
//                           ? li
//                           : li.content ?? "[item]"}
//                       </li>
//                     ))}
//                   </ul>
//                 );
//               }
//               if (block.type === "header") {
//                 return (
//                   <h3 key={block.id} className="text-lg font-semibold">
//                     {block.data.text}
//                   </h3>
//                 );
//               }
//               return (
//                 <p key={block.id} className="italic text-gray-400">
//                   Unsupported block type: {block.type}
//                 </p>
//               );
//             })}
//           </div>

//           <div className="absolute top-0 left-15 flex gap-3 pb-3">
//             <p className="text-xl">About</p>
            
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }