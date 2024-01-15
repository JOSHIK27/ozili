import { supabase } from "../../../db/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DatePickerDemo from "../../../shadcn/datePicker";
import Nav from "@/components/ui/nav";

export default function Dye() {
  return (
    <div>
      <Nav />
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="30"
          height="15"
          src="https://img.icons8.com/ios/50/paint-bucket.png"
          alt="paint-bucket"
        />
        <h1 className="text-2xl">DYE STOCK</h1>
      </div>
      <div className="flex  mb-[10px] ml-4">
        <h1 className="mr-[48px] text-sm">Dye Date</h1>
        <DatePickerDemo message={"Dye Date"} o={true} />
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Main Dyer</h1>
        <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Sup Dyer</h1>
        <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Fabric Type</h1>
        <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Product Type</h1>
        <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Dye Type</h1>
        <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Dye Style</h1>
        <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Count </h1>
        <Input
          onChange={(e) => {
            handleQuantity(e, x);
          }}
          className="w-[150px] h-[8px] absolute ml-[200px]"
          placeholder="Value"
        />
      </div>
      <div className="flex mx-auto mb-[10px] ml-4">
        <h1 className="mr-[70px] text-sm">Color Combination</h1>
        <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white"></SelectContent>
        </Select>
      </div>
    </div>
  );
}
