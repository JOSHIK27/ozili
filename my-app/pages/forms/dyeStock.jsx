import Dye from "../components/ui/dye";
import { supabase } from "../../db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
export default function DyeStock({ dyeType, dyeStyle, dyer, fabric }) {
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="flex justify-center w-[400px] shadow-2xl border-black">
          <Dye
            dyeType={dyeType}
            dyeStyle={dyeStyle}
            dyer={dyer}
            fabric={fabric}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase
    .from("dyetypestbl")
    .select("dyetype")
    .eq("dyetbl", true);
  const resp2 = await supabase.from("dyestyletbl").select();
  const resp3 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .ilike("type", "%Dye%");

  const resp4 = await supabase.from("fabrictbl").select("fabric");

  return {
    props: {
      dyeType: resp1.data,
      dyeStyle: resp2.data,
      dyer: resp3.data,
      fabric: resp4.data,
    },
  };
}
