import { Button } from "./button";
import { useRouter } from "next/router";
export default function Menu() {
  const router = useRouter();
  return (
    <div className="fixed">
      <div className="bg-[#fad0b6] w-80 h-screen flex flex-col mr-16">
        <div className="mb-16"></div>
        <div className="flex justify-center my-8">
          <img
            width="36"
            height="36"
            src="https://img.icons8.com/fluency-systems-filled/48/cut-paper.png"
            alt="cut-paper"
          />
          <Button
            onClick={() => {
              router.push("/whiteStock");
            }}
          >
            WHITE STOCK
          </Button>
        </div>

        <div className="flex justify-center my-8">
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/ios/50/cut.png"
            alt="cut"
          />
          <Button
            onClick={() => {
              router.push("/cutStock");
            }}
          >
            CUT STOCK
          </Button>
        </div>
        <div className="flex justify-center my-8">
          <img
            width="30"
            height="15"
            src="https://img.icons8.com/ios/50/paint-bucket.png"
            alt="paint-bucket"
          />
          <Button
            onClick={() => {
              router.push("/dyeStock");
            }}
          >
            DYE STOCK
          </Button>
        </div>
        <div className="flex justify-center my-8">
          <img
            width="36"
            height="36"
            src="https://img.icons8.com/ios-filled/50/print.png"
            alt="print"
          />
          <Button
            onClick={() => {
              router.push("/printStock");
            }}
          >
            PRINT STOCK
          </Button>
        </div>
        <div className="flex justify-center my-8">
          <img
            width="36"
            height="36"
            src="https://img.icons8.com/ios-filled/50/lawyer.png"
            alt="lawyer"
          />
          <Button
            onClick={() => {
              router.push("/jobWork");
            }}
          >
            JOB STOCK
          </Button>
        </div>
        <div className="flex justify-center my-8">
          <img
            width="36"
            height="36"
            src="https://img.icons8.com/external-solid-pause-08/64/external-cleaning-spa-solid-pause-08.png"
            alt="external-cleaning-spa-solid-pause-08"
          />
          <Button
            onClick={() => {
              router.push("/rollStock");
            }}
          >
            ROLL STOCK
          </Button>
        </div>
      </div>
    </div>
  );
}
