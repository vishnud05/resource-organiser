import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 py-8 rounded-lg shadow-md mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-2 text-center flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Resource Organizer
        </h1>
        <p className="text-xl text-gray-200 text-center flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Organize your resources with ease and efficiency
        </p>
      </header>
      <Dashboard />
    </main>
  );
}
