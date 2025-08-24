import NavBar from "./navbar";
import CTA from "./callToActions";
import { useRouter } from "next/router";

export default function Hero({ id }: { id?: string }) {
  const router = useRouter();
  return (
    <div id={id} className="w-full h-[990px] relative overflow-hidden">
      {/* Background Image */}
      <img
        src="/hero.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* NavBar at the top */}
      <div className="absolute top-0 left-0 w-full z-30 py-10">
        <NavBar />
      </div>
      {/* CTA centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <CTA onTryItClick={() => router.push('/signup')} />
      </div>
    </div>
  );
}