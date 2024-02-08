import { supabase } from "@/db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
export default function ToCut() {
  return (
    <div>
      <UpdatedNav />
    </div>
  );
}

export async function getServerSideProps() {
  const resp = await supabase.from("stilltocut_view").select();
  console.log(resp);
  return {
    props: {
      data: [],
    },
  };
}
