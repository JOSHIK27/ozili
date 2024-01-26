import Print from "./components/ui/print";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
export default function PrintStock({ fabric, dyeType, printType, workers }) {
  return (
    <div className="flex">
      <div className="h-12 bg-[#fad9c3] w-full fixed shadow-lg z-10 flex flex-row-reverse justify-between">
        <Button className="bg-[#f5a46e] hover:bg-[#f5a46e] text-black rounded-full">
          LOGIN
        </Button>
        <h1 className="pt-[6px] pl-4 font-semibold">VILLAGE PRINTS</h1>
      </div>
      <Menu />
      <Print
        fabric={fabric}
        dyeType={dyeType}
        printType={printType}
        workers={workers}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("fabric").select("fabric");
  const resp2 = await supabase.from("dyeType").select();
  const resp3 = await supabase.from("printTypeTbl").select();
  const resp4 = await supabase.from("printWorkers").select();
  return {
    props: {
      fabric: resp1.data,
      dyeType: resp2.data,
      printType: resp3.data,
      workers: resp4.data,
    },
  };
}
