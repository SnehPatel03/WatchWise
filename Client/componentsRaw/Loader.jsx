import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1b1b1b]">
      <Loader2 className="h-10 w-10 animate-spin text-[#F5C518]" />
      <p className="mt-4 text-gray-300 text-sm">
        Finding movies just for you...
      </p>
    </div>
  );
}
