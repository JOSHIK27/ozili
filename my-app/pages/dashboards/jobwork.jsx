import { supabase } from "@/db/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { Button } from "@tremor/react";
export default function JobWorkDashboard({ column_names, data, suppliers }) {
  let cnt = 0;
  const [cur_supplier, setSupplier] = useState("initial");
  console.log(data.length);
  return (
    <div>
      <UpdatedNav />
      <div className="max-w-sm flex justify-center">
        <Select
          onValueChange={(e) => {
            setSupplier(e);
          }}
        >
          {suppliers.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </Select>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          size="sm"
        >
          Clear Selection
        </Button>
      </div>
      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            {column_names.map((x) => {
              return (
                <TableHeaderCell
                  key={cnt}
                  className="text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  {x}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            cnt++;
            const temp1 = item.supplier == cur_supplier;
            if (temp1 == true) {
              return (
                <TableRow
                  key={cnt}
                  className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
                >
                  {Object.entries(item).map(([key, value]) => {
                    return <TableCell key={cnt}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            } else if (cur_supplier === "initial") {
              return (
                <TableRow
                  key={cnt}
                  className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
                >
                  {Object.entries(item).map(([key, value]) => {
                    return <TableCell key={cnt}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("stillinjbbysupplier_view").select();
  console.log(resp1);
  const column_names = Object.keys(resp1.data[0]);
  const suppliers = [...new Set(resp1.data.map((obj) => obj.supplier))];
  return {
    props: {
      column_names,
      suppliers,
      data: resp1.data,
    },
  };
}
