import White from "./components/ui/white";
import Menu from "@/components/ui/menu";
import { supabase } from "@/db/supabase";
export default function Home({ suppliers, cargoProviders, fabricTypes }) {
  return (
    <div className="flex">
      <Menu />
      <White
        suppliers={suppliers}
        cargoProviders={cargoProviders}
        fabricTypes={fabricTypes}
      ></White>
    </div>
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
