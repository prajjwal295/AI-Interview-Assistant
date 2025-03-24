import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="relative lg:h-[91vh] bg-black text-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/assets/futuristic-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-8 lg:px-24 gap-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1
            className="text-6xl md:text-8xl font-extrabold text-neon-blue tracking-wide"
            style={{ textShadow: "0 0 5px cyan, 0 0 2px cyan" }}
          >
            Interview Help
          </h1>
          <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-xl">
            Experience the fusion of technology and imagination. Your journey
            into the digital frontier begins now.
          </p>
          <div className="mt-8 flex gap-6 justify-center lg:justify-start">
            <a
              href="#"
              className="bg-neon-blue px-8 py-4 rounded-lg text-xl font-semibold hover:bg-neon-green transition-all duration-300 shadow-lg shadow-neon-blue/50"
            >
              Begin Your Quest
            </a>
            <a
              href="#"
              className="border border-neon-blue px-8 py-4 rounded-lg text-xl font-semibold hover:bg-neon-blue transition-all duration-300 shadow-lg shadow-neon-blue/50"
            >
              Discover More
            </a>
          </div>
        </div>
        <SignIn />
      </div>
    </section>
  );
}
