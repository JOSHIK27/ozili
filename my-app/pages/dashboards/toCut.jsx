import { Card, Metric, Text } from "@tremor/react";

export default function () {
  return (
    <Card
      className="max-w-xs mx-auto"
      decoration="top"
      decorationColor="indigo"
    >
      <Text>Sales</Text>
      <Metric>$ 34,743</Metric>
    </Card>
  );
}
