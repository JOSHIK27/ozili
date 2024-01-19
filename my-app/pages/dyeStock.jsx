import Dye from "./components/ui/dye";
import { supabase } from "../db/supabase";
export default function DyeStock({ dyeType, dyeStyle, dyer, fabric }) {
  return (
    <Dye dyeType={dyeType} dyeStyle={dyeStyle} dyer={dyer} fabric={fabric} />
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("dyeType").select();
  const resp2 = await supabase.from("dyeStyle").select();
  const resp3 = await supabase.from("dyers").select();
  const resp4 = await supabase.from("fabric").select("fabric");

  return {
    props: {
      dyeType: resp1.data,
      dyeStyle: resp2.data,
      dyer: resp3.data,
      fabric: resp4.data,
    },
  };
}
