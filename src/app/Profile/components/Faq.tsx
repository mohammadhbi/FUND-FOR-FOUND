import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
export default function Faq() {
    // const[ask,setAsk]= useState({
    //     question:"",
    //     answer:"",
    // })
    const [isOpen,setIsOpen] = useState(false);
    return (
    <div className="relative mt-20 pt-20 flex flex-col justify-center items-center">
      <p>FAQ</p>
      <button onClick={()=> setIsOpen(true)} className="bg-gray-300 p-2.5 rounded-xl flex">
       <FaPlus />
        Add question
      </button>
      {isOpen &&(
         <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 flex flex-col md:flex-row gap-6 relative z-[10000]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            <div className="flex-1 space-y-4">
              <label className="text-black">Name</label>
              <input
                type="text"
                name="name"
                // value={form.name}
                // onChange={handleChange}
                placeholder="Name"
                className="border px-3 py-2 w-full rounded"
              />

              <label className="text-black">Role</label>
              <input
                type="text"
                name="role"
                // value={form.role}
                // onChange={handleChange}
                placeholder="Admin"
                className="border px-3 py-2 w-full rounded"
              />

              <label className="text-black">Email Address</label>
              <input
                type="email"
                name="email"
                // value={form.email}
                // onChange={handleChange}
                placeholder="Email@example.com"
                className="border px-3 py-2 w-full rounded"
              />

              <label className="text-black">Description</label>
              <textarea
                name="description"
                // value={form.description}
                // onChange={handleChange}
                placeholder="Short description"
                rows={3}
                className="border px-3 py-2 w-full rounded"
              />

              <button
               // onClick={handleSave}
                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>

            <div className="flex-1 p-4 border rounded space-y-2 bg-gray-50">
              <h3 className="text-[var(--color-primary)] font-bold text-center text-lg">
                {/* {form.name || "Preview Name"} */}
              </h3>
              <p className="text-sm text-gray-700 bg-gray-400 rounded-l-2xl rounded-r-2xl text-center">
                {/* {form.role || "Team member"} */}
              </p>
              <p className="text-sm text-gray-600">
                {/* {form.description || "No description yet..."} */}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
