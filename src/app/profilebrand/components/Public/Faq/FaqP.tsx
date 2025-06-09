import { client } from "@/lib/axios";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

interface Ask {
  question: string;
  answer: string;
  id: number;
}

export default function Faq() {
  const [faqs, setFaqs] = useState<Ask[]>([]);

  const [isShow, setIsShow] = useState(false);

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
    <div className="relative w-[100%] mt-20 pt-20 flex flex-col justify-center items-center">
      <p>FAQ</p>
      <div className="">
        <div className=" w-full gap-4 ">
          {faqs.map((faq) => {
            return (
              <div key={faq.id} className=" w-full">
                <div className="flex w-90 gap-4 rounded-sm justify-center p-3 ">
                  <div
                    className="flex justify-between border border-[var(--color-primary)] rounded-md w-full  mb-3.5 p-3"
                    onClick={() => setIsShow(!isShow)}
                  >
                    {faq.question}
                    {isShow ? <FaAngleUp /> : <FaAngleDown />}
                  </div>
                </div>

                {isShow && (
                  <div className="bg-gray-100 p-2.5 rounded-xl mb-2.5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
