import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  fetch("api/printStock", {
    method: "POST",
    body: JSON.stringify(print),
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

const handleDate = (e, print, setPrint) => {
  const { date, ...rest } = print;
  setPrint({
    date: e.target.value,
    ...rest,
  });
};

const handleMainPrinter = (e, print, setPrint) => {
  console.log(e);
  const { date, mainPrinter, ...rest } = print;
  setPrint({
    date,
    mainPrinter: e,
    ...rest,
  });
};

const handleSecPrinter = (e, print, setPrint) => {
  console.log(e);
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
    .select("Product")
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
  console.log(print);
  return (
    <div className="ml-[400px] mt-20">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/ios-filled/50/print.png"
          alt="print"
        />
        <h1 className="text-2xl">PRINT FORM</h1>
      </div>
      <div className="flex mb-[10px] ml-4">
        <h1 className="mr-[48px] text-sm">Date</h1>
        <input
          type="date"
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
          onChange={(e) => {
            handleDate(e, print, setPrint);
          }}
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Main Printer</h1>
        <Select
          onValueChange={(e) => {
            handleMainPrinter(e, print, setPrint);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {workers?.map((x) => {
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
        <h1 className="text-sm mr-[60px]">Secondary Printer</h1>
        <Select
          onValueChange={(e) => {
            handleSecPrinter(e, print, setPrint);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {workers?.map((x) => {
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
        <h1 className="text-sm mr-[60px]">Dye Type</h1>
        <Select
          onValueChange={(e) => {
            handleDyeType(e, print, setPrint);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {dyeType?.map((x) => {
              return (
                <SelectItem key={x.dyeType} value={x.dyeType}>
                  {x.dyeType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Fabric</h1>
        <Select
          onValueChange={(e) => {
            handleFabric(e, print, setPrint);
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
            handleProduct(e, print, setPrint);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {print.productList?.map((x) => {
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
        <h1 className="text-sm mr-[60px]">Print Type</h1>
        <Select
          onValueChange={(e) => {
            handlePrintType(e, print, setPrint);
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
        <h1 className="text-sm mr-[60px]">Quantity Printed</h1>
        <input
          onChange={(e) => {
            handleQuantityPrinted(e, print, setPrint);
          }}
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Rolling Not Required</h1>
        <input
          onChange={(e) => {
            handleLast(e, print, setPrint);
          }}
          type="checkbox"
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px]"
        />
      </div>
      <div className="flex  mb-[10px] ml-4">
        <h1 className="text-sm sm: mr-4">Transaction</h1>
        <Select
          onValueChange={(e) => {
            handleTransaction(e, print, setPrint);
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
            handleSubmit(print, setPrint);
          }}
          className="border-4 m-8 border-neutral-400"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}
