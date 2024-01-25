import { Button } from "./button";
import { useRouter } from "next/router";
export default function Menu() {
  const router = useRouter();
  return (
    <div className="bg-[#fad0b6] w-80 h-screen fixed flex flex-col justify-around mr-16">
      <Button
        onClick={() => {
          router.push("/whiteStock");
        }}
      >
        WHITE STOCK
      </Button>

      <Button
        onClick={() => {
          router.push("/cutStock");
        }}
      >
        CUT STOCK
      </Button>
      <Button
        onClick={() => {
          router.push("/dyeStock");
        }}
      >
        DYE STOCK
      </Button>
      <Button
        onClick={() => {
          router.push("/printStock");
        }}
      >
        PRINT STOCK
      </Button>
      <Button
        onClick={() => {
          router.push("/jobWork");
        }}
      >
        JOB STOCK
      </Button>
      <Button
        onClick={() => {
          router.push("/rollStock");
        }}
      >
        ROLL STOCK
      </Button>
    </div>
  );
}
