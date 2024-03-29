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
import { printState } from "@/store/states";
import { supabase } from "@/db/supabase";

const handleSubmit = (print, setPrint) => {
  if (!print.date) {
    alert("Enter the date");
    return;
  }
  if (!print.mainPrinter) {
    alert("Enter Main Printer Details");
    return;
  }
  if (!print.secPrinter) {
    alert("Enter Secondary Printer Details");
    return;
  }
  if (!print.dyeType) {
    alert("Enter Dye Type");
    return;
  }
  if (!print.fabric) {
    alert("Enter Fabric Details");
    return;
  }
  if (!print.product) {
    alert("Enter Product Name");
    return;
  }
  if (!print.printType) {
    alert("Enter Print Type");
    return;
  }
  if (!print.quantity) {
    alert("Enter Quantity Printed");
    return;
  }
  if (!print.transaction) {
    alert("Enter Transaction Type");
    return;
  }
  if (typeof document !== "undefined") {
    document.getElementById("submitButton").disabled = true;
  }

  fetch("../api/printStock", {
    method: "POST",
    body: JSON.stringify(print),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((x) => {
      document.getElementById("submitButton").disabled = false;
      if (x[0] == "success") {
        window.location.reload();
        alert("Added to db");
      } else {
        alert("Quantity Insufficient");
        return;
      }
    });
};

const handleDate = (e, print, setPrint) => {
  const { date, ...rest } = print;
  setPrint({
    date: e.target.value,
    ...rest,
  });
};

const handleMainPrinter = (e, print, setPrint) => {
  const { date, mainPrinter, ...rest } = print;
  setPrint({
    date,
    mainPrinter: e,
    ...rest,
  });
};

const handleSecPrinter = (e, print, setPrint) => {
  const { date, mainPrinter, secPrinter, ...rest } = print;
  setPrint({
    date,
    mainPrinter,
    secPrinter: e,
    ...rest,
  });
};

const handleDyeType = (e, print, setPrint) => {
  const { date, mainPrinter, secPrinter, dyeType, ...rest } = print;
  setPrint({
    date,
    mainPrinter,
    secPrinter,
    dyeType: e,
    ...rest,
  });
};

const handleFabric = async (e, print, setPrint) => {
  const {
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    ...rest
  } = print;
  const { data, error } = await supabase
    .from("products")
    .select("product")
    .eq("fabric", e);
  setPrint({
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric: e,
    productList: data,
    ...rest,
  });
};
const handleProduct = (e, print, setPrint) => {
  const {
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    ...rest
  } = print;
  setPrint({
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product: e,
    ...rest,
  });
};

const handlePrintType = (e, print, setPrint) => {
  const {
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingNotRequired,
    transaction,
  } = print;

  setPrint({
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType: e,
    quantity,
    rollingNotRequired,
    transaction,
  });
};

const handleQuantityPrinted = (e, print, setPrint) => {
  const {
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    ...rest
  } = print;
  setPrint({
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType,
    quantity: parseFloat(e.target.value),
    ...rest,
  });
};

const handleLast = (e, print, setPrint) => {
  const {
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingNotRequired,
    ...rest
  } = print;
  let val = rollingNotRequired;
  setPrint({
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingNotRequired: !val,
    ...rest,
  });
};
const handleTransaction = (e, print, setPrint) => {
  const {
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingNotRequired,
    transaction,
  } = print;
  let val = rollingNotRequired;
  setPrint({
    date,
    mainPrinter,
    secPrinter,
    dyeType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingNotRequired,
    transaction: e,
  });
};

export default function Print({ fabric, dyeType, printType, workers }) {
  const [print, setPrint] = useRecoilState(printState);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/ios-filled/50/print.png"
          alt="print"
        />
        <h1 className="text-2xl font-semibold">PRINT FORM</h1>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Transaction</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleTransaction(e, print, setPrint);
          }}
        >
          <SearchSelectItem value={"Regular"}>Regular</SearchSelectItem>
          <SearchSelectItem value={"Exception"}>Exception</SearchSelectItem>
        </SearchSelect>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Date</h1>
        <input
          type="date"
          className="rounded-md bg-white border-black w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
          onChange={(e) => {
            handleDate(e, print, setPrint);
          }}
        />
      </div>
      <div className="mb-[10px]">
        <h1 className="text-sm">Main Printer</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleMainPrinter(e, print, setPrint);
          }}
        >
          {workers?.map((x) => {
            return (
              <SearchSelectItem key={x.supplier} value={x.supplier}>
                {x.supplier}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Secondary Printer</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleSecPrinter(e, print, setPrint);
          }}
        >
          {workers?.map((x) => {
            return (
              <SearchSelectItem key={x.supplier} value={x.supplier}>
                {x.supplier}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Dye Type</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleDyeType(e, print, setPrint);
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
      <div className=" mb-[10px]">
        <h1 className="text-sm">Fabric</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleFabric(e, print, setPrint);
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
            handleProduct(e, print, setPrint);
          }}
        >
          {print.productList?.map((x) => {
            return (
              <SearchSelectItem key={x.product} value={x.product}>
                {x.product}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Print Type</h1>
        <SearchSelect
          onValueChange={(e) => {
            handlePrintType(e, print, setPrint);
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
        <h1 className="text-sm">Quantity Printed</h1>
        <input
          onChange={(e) => {
            handleQuantityPrinted(e, print, setPrint);
          }}
          className="bg-white rounded-md border-black w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
        />
      </div>
      <div className=" flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Rolling Required</h1>
        <input
          onChange={(e) => {
            handleLast(e, print, setPrint);
          }}
          type="checkbox"
          className="bg-white border-[1px] border-black"
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
          handleSubmit(print, setPrint);
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
