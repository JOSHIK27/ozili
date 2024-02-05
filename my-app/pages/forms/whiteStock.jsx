import White from "../components/ui/white";
import { supabase } from "../../db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
export default function WhiteStock({ suppliers, cargoProviders, fabricTypes }) {
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="flex justify-center w-[400px] shadow-2xl border-black">
          <White
            suppliers={suppliers}
            cargoProviders={cargoProviders}
            fabricTypes={fabricTypes}
          ></White>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase
    .from("suppliertbl")
    .select("supplier")
    .or("type.eq.Fabric,type.eq.Fabric and Jobwork");
  let resp1 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Logistics");
  let resp2 = await supabase.from("fabrictbl").select("fabric");
  return {
    props: {
      suppliers: data,
      cargoProviders: resp1.data,
      fabricTypes: resp2.data,
    },
  };
}
