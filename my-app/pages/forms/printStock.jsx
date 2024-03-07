import Print from "../components/ui/print";
import { supabase } from "../../db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
export default function PrintStock({ fabric, dyeType, printType, workers }) {
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <Print
          fabric={fabric}
          dyeType={dyeType}
          printType={printType}
          workers={workers}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("fabrictbl").select("fabric");
  const resp2 = await supabase
    .from("dyetypestbl")
    .select("dyetype")
    .eq("printtbl", true);
  const resp3 = await supabase
    .from("printtypestbl")
    .select("printtype")
    .eq("printtbl", true);
  const resp4 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .ilike("type", "%Print%");

  return {
    props: {
      fabric: resp1.data,
      dyeType: resp2.data,
      printType: resp3.data,
      workers: resp4.data,
    },
  };
}
