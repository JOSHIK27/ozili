import { supabase } from "@/db/supabase";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout, Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
export default function ToPrint({ arr }) {
  console.log(typeof arr, arr);
  return (
    <>
      <Card className="w-60 colors-tremor-background-faint shadow-2xl">
        <Text className="font-[800] colors-green">FOR INHOUSE PRINTING</Text>
        <Metric className="text-8xl">{arr.Total}</Metric>
        {Object.entries(arr).map(([key, value]) => {
          if (key != "Total") {
            return (
              <div>
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
  const resultObject = {};
  data.forEach((item) => {
    const keys = Object.keys(item).filter(
      (key) => key !== "product" && key != "total"
    );
    keys.forEach((key) => {
      resultObject[key] = (resultObject[key] || 0) + item[key];
    });
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
