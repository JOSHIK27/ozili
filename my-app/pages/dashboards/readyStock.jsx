import { supabase } from "@/db/supabase";
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import { Switch } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { useState } from "react";
import { List, ListItem, Title } from "@tremor/react";

export default function ReadyStockDashBoard({ fabric, product }) {
  const [heading, setHeading] = useState("READY STOCK BY FABRIC");
  console.log(heading);
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <div className="flex justify-between">
            <Text className="font-[800] colors-green">{heading}</Text>
            <Switch
              onChange={(e) => {
                if (e == true) {
                  setHeading("READY STOCK BY PRODUCT");
                } else {
                  setHeading("READY STOCK BY FABRIC");
                }
              }}
            />
          </div>
          <br />
          <Metric className="text-8xl">{fabric.Total}</Metric>
          {heading == "READY STOCK BY FABRIC" && (
            <List>
              {Object.entries(fabric).map(([key, value]) => {
                if (value && key != "Total") {
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
          {heading == "READY STOCK BY PRODUCT" && (
            <List>
              {Object.entries(product).map(([key, value]) => {
                if (value && key != "Total") {
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
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("readystock_view").select();
  const result1 = {};
  resp1.data.forEach((item) => {
    result1["Total"] = (result1["Total"] || 0) + item.total;
    result1[item.fabric] = (result1[item.fabric] || 0) + item.total;
  });
  const result2 = {};
  resp1.data.forEach((item) => {
    result2["Total"] = (result2["Total"] || 0) + item.total;
    result2[item.product] = (result1[item.product] || 0) + item.total;
  });
  let keyValueArray = Object.entries(result2);

  keyValueArray.sort((a, b) => b[1] - a[1]);

  let sortedObject = Object.fromEntries(keyValueArray);
  return {
    props: {
      fabric: result1,
      product: sortedObject,
    },
  };
}
