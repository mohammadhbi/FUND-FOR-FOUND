
export default function Team() {
  return (
    <div>
        <div className="w-64 h-96 border border-gray-300 rounded-md flex flex-col items-center bg-white shadow">
        <div className="w-full h-6 bg-[var(--color-primary)] rounded-t"></div>
        <div className="mt-16 text-gray-500 text-lg">Invite Team member</div>
        <button
          className="mt-4 w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-2xl hover:bg-purple-700"
         // onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>
    </div>
  )
}
