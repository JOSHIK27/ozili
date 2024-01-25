import Print from "./components/ui/print";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";
export default function PrintStock({ fabric, dyeType, printType, workers }) {
  return (
    <div className="flex">
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
