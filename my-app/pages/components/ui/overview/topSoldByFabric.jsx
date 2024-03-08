import { supabase } from "@/db/supabase";
import { Card, Text, Flex } from "@tremor/react";
import { Switch } from "@tremor/react";
import { useState } from "react";
import { convertToIndianNumberSystem } from "@/lib/utils";
export default function TopSoldByFabric({
  fabricSoldArray,
  fabricAmountArray,
}) {
  const [type, setType] = useState("TOP FABRIC BY SALE QUANTITY");
  const handleToggle = () => {
    if (type == "TOP FABRIC BY SALE QUANTITY") {
      setType("TOP FABRIC BY SALE AMOUNT");
    } else {
      setType("TOP FABRIC BY SALE QUANTITY");
    }
  };

  return (
    <div className="flex justify-center sm:justify-start">
      <Card className="max-w-md m-4 colors-tremor-background-faint shadow-2xl">
        <div className="flex justify-between">
          <Text className="font-[800] colors-green">{type}</Text>
          <Switch
            onChange={() => {
              handleToggle();
            }}
          />
        </div>
        {type == "TOP FABRIC BY SALE QUANTITY" &&
          fabricSoldArray &&
          fabricSoldArray.map((item) => {
            return (
              <div key={item[0]}>
                <Flex className="mt-4">
                  <Text>{item[0]}</Text>
                  <Text>{item[1]}</Text>
                </Flex>
              </div>
            );
          })}
        {type != "TOP FABRIC BY SALE QUANTITY" &&
          fabricAmountArray.map((item) => {
            return (
              <div key={item[0]}>
                <Flex className="mt-4">
                  <Text>{item[0]}</Text>
                  <Text> ₹{convertToIndianNumberSystem(item[1])}</Text>
                </Flex>
              </div>
            );
          })}
      </Card>
    </div>
  );
}

export async function getServerSideProps() {
  const resp3 = await supabase.from("readystock_view2").select();
  console.log(resp3);
  const fabricSoldMap = {};
  const fabricAmountMap = {};
  resp3.data.forEach((product) => {
    const fabric = product.fabric;
    const sold = product.sold;
    const worth = product.sales_worth;
    if (sold !== null) {
      if (fabricSoldMap[fabric] === undefined) {
        fabricSoldMap[fabric] = sold;
        fabricAmountMap[fabric] = worth;
      } else {
        fabricSoldMap[fabric] += sold;
        fabricAmountMap[fabric] += worth;
      }
    }
  });
  const fabricSoldArray = Object.entries(fabricSoldMap);
  const fabricAmountArray = Object.entries(fabricAmountMap);
  fabricSoldArray.sort((a, b) => b[1] - a[1]);
  fabricAmountArray.sort((a, b) => b[1] - a[1]);
  console.log(fabricAmountArray);
  return {
    props: {
      fabricSoldArray,
      fabricAmountArray,
    },
  };
}
