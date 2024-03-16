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
export default function SubFabric({ data, fabricTypes, subFabricTypes }) {
  const [editableRows, setEditableRows] = useState({});
  const [tableData, setTableData] = useState();
  useEffect(() => {
    setTableData(data);
  }, []);
  console.log(tableData);
  const [newRow, setNewRow] = useState({
    component: "",
    fabric: "",
    subfabric: "",
    compcategory: "",
    metersperpiece: "",
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
      .from("componentstbl")
      .select()
      .eq("id", rowData.id);
    console.log(existingSubFabric);
    if (existingSubFabric.data) {
      const { data, error } = await supabase
        .from("componentstbl")
        .update({
          component: rowData.component,
          compcategory: rowData.compcategory,
          subfabric: rowData.subfabric,
          fabric: rowData.fabric,
          metersperpiece: rowData.metersperpiece,
          id: rowData.id,
        })
        .eq("id", rowData.id);
    } else {
      const { data, error } = await supabase.from("componentstbl").insert({
        component: rowData.component,
        compcategory: rowData.compcategory,
        subfabric: rowData.subfabric,
        fabric: rowData.fabric,
        metersperpiece: rowData.metersperpiece,
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
                  Component
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Fabric
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Sub Fabric
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Comp Category
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Meters Per Piece
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Action
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData.map((item, index) => (
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
                        className="rounded border-[0.25px] w-[250px]"
                        value={item.component}
                        onChange={(event) =>
                          handleInputChange(event, index, "component")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <SearchSelect
                        value={item.fabric}
                        onValueChange={(event) =>
                          handleDropDown(event, index, "fabric")
                        }
                        disabled={!editableRows[index]}
                      >
                        {fabricTypes?.map((x) => {
                          return (
                            <SearchSelectItem key={x.fabric} value={x.fabric}>
                              {x.component}
                            </SearchSelectItem>
                          );
                        })}
                      </SearchSelect>
                    </TableCell>
                    <TableCell>
                      <SearchSelect
                        className="rounded border-[0.25px]"
                        value={item.subfabric}
                        onValueChange={(event) =>
                          handleDropDown(event, index, "subfabric")
                        }
                        disabled={!editableRows[index]}
                      >
                        {subFabricTypes.map((i) => (
                          <SearchSelectItem value={i.subfabric}>
                            {i.subfabric}
                          </SearchSelectItem>
                        ))}
                      </SearchSelect>
                    </TableCell>
                    <TableCell>
                      <SearchSelect
                        className="rounded border-[0.25px]"
                        value={item.compcategory}
                        onValueChange={(event) =>
                          handleDropDown(event, index, "compcategory")
                        }
                        disabled={!editableRows[index]}
                      >
                        <SearchSelectItem value="Saree">Saree</SearchSelectItem>
                        <SearchSelectItem value="Top">Top</SearchSelectItem>
                        <SearchSelectItem value="Chunni">
                          Chunni
                        </SearchSelectItem>
                        <SearchSelectItem value="Blouse">
                          Blouse
                        </SearchSelectItem>
                        <SearchSelectItem value="Bottom">
                          Bottom
                        </SearchSelectItem>
                        <SearchSelectItem value="Others">
                          Others
                        </SearchSelectItem>
                      </SearchSelect>
                    </TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.metersperpiece}
                        onChange={(event) =>
                          handleInputChange(event, index, "metersperpiece")
                        }
                        disabled={!editableRows[index]}
                      ></input>
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
          <div className="text-red-500 text-center font-semibold">
            Note - Update the producttbl if any changes or additions made to the
            components table
          </div>
        </Card>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from("componentstbl").select();
  let resp1 = await supabase.from("fabrictbl").select("fabric");
  const resp2 = await supabase.from("subfabrictbl").select("subfabric");
  data.sort((a, b) => a.id - b.id);
  console.log(data);
  return {
    props: {
      data: data,
      fabricTypes: resp1.data,
      subFabricTypes: resp2.data,
    },
  };
}
