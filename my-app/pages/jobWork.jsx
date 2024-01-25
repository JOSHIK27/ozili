import JobWork from "./components/ui/jobWork";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";

export default function Job({
  fabric,
  dyeType,
  printType,
  jobWorkType,
  names,
}) {
  return (
    <div className="flex">
      <Menu />
      <JobWork
        fabric={fabric}
        dyeType={dyeType}
        printType={printType}
        jobWorkType={jobWorkType}
        names={names}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("fabric").select("fabric");
  const resp2 = await supabase.from("dyeType").select();
  const resp3 = await supabase.from("printTypeTbl").select();
  const resp4 = await supabase.from("jobWorkType").select("jbType");
  const resp5 = await supabase.from("jobWorkersTbl").select();
  return {
    props: {
      fabric: resp1.data,
      dyeType: resp2.data,
      printType: resp3.data,
      jobWorkType: resp4.data,
      names: resp5.data,
    },
  };
}
