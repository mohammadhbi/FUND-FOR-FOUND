"use client";
import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";

interface Props {
  data: any;
  onChange: (data: any) => void;
}

export default function EditorInstance({ data, onChange }: Props) {
  const ref = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
  holder: "editorjs",
  data,
  onChange: async () => {
    const output = await editor.save();
    onChange(output);
  },
  tools: {
    paragraph: Paragraph,
    list: List,
    header: Header,
    image: {
      class: ImageTool,
      config: {
        uploader: {
          uploadByFile(file: File) {
            return new Promise((resolve) => {
              resolve({
                success: 1,
                file: {
                  url: URL.createObjectURL(file),
                },
              });
            });
          },
        },
      },
    },
    quote: Quote,
    code: Code,
  },
});


    ref.current = editor;

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch(() => {});
    };
  }, [data]);

  return <input id="editorjs" className="border p-2 rounded" />;
}
