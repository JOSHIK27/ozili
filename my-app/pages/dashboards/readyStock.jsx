import { supabase } from "@/db/supabase";
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import { Switch } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { useState } from "react";
import { Badge } from "@tremor/react";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
} from "@tremor/react";
import { convertToIndianNumberSystem } from "@/lib/utils";

export default function ReadyStockDashBoard({
  fabric,
  product,
  stockWorthArrayByProduct,
  stockWorthArrayByFabric,
  stockWorthArrayByUniqueProductName,
  stockQuantityArrayByUniqueProductName,
  readyQuantityArrayByUniqueProductName,
  salesQuantityArrayByUniqueProductName,
}) {
  const [heading, setHeading] = useState("READY STOCK BY FABRIC");

  const stockWorthMapByProduct = new Map(stockWorthArrayByProduct);

  const stockWorthMapByFabric = new Map(stockWorthArrayByFabric);

  const salesQuantityMapByUniqueProductName = new Map(
    readyQuantityArrayByUniqueProductName
  );
  const readyQuantityMapByUniqueProductName = new Map(
    salesQuantityArrayByUniqueProductName
  );

  const totalQuantityMapByUniqueProductName = new Map(
    stockWorthArrayByUniqueProductName
  );
  const stockWorthMapByUniqueProductName = new Map(
    stockQuantityArrayByUniqueProductName
  );
  const sumOfValues = Array.from(stockWorthMapByProduct.values()).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const sumOfValues2 = Array.from(stockWorthMapByFabric.values()).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const UniqueProductNames = Array.from(
    stockWorthMapByUniqueProductName.keys()
  );

  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[375px] m-4 colors-tremor-background-faint shadow-2xl">
          <Flex justifyContent="between" alignItems="center">
            <Text className="font-[800] colors-green">
              BY {heading == "READY STOCK BY FABRIC" ? "FABRIC" : "PRODUCT"}
            </Text>
            <Switch
              onChange={(e) => {
                if (e == true) {
                  setHeading("READY STOCK BY PRODUCT");
                } else {
                  setHeading("READY STOCK BY FABRIC");
                }
              }}
            />
          </Flex>
          <Metric className="text-8xl mb-[8px]">{fabric.Total}</Metric>

          <Badge className="text-5xl">{`₹ ${convertToIndianNumberSystem(
            sumOfValues
          )}`}</Badge>

          {heading == "READY STOCK BY FABRIC" && (
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>FABRIC</TableHeaderCell>
                  <TableHeaderCell>QTY</TableHeaderCell>
                  <TableHeaderCell>VALUE</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(fabric).map(([key, value]) => {
                  if (value && key != "Total") {
                    return (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>
                          <Text>{value}</Text>
                        </TableCell>
                        <TableCell>
                          <Badge color="emerald">
                            {convertToIndianNumberSystem(
                              stockWorthMapByFabric.get(key)
                            )}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          )}
          {heading == "READY STOCK BY PRODUCT" && (
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>PRODUCT</TableHeaderCell>
                  <TableHeaderCell>QTY</TableHeaderCell>
                  <TableHeaderCell>VALUE</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(product).map(([key, value]) => {
                  if (value && key != "Total") {
                    return (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>
                          <Text>{value}</Text>
                        </TableCell>
                        <TableCell>
                          <Badge color="emerald">
                            {convertToIndianNumberSystem(
                              stockWorthMapByProduct.get(key)
                            )}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[375px] m-4 colors-tremor-background-faint shadow-2xl">
          <Flex className="mb-4" justifyContent="start" alignItems="center">
            <Text className="font-[800] text-[20px] colors-green">
              BY UNIQUE PRODUCTNAME
            </Text>
          </Flex>

          <Table className="mt-5 overflow-y-auto max-h-[400px]">
            <TableHead>
              <TableRow>
                <TableHeaderCell>UNIQUE PRODUCT</TableHeaderCell>
                <TableHeaderCell>CUR</TableHeaderCell>
                <TableHeaderCell>VALUE</TableHeaderCell>
                <TableHeaderCell>INTIAL</TableHeaderCell>
                <TableHeaderCell>SOLD</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {UniqueProductNames.map((item) => {
                return (
                  <TableRow key={item}>
                    <TableCell className="text-[12px]">{item}</TableCell>
                    <TableCell className="text-[12px]">
                      <Text className="text-[12px]">
                        {convertToIndianNumberSystem(
                          totalQuantityMapByUniqueProductName.get(item)
                        )}
                      </Text>
                    </TableCell>
                    <TableCell className="text-[12px]">
                      <Text className="text-[12px]">
                        {convertToIndianNumberSystem(
                          stockWorthMapByUniqueProductName.get(item)
                        )}
                      </Text>
                    </TableCell>
                    <TableCell className="text-[12px]">
                      <Text className="text-[12px]">
                        {convertToIndianNumberSystem(
                          salesQuantityMapByUniqueProductName.get(item)
                        )}
                      </Text>
                    </TableCell>
                    <TableCell className="text-[12px]">
                      <Text className="text-[12px]">
                        {convertToIndianNumberSystem(
                          readyQuantityMapByUniqueProductName.get(item)
                        )}
                      </Text>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("readystock_view2").select();
  const result1 = {};
  resp1.data.forEach((item) => {
    result1["Total"] = (result1["Total"] || 0) + item.totalquantity;
    result1[item.fabric] = (result1[item.fabric] || 0) + item.totalquantity;
  });
  // console.log(resp1.data);
  const result2 = {};
  resp1.data.forEach((item) => {
    result2["Total"] = (result2["Total"] || 0) + parseInt(item.totalquantity);
    result2[item.product] =
      (result2[item.product] || 0) + parseInt(item.totalquantity);
  });
  console.log(resp1.data, result2);
  let keyValueArray = Object.entries(result2);

  keyValueArray.sort((a, b) => b[1] - a[1]);

  let sortedObject = Object.fromEntries(keyValueArray);

  const stockWorthMapByProduct = new Map();
  const stockWorthMapByFabric = new Map();
  resp1.data.forEach((item) => {
    const productName = item.product;
    const stockWorth = item.stock_worth;
    if (stockWorthMapByProduct.has(productName)) {
      stockWorthMapByProduct.set(
        productName,
        stockWorthMapByProduct.get(productName) + stockWorth
      );
    } else {
      stockWorthMapByProduct.set(productName, stockWorth);
    }
  });
  resp1.data.forEach((item) => {
    const fabric = item.fabric;
    const stockWorth = item.stock_worth;
    if (stockWorthMapByFabric.has(fabric)) {
      stockWorthMapByFabric.set(
        fabric,
        stockWorthMapByFabric.get(fabric) + stockWorth
      );
    } else {
      stockWorthMapByFabric.set(fabric, stockWorth);
    }
  });
  const stockWorthArrayByProduct = Array.from(stockWorthMapByProduct.entries());
  const stockWorthArrayByFabric = Array.from(stockWorthMapByFabric.entries());

  const totalQuantityMapByUniqueProductName = new Map();
  const stockWorthMapByUniqueProductName = new Map();
  const salesQuantityMapByUniqueProductName = new Map();
  const readyQuantityMapByUniqueProductName = new Map();
  resp1.data.forEach((item) => {
    const uniqueProduct = item.uniqueproductname;
    const totalQuantity = item.totalquantity ? item.totalquantity : 0;
    const stockWorth = item.stock_worth ? item.stock_worth : 0;
    const initial = item.initial ? item.initial : 0;
    const sold = item.sold ? item.sold : 0;
    totalQuantityMapByUniqueProductName.set(uniqueProduct, totalQuantity);
    stockWorthMapByUniqueProductName.set(uniqueProduct, stockWorth);
    readyQuantityMapByUniqueProductName.set(uniqueProduct, initial);
    salesQuantityMapByUniqueProductName.set(uniqueProduct, sold);
  });
  const stockWorthArrayByUniqueProductName = Array.from(
    totalQuantityMapByUniqueProductName.entries()
  );
  const stockQuantityArrayByUniqueProductName = Array.from(
    stockWorthMapByUniqueProductName.entries()
  );
  const readyQuantityArrayByUniqueProductName = Array.from(
    readyQuantityMapByUniqueProductName.entries()
  );
  const salesQuantityArrayByUniqueProductName = Array.from(
    salesQuantityMapByUniqueProductName.entries()
  );
  return {
    props: {
      fabric: result1,
      product: sortedObject,
      stockWorthArrayByProduct,
      stockWorthArrayByFabric,
      stockWorthArrayByUniqueProductName,
      stockQuantityArrayByUniqueProductName,
      readyQuantityArrayByUniqueProductName,
      salesQuantityArrayByUniqueProductName,
    },
  };
}
