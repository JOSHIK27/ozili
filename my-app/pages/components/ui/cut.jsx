import { supabase } from "@/db/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cutting } from "@/store/states";
import { useRecoilState } from "recoil";
import Nav from "@/components/ui/nav";
import { Button } from "@/components/ui/button";

const handleProduct = (e, cut, setCut) => {
  const {
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent,
  } = cut;
  setCut({
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent: e.productComponent,
  });
};

const handleProductQuantity = async (e, cut, setCut) => {
  console.log(cut);
  const { data, error } = await supabase
    .from("components")
    .select("metersPerPiece")
    .eq("productComponent", cut.productComponent);
  console.log(data);
  let roundedUp = Math.ceil(
    parseFloat(e.target.value) / data[0].metersPerPiece
  );
  console.log(roundedUp);
  const {
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent,
    metersCut,
  } = cut;
  setCut({
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut: roundedUp,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent,
    metersCut: e.target.value,
  });
};

const handlePersonCut = (e, cut, setCut) => {
  const {
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent,
    metersCut,
  } = cut;
  setCut({
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy: e.target.value,
    length,
    subFabric,
    productComponent,
    metersCut,
  });
};

const handleWastageQuantity = (e, cut, setCut) => {
  const {
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent,
    metersCut,
  } = cut;
  setCut({
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity: e.target.value,
    cutBy,
    length,
    subFabric,
    productComponent,
    metersCut,
  });
};

const handleClick = (cut) => {
  if (!cut.date) {
    alert("Enter Order Date");
    return;
  }
  if (!cut.fabric) {
    alert("Enter Fabric Name");
    return;
  }
  if (!cut.subFabric) {
    alert("Enter Sub Fabric Name");
    return;
  }
  if (!cut.productComponentList) {
    alert("Enter Product Component");
    return;
  }
  if (cut.wastage) {
    if (!cut.wastageQuantity) {
      alert("Enter Wastage Quantity");
      return;
    }
  } else {
    if (!cut.quantityCut) {
      alert("Enter the quantity cut");
      return;
    }
  }
  if (!cut.cutBy) {
    alert("Enter the name of person who has cut");
    return;
  }
  fetch("api/cutStock", {
    body: JSON.stringify(cut),
    method: "POST",
  })
    .then((x) => {
      return x.json();
    })
    .then((resp) => {
      console.log(resp);
      if (resp[0] == "Quantity Insufficient") {
        alert("Quantity Insufficient");
      } else if (resp[0] == "success") {
        alert("added to db");
      }
    });
};

const handleWastageCheckBox = (e, cut, setCut) => {
  let temp = cut.wastage;
  let {
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut,
    productQuantity,
    wastage,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent,
    metersCut,
  } = cut;
  if (wastage) {
    temp = false;
    wastageQuantity = 0;
    const element = document.getElementById("wq");
    element.value = 0;
  } else {
    temp = true;
    const element = document.getElementById("mts");
    element.value = 0;
    const element2 = document.getElementById("mts");
    element.value = 0;
  }
  setCut({
    date,
    fabric,
    subFabricList,
    productComponentList,
    quantityAvailable,
    quantityCut: 0,
    productQuantity: 0,
    wastage: temp,
    wastageQuantity,
    cutBy,
    length,
    subFabric,
    productComponent,
    metersCut,
  });
};

const handleSubFabric = (e, cut, setCut) => {};

export default function Cut({ fabricTypes }) {
  const [cut, setCut] = useRecoilState(cutting);
  console.log(cut);
  const handleFab = async (e) => {
    const resp = await supabase
      .from("subFabric")
      .select("subFabric")
      .eq("fabric", e)
      .eq("type", "Meters");
    console.log(resp.data);

    let arr = resp.data?.map((x) => {
      return x.subFabric;
    });
    const { date, fabric, subFabricList, ...rest } = cut;
    setCut({
      date,
      fabric: e,
      subFabricList: arr,
      ...rest,
    });
  };
  const handleQuantityAvailable = async (e) => {
    const resp2 = await supabase
      .from("productComponents")
      .select("productComponent")
      .eq("subFabric", e);
    const { data } = await supabase
      .from("subFabricCut")
      .select()
      .eq("subFabric", e);
    console.log(data);
    const {
      date,
      fabric,
      subFabricList,
      productComponentList,
      quantityAvailable,
      quantityCut,
      productQuantity,
      wastage,
      wastageQuantity,
      cutBy,
      length,
      subFabric,
      productComponent,
      metersCut,
    } = cut;
    setCut({
      date,
      fabric,
      subFabricList,
      productComponentList: resp2.data,
      quantityAvailable: data[0].metersAvailable,
      quantityCut,
      productQuantity,
      wastage,
      wastageQuantity,
      cutBy,
      length,
      subFabric: e,
      productComponent,
      metersCut,
    });
  };
  const handleDate = (e) => {
    const {
      date,
      fabric,
      subFabricList,
      productComponentList,
      quantityAvailable,
      quantityCut,
      productQuantity,
      wastage,
      wastageQuantity,
      cutBy,
      length,
      subFabric,
      productComponent,
      metersCut,
    } = cut;
    setCut({
      date: e.target.value,
      fabric,
      subFabricList,
      productComponentList,
      quantityAvailable,
      quantityCut,
      productQuantity,
      wastage,
      wastageQuantity,
      cutBy,
      length,
      subFabric,
      productComponent,
      metersCut,
    });
  };
  return (
    <div>
      <Nav />
      <div className="flex mb-8 ml-[32px] mt-4">
        <h1 className="text-2xl">CUTTING</h1>
      </div>
      <div className="flex mb-[10px] ml-4">
        <h1 className="mr-[48px] text-sm">Cutting Date</h1>
        <input
          type="date"
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
          onChange={(e) => {
            handleDate(e);
          }}
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Fabric Type</h1>
        <Select
          onValueChange={(e) => {
            handleFab(e);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
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
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Fabric Sub</h1>
        <Select
          onValueChange={(e) => {
            handleQuantityAvailable(e);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {cut.subFabricList?.map((x) => {
              return (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Product Component</h1>
        <Select
          onValueChange={(e) => {
            handleProduct(e, cut, setCut);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {cut.productComponentList?.map((x) => {
              return (
                <SelectItem key={x.productComponent} value={x}>
                  {x.productComponent}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Quantity Available</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder={cut.quantityAvailable}
          readOnly
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Meters Cut</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder="Value"
          disabled={cut.wastage}
          id="mts"
          onChange={(e) => {
            handleProductQuantity(e, cut, setCut);
          }}
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Component Quantity</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder={cut.quantityCut}
          id="cq"
          readOnly
        />
      </div>
      <div className="flex  ml-4 mb-[10px]">
        <h1 className="text-sm mr-[60px]">Wastage - Adj</h1>
        <input
          onChange={(e) => {
            handleWastageCheckBox(e, cut, setCut);
          }}
          type="checkbox"
          className="absolute ml-[200px]"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Wastage Quantity</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder={cut.wastageQuantity}
          id="wq"
          onChange={(e) => {
            handleWastageQuantity(e, cut, setCut);
          }}
          disabled={!cut.wastage}
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Cut By</h1>
        <Input
          className="absolute w-[150px] h-[8px] ml-[200px]"
          placeholder="Value"
          onChange={(e) => {
            handlePersonCut(e, cut, setCut);
          }}
        />
      </div>
      <Button
        onClick={() => {
          handleClick(cut);
        }}
        className="ml-[216px] border-[2px] h-[7px] border-neutral-400"
      >
        SUBMIT
      </Button>
    </div>
  );
}
