import { supabase } from "@/db/supabase";
import {
  Card,
  Metric,
  Text,
  Flex,
  Bold,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  BarList,
  Badge,
  Switch,
} from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { useState } from "react";
import { convertToIndianNumberSystem } from "@/lib/utils";
const handleToggle = (type, setType, setisSwitchOn, isSwitchOn) => {
  if (type == "TO ROLL BY PRINT TYPE") {
    setType("TO ROLL BY PRODUCT");
    setisSwitchOn(!isSwitchOn);
  } else {
    setType("TO ROLL BY PRINT TYPE");
    setisSwitchOn(!isSwitchOn);
  }
};

export default function ToRoll({
  stilltoroll1,
  stilltoroll2,
  stillinroll1,
  stillinroll2,
  quantity,
  charges,
  stockWorth,
  stilltoroll3,
  stillinroll3,
}) {
  const [type, setType] = useState("TO ROLL BY PRINT TYPE");
  const [isSwitchOn, setisSwitchOn] = useState(false);
  let data = [];
  let data2 = [];
  if (type == "TO ROLL BY PRINT TYPE") {
    Object.entries(stilltoroll1).forEach(([key, value]) => {
      if (
        key != "Total" &&
        key != "fabric" &&
        key != "stock_worth" &&
        key != "charges payable" &&
        value
      ) {
        data.push({
          name: key,
          value: value,
        });
      }
    });
  } else {
    Object.entries(stilltoroll2).forEach(([key, value]) => {
      if (key != "Total" && value) {
        data.push({
          name: key,
          value: value,
        });
      }
    });
  }
  Object.entries(stillinroll1).forEach(([key, value]) => {
    if (key != "Total" && value) {
      data2.push({
        name: key,
        value: value,
      });
    }
  });

  return (
    <>
      <UpdatedNav />
      {type == "TO ROLL BY PRINT TYPE" && (
        <div className="flex justify-center sm:justify-start">
          <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
            <div className="flex justify-between mb-4">
              <Text className="font-[800] colors-green">{type}</Text>
              <Switch
                id="switch"
                name="switch"
                checked={isSwitchOn}
                onChange={() => {
                  handleToggle(type, setType, setisSwitchOn, isSwitchOn);
                }}
              />
            </div>
            <div className="flex justify-between">
              <Metric className="text-7xl">{stilltoroll1.Total}</Metric>
              <i className="text-[16px] mt-[7px]">
                ₹{convertToIndianNumberSystem(stockWorth)}
              </i>
            </div>
            <Flex className="mt-4">
              <Text>
                <Bold>PRINT TYPE</Bold>
              </Text>
              <Text>
                <Bold>QTY</Bold>
              </Text>
            </Flex>
            <BarList data={data} className="mt-2" />
          </Card>
        </div>
      )}
      {type != "TO ROLL BY PRINT TYPE" && (
        <div className="flex justify-center sm:justify-start">
          <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
            <div className="flex justify-between mb-4">
              <Text className="font-[800] colors-green">{type}</Text>
              <Switch
                id="switch"
                name="switch"
                checked={isSwitchOn}
                onChange={() => {
                  handleToggle(type, setType, setisSwitchOn, isSwitchOn);
                }}
              />
            </div>
            <div className="flex justify-between">
              <Metric className="text-7xl">{stilltoroll2.Total}</Metric>
              <i className="text-[16px] mt-[7px]">
                ₹{convertToIndianNumberSystem(stockWorth)}
              </i>
            </div>
            <Flex className="mt-4">
              <Text>
                <Bold>PRODUCT</Bold>
              </Text>
              <Text>
                <Bold>QTY</Bold>
              </Text>
            </Flex>
            <BarList data={data} className="mt-2" />
          </Card>
        </div>
      )}
      <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
        <div className="flex justify-between">
          <Text className="font-[800] colors-green">TO ROLL BY PRODUCT ID</Text>
        </div>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>PRODUCT ID</TableHeaderCell>
              <TableHeaderCell>QTY</TableHeaderCell>
              <TableHeaderCell>AMT</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stilltoroll3.map((item) => {
              return (
                <TableRow key={item.uniqueproductname}>
                  <TableCell>{item.uniqueproductname}</TableCell>
                  <TableCell>
                    <Text>{item.total}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{convertToIndianNumberSystem(item.stock_worth)}</Text>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <div className="flex justify-between">
            <Text className="font-[800] colors-green">
              IN ROLLING BY FABRIC
            </Text>
          </div>
          <Metric className="text-7xl">{stillinroll1.Total}</Metric>
          <Flex className="mt-4">
            <Text>
              <Bold>FABRIC</Bold>
            </Text>
            <Text>
              <Bold>QTY</Bold>
            </Text>
          </Flex>
          <BarList data={data2} className="mt-2" />
        </Card>
      </div>
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <Flex justifyContent="between" alignItems="center">
            <Text className="font-[800] colors-green">
              IN ROLLING BY PRODUCT
            </Text>
            <Badge
              color="bg-red-100  text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20"
              size="xl"
            >
              {`₹ ${charges}`}
            </Badge>
          </Flex>
          <Metric className="text-8xl">{quantity}</Metric>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>PRODUCT</TableHeaderCell>
                <TableHeaderCell>QTY</TableHeaderCell>
                <TableHeaderCell>CHARGES</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stillinroll2.map((item) => {
                if (item.Total) {
                  return (
                    <TableRow key={item.product}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>
                        <Text>{item.Total}</Text>
                      </TableCell>
                      <TableCell>
                        <Badge color="emerald">{item["charges payable"]}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
      <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
        <div className="flex justify-between">
          <Text className="font-[800] colors-green">IN ROLL BY PRODUCT ID</Text>
        </div>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>PRODUCT ID</TableHeaderCell>
              <TableHeaderCell>QTY</TableHeaderCell>
              <TableHeaderCell>AMT</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stillinroll3.map((item) => {
              return (
                <TableRow key={item.uniqueproductname}>
                  <TableCell>{item.uniqueproductname}</TableCell>
                  <TableCell>
                    <Text>{item.total}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{convertToIndianNumberSystem(item.stock_worth)}</Text>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase.from("stilltoroll_view").select();
  let stockWorth = 0;
  data &&
    data.forEach((item) => {
      stockWorth = stockWorth + (item.stock_worth ? item.stock_worth : 0);
    });
  const stilltoroll1 = {};
  data.forEach((item) => {
    const keys = Object.keys(item).filter(
      (key) => key !== "product" && key != "total"
    );
    keys.forEach((key) => {
      stilltoroll1[key] = (stilltoroll1[key] || 0) + item[key];
    });
  });

  let keyValueArray = Object.entries(stilltoroll1);

  keyValueArray.sort((a, b) => b[1] - a[1]);

  let sortedObject = Object.fromEntries(keyValueArray);

  const resp_obj = await supabase.from("stilltoroll_view").select();
  const stilltoroll2 = {};

  resp_obj.data.forEach((item) => {
    stilltoroll2["Total"] = (stilltoroll2["Total"] || 0) + item.Total;
    stilltoroll2[item.product] = (stilltoroll2[item.product] || 0) + item.Total;
  });

  let keyValueArray2 = Object.entries(stilltoroll2);

  keyValueArray2.sort((a, b) => b[1] - a[1]);

  let sortedObject2 = Object.fromEntries(keyValueArray2);

  const resp3 = await supabase.from("stillinrollbyfabric_view").select();

  const stillinroll1 = {};

  resp3.data.forEach((item) => {
    stillinroll1["Total"] = (stillinroll1["Total"] || 0) + item.Total;
    stillinroll1[item.fabric] = (stillinroll1[item.fabric] || 0) + item.Total;
  });

  let keyValueArray3 = Object.entries(stillinroll1);

  keyValueArray3.sort((a, b) => b[1] - a[1]);

  let sortedObject3 = Object.fromEntries(keyValueArray3);

  //

  const resp4 = await supabase.from("stillinroll_view").select();
  let quantity = 0;
  let charges = 0;
  resp4.data.forEach((x) => {
    quantity += x.Total;
    charges += x["charges payable"];
  });

  const resp5 = await supabase.from("stilltoroll_view2").select();
  const resp6 = await supabase.from("stillinroll_view2").select();

  return {
    props: {
      stilltoroll1: sortedObject,
      stilltoroll2: sortedObject2,
      stillinroll1: sortedObject3,
      stillinroll2: resp4.data,
      quantity,
      charges,
      stockWorth,
      stilltoroll3: resp5.data,
      stillinroll3: resp6.data,
    },
  };
}
