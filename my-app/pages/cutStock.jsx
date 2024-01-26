import Cut from "./components/ui/cut";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
export default function CutStock({ fabricTypes }) {
  return (
    <div className="flex">
      <div className="h-12 bg-[#fad9c3] w-full fixed shadow-lg z-10 flex flex-row-reverse justify-between">
        <Button className="bg-[#f5a46e] hover:bg-[#f5a46e] text-black rounded-full">
          LOGIN
        </Button>
        <h1 className="pt-[6px] pl-4 font-semibold">VILLAGE PRINTS</h1>
      </div>
      <Menu />
      <Cut fabricTypes={fabricTypes}></Cut>
    </div>
  );
}

export async function getServerSideProps() {
  let resp = await supabase.from("fabric").select("fabric");
  return {
    props: {
      fabricTypes: resp.data,
    },
  };
}
