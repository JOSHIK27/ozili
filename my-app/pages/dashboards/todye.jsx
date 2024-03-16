import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";

export default function ToPrint({ data }) {
  data.sort((a, b) => a.component.localeCompare(b.component));
  return (
    <>
      <UpdatedNav />
      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Component
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Raw Stock
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Raw Dyed
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Sent For JB
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Current Stock
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.workspace}
              className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
            >
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.component}
              </TableCell>
              <TableCell>{item.rawstock}</TableCell>
              <TableCell>{item.rawdyed}</TableCell>
              <TableCell>{item.rawsentforjb}</TableCell>
              <TableCell>{item.rawinstock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("stilltodye_view").select();
  return {
    props: {
      data: data,
    },
  };
}
