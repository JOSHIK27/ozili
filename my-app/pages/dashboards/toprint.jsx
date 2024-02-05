import { supabase } from "@/db/supabase";
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
export default function ToPrint({ arr }) {
  return (
    <>
      <UpdatedNav />
      <Card className="w-60 m-4 colors-tremor-background-faint shadow-2xl">
        <Text className="font-[800] colors-green">FOR INHOUSE PRINTING</Text>
        <Metric className="text-7xl">{arr.Total}</Metric>
        {Object.entries(arr).map(([key, value]) => {
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
      </Card>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("stilltoprint_view").select();
  const resp = await supabase.from("screenblendtoprint_view").select();
  const resultObject = {};
  data.forEach((item) => {
    const keys = Object.keys(item).filter(
      (key) => key !== "product" && key != "total"
    );
    keys.forEach((key) => {
      resultObject[key] = (resultObject[key] || 0) + item[key];
    });
  });
  const d = resp.data;
  d.forEach((item) => {
    resultObject["Total"] += item.Total;
    resultObject["Screen Blend"] =
      (resultObject["Screen Blend"] || 0) + item.Total;
  });

  let keyValueArray = Object.entries(resultObject);

  keyValueArray.sort((a, b) => b[1] - a[1]);

  let sortedObject = Object.fromEntries(keyValueArray);

  return {
    props: {
      arr: sortedObject,
    },
  };
}
