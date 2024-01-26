import Dye from "./components/ui/dye";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
export default function DyeStock({ dyeType, dyeStyle, dyer, fabric }) {
  return (
    <div className="flex">
      <div className="h-12 bg-[#fad0b6] w-full fixed shadow-lg z-10 flex flex-row-reverse justify-between">
        <Button className="bg-[#f5bd9a] hover:bg-[#fad0b6] text-black rounded-full">
          LOGIN
        </Button>
        <h1 className="pt-[6px] pl-4 font-semibold">VILLAGE PRINTS</h1>
      </div>
      <Menu />
      <Dye dyeType={dyeType} dyeStyle={dyeStyle} dyer={dyer} fabric={fabric} />
    </div>
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
