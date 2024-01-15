import { supabase } from "@/db/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DatePickerDemo from "../../../shadcn/datePicker";
import { cutting } from "@/store/states";
import { useRecoilState } from "recoil";
import { set } from "date-fns";

export default function Cut({ fabricTypes }) {
  const [cut, setCut] = useRecoilState(cutting);
  const handleSubFab = async (e) => {
    const resp = await supabase
      .from("subFabric")
      .select("subFabric")
      .eq("fabric", e);

    let arr = resp.data.map((x) => {
      return x.subFabric;
    });
    const { date, fabric, subFabric, ...rest } = cut;
    setCut({
      date,
      fabric: e,
      subFabric: arr,
      ...rest,
    });
  };
  const handleQuantityAvailable = async (e) => {
    const { data } = await supabase
      .from("subFabricCut")
      .select()
      .eq("subFabric", e);
    const { date, fabric, subFabric, quantityAvailable, ...rest } = cut;
    setCut({
      date,
      fabric,
      subFabric,
      quantityAvailable: data[0].metersAvailable,
      ...rest,
    });
  };
  return (
    <div>
      <div className="flex mb-8 ml-[32px] mt-4">
        <h1 className="text-2xl">CUTTING</h1>
      </div>
      <div className="flex mb-[10px] ml-4">
        <h1 className="mr-[48px] text-sm">Cutting Date</h1>
        <DatePickerDemo message={"Value"} o={true} />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Fabric Type</h1>
        <Select
          onValueChange={(e) => {
            handleSubFab(e);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {fabricTypes.map((x) => {
              return <SelectItem value={x.fabric}>{x.fabric}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Fabric Sub Type</h1>
        <Select
          onValueChange={(e) => {
            handleQuantityAvailable(e);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {cut.subFabric.length &&
              cut.subFabric.map((x) => {
                return <SelectItem value={x}>{x}</SelectItem>;
              })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Quantity Available</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder={cut.quantityAvailable}
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Meters</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder="Value"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Quantity after cut</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder="Value"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Wastage</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder="Value"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Cut By</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder="Value"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Length</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder="Value"
        />
      </div>
    </div>
  );
}
