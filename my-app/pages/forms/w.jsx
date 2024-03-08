import { supabase } from "@/db/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function W({ suppliers, cargoProviders, fabricTypes }) {
  const [item, setItem] = useState({});
  const handleItem = (e, field) => {
    if (field == "additionalCharges") {
      let val =
        parseFloat(item.cpubt ? item.cpubt : 0) *
          ((parseFloat(item.gstRate) ? parseFloat(item.gstRate) : 0) / 100 +
            1) +
        (parseFloat(item.cargoCharges ? item.cargoCharges : 0) +
          parseFloat(e.target.value ? e.target.value : 0)) /
          parseFloat(item.quantity ? item.quantity : 0);
      let tot = val * parseFloat(item.quantity);
      let afterTax =
        parseFloat(item.cpubt) * (parseFloat(item.gstRate) / 100 + 1);
      document.getElementById("net").value = val;
      document.getElementById("cpuat").value = afterTax;
      document.getElementById("tot").value = tot;
    } else if (field == "cpubt") {
      let val =
        parseFloat(e.target.value ? e.target.value : 0) *
          (parseFloat(item.gstRate ? item.gstRate : 0) / 100 + 1) +
        (parseFloat(item.cargoCharges ? item.cargoCharges : 0) +
          parseFloat(item.additionalCharges ? item.additionalCharges : 0)) /
          parseFloat(item.quantity ? item.quantity : 0);

      let tot = val * parseFloat(item.quantity ? item.quantity : 0);
      let afterTax =
        parseFloat(e.target.value ? e.target.value : 0) *
        (item.gstRate / 100 + 1);
      document.getElementById("net").value = val;
      document.getElementById("cpuat").value = afterTax;
      document.getElementById("tot").value = tot;
    } else if (field == "gstRate") {
      let val =
        parseFloat(item.cpubt ? item.cpubt : 0) *
          ((parseFloat(e.target.value) ? parseFloat(e.target.value) : 0) / 100 +
            1) +
        ((parseFloat(item.cargoCharges) ? parseFloat(item.cargoCharges) : 0) +
          (parseFloat(item.additionalCharges)
            ? parseFloat(item.additionalCharges)
            : 0)) /
          parseFloat(item.quantity ? item.quantity : 0);
      let tot =
        val * (parseFloat(item.quantity) ? parseFloat(item.quantity) : 0);
      let afterTax =
        (parseFloat(item.cpubt) ? parseFloat(item.cpubt) : 0) *
        ((parseFloat(e.target.value) ? parseFloat(e.target.value) : 0) / 100 +
          1);
      document.getElementById("net").value = val;
      document.getElementById("cpuat").value = afterTax;
      document.getElementById("tot").value = tot;
    } else if (field == "cargoCharges") {
      let val =
        (item.cpubt ? item.cpubt : 0) *
          ((item.gstRate ? item.gstRate : 0) / 100 + 1) +
        (0 + parseFloat(item.additionalCharges ? item.additionalCharges : 0)) /
          parseFloat(item.quantity ? item.quantity : 0);
      let tot = val * parseFloat(item.quantity);
      let afterTax = item.cpubt * (item.gstRate / 100 + 1);
      document.getElementById("net").value = val;
      document.getElementById("cpuat").value = afterTax;
      document.getElementById("tot").value = tot;
    } else if (field == "quantity") {
      let val =
        parseFloat(item.cpubt ? item.cpubt : 0) *
          (parseFloat(item.gstRate ? item.gstRate : 0) / 100 + 1) +
        (parseFloat(item.cargoCharges ? item.cargoCharges : 0) +
          parseFloat(item.additionalCharges ? item.additionalCharges : 0)) /
          parseFloat(e.target.value ? e.target.value : 0);
      let tot = val * parseFloat(e.target.value);
      let afterTax =
        parseFloat(item.cpubt) * (parseFloat(item.gstRate) / 100 + 1);
      document.getElementById("net").value = val;
      document.getElementById("cpuat").value = afterTax;
      document.getElementById("tot").value = tot;
    } else if (field == "freeShipping") {
      let val =
        (item.cpubt ? item.cpubt : 0) *
          ((item.gstRate ? item.gstRate : 0) / 100 + 1) +
        (0 + parseFloat(item.additionalCharges ? item.additionalCharges : 0)) /
          parseFloat(item.quantity ? item.quantity : 0);
      let tot = val * parseFloat(item.quantity ? item.quantity : 0);
      let afterTax =
        (item.cpubt ? item.cpubt : 0) *
        ((item.gstRate ? item.gstRate : 0) / 100 + 1);
      document.getElementById("net").value = val;
      document.getElementById("cpuat").value = afterTax;
      document.getElementById("tot").value = tot;
    }
    setItem({
      ...item,
      [field]: e.target.value,
    });
  };
  const handleDropDown = (e, field) => {
    setItem({
      ...item,
      [field]: e,
    });
  };
  const handleCheckBox = (e, field) => {
    const temp = item[field];
    console.log(temp);
    setItem({
      ...item,
      [field]: temp ? false : true,
    });
  };
  console.log(item);
  return (
    <div className="flex justify-center mt-12">
      <div className="bg-[#efecec] p-8 rounded-lg">
        <div className="flex mb-8 ml-[32px] mt-4">
          <img
            width="36"
            height="36"
            src="https://img.icons8.com/fluency-systems-filled/48/cut-paper.png"
            alt="cut-paper"
          />
          <h1 className="text-2xl">WHITE STOCK FORM</h1>
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Order Date</h1>
          <input
            type="date"
            className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
            onChange={(e) => {
              handleItem(e, "orderDate");
            }}
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Delivery Date</h1>
          <input
            type="date"
            className=" rounded-md border-[1px] bg-white border-black w-[345px] sm:w-[400px] h-[30px]"
            onChange={(e) => {
              handleItem(e, "deliveryDate");
            }}
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Invoice Number</h1>
          <Input
            className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
            placeholder="Value"
            onChange={(e) => {
              handleItem(e, "invoiceNumber");
            }}
          />
        </div>
        <div className="mb-[10px]">
          <div>
            <h1 className="text-sm">Supplier</h1>
            <Select
              onValueChange={(e) => {
                handleDropDown(e, "supplier");
              }}
            >
              <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
                <SelectValue placeholder="Value" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {suppliers?.map((i) => {
                  return (
                    <SelectItem key={i.supplier} value={i.supplier}>
                      {i.supplier}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Fabric</h1>
          <Select
            onValueChange={(e) => {
              handleDropDown(e, "fabric");
            }}
          >
            <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {fabricTypes?.map((x) => {
                return (
                  <SelectItem key={x.fabric} value={x.fabric}>
                    {x.fabric}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Sub Fabric</h1>
          <Select>
            <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {/* {x.products &&
              x.products?.map((u) => {
                return (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                );
              })} */}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-[10px]">
          <h1 className="text-sm">Units</h1>
          <Select
            onValueChange={(e) => {
              handleDropDown(e, "units");
            }}
          >
            <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {/* {x.productType && (
              <SelectItem value={x.productType}>{x.productType}</SelectItem>
            )} */}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Cargo Provider</h1>
          <Select
            onValueChange={(e) => {
              handleDropDown(e, "cargoProvider");
            }}
          >
            <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {cargoProviders?.map((i) => {
                return (
                  <SelectItem key={i.supplier} value={i.supplier}>
                    {i.supplier}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-[10px]">
          <h1 className="text-sm mr-[50px]">Free Shipping</h1>
          <input
            onClick={(e) => {
              handleCheckBox(e, "freeShipping");
            }}
            type="checkbox"
            className="bg-white"
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm mr-[30px]">Cargo Paid By Supplier</h1>
          <input
            onClick={(e) => {
              handleCheckBox(e, "cargoPaidBySupplier");
            }}
            type="checkbox"
            id="cargoPaidBySupplier"
            className="bg-white"
          />
        </div>

        <div className="mb-[10px]">
          <h1 className="mr-[16px] text-sm">Cargo Charges</h1>
          <Input
            onChange={(e) => {
              handleItem(e, "cargoCharges");
            }}
            className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
            id="cargoCharges"
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Quantity</h1>
          <Input
            onChange={(e) => {
              handleItem(e, "quantity");
            }}
            className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm mr-[30px]">GST PAID</h1>
          <input
            onClick={(e) => {
              handleCheckBox(e, "gstPaid");
            }}
            type="checkbox"
            className="bg-white"
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">GST Rate in %</h1>
          <Input
            onChange={(e) => {
              handleItem(e, "gstRate");
            }}
            className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
            placeholder="Value"
            id="gst"
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Additional Charges</h1>
          <Input
            onChange={(e) => {
              handleItem(e, "additionalCharges");
            }}
            className="bg-white w-[345px] sm:w-[400px] h-[30px]"
          />
        </div>

        <div className="mb-[10px]">
          <div>
            <h1 className="text-sm">Cost per unit BT</h1>
            <Input
              id="cpubt"
              onChange={(e) => {
                handleItem(e, "cpubt");
              }}
              className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
            />
          </div>
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Cost per unit AT</h1>
          <Input
            id="cpuat"
            className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
            readOnly
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Gross Cost</h1>
          <Input
            id="net"
            className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
            readOnly
          />
        </div>

        <div className="mb-[10px]">
          <h1 className="text-sm">Amount Payable To Supplier</h1>
          <Input
            className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
            readOnly
          />
        </div>
        <div className="mb-[10px]">
          <h1 className="text-sm">Total Cost</h1>
          <Input
            id="tot"
            readOnly
            className=" bg-white w-[345px] sm:w-[400px] h-[30px] border-[1px] border-black"
          />
        </div>
        <div className="mb-[20px]">
          <h1 className="text-sm">Upload Invoice</h1>
          <Input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            className=" bg-white w-[345px] sm:w-[400px] h-[40px] border-[1px] border-black"
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              window.location.reload();
            }}
            className="border-[0.5px] mr-4 border-neutral-400 border-[#4A84F3]"
          >
            CLEAR
          </Button>
          <button id="submitButton" class="submit-btn">
            Submit
          </button>
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
  let resp1 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Logistics");
  let resp2 = await supabase.from("fabrictbl").select("fabric");
  return {
    props: {
      suppliers: data,
      cargoProviders: resp1.data,
      fabricTypes: resp2.data,
    },
  };
}
