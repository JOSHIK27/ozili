import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UpdatedNav from "../components/ui/updatedNav";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/db/supabase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const handleSaleSelectItem = (
  id,
  editableFields,
  setEditableFields,
  field,
  e
) => {
  let temp = editableFields.map((item) => {
    if (item.saleid == id) {
      console.log("hiii");
      return {
        ...item,
        [field]: e,
      };
    } else {
      return item;
    }
  });
  console.log(temp, editableFields);
  setEditableFields(temp);
};

const handleSale = (id, editableFields, setEditableFields, field, e) => {
  let d;
  if (
    field == "deliverydate" ||
    field == "dateofshipment" ||
    field == "duedate"
  ) {
    d = e.target.value;
  } else {
    d = e.target.value;
  }
  let temp = editableFields.map((item) => {
    if (item.saleid == id) {
      console.log("hiii");
      return {
        ...item,
        [field]: d,
      };
    } else {
      return item;
    }
  });
  console.log(temp, editableFields);
  setEditableFields(temp);
};

const handleBtn = (type, id, setEditModes, editModes, updatedItem) => {
  console.log(updatedItem);
  if (type == "Edit") {
    let temp = editModes.map((item) => {
      if (item.id == id) {
        return {
          id,
          disabled: false,
        };
      } else {
        return item;
      }
    });
    setEditModes(temp);
  } else {
    let temp = editModes.map((item) => {
      if (item.id == id) {
        return {
          id,
          disabled: true,
        };
      } else {
        return item;
      }
    });
    setEditModes(temp);
    fetch("../api/sales", {
      method: "PUT",
      body: JSON.stringify([updatedItem, id]),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw Error("Server Error");
        } else {
          return resp.json();
        }
      })
      .then((res) => {
        if (res[0] == "success") {
          alert("Added to db");
          window.location.reload();
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
};

function convertToIndianNumberSystem(number) {
  if (isNaN(number)) {
    return "Invalid number";
  }

  const numberString = number.toString();

  const splitNumber = numberString.split(".");
  const integerPart = splitNumber[0];

  const decimalPart = splitNumber[1] ? `.${splitNumber[1]}` : "";

  const reverseIntegerPart = integerPart.split("").reverse().join("");
  const formattedIntegerPart = reverseIntegerPart
    .match(/\d{1,3}/g)
    .join(",")
    .split("")
    .reverse()
    .join("");

  return formattedIntegerPart + decimalPart;
}
export default function OrderList({ sales, saleItems, cargoProviders }) {
  const [editableFields, setEditableFields] = useState("");
  const [editModes, setEditModes] = useState("");
  useEffect(() => {
    console.log("triggered");
    setEditableFields(sales);
    const editmodes = sales.map((i) => {
      return {
        id: i.saleid,
        disabled: true,
      };
    });
    setEditModes(editmodes);
  }, []);
  console.log(editableFields);
  return (
    <>
      <UpdatedNav />
      <div className="container mx-auto mt-20 p-4">
        {/* Search form */}
        <div className="search-form bg-white p-4 mb-4 rounded shadow-md">
          <select className="mr-2 p-2 border rounded">
            <option value="">Select Customer</option>
            <option value="customer1">Customer 1</option>
            <option value="customer2">Customer 2</option>
            {/* Add more customers here */}
          </select>
          <input type="date" className="mr-2 p-2 border rounded" />
          <input type="date" className="mr-2 p-2 border rounded" />
          <Select>
            <SelectTrigger className="w-80 h-[30px] bg-white">
              <SelectValue value="Value" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Shipped">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="button"
            className="p-2 px-4 bg-blue-500 text-white rounded cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Summary section */}
        <div className="summary bg-white rounded shadow-md p-4 mb-4">
          <h2 className="text-2xl mb-2">Summary</h2>
          <p className="mb-2">
            <strong>Total Sale Transactions:</strong> 10
          </p>
          <p className="mb-2">
            <strong>Total Sale Amount:</strong> $1000.00
          </p>
          <p className="mb-2">
            <strong>Balance Details:</strong> $500.00 due
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Total Sales Transactions per Month
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Sales by Customer</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Sales by Product Category</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Sales by Sale Type</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Sales by Fabric Type</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <h2 className="text-2xl mb-4">Recent Sales</h2>
        {sales.map((item) => {
          return (
            <div
              className="order-card bg-white rounded shadow-md p-4 mb-4"
              data-order-id="1"
              key={item.saleid}
            >
              <h3 className="text-2xl">
                Sale <strong>#{item.saleid}</strong>{" "}
              </h3>
              <p>
                Customer Name: <strong>{item.customername}</strong>
              </p>
              <p>
                Sale Mode:<strong>{item.salemode}</strong>
              </p>
              <p>
                Sale Type: <strong>{item.saletype}</strong>
              </p>
              <p>
                Date: <strong> {item.saledate}</strong>
              </p>
              <p>
                Net Sale Value:{" "}
                <strong>
                  {" "}
                  ₹ {convertToIndianNumberSystem(item.netamount)}{" "}
                </strong>
              </p>
              <p>
                Gross Sale Value:{" "}
                <strong>
                  {" "}
                  ₹ {convertToIndianNumberSystem(item.grossamount)}{" "}
                </strong>
              </p>

              {editableFields &&
                editableFields.map((item2) => {
                  let disabled;
                  editModes &&
                    editModes.forEach((temp) => {
                      if (temp.id == item2.saleid) disabled = temp.disabled;
                    });
                  if (item2.saleid == item.saleid) {
                    return (
                      <>
                        <h1>Cargo Provider</h1>
                        <SearchSelect
                          value={item2.cargoprovider}
                          onValueChange={(e) => {
                            handleSaleSelectItem(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "cargoprovider",
                              e
                            );
                          }}
                          className="w-80"
                        >
                          {cargoProviders &&
                            cargoProviders.map((item) => {
                              return (
                                <SearchSelectItem
                                  key={item.supplier}
                                  value={item.supplier}
                                >
                                  {item.supplier}
                                </SearchSelectItem>
                              );
                            })}
                        </SearchSelect>
                        <p>Tracking Number</p>
                        <input
                          type="text"
                          value={
                            item2.trackingnumber ? item2.trackingnumber : 0
                          }
                          onChange={(e) => {
                            handleSale(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "trackingnumber",
                              e
                            );
                          }}
                          disabled={disabled}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Shipping Charges</p>
                        <input
                          type="text"
                          value={
                            item2.shippingcharges ? item2.shippingcharges : 0
                          }
                          disabled={disabled}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Shipped Date</p>
                        <input
                          type="date"
                          value={item2.dateofshipment}
                          disabled={disabled}
                          onChange={(e) => {
                            handleSale(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "dateofshipment",
                              e
                            );
                          }}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Delivered Date</p>
                        <input
                          type="date"
                          disabled={disabled}
                          value={item2.dateofdelivery}
                          onChange={(e) => {
                            handleSale(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "dateofdelivery",
                              e
                            );
                          }}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Due Date</p>
                        <input
                          type="date"
                          disabled={disabled}
                          value={item2.duedate}
                          onChange={(e) => {
                            console.log(e.target.value);
                            handleSale(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "duedate",
                              e
                            );
                          }}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Discount Value</p>
                        <input
                          type="text"
                          disabled={disabled}
                          value={item2.discountamount}
                          onChange={(e) => {
                            handleSale(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "discountamount",
                              e
                            );
                          }}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Amount Received</p>
                        <input
                          type="text"
                          disabled={disabled}
                          value={item2.amountreceived}
                          onChange={(e) => {
                            handleSale(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "amountreceived",
                              e
                            );
                          }}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Amount Due</p>
                        <input
                          type="text"
                          value={item2.amountdue}
                          disabled={disabled}
                          onChange={(e) => {
                            handleSale(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "amountdue",
                              e
                            );
                          }}
                          className="rounded-md border-[1px] border-black w-[120px] sm:w-80 h-[30px]"
                        />
                        <p>Order Status</p>
                        <Select
                          value={item2.orderstatus}
                          onValueChange={(e) => {
                            handleSaleSelectItem(
                              item2.saleid,
                              editableFields,
                              setEditableFields,
                              "orderstatus",
                              e
                            );
                          }}
                        >
                          <SelectTrigger
                            disabled={disabled}
                            className="w-80 h-[30px] bg-white"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Processing">
                              Processing
                            </SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    );
                  }
                })}
              <Table>
                <TableHeader className="bg-slate-200">
                  <TableRow>
                    <TableHead className="w-[200px]">Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Line Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saleItems.map((saleitem) => {
                    if (saleitem.saleid == item.saleid) {
                      return (
                        <TableRow key={saleitem.saleid}>
                          <TableCell className="font-medium">
                            {saleitem.uniqueproductname}
                          </TableCell>
                          <TableCell>{saleitem.quantity}</TableCell>
                          <TableCell>{saleitem.unitprice}</TableCell>
                          <TableCell className="text-right">
                            {saleitem.totalprice}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>

              <div className="mt-4">
                <button className="rounded border-[0.5px] bg-[#4A84F3] pl-[6px] pr-[6px] pt-[4px] pb-[4px] text-white  border-[#4A84F3] mr-8">
                  View More
                </button>
                {editModes &&
                  editModes.map((item3) => {
                    let updatedItem = editableFields.filter((i) => {
                      if (i.saleid == item3.id) return true;
                    });
                    if (item3.id == item.saleid) {
                      if (item3.disabled == true) {
                        return (
                          <button
                            key={item3.id}
                            onClick={() => {
                              handleBtn(
                                "Edit",
                                item.saleid,
                                setEditModes,
                                editModes
                              );
                            }}
                            className="rounded border-[0.5px] border-[#4A84F3] pl-[6px] pr-[6px] pt-[4px] pb-[4px]  border-[#4A84F3]"
                          >
                            Edit
                          </button>
                        );
                      } else {
                        return (
                          <button
                            key={item3.id}
                            onClick={() => {
                              handleBtn(
                                "Save",
                                item.saleid,
                                setEditModes,
                                editModes,
                                updatedItem[0]
                              );
                            }}
                            className="rounded border-[0.5px] border-[#4A84F3] pl-[6px] pr-[6px] pt-[4px] pb-[4px]  border-[#4A84F3]"
                          >
                            Save
                          </button>
                        );
                      }
                    }
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("salestbl").select();
  const resp2 = await supabase.from("saleitemstbl").select();
  const resp3 = await supabase.from("suppliertbl").select("supplier");
  return {
    props: {
      sales: resp1.data,
      saleItems: resp2.data,
      cargoProviders: resp3.data,
    },
  };
}
