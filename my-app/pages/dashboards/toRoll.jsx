import { supabase } from "@/db/supabase";
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import { Switch } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { useState } from "react";
import { BarList } from "@tremor/react";
import { List, Bold, ListItem, Title } from "@tremor/react";

const handleToggle = (type, setType, setisSwitchOn, isSwitchOn) => {
  if (type == "FOR ROLLING BY PRINT TYPE") {
    setType("FOR ROLLING BY PRODUCT");
    setisSwitchOn(!isSwitchOn);
  } else {
    setType("FOR ROLLING BY PRINT TYPE");
    setisSwitchOn(!isSwitchOn);
  }
};

export default function ToRoll({ stilltoroll1, stilltoroll2 }) {
  const [type, setType] = useState("FOR ROLLING BY PRINT TYPE");
  const [isSwitchOn, setisSwitchOn] = useState(false);
  let data = [];
  if (type == "FOR ROLLING BY PRINT TYPE") {
    Object.entries(stilltoroll1).forEach(([key, value]) => {
      if (key != "Total" && value) {
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

  return (
    <>
      <UpdatedNav />
      {type == "FOR ROLLING BY PRINT TYPE" && (
        <div className="flex justify-center sm:justify-start">
          <Card className="w-[350px] m-4 colors-tremor-background-faint shadow-2xl">
            <div className="flex justify-between">
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
            <Metric className="text-7xl">{stilltoroll1.Total}</Metric>
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
      {type != "FOR ROLLING BY PRINT TYPE" && (
        <div className="flex justify-center sm:justify-start">
          <Card className="w-[350px] m-4 colors-tremor-background-faint shadow-2xl">
            <div className="flex justify-between">
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
            <Metric className="text-7xl">{stilltoroll2.Total}</Metric>
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
    </>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase.from("stilltoroll_view").select();
  console.log(data);
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
  console.log(sortedObject2);

  const resp3 = await supabase.from("stillinroll_view").select();
  console.log(resp3.data);

  return {
    props: {
      stilltoroll1: sortedObject,
      stilltoroll2: sortedObject2,
    },
  };
}
