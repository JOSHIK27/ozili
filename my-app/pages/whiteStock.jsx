import White from "./components/ui/white";
import { supabase } from "../db/supabase";

export default function WhiteStock({ suppliers, cargoProviders, fabricTypes }) {
  return (
    <White
      suppliers={suppliers}
      cargoProviders={cargoProviders}
      fabricTypes={fabricTypes}
    ></White>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase.from("supplier").select();
  let resp1 = await supabase.from("cargoProvider").select();
  let resp2 = await supabase.from("fabric").select("fabric");
  return {
    props: {
      suppliers: data,
      cargoProviders: resp1.data,
      fabricTypes: resp2.data,
    },
  };
}
