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
import { Button } from "@/components/ui/button";

function isToday(dateString) {
  const today = new Date();
  const inputDate = new Date(dateString);

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth() + 1;
  const inputDay = inputDate.getDate();

  return (
    todayYear === inputYear &&
    todayMonth === inputMonth &&
    todayDay === inputDay
  );
}

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
    productComponent: e,
  });
};

const handleProductQuantity = async (e, cut, setCut) => {
  const resp = await supabase
    .from("components")
    .select("metersPerPiece")
    .eq("productComponent", cut.productComponent);
  let roundedUp = 0;
  roundedUp = Math.ceil(
    parseFloat(e.target.value) / resp.data[0].metersPerPiece
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
    alert("Enter Cut Date");
    return;
  }
  // if (cut.date) {
  //   if (!isToday(cut.date)) {
  //     alert("Enter Today's Date");
  //     return;
  //   }
  // }
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
        window.location.reload();
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
    const resp = await supabase
      .from("whiteasmeters_view")
      .select("whiteasmeters")
      .eq("subfabric", e);
    let num = 0;
    if (resp && resp.data && resp.data.length) {
      num = resp.data[0].whiteasmeters;
    }
    console.log(resp);
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
      quantityAvailable: num,
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
  console.log(cut);
  return (
    <div className="ml-[400px] mt-20">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/ios/50/cut.png"
          alt="cut"
        />
        <h1 className="text-2xl">CUTTING</h1>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm mb-[4px]">Date</h1>
        <input
          type="date"
          className="bg-[#FFF4ED] border-[1px] rounded-md border-black w-[300px] h-[30px]"
          onChange={(e) => {
            handleDate(e);
          }}
        />
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Fabric Type</h1>
        <Select
          onValueChange={(e) => {
            handleFab(e);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
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
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Fabric Sub</h1>
        <Select
          onValueChange={(e) => {
            handleQuantityAvailable(e);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
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
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Product Component</h1>
        <Select
          disabled={cut.wastage}
          onValueChange={(e) => {
            handleProduct(e, cut, setCut);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {cut.productComponentList?.map((x) => {
              return (
                <SelectItem key={x.productComponent} value={x.productComponent}>
                  {x.productComponent}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Quantity Available</h1>
        <Input
          className="w-[300px] h-[30px] rounded-sm"
          placeholder={cut.quantityAvailable}
          readOnly
        />
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Meters Cut</h1>
        <Input
          className="w-[300px] h-[30px]"
          placeholder="Value"
          disabled={cut.wastage}
          id="mts"
          onChange={(e) => {
            handleProductQuantity(e, cut, setCut);
          }}
        />
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Component Quantity</h1>
        <Input
          className="w-[300px] h-[30px]"
          placeholder={cut.quantityCut}
          id="cq"
          readOnly
        />
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Wastage - Adj</h1>
        <input
          onChange={(e) => {
            handleWastageCheckBox(e, cut, setCut);
          }}
          type="checkbox"
          className=""
        />
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Wastage Quantity</h1>
        <Input
          className="w-[300px] h-[30px]"
          placeholder={cut.wastageQuantity}
          id="wq"
          onChange={(e) => {
            handleWastageQuantity(e, cut, setCut);
          }}
          disabled={!cut.wastage}
        />
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm mr-[60px]">Cut By</h1>
        <Input
          className="w-[300px] h-[30px]"
          placeholder="Value"
          onChange={(e) => {
            handlePersonCut(e, cut, setCut);
          }}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          className="border-4 m-8 border-neutral-400"
        >
          CLEAR
        </Button>
        <Button
          onClick={() => {
            handleClick(cut);
          }}
          className="border-4 m-8 border-neutral-400"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}
