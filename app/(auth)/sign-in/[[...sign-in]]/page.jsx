import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="relative min-h-screen bg-gray-950 text-white overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/assets/futuristic-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Centered Sign-In Component */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <h1
          className="text-5xl md:text-6xl font-extrabold text-neon-blue mb-8 text-center"
          style={{ textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff" }}
        >
          Welcome Back
        </h1>
        <SignIn />
      </div>
    </section>
  );
}
