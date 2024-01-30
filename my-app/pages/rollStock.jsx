import Rolling from "./components/ui/rollling";
import { supabase } from "@/db/supabase";
import Menu from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
export default function Roll({ fabric, printType, rollingWorkers }) {
  return (
    <div className="flex">
      <div className="h-12 bg-[#fad9c3] w-full fixed shadow-lg z-10 flex flex-row-reverse justify-between">
        <Button className="bg-[#f5a46e] hover:bg-[#f5a46e] text-black rounded-full">
          LOGIN
        </Button>
        <h1 className="pt-[6px] pl-4 font-semibold">VILLAGE PRINTS</h1>
      </div>
      <Menu />
      <Rolling
        fabric={fabric}
        printType={printType}
        rollingWorkers={rollingWorkers}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("fabric").select("fabric");
  const resp2 = await supabase.from("printTypeTbl").select();
  const resp3 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Roll");
  return {
    props: {
      fabric: resp1.data,
      printType: resp2.data,
      rollingWorkers: resp3.data,
    },
  };
}
