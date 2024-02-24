import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dye } from "@/store/states";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { supabase } from "@/db/supabase";

const handlePrimarySupplier = (e, Dye, setDye) => {
  const { primaryDyer, ...rest } = Dye;
  setDye({ primaryDyer: e, ...rest });
};

const handleSecondaryDyer = (e, Dye, setDye) => {
  const { primaryDyer, secondaryDyer, ...rest } = Dye;
  setDye({ primaryDyer, secondaryDyer: e, ...rest });
};

const handleDyeType = (e, Dye, setDye) => {
  const { primaryDyer, secondaryDyer, dyeType, ...rest } = Dye;
  setDye({ primaryDyer, secondaryDyer, dyeType: e, ...rest });
};

const handleDate = (e, Dye, setDye) => {
  const {
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    date,
    ...rest
  } = Dye;
  setDye({
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    date: e.target.value,
    ...rest,
  });
};
const handleTransaction = (e, Dye, setDye) => {
  const {
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    date,
    transaction,
  } = Dye;
  setDye({
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    date,
    transaction: e,
  });
};
const handleFabricType = async (e, Dye, setDye) => {
  const {
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    ...rest
  } = Dye;
  const { data, error } = await supabase
    .from("products")
    .select("product")
    .eq("fabric", e);
  setDye({
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType: e,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList: data,
    ...rest,
  });
};

const handleDyeStyle = (e, Dye, setDye) => {
  const {
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    ...rest
  } = Dye;
  setDye({
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle: e,
    ...rest,
  });
};

const handleQuantity = (e, Dye, setDye) => {
  const {
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    ...rest
  } = Dye;
  setDye({
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity: e.target.value,
    ...rest,
  });
};
const handleColor = (e, Dye, setDye) => {
  const {
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    ...rest
  } = Dye;
  setDye({
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb: e.target.value,
    productList,
    ...rest,
  });
};
const handleProduct = (e, Dye, setDye) => {
  const {
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    ...rest
  } = Dye;
  setDye({
    primaryDyer,
    secondaryDyer,
    dyeType,
    fabricType,
    product: e,
    dyeStyle,
    quantity,
    colorComb,
    productList,
    ...rest,
  });
};

const handleSubmit = async (Dye) => {
  if (typeof document !== "undefined") {
    document.getElementById("submitButton").disabled = true;
  }
  if (!Dye.date) {
    alert("Enter the date");
    return;
  }
  if (!Dye.transaction) {
    alert("Enter the transaction type");
    return;
  }
  if (!Dye.primaryDyer) {
    alert("Enter the name of Primary Dyer");
    return;
  }
  if (!Dye.secondaryDyer) {
    alert("Enter the name of Secondary Dyer");
    return;
  }

  if (!Dye.dyeType) {
    alert("Enter the Dye Type");
    return;
  }
  if (!Dye.fabricType) {
    alert("Enter the Fabric Type");
    return;
  }
  if (!Dye.product) {
    alert("Enter the Product Name");
    return;
  }
  if (!Dye.dyeStyle) {
    alert("Enter the Dye Style");
    return;
  }

  if (!Dye.quantity) {
    alert("Enter the Quantity Dyed");
    return;
  }
  if (!Dye.colorComb) {
    alert("Enter the Color Combination");
  }
  if (Dye.transaction == "Regular") {
    const { data, error } = await supabase
      .from("products")
      .select("component1, component2, component3")
      .eq("product", Dye.product);
    let c1 = false,
      c2 = false,
      c3 = false;
    if (data[0].component1) {
      const resp = await supabase
        .from("stilltodye_view")
        .select("rawinstock")
        .eq("component", data[0].component1);
      if (resp.data[0].rawinstock < Dye.quantity) {
        c1 = true;
      }
    }
    if (data[0].component2) {
      const resp = await supabase
        .from("stilltodye_view")
        .select("rawinstock")
        .eq("component", data[0].component2);
      if (resp.data[0].rawinstock < Dye.quantity) {
        c2 = true;
      }
    }
    if (data[0].component3) {
      const resp = await supabase
        .from("stilltodye_view")
        .select("rawinstock")
        .eq("component", data[0].component3);
      if (resp.data[0].rawinstock < Dye.quantity) {
        c3 = true;
      }
    }
    if (c1 && c2 && c3) {
      alert(
        data[0].component1 +
          data[0].component2 +
          data[0].component3 +
          " are insufficient"
      );
    } else if (c1 && c2) {
      alert(
        data[0].component1 + " and " + data[0].component2 + " are insufficient"
      );
    } else if (c2 && c3) {
      alert(
        data[0].component2 + " and " + data[0].component3 + " are insufficient"
      );
    } else if (c1 && c3) {
      alert(
        data[0].component1 + " and " + data[0].component3 + " are insufficient"
      );
    } else if (c1) {
      alert(data[0].component1 + " is insufficient");
    } else if (c2) {
      alert(data[0].component2 + " is insufficient");
    } else if (c3) {
      alert(data[0].component3 + " is insufficient");
    }
    fetch("../api/dyeStock", {
      method: "POST",
      body: JSON.stringify(Dye),
    })
      .then((x) => {
        return x.json();
      })
      .then((resp) => {
        if (resp[0] == "success") {
          alert("Added to DB");
        }
      });
  } else {
    if (Dye.transaction == "Exception") {
      console.log(Dye);
      fetch("../api/dyeStock", {
        method: "POST",
        body: JSON.stringify(Dye),
      })
        .then((x) => {
          return x.json();
        })
        .then((resp) => {
          document.getElementById("submitButton").disabled = false;
          if (resp[0] == "success") {
            alert("Added to DB");
          }
          window.location.reload();
        });
    }
  }
};

export default function Dye({ dyeType, dyeStyle, dyer, fabric }) {
  const [Dye, setDye] = useRecoilState(dye);
  return (
    <div>
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="30"
          height="15"
          src="https://img.icons8.com/ios/50/paint-bucket.png"
          alt="paint-bucket"
        />
        <h1 className="text-2xl">DYE STOCK</h1>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Dye Date</h1>
        <input
          type="date"
          className="rounded-md border-[1px] border-black w-[300px] h-[30px]"
          onChange={(e) => {
            handleDate(e, Dye, setDye);
          }}
        />
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Transaction</h1>
        <Select
          onValueChange={(e) => {
            handleTransaction(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"Regular"}>Regular</SelectItem>
            <SelectItem value={"Exception"}>Exception</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Primary Dyer</h1>
        <Select
          onValueChange={(e) => {
            handlePrimarySupplier(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {dyer?.map((x) => {
              return (
                <SelectItem key={x.supplier} value={x.supplier}>
                  {x.supplier}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Secondary Dyer</h1>
        <Select
          onValueChange={(e) => {
            handleSecondaryDyer(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {dyer?.map((x) => {
              return (
                <SelectItem key={x.supplier} value={x.supplier}>
                  {x.supplier}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Dye Type</h1>
        <Select
          onValueChange={(e) => {
            handleDyeType(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {dyeType?.map((x) => {
              return (
                <SelectItem key={x.dyetype} value={x.dyetype}>
                  {x.dyetype}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Fabric Type</h1>
        <Select
          onValueChange={(e) => {
            handleFabricType(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
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

      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Product</h1>
        <Select
          onValueChange={(e) => {
            handleProduct(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Dye.productList?.map((x) => {
              return (
                <SelectItem key={x.product} value={x.product}>
                  {x.product}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Dye Style</h1>
        <Select
          onValueChange={(e) => {
            handleDyeStyle(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {dyeStyle?.map((x) => {
              return (
                <SelectItem key={x.dyestyle} value={x.dyestyle}>
                  {x.dyestyle}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Quantity Coloured </h1>
        <Input
          onChange={(e) => {
            handleQuantity(e, Dye, setDye);
          }}
          className="w-[300px] h-[30px]"
          placeholder="Value"
        />
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Color Combination</h1>
        <Input
          onChange={(e) => {
            handleColor(e, Dye, setDye);
          }}
          className="w-[300px] h-[30px]"
          placeholder="Value"
        />
      </div>

      <div>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          className="border-[0.5px] m-8 border-neutral-400 border-[#4A84F3]"
        >
          CLEAR
        </Button>
        <a
          onClick={() => {
            handleSubmit(Dye);
          }}
          id="submitButton"
          disabled={false}
          class="inline-flex cursor-pointer items-center justify-center rounded-md py-2 sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-blue-500 to-blue-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm h-10 w-full px-4 text-sm sm:w-fit"
        >
          Submit
        </a>
      </div>
    </div>
  );
}
