import { supabase } from "@/db/supabase";
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import { Switch } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { useState } from "react";
import { List, ListItem, Title } from "@tremor/react";

const handleToggle = (type, setType) => {
  if (type == "FOR PRINTING BY DYE TYPE") {
    setType("FOR PRINTING BY FABRIC");
  } else {
    setType("FOR PRINTING BY DYE TYPE");
  }
};

export default function ToPrint({ stilltoprint1, stilltoprint2 }) {
  const [type, setType] = useState("FOR PRINTING BY DYE TYPE");
  return (
    <>
      <UpdatedNav />
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <div className="flex justify-between">
            <Text className="font-[800] colors-green">{type}</Text>
            <Switch
              onChange={() => {
                handleToggle(type, setType);
              }}
            />
          </div>
          <Metric className="text-7xl">{stilltoprint1.Total}</Metric>
          {type == "FOR PRINTING BY DYE TYPE" &&
            Object.entries(stilltoprint1).map(([key, value]) => {
              if (key != "Total") {
                return (
                  <div key={key}>
                    <Flex className="mt-4">
                      <Text>{key}</Text>
                      <Text>{value}</Text>
                    </Flex>
                    <ProgressBar value={value} className="mt-2" />
                  </div>
                );
              }
            })}
          {type == "FOR PRINTING BY FABRIC" && (
            <List>
              {Object.entries(stilltoprint2).map(([key, value]) => {
                if (key != "Total") {
                  return (
                    <ListItem key={key}>
                      <span>{key}</span>
                      <span>{value}</span>
                    </ListItem>
                  );
                }
              })}
            </List>
          )}
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase.from("stilltoprint_view").select();
  const resp = await supabase.from("screenblendtoprint_view").select();
  const stilltoprint1 = {};
  data.forEach((item) => {
    const keys = Object.keys(item).filter(
      (key) => key !== "product" && key != "total"
    );
    keys.forEach((key) => {
      stilltoprint1[key] = (stilltoprint1[key] || 0) + item[key];
    });
  });
  const d = resp.data;
  d.forEach((item) => {
    stilltoprint1["Total"] += item.Total;
    stilltoprint1["Screen Blend"] =
      (stilltoprint1["Screen Blend"] || 0) + item.Total;
  });

  let keyValueArray = Object.entries(stilltoprint1);

  keyValueArray.sort((a, b) => b[1] - a[1]);

  let sortedObject = Object.fromEntries(keyValueArray);

  const resp_obj = await supabase.from("stilltoprintbyfabric_view").select();
  const resp2 = await supabase.from("screenblendbyfabric_view").select();
  const stilltoprint2 = {};

  resp_obj.data.forEach((item) => {
    stilltoprint2["Total"] = (stilltoprint2["Total"] || 0) + item.Total;
    stilltoprint2[item.fabric] = (stilltoprint2[item.fabric] || 0) + item.Total;
  });
  const d2 = resp2.data;
  d2.forEach((item) => {
    stilltoprint2["Total"] = (stilltoprint2["Total"] || 0) + item.Remaining;
    stilltoprint2[item.fabric] =
      (stilltoprint2[item.fabric] || 0) + item.Remaining;
  });

  let keyValueArray2 = Object.entries(stilltoprint2);

  keyValueArray2.sort((a, b) => b[1] - a[1]);

  let sortedObject2 = Object.fromEntries(keyValueArray2);
  return {
    props: {
      stilltoprint1: sortedObject,
      stilltoprint2: sortedObject2,
    },
  };
}
