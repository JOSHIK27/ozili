import Cut from "./components/ui/cut";
import { supabase } from "../db/supabase";
import UpdatedNav from "./components/ui/updatedNav";
export default function CutStock({ fabricTypes }) {
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="flex justify-center w-[400px] shadow-2xl border-black">
          <Cut fabricTypes={fabricTypes}></Cut>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let resp = await supabase.from("fabrictbl").select("fabric");
  return {
    props: {
      fabricTypes: resp.data,
    },
  };
}
