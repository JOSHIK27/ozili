import { Input } from "@/components/ui/input";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { dye } from "@/store/states";
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
    console.log(data);
    let c1 = false,
      c2 = false,
      c3 = false;
    if (data[0].component1) {
      const resp = await supabase
        .from("stilltodye_view")
        .select("rawinstock")
        .eq("component", data[0].component1);
      console.log(resp);
      if (!resp.data[0]) {
        c1 = true;
      } else if (resp.data[0].rawinstock < Dye.quantity) {
        c1 = true;
      }
    }
    if (data[0].component2) {
      const resp = await supabase
        .from("stilltodye_view")
        .select("rawinstock")
        .eq("component", data[0].component2);
      if (!resp.data[0]) {
        c2 = true;
      } else if (resp.data[0].rawinstock < Dye.quantity) {
        c2 = true;
      }
    }
    if (data[0].component3) {
      const resp = await supabase
        .from("stilltodye_view")
        .select("rawinstock")
        .eq("component", data[0].component3);
      if (!resp.data[0]) {
        c1 = true;
      } else if (resp.data[0].rawinstock < Dye.quantity) {
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
    } else {
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
  } else {
    if (Dye.transaction == "Exception") {
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
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="30"
          height="15"
          src="https://img.icons8.com/ios/50/paint-bucket.png"
          alt="paint-bucket"
        />
        <h1 className="text-2xl font-semibold">DYE STOCK</h1>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Dye Date</h1>
        <input
          type="date"
          className="rounded-md border-[0.25px] border-black w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
          onChange={(e) => {
            handleDate(e, Dye, setDye);
          }}
        />
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Transaction</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleTransaction(e, Dye, setDye);
          }}
        >
          <SearchSelectItem value={"Regular"}>Regular</SearchSelectItem>
          <SearchSelectItem value={"Exception"}>Exception</SearchSelectItem>
        </SearchSelect>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Primary Dyer</h1>
        <SearchSelect
          onValueChange={(e) => {
            handlePrimarySupplier(e, Dye, setDye);
          }}
        >
          {dyer?.map((x) => {
            return (
              <SearchSelectItem key={x.supplier} value={x.supplier}>
                {x.supplier}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Secondary Dyer</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleSecondaryDyer(e, Dye, setDye);
          }}
        >
          {dyer?.map((x) => {
            return (
              <SearchSelectItem key={x.supplier} value={x.supplier}>
                {x.supplier}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Dye Type</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleDyeType(e, Dye, setDye);
          }}
        >
          {dyeType?.map((x) => {
            return (
              <SearchSelectItem key={x.dyetype} value={x.dyetype}>
                {x.dyetype}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Fabric Type</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleFabricType(e, Dye, setDye);
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

      <div className="mb-[10px] ">
        <h1 className="text-sm">Product</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleProduct(e, Dye, setDye);
          }}
        >
          {Dye.productList?.map((x) => {
            return (
              <SearchSelectItem key={x.product} value={x.product}>
                {x.product}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>

      <div className="mb-[10px] ">
        <h1 className="text-sm">Dye Style</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleDyeStyle(e, Dye, setDye);
          }}
        >
          {dyeStyle?.map((x) => {
            return (
              <SearchSelectItem key={x.dyestyle} value={x.dyestyle}>
                {x.dyestyle}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Quantity Coloured </h1>
        <Input
          onChange={(e) => {
            handleQuantity(e, Dye, setDye);
          }}
          className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
          placeholder="Value"
        />
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Color Combination</h1>
        <Input
          onChange={(e) => {
            handleColor(e, Dye, setDye);
          }}
          className="w-[345px]  sm:w-[400px] border-[0.25px] h-[30px] bg-white"
          placeholder="Value"
        />
      </div>
      <br />
      <div
        onClick={() => {
          window.location.reload();
        }}
        className="rounded-md mb-[8px] cursor-pointer mx-auto w-[345px] sm:w-[400px] text-center  py-2 border-green-700 border-[0.25px] bg-white text-green-700"
      >
        CLEAR
      </div>
      <button
        onClick={() => {
          handleSubmit(Dye);
        }}
        id="submitButton"
        disabled={false}
        className="rounded-md cursor-pointer mx-auto w-[345px] border-[0.25px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
      >
        Submit
      </button>
    </div>
  );
}
