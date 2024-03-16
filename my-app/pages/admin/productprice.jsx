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
export default function ProductPrice({ data, fabricTypes, printTypes }) {
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
      product: "",
      productprice: "",
      fabric: "",
      startdate: "",
      enddate: "",
      printtype: "",
      uniqueproductname: "",
      retailprice: "",
      wholesaleprice: "",
      costprice: "",
      printcode: "",
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
      .from("productpricetbl")
      .select()
      .eq("id", rowData.id);
    console.log(existingSubFabric);
    if (existingSubFabric.data) {
      const { data, error } = await supabase
        .from("productpricetbl")
        .update({
          product: rowData.product,
          productprice: parseFloat(rowData.productprice),
          fabric: rowData.fabric,
          startdate: rowData.startdate,
          enddate: rowData.enddate,
          printtype: rowData.printtype,
          uniqueproductname: rowData.uniqueproductname,
          retailprice: parseFloat(rowData.retailprice),
          wholesaleprice: parseFloat(rowData.wholesaleprice),
          costprice: parseFloat(rowData.costprice),
          printcode: rowData.printcode,
          id: rowData.id,
        })
        .eq("id", rowData.id);
      if (error) {
        alert(error);
      } else {
        alert("Updated successfully");
        window.location.reload();
      }
    } else {
      console.log(rowData);
      const { data, error } = await supabase.from("productpricetbl").insert({
        product: rowData.product,
        productprice: parseFloat(rowData.productprice),
        fabric: rowData.fabric,
        startdate: rowData.startdate,
        enddate: rowData.enddate,
        printtype: rowData.printtype,
        uniqueproductname: rowData.uniqueproductname,
        retailprice: parseFloat(rowData.retailprice),
        wholesaleprice: parseFloat(rowData.wholesaleprice),
        costprice: parseFloat(rowData.costprice),
        printcode: rowData.printcode,
      });
      console.log(error);
      if (error) {
        alert(error);
      } else {
        alert("Added successfully");
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center">
        <Card className="max-w-[800px] m-4 colors-tremor-background-faint shadow-2xl">
          <div className="text-center mb-4 text-2xl text-green-700 font-bold">
            Product Price
          </div>
          <div className="text-red-500 text-center font-semibold">
            Note - Update the producttbl if any changes or additions made to the
            components table
          </div>
          <Table className="mt-8">
            <TableHead>
              <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Id
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Product
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Product Price
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Fabric
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Start Date
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  End Date
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Print Type
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Unique Product Name
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Retail Price
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Wholesale Price
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Cost Price
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Print Code
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
                        value={item.product}
                        onChange={(event) =>
                          handleInputChange(event, index, "product")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>

                    <TableCell>
                      <input
                        className="rounded border-[0.25px] w-[250px]"
                        value={item.productprice}
                        onChange={(event) =>
                          handleInputChange(event, index, "productprice")
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
                              {x.fabric}
                            </SearchSelectItem>
                          );
                        })}
                      </SearchSelect>
                    </TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.startdate}
                        type="date"
                        onChange={(event) =>
                          handleInputChange(event, index, "startdate")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.enddate}
                        type="date"
                        onChange={(event) =>
                          handleInputChange(event, index, "enddate")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <SearchSelect
                        className="rounded border-[0.25px]"
                        value={item.printtype}
                        onValueChange={(event) =>
                          handleDropDown(event, index, "printtype")
                        }
                        disabled={!editableRows[index]}
                      >
                        {printTypes?.map((i) => (
                          <SearchSelectItem
                            key={i.printtype}
                            value={i.printtype}
                          >
                            {i.printtype}
                          </SearchSelectItem>
                        ))}
                      </SearchSelect>
                    </TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.uniqueproductname}
                        onChange={(event) =>
                          handleInputChange(event, index, "uniqueproductname")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.retailprice}
                        onChange={(event) =>
                          handleInputChange(event, index, "retailprice")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.wholesaleprice}
                        onChange={(event) =>
                          handleInputChange(event, index, "wholesaleprice")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <input
                        className="rounded border-[0.25px]"
                        value={item.costprice}
                        onChange={(event) =>
                          handleInputChange(event, index, "costprice")
                        }
                        disabled={!editableRows[index]}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <SearchSelect
                        className="rounded border-[0.25px]"
                        value={item.printcode}
                        onValueChange={(event) =>
                          handleDropDown(event, index, "printcode")
                        }
                        disabled={!editableRows[index]}
                      >
                        {printTypes?.map((i) => (
                          <SearchSelectItem
                            key={i.printcode}
                            value={i.printcode}
                          >
                            {i.printcode}
                          </SearchSelectItem>
                        ))}
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
  const { data } = await supabase.from("productpricetbl").select();
  let resp1 = await supabase.from("fabrictbl").select("fabric");
  const resp2 = await supabase.from("printtypestbl").select();
  console.log(resp2);
  data.sort((a, b) => a.id - b.id);
  console.log(data);
  return {
    props: {
      data: data,
      fabricTypes: resp1.data,
      printTypes: resp2.data,
    },
  };
}
