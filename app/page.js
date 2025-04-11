"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gray-950 text-white px-4 py-10 sm:px-8 md:px-12 lg:px-24 xl:px-32 flex flex-col justify-center items-center text-center gap-20">
      {/* Hero Section */}
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
          Ace Your <span className="text-neon-blue">Interview</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Prepare with AI-powered mock interviews, track your progress, and
          climb the leaderboard! Our platform offers real-time feedback and
          customized challenges tailored to your job role.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push("/contest")}
                className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                Join Contest
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/sign-in")}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-yellow-600"
            >
              Login to Start
            </button>
          )}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        {[
          {
            title: "Real-time Feedback",
            desc: "Get AI-generated insights on your answers with clarity and actionable suggestions.",
          },
          {
            title: "Track Progress",
            desc: "Monitor your performance over time and improve with detailed analytics.",
          },
          {
            title: "Leaderboard Challenge",
            desc: "Compete with others and secure your place on the leaderboard.",
          },
        ].map(({ title, desc }) => (
          <div
            key={title}
            className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-neon-blue transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-neon-blue mb-3">{title}</h3>
            <p className="text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
