export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          🎶 Music Lesson Registration
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

