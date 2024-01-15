import Cut from "./components/ui/cut";
import { supabase } from "../db/supabase";

export default function CutStock({ fabricTypes }) {
  return <Cut fabricTypes={fabricTypes}></Cut>;
}

export async function getServerSideProps() {
  let resp = await supabase.from("fabric").select("fabric");
  return {
    props: {
      fabricTypes: resp.data,
    },
  };
}
