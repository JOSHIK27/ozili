import JobWork from "./components/ui/jobWork";
import { supabase } from "../db/supabase";
import Menu from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
export default function Job({
  fabric,
  dyeType,
  printType,
  jobWorkType,
  names,
}) {
  return (
    <div className="flex">
      <div className="h-12 bg-[#fad9c3] w-full fixed shadow-lg z-10 flex flex-row-reverse justify-between">
        <Button className="bg-[#f5a46e] hover:bg-[#f5a46e] text-black rounded-full">
          LOGIN
        </Button>
        <h1 className="pt-[6px] pl-4 font-semibold">VILLAGE PRINTS</h1>
      </div>
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
  const resp2 = await supabase
    .from("dyetypestbl")
    .select("dyetype")
    .eq("jobworktbl", true);
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
