"use client";

import { client } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
interface Brand {
  id: number;
  Brandname: string;
}

interface EditorContent {
  id: number;
  Title: string;
  content: any;
  brand_form: {
    id: number;
    Brandname: string;
  };
}

export default function ExploreList() {
  const {
    data: brands,
    isLoading: brandsLoading,
    error: brandsError,
  } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await client.get("/brand-forms");
      const result = res.data;
      if (Array.isArray(result)) return result;
      if (result.data && Array.isArray(result.data)) return result.data;
      throw new Error("Invalid brand data format");
    },
  });

  const {
    data: editorContents,
    isLoading: editorLoading,
    error: editorError,
  } = useQuery<EditorContent[]>({
    queryKey: ["editorContents"],
    queryFn: async () => {
      const res = await client.get("/editor-contents?populate=brand_form");
      const result = res.data;
      if (result?.data && Array.isArray(result.data)) {
        return result.data.map((item: any) => ({
          id: item.id,
          Title: item.Title,
          content: item.content,
          brand_form: item.brand_form,
        }));
      }
      throw new Error("Invalid editor content format");
    },
  });

  if (brandsLoading || editorLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-[var(--color-primary)] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderEditorContent = (blocks: any[]) => {
    const firstListBlock = blocks.find(
      (block) => block.type === "list" && Array.isArray(block.data?.items)
    );

    if (firstListBlock && firstListBlock.data.items.length > 0) {
      const firstItem = firstListBlock.data.items[0];
      return (
        <li className="text-sm list-none text-gray-600">{firstItem.content}</li>
      );
    }

    return null;
  };

  if (brandsError || editorError) {
    return (
      <div className="text-red-500 text-center py-4">
        Failed to fetch data. Please try again.
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return <div className="text-center py-4">No brands found.</div>;
  }

  return (
    <div className="mx-auto w-[90%] py-4">
      <h1 className="text-2xl text-[var(--color-primary)] text-center mb-4">
        Explore
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {brands.map((brand) => {
          const relatedContent = editorContents?.filter(
            (ec) => ec?.brand_form?.id === brand.id
          );

          return (
            <div
              key={brand.id}
              className="border border-[var(--color-primary)] p-4 rounded-lg shadow-md"
            >
              <Link href={`/profilebrand/${brand.Brandname}`}>
                <h2 className="text-[var(--color-primary)] font-semibold mb-2">
                  {brand.Brandname}
                </h2>
              </Link>

              {relatedContent?.map((content) => (
                <div key={content.id} className="mt-4">
                  <p className="pl-4 ">
                    {/* {renderEditorContent(content.content.blocks)} */}
                    {renderEditorContent(content.content.blocks)}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
