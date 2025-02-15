import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className='w-full sm:max-w-[700px] bg-[white] rounded-lg flex flex-col items-center p-5 shadow-md'>
      <h1 className="text-4xl font-bold mb-4 text-center purpleText">Welcome to Marvee's simple Quiz App</h1>
      <p className="text-lg mb-8 max-sm:text-center">Test your knowledge with our fun and interactive quiz!</p>
      <Link href="/quiz">
        <button className="purpleBg text-white px-6 py-2 rounded-lg hover:opacity-85 transition">
          Start Quiz
        </button>
      </Link>
      </div>
    </div>
  );
}
