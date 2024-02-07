import { supabase } from "@/db/supabase";
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import { Switch } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { useState } from "react";
import { BarList } from "@tremor/react";
import { List, Bold, ListItem, Title } from "@tremor/react";
export default function ToRoll({ stilltoroll1, stilltoroll2 }) {
  console.log(stilltoroll1);
  let data = [];
  Object.entries(stilltoroll1).forEach(([key, value]) => {
    if (key != "Total") {
      data.push({
        name: key,
        value: value,
      });
    }
  });

  const [type, setType] = useState("FOR ROLLING BY PRINT TYPE");
  return (
    <>
      <UpdatedNav />
      <Card className="w-[300px] m-4 colors-tremor-background-faint shadow-2xl">
        <div className="flex justify-between">
          <Text className="font-[800] colors-green">FOR ROLLING</Text>
          <Switch
            onChange={() => {
              handleToggle(type, setType);
            }}
          />
        </div>
        <Metric className="text-7xl">{stilltoroll1.Total}</Metric>
        <Flex className="mt-4">
          <Text>
            <Bold>Source</Bold>
          </Text>
          <Text>
            <Bold>Visits</Bold>
          </Text>
        </Flex>
        <BarList data={data} className="mt-2" />
      </Card>
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

  return {
    props: {
      stilltoroll1: sortedObject,
    },
  };
}
