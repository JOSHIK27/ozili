import White from "./components/ui/white";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
export default function WhiteStock({ suppliers, cargoProviders, fabricTypes }) {
  return (
    <div className="flex">
      <div className="h-12 bg-[#fad0b6] w-full fixed shadow-lg z-10 flex flex-row-reverse justify-between">
        <Button className="bg-[#f5bd9a] hover:bg-[#fad0b6] text-black rounded-full">
          LOGIN
        </Button>
        <h1 className="pt-[6px] pl-4 font-semibold">VILLAGE PRINTS</h1>
      </div>
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
