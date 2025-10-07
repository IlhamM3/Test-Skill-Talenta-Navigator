"use client";
import Lottie from "lottie-react";
import NotFoundLogo from "@/app/lottiefiles/NotFoundLogo"
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center md:p-0 p-5">
      <div className="flex flex-col items-center justify-center max-w-4xl bg-white shadow-md shadow-[#2563eb] border border-[#2563eb] rounded-xl p-3">
        <div className="text-black flex-grow flex justify-center items-center">
          <div className="w-full h-full relative md:-mt-16 ">
            <Lottie animationData={NotFoundLogo} loop autoplay />
          </div>
        </div>
        <div className="relative md:-mt-20">
          <button
            onClick={() => router.back()}
            className="rounded-lg py-1 px-2 bg-[#2563eb] hover:bg-[#2563eb]/70 border border-[#2563eb] text-white cursor-pointer text-sm"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}