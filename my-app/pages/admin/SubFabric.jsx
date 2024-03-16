import React, { useEffect, useState } from "react";
import { supabase } from "@/db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Card,
} from "@tremor/react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
export default function SubFabric({ data, fabricTypes }) {
  const [editableRows, setEditableRows] = useState({});
  const [tableData, setTableData] = useState();
  useEffect(() => {
    setTableData(data);
  }, []);
  const [newRow, setNewRow] = useState({
    subfabric: "",
    fabric: "",
    units: "",
  });

  const handleEdit = (index) => {
    setEditableRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleInputChange = (event, index, field) => {
    const newData = [...tableData];
    newData[index][field] = event.target.value;
    setTableData(newData);
  };
  const handleDropDown = (event, index, field) => {
    const newData = [...tableData];
    newData[index][field] = event;
    setTableData(newData);
  };
  console.log(tableData);

  const handleAddRow = () => {
    data.push(newRow);
    setNewRow({
      subfabric: "",
      fabric: "",
      units: "",
    });
    setEditableRows((prev) => ({
      ...prev,
      [data.length - 1]: true,
    }));
  };

  const handleSubmit = async (index) => {
    const rowData = tableData[index];
    const originalRowData = editableRows[index];
    const existingSubFabric = await supabase
      .from("subfabrictbl")
      .select()
      .eq("id", rowData.id);
    console.log(existingSubFabric);

    if (existingSubFabric.data) {
      const { data, error } = await supabase
        .from("subfabrictbl")
        .update({
          subfabric: rowData.subfabric,
          fabric: rowData.fabric,
          units: rowData.units,
          id: rowData.id,
        })
        .eq("id", rowData.id);
      console.log(error);
    } else {
      const { data, error } = await supabase.from("subfabrictbl").insert({
        subfabric: rowData.subfabric,
        fabric: rowData.fabric,
        units: rowData.units,
      });
    }
  };

  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center">
        <Card className="max-w-[800px] m-4 colors-tremor-background-faint shadow-2xl">
          <Table className="mt-8">
            <TableHead>
              <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Id
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Sub Fabric
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Fabric
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Units
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Action
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
                        : ""
                    }`}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.subfabric}
                        onChange={(event) =>
                          handleInputChange(event, index, "subfabric")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <SearchSelect
                        onValueChange={(event) =>
                          handleDropDown(event, index, "fabric")
                        }
                        disabled={!editableRows[index]}
                      >
                        {fabricTypes?.map((x) => {
                          return (
                            <SearchSelectItem key={x.fabric} value={x.fabric}>
                              {x.fabric}
                            </SearchSelectItem>
                          );
                        })}
                      </SearchSelect>
                    </TableCell>
                    <TableCell>
                      <SearchSelect
                        className="rounded border-[0.25px]"
                        onValueChange={(event) =>
                          handleDropDown(event, index, "units")
                        }
                        disabled={!editableRows[index]}
                      >
                        <SearchSelectItem value="Meters">
                          Meters
                        </SearchSelectItem>
                        <SearchSelectItem value="Pieces">
                          Pieces
                        </SearchSelectItem>
                      </SearchSelect>
                    </TableCell>
                    <TableCell>
                      <button
                        className={`${
                          editableRows[index]
                            ? "bg-green-700 text-white px-4 py-[4px] rounded"
                            : "bg-blue-700 text-white px-4 py-[4px] rounded"
                        }`}
                        onClick={() => {
                          handleEdit(index);
                          if (editableRows[index]) {
                            handleSubmit(index);
                          }
                        }}
                      >
                        {editableRows[index] ? "Submit" : "Edit"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <button
                    className="bg-green-700 w-[800px] text-white px-4  py-[8px] rounded"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from("subfabrictbl").select();
  let resp1 = await supabase.from("fabrictbl").select("fabric");
  return {
    props: {
      data: data,
      fabricTypes: resp1.data,
    },
  };
}
