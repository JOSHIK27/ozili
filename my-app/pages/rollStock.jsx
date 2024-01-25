import Rolling from "./components/ui/rollling";
import { supabase } from "@/db/supabase";
import Menu from "@/components/ui/menu";
export default function Roll({ fabric, printType, rollingWorkers }) {
  return (
    <div className="flex">
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
  const resp3 = await supabase.from("rollingWorkers").select();
  return {
    props: {
      fabric: resp1.data,
      printType: resp2.data,
      rollingWorkers: resp3.data,
    },
  };
}
