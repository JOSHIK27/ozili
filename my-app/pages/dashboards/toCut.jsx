import { supabase } from "@/db/supabase";
import { Card, Text } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  Badge,
  TableCell,
} from "@tremor/react";
export default function ToCut({ data }) {
  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[380px] m-4 colors-tremor-background-faint shadow-2xl">
          <div className="flex ">
            <h1 className="pl-4 font-[800] colors-green">STILL TO CUT</h1>
          </div>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>SUBFABRIC</TableHeaderCell>
                <TableHeaderCell>INITIAL</TableHeaderCell>
                <TableHeaderCell>REMAINING</TableHeaderCell>
                <TableHeaderCell>WASTAGE</TableHeaderCell>
                <TableHeaderCell>WASTAGE%</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow key={item.subfabric}>
                    <TableCell>{item.subfabric}</TableCell>
                    <TableCell>
                      <Text>{item.initial}</Text>
                    </TableCell>
                    <TableCell className="text-green-700">
                      {item.stilltocut}
                    </TableCell>
                    <TableCell className="text-red-700">
                      {item.wastage}
                    </TableCell>
                    <TableCell className="text-red-700">
                      {parseFloat(item.wastagepercent.toFixed(1))}%
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
  const resp = await supabase.from("stilltocut_view").select();
  console.log(resp);
  return {
    props: {
      data: resp.data,
    },
  };
}
