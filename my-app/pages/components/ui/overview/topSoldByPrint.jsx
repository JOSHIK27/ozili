import { supabase } from "@/db/supabase";
import { Card, Text, Flex } from "@tremor/react";
import { Switch } from "@tremor/react";
import { useState } from "react";
import { convertToIndianNumberSystem } from "@/lib/utils";
export default function TopSoldByPrint({ printSoldArray, printAmountArray }) {
  const [type, setType] = useState("TOP PRINT BY SALE QUANTITY");
  const handleToggle = () => {
    if (type == "TOP PRINT BY SALE QUANTITY") {
      setType("TOP PRINT BY SALE AMOUNT");
    } else {
      setType("TOP PRINT BY SALE QUANTITY");
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

        {type == "TOP PRINT BY SALE QUANTITY" &&
          printSoldArray &&
          printSoldArray.map((item) => {
            return (
              <div key={item[0]}>
                <Flex className="mt-4">
                  <Text>{item[0]}</Text>
                  <Text>{item[1]}</Text>
                </Flex>
              </div>
            );
          })}
        {type != "TOP PRINT BY SALE QUANTITY" &&
          printAmountArray.map((item) => {
            return (
              <div key={item[0]}>
                <Flex className="mt-4">
                  <Text>{item[0]}</Text>
                  <Text>{convertToIndianNumberSystem(item[1])}</Text>
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
  const printSoldMap = {};
  const printAmountMap = {};
  resp3.data.forEach((product) => {
    const printtype = product.printtype;
    const sold = product.sold;
    const worth = product.sales_worth;
    if (sold !== null) {
      if (printSoldMap[printtype] === undefined) {
        printSoldMap[printtype] = sold;
        printAmountMap[printtype] = worth;
      } else {
        printSoldMap[printtype] += sold;
        printAmountMap[printtype] += worth;
      }
    }
  });
  const printSoldArray = Object.entries(printSoldMap);
  const printAmountArray = Object.entries(printAmountMap);
  console.log(printSoldArray);
  printSoldArray.sort((a, b) => b[1] - a[1]);
  printAmountArray.sort((a, b) => b[1] - a[1]);
  return {
    props: {
      printSoldArray,
      printAmountArray,
    },
  };
}
