import { useRouter } from "next/router";
import { Button } from "./button";
export default function Nav() {
  const router = useRouter();
  return (
    <div className="flex justify-around mt-4 mb-12">
      <Button
        onClick={() => {
          router.push("/whiteStock");
        }}
        className="bg-[#f5bd9a] hover:bg-[#fad0b6] text-black rounded-full"
      >
        White Stock
      </Button>
      <Button
        onClick={() => {
          router.push("/cutStock");
        }}
        className="bg-[#f5bd9a] hover:bg-[#fad0b6] text-black rounded-full"
      >
        Cut Stock
      </Button>
      <Button className="bg-[#f5bd9a] hover:bg-[#fad0b6] text-black rounded-full">
        Dye Stock
      </Button>
      <Button className="bg-[#f5bd9a] hover:bg-[#fad0b6] text-black rounded-full">
        Roll Stock
      </Button>
    </div>
  );
}
