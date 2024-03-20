import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { useRecoilState } from "recoil";
import { rollState } from "@/store/states";
import { supabase } from "@/db/supabase";

const handleDamage = (roll, setRoll) => {
  console.log("inside ", roll);
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
    damage,
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
    transaction,
    damage: !damage,
  });
};

const handleSubmit = (roll, setRoll) => {
  if (typeof document !== "undefined") {
    document.getElementById("submitButton").disabled = true;
  }
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

  if (!roll.transaction) {
    alert("Enter Transaction Type");
    return;
  }
  if (roll.transaction == "Exception") {
    fetch("../api/rollStock", {
      method: "POST",
      body: JSON.stringify(roll),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((x) => {
        document.getElementById("submitButton").disabled = true;
        if (x[0] == "success") {
          window.location.reload();
          alert("Added to db");
        } else {
          alert("Quantity Insufficient");
          return;
        }
      });
  } else {
    if (!roll.quantity) {
      alert("Enter Quantity Printed");
      return;
    }
    fetch("../api/rollStock", {
      method: "POST",
      body: JSON.stringify(roll),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((x) => {
        if (x[0] == "success") {
          window.location.reload();
          alert("Added to db");
        } else {
          alert("Quantity Insufficient");
          return;
        }
      });
  }
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
    .select("product")
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
    damage,
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
    damage,
  });
};

export default function Rolling({
  fabric,
  printType,
  rollingWorkers,
  cargoProviders,
}) {
  const [roll, setRoll] = useRecoilState(rollState);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/external-solid-pause-08/64/external-cleaning-spa-solid-pause-08.png"
          alt="external-cleaning-spa-solid-pause-08"
        />
        <h1 className="text-2xl font-semibold">ROLLING FORM</h1>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm sm: mr-4">Transaction</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleTransaction(e, roll, setRoll);
          }}
        >
          <SearchSelectItem value={"Regular"}>Regular</SearchSelectItem>
          <SearchSelectItem value={"Exception"}>Exception</SearchSelectItem>
        </SearchSelect>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Roll Date</h1>
        <input
          type="date"
          onChange={(e) => {
            handleDate(e, roll, setRoll);
          }}
          className=" rounded-md border-black w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
        />
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Rolling Worker Name</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleName(e, roll, setRoll);
          }}
        >
          {rollingWorkers?.map((x) => {
            return (
              <SearchSelectItem key={x.supplier} value={x.supplier}>
                {x.supplier}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Rolling Type</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleRollType(e, roll, setRoll);
          }}
        >
          <SearchSelectItem value={"Hand"}>Hand</SearchSelectItem>
          <SearchSelectItem value={"Machine"}>Machine</SearchSelectItem>
          <SearchSelectItem value={"Iron"}>Iron</SearchSelectItem>
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Print Type</h1>
        <SearchSelect
          onValueChange={(e) => {
            handlePrintType(e, roll, setRoll);
          }}
        >
          {printType?.map((x) => {
            return (
              <SearchSelectItem key={x.printtype} value={x.printtype}>
                {x.printtype}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Movement Type</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleMovementType(e, roll, setRoll);
          }}
        >
          <SearchSelectItem value={"Out"}>Out</SearchSelectItem>
          <SearchSelectItem value={"In"}>In</SearchSelectItem>
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Fabric</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleFabric(e, roll, setRoll);
          }}
        >
          {fabric?.map((x) => {
            return (
              <SearchSelectItem key={x.fabric} value={x.fabric}>
                {x.fabric}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Product</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleProduct(e, roll, setRoll);
          }}
        >
          {roll.productList?.map((x) => {
            return (
              <SearchSelectItem key={x.product} value={x.product}>
                {x.product}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Extra Charges</h1>
        <input
          onChange={(e) => {
            handleExtraCharges(e, roll, setRoll);
          }}
          className="bg-white  rounded-md border-black w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
        />
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Quantity</h1>
        <input
          onChange={(e) => handleQuantity(e, roll, setRoll)}
          className="bg-white rounded-md  border-black w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
        />
      </div>

      <div className=" mb-[10px]">
        <div className="flex">
          <h1 className="text-sm mr-[30px]">Damage</h1>
          <input
            onClick={(e) => {
              handleDamage(roll, setRoll);
            }}
            type="checkbox"
            className="bg-white"
          />
        </div>
      </div>
      <br />
      <div
        onClick={() => {
          window.location.reload();
        }}
        className="rounded-md mb-[8px] cursor-pointer mx-auto w-[345px] border-[0.25px] sm:w-[400px] text-center  py-2 border-green-700 border-[0.25px] bg-white text-green-700"
      >
        CLEAR
      </div>
      <button
        onClick={() => {
          handleSubmit(roll, setRoll);
        }}
        id="submitButton"
        disabled={false}
        className="rounded-md cursor-pointer mx-auto w-[345px] border-[0.25px] border-[0.25px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
      >
        Submit
      </button>
    </div>
  );
}
