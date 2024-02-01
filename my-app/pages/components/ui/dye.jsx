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
    .select("Product")
    .eq("fabric", e);
  console.log(data);
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
  console.log(Dye);
  const { data, error } = await supabase
    .from("products")
    .select("component1, component2, component3")
    .eq("Product", Dye.product);
  console.log(data);
  let c1 = false,
    c2 = false,
    c3 = false;
  if (data[0].component1) {
    const resp = await supabase
      .from("components")
      .select("availableQuantity")
      .eq("productComponent", data[0].component1);
    if (resp.data[0].availableQuantity < Dye.quantity) {
      c1 = true;
    }
  }
  if (data[0].component2) {
    const resp = await supabase
      .from("components")
      .select("availableQuantity")
      .eq("productComponent", data[0].component2);
    if (resp.data[0].availableQuantity < Dye.quantity) {
      c2 = true;
    }
  }
  if (data[0].component3) {
    const resp = await supabase
      .from("components")
      .select("availableQuantity")
      .eq("productComponent", data[0].component3);
    if (resp.data[0].availableQuantity < Dye.quantity) {
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
    alert("Sucess");
  }
};

export default function Dye({ dyeType, dyeStyle, dyer, fabric }) {
  const [Dye, setDye] = useRecoilState(dye);
  console.log(Dye);
  return (
    <div className="ml-[400px] mt-20">
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
        <h1 className="text-lg">Dye Date</h1>
        <input
          type="date"
          className="bg-[#FFF4ED] border-[1px] border-black w-[300px] h-[30px]"
          onChange={(e) => {
            handleDate(e, Dye, setDye);
          }}
        />
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-lg">Transaction</h1>
        <Select
          onValueChange={(e) => {
            handleTransaction(e, Dye, setDye);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"regular"}>regular</SelectItem>
            <SelectItem value={"adjustment"}>adjustment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-lg">Primary Dyer</h1>
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
        <h1 className="text-lg">Secondary Dyer</h1>
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
        <h1 className="text-lg">Dye Type</h1>
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
        <h1 className="text-lg">Fabric Type</h1>
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
        <h1 className="text-lg">Product</h1>
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
                <SelectItem key={x.Product} value={x.Product}>
                  {x.Product}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-[10px] ml-4">
        <h1 className="text-lg">Dye Style</h1>
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
                <SelectItem key={x.dyeStyle} value={x.dyeStyle}>
                  {x.dyeStyle}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-lg">Quantity Coloured </h1>
        <Input
          onChange={(e) => {
            handleQuantity(e, Dye, setDye);
          }}
          className="w-[300px] h-[30px]"
          placeholder="Value"
        />
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-lg">Color Combination</h1>
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
          className="border-4 m-8 border-neutral-400"
        >
          CLEAR
        </Button>
        <Button
          onClick={() => {
            handleSubmit(Dye);
          }}
          className="border-4 m-8 border-neutral-400"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}
