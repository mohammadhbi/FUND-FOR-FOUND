import Link from "next/link";

interface Item {
  id: number;
  documentId: string;
  podcast: string | null;
  hello: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ApiResponse {
  data: Item[] | null;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default async function TestPage() {
  const res = await fetch("http://localhost:1337/api/tests");
  const response = await res.json();
  console.log("API Response:", response);

  const { data }: ApiResponse = response;

  if (!data || !Array.isArray(data)) {
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Test Data</h1>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Test Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="mb-2">
            Podcast: {item.podcast || "No podcast"} - Created: {item.createdAt}
          </li>
        ))}
      </ul>
      <Link href="/auth/Login">Log in</Link>
    </div>
  );
}
