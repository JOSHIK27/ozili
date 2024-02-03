import JobWork from "./components/ui/jobWork";
import { supabase } from "../db/supabase";
import UpdatedNav from "./components/ui/updatedNav";
export default function Job({
  fabric,
  dyeType,
  printType,
  jobWorkType,
  names,
  cargoProviders,
}) {
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="flex justify-center w-[400px] shadow-2xl border-black">
          <JobWork
            fabric={fabric}
            dyeType={dyeType}
            printType={printType}
            jobWorkType={jobWorkType}
            names={names}
            cargoProviders={cargoProviders}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("fabrictbl").select("fabric");
  const resp2 = await supabase
    .from("dyetypestbl")
    .select("dyetype")
    .eq("jobworktbl", true);
  const resp3 = await supabase
    .from("printtypestbl")
    .select("printtype")
    .eq("jobworktbl", true);
  const resp4 = await supabase.from("jobWorkType").select("jbType");
  const resp5 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .or("type.eq.Fabric and Jobwork,type.eq.Jobwork");

  let resp6 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Logistics");

  return {
    props: {
      fabric: resp1.data,
      dyeType: resp2.data,
      printType: resp3.data,
      jobWorkType: resp4.data,
      names: resp5.data,
      cargoProviders: resp6.data,
    },
  };
}
