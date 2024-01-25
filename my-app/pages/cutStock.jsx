import Cut from "./components/ui/cut";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";

export default function CutStock({ fabricTypes }) {
  return (
    <div className="flex">
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
