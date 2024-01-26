import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecoilState } from "recoil";
import { rollState } from "@/store/states";
import { supabase } from "@/db/supabase";

const handleSubmit = (roll, setRoll) => {
  if (!roll.date) {
    alert("Enter the date");
    return;
  }
  if (!roll.name) {
    alert("Enter name");
    return;
  }
  if (!roll.rollType) {
    alert("Enter Roll Type");
    return;
  }
  if (!roll.printType) {
    alert("Enter Print Type");
    return;
  }
  if (!roll.movementType) {
    alert("Enter Movement Type");
    return;
  }
  if (!roll.fabric) {
    alert("Enter Fabric Details");
    return;
  }
  if (!roll.product) {
    alert("Enter Product Name");
    return;
  }
  if (!roll.quantity) {
    alert("Enter Quantity Printed");
    return;
  }
  if (!roll.transaction) {
    alert("Enter Transaction Type");
    return;
  }
  fetch("api/rollStock", {
    method: "POST",
    body: JSON.stringify(roll),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((x) => {
      if (x == "success") {
        alert("Added to db");
      }
    });
};

const handleDate = (e, roll, setRoll) => {
  const { date, ...rest } = roll;
  setRoll({
    date: e.target.value,
    ...rest,
  });
};

const handleName = (e, roll, setRoll) => {
  const { date, name, ...rest } = roll;
  setRoll({
    date,
    name: e,
    ...rest,
  });
};

const handleRollType = (e, roll, setRoll) => {
  const { date, name, rollType, ...rest } = roll;
  setRoll({
    date,
    name,
    rollType: e,
    ...rest,
  });
};
const handlePrintType = (e, roll, setType) => {
  const { date, name, rollType, printType, ...rest } = roll;
  setType({
    date,
    name,
    rollType,
    printType: e,
    ...rest,
  });
};

const handleMovementType = (e, roll, setType) => {
  const { date, name, rollType, printType, movementType, ...rest } = roll;
  setType({
    date,
    name,
    rollType,
    printType,
    movementType: e,
    ...rest,
  });
};

const handleFabric = async (e, roll, setRoll) => {
  const {
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    ...rest
  } = roll;
  const { data, error } = await supabase
    .from("products")
    .select("Product")
    .eq("fabric", e);
  setRoll({
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric: e,
    productList: data,
    ...rest,
  });
};

const handleProduct = (e, roll, setRoll) => {
  const {
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product,
    ...rest
  } = roll;
  setRoll({
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product: e,
    ...rest,
  });
};
const handleExtraCharges = (e, roll, setRoll) => {
  const {
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product,
    charges,
    ...rest
  } = roll;
  setRoll({
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product,
    charges: parseFloat(e.target.value),
    ...rest,
  });
};
const handleQuantity = (e, roll, setRoll) => {
  const {
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product,
    charges,
    quantity,
    ...rest
  } = roll;
  setRoll({
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product,
    charges,
    quantity: parseFloat(e.target.value),
    ...rest,
  });
};
const handleTransaction = (e, roll, setRoll) => {
  const {
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product,
    charges,
    quantity,
    transaction,
  } = roll;
  setRoll({
    date,
    name,
    rollType,
    printType,
    movementType,
    fabric,
    productList,
    product,
    charges,
    quantity,
    transaction: e,
  });
};

export default function Rolling({ fabric, printType, rollingWorkers }) {
  const [roll, setRoll] = useRecoilState(rollState);
  console.log(roll);
  return (
    <div className="ml-[400px] mt-20">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/external-solid-pause-08/64/external-cleaning-spa-solid-pause-08.png"
          alt="external-cleaning-spa-solid-pause-08"
        />
        <h1 className="text-2xl">ROLLING FORM</h1>
      </div>
      <div className="flex mb-[10px] ml-4">
        <h1 className="mr-[48px] text-sm">Roll Date</h1>
        <input
          type="date"
          onChange={(e) => {
            handleDate(e, roll, setRoll);
          }}
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Rolling Worker Name</h1>
        <Select
          onValueChange={(e) => {
            handleName(e, roll, setRoll);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {rollingWorkers?.map((x) => {
              return (
                <SelectItem key={x.name} value={x.name}>
                  {x.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Rolling Type</h1>
        <Select
          onValueChange={(e) => {
            handleRollType(e, roll, setRoll);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"Hand"}>Hand</SelectItem>
            <SelectItem value={"Machine"}>Machine</SelectItem>
            <SelectItem value={"Iron"}>Iron</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Print Type</h1>
        <Select
          onValueChange={(e) => {
            handlePrintType(e, roll, setRoll);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {printType?.map((x) => {
              return (
                <SelectItem key={x.printType} value={x.printType}>
                  {x.printType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Movement Type</h1>
        <Select
          onValueChange={(e) => {
            handleMovementType(e, roll, setRoll);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"out"}>Out</SelectItem>
            <SelectItem value={"in"}>In</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Fabric</h1>
        <Select
          onValueChange={(e) => {
            handleFabric(e, roll, setRoll);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {fabric?.map((x) => {
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
        <h1 className="text-sm mr-[60px]">Product</h1>
        <Select
          onValueChange={(e) => {
            handleProduct(e, roll, setRoll);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {roll.productList?.map((x) => {
              return (
                <SelectItem key={x.Product} value={x.Product}>
                  {x.Product}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Extra Charges</h1>
        <input
          onChange={(e) => {
            handleExtraCharges(e, roll, setRoll);
          }}
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Quantity</h1>
        <input
          onChange={(e) => handleQuantity(e, roll, setRoll)}
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
        />
      </div>
      <div className="flex  mb-[10px] ml-4">
        <h1 className="text-sm sm: mr-4">Transaction</h1>
        <Select
          onValueChange={(e) => {
            handleTransaction(e, roll, setRoll);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"regular"}>regular</SelectItem>
            <SelectItem value={"adjustment"}>adjustment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button className="border-4 m-8 border-neutral-400">CLEAR</Button>
        <Button
          onClick={() => {
            handleSubmit(roll, setRoll);
          }}
          className="border-4 m-8 border-neutral-400"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}
