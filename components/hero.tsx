import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Hero() {
  return (
    <div className="h-screen w-full relative min-h-screen">
      {/* <ImagePrefetcher /> */}
      <div className="absolute inset-0 z-0 bg-black" />
      
      {/* Content */}
      <div className="relative z-10">
        <BackgroundPaths  />
      </div>
    </div>
  );
}
