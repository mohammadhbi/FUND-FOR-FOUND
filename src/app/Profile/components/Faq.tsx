import { client } from "@/lib/axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
interface Ask {
  question: string;
  answer: string;
  id: number;
}

export default function Faq() {
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });
  const [faqs, setFaqs] = useState<Ask[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const res = await client.post(
        "/faqs",
        {
          data: {
      ...form,
            users_permissions_user: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`✅ Question  added successfully`);
      setIsOpen(false);

      setFaqs(res.data.data);
      //await fetchFaq();
    } catch (error) {
      toast.error("❌ Failed to add Question");
      console.error(error);
      console.log(error);
    }
  };
  const fetchFaq = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await client.get(
        `/faqs?filters[users_permissions_user][id][$eq]=${userId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFaqs(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <div className="relative mt-20 pt-20 flex flex-col justify-center items-center">
      <p>FAQ</p>
      <div className="overflow-x-auto">
        <div className="flex gap-4 w-max">
          {faqs.map((faq) => {
            return (
              <div key={faq.id}>
                <div>{faq.question}</div>
                <div>{faq.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-300 p-2.5 rounded-xl flex"
      >
        <FaPlus />
        Add question
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 flex flex-col md:flex-row gap-6 relative z-[10000]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="flex-1 space-y-4">
              <label className="text-black">Question</label>
              <input
                type="text"
                name="question"
                value={form.question}
                onChange={handleChange}
                className="border px-3 py-2 w-full rounded"
              />

              <label className="text-black">Answer</label>
              <input
                type="text"
                name="answer"
                value={form.answer}
                onChange={handleChange}
                className="border px-3 py-2 w-full rounded"
              />

              <button
                onClick={handleSave}
                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-purple-700"
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
