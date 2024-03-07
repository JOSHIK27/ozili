import Rolling from "../components/ui/rollling";
import { supabase } from "@/db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
export default function Roll({
  fabric,
  printType,
  rollingWorkers,
  cargoProviders,
}) {
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <Rolling
          fabric={fabric}
          printType={printType}
          rollingWorkers={rollingWorkers}
          cargoProviders={cargoProviders}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("fabrictbl").select("fabric");
  const resp2 = await supabase
    .from("printtypestbl")
    .select("printtype")
    .eq("rollingtbl", true);
  const resp3 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Roll");
  let resp4 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Logistics");
  return {
    props: {
      fabric: resp1.data,
      printType: resp2.data,
      rollingWorkers: resp3.data,
      cargoProviders: resp4.data,
    },
  };
}
