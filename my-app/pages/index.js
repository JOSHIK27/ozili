import White from "./components/ui/white";
import Menu from "@/components/ui/menu";
import { supabase } from "@/db/supabase";
import { Button } from "@/components/ui/button";

import UpdatedNav from "./components/ui/updatedNav";
import { Separator } from "@/components/ui/separator";
export default function Home({ suppliers, cargoProviders, fabricTypes }) {
  return (
    // <div className="flex">
    //   <div className="h-12 bg-[#fad9c3] w-full fixed shadow-lg z-10 flex flex-row-reverse justify-between">
    //     <Button className="bg-[#f5a46e] hover:bg-[#f5a46e] text-black rounded-full">
    //       LOGIN
    //     </Button>
    //     <h1 className="pt-[6px] pl-4 font-semibold">VILLAGE PRINTS</h1>
    //   </div>
    //   <Menu />
    //   <White
    //     suppliers={suppliers}
    //     cargoProviders={cargoProviders}
    //     fabricTypes={fabricTypes}
    //   ></White>
    // </div>
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="flex justify-center w-[400px] shadow-2xl border-black">
          <White
            suppliers={suppliers}
            cargoProviders={cargoProviders}
            fabricTypes={fabricTypes}
          ></White>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase
    .from("suppliertbl")
    .select("supplier")
    .or("type.eq.Fabric,type.eq.Fabric and Jobwork");
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

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>;
}
