import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DateRangePicker } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { convertToIndianNumberSystem } from "@/lib/utils";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { BarChart } from "@tremor/react";

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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const handleFilter = (e, filter, setFilter, field) => {
  console.log(e);
  setFilter({
    ...filter,
    [field]: e,
  });
};

const handleDateRange = (e, filter, setFilter) => {
  setFilter({
    ...filter,
    from: e.from,
    to: e.to,
  });
};

const handleSearch = (filter, sales, setTotalSales) => {
  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.saledate);
    const startDate = filter.from;
    const endDate = filter.to;
    return (
      (startDate ? saleDate >= startDate : true) &&
      (endDate ? saleDate <= endDate : true) &&
      (filter.orderStatus ? filter.orderStatus == sale.orderstatus : true) &&
      (filter.saleType ? filter.saleType == sale.saletype : true) &&
      (filter.saleMode ? filter.saleMode == sale.salemode : true) &&
      (filter.customerName ? filter.customerName == sale.customername : true)
    );
  });
  setTotalSales(filteredSales);
};

const handleSaleSelectItem = (
  id,
  editableFields,
  setEditableFields,
  field,
  e
) => {
  let temp = editableFields.map((item) => {
    if (item.saleid == id) {
      return {
        ...item,
        [field]: e,
      };
    } else {
      return item;
    }
  });
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
      return {
        ...item,
        [field]: d,
      };
    } else {
      return item;
    }
  });

  setEditableFields(temp);
};

const handleBtn = (type, id, setEditModes, editModes, updatedItem) => {
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

export default function OrderList({
  sales,
  saleItems,
  cargoProviders,
  customers,
}) {
  const [editableFields, setEditableFields] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [editModes, setEditModes] = useState("");
  const [viewMoreVisible, setViewMoreVisible] = useState({});
  const [filter, setFilter] = useState({});
  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  useEffect(() => {
    setEditableFields(sales);
    const editmodes = sales.map((i) => {
      return {
        id: i.saleid,
        disabled: true,
      };
    });
    setEditModes(editmodes);
    setTotalSales(sales);
  }, []);

  useEffect(() => {
    let net = 0,
      discount = 0,
      totalQuantity = 0;
    totalSales &&
      totalSales.forEach((item) => {
        net = net + parseFloat(item.netamount);
        totalQuantity = totalQuantity + parseFloat(item.itemsquantity);
        discount = discount + parseFloat(item.discountamount);
      });

    setFilter({
      ...filter,
      totalSaleTransactions: totalSales.length ? totalSales.length : 0,
      totalSaleAmount: net,
      totalQuantity,
      discount,
    });
  }, [totalSales]);

  const monthMap = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    Jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  };
  const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  totalSales &&
    totalSales.forEach((item) => {
      const monthNumeric = parseInt(item.saledate.split("-")[1], 10);
      const monthName = monthNames[monthNumeric - 1];
      console.log(monthName, monthNumeric);
      if (monthMap.hasOwnProperty(monthName)) {
        monthMap[monthName]++;
      }
    });
  console.log(monthMap);
  const chartdata = [];
  for (const month in monthMap) {
    console.log(month, monthMap[month]);
    chartdata.push({
      name: month,
      quantity: parseInt(monthMap[month]),
    });
  }
  console.log(chartdata);

  return (
    <>
      <UpdatedNav />
      <div className="container mx-auto mt-20 p-4">
        <div className="search-form bg-white p-4 mb-4 rounded shadow-md">
          <SearchSelect
            onValueChange={(e) => {
              handleFilter(e, filter, setFilter, "customerName");
            }}
            placeholder="customer name"
            className="mb-4"
          >
            {customers &&
              customers.map((item) => {
                return (
                  <SearchSelectItem key={item} value={item}>
                    {item}
                  </SearchSelectItem>
                );
              })}
          </SearchSelect>
          <DateRangePicker
            className="w-full rounded mb-4"
            onValueChange={(e) => handleDateRange(e, filter, setFilter)}
            enableSelect={false}
          />
          <SearchSelect
            onValueChange={(e) => {
              handleFilter(e, filter, setFilter, "orderStatus");
            }}
            placeholder="order status"
            className="mb-4"
          >
            <SearchSelectItem value="Confirmed">Confirmed</SearchSelectItem>
            <SearchSelectItem value="Processing">Processing</SearchSelectItem>
            <SearchSelectItem value="Shipped">Shipped</SearchSelectItem>
            <SearchSelectItem value="Delivered">Delivered</SearchSelectItem>
            <SearchSelectItem value="Shipped">Cancelled</SearchSelectItem>
          </SearchSelect>
          <SearchSelect
            onValueChange={(e) => {
              handleFilter(e, filter, setFilter, "saleType");
            }}
            placeholder="sale type"
            className="mb-4"
          >
            <SearchSelectItem value="Select">Select</SearchSelectItem>
            <SearchSelectItem value="Retail">Retail</SearchSelectItem>
            <SearchSelectItem value="WholeSale">WholeSale</SearchSelectItem>
            <SearchSelectItem value="Free">Free</SearchSelectItem>
            <SearchSelectItem value="Self Consumption">
              Self Consumption
            </SearchSelectItem>
            <SearchSelectItem value="Dead Stock">Dead Stock</SearchSelectItem>
            <SearchSelectItem value="Other">Other</SearchSelectItem>
          </SearchSelect>
          <SearchSelect
            onValueChange={(e) => {
              handleFilter(e, filter, setFilter, "saleMode");
            }}
            placeholder="sale mode"
            className="mb-4"
          >
            <SearchSelectItem value="Direct">Direct</SearchSelectItem>
            <SearchSelectItem value="Telephone">Telephone</SearchSelectItem>
            <SearchSelectItem value="YouTube">YouTube</SearchSelectItem>
            <SearchSelectItem value="Facebook">Facebook</SearchSelectItem>
            <SearchSelectItem value="Exhibition">Exhibition</SearchSelectItem>
            <SearchSelectItem value="Promotion">Promotion</SearchSelectItem>
            <SearchSelectItem value="Other">Other</SearchSelectItem>
          </SearchSelect>

          <button
            type="button"
            className="w-full p-2 px-4 mb-4 bg-blue-500 text-white rounded cursor-pointer"
            onClick={() => {
              handleSearch(filter, sales, setTotalSales);
            }}
          >
            Search
          </button>
          <button
            type="button"
            className="w-full p-2 px-4 border-blue-500 border text-black rounded cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Clear
          </button>
        </div>

        <div className="summary bg-white rounded shadow-md p-4 mb-4">
          <h2 className="text-2xl mb-2">Summary</h2>
          <p className="mb-2">
            Total Sale Transactions :
            <strong>{filter.totalSaleTransactions}</strong>
          </p>
          <p className="mb-2">
            Total Quantity :<strong>{filter.totalQuantity}</strong>
          </p>
          <p className="mb-2">
            Total Sale Amount :
            <strong className="text-2xl">
              ₹
              {convertToIndianNumberSystem(
                filter.totalSaleAmount ? filter.totalSaleAmount : 0
              )}
            </strong>
          </p>
          <p className="mb-2">
            Discount :<strong>₹{filter.discount}</strong>
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Monthly Sales</AccordionTrigger>
              <AccordionContent>
                <BarChart
                  data={chartdata}
                  index="name"
                  categories={["quantity"]}
                  colors={["blue"]}
                  yAxisWidth={48}
                  borderRadius="tremor-full"
                  onValueChange={(v) => console.log(v)}
                />
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
        {totalSales &&
          totalSales.map((item) => {
            const cardId = item.saleid;
            return (
              <div
                className="order-card bg-white rounded shadow-md p-4 mb-4"
                data-order-id="1"
                key={item.saleid}
              >
                <h3 className="text-2xl">
                  Sale <strong>#{item.saleid}</strong>
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
                  Net Sale Value:
                  <strong>
                    ₹ {convertToIndianNumberSystem(item.netamount)}
                  </strong>
                </p>
                <p>
                  Gross Sale Value:
                  <strong>
                    ₹ {convertToIndianNumberSystem(item.grossamount)}
                  </strong>
                </p>
                {viewMoreVisible[item.saleid] &&
                  editableFields &&
                  editableFields.map((item2) => {
                    let disabled;
                    editModes &&
                      editModes.forEach((temp) => {
                        if (temp.id == item2.saleid) disabled = temp.disabled;
                      });
                    if (item2.saleid == item.saleid) {
                      return (
                        <>
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
                              <SelectItem value="Confirmed">
                                Confirmed
                              </SelectItem>
                              <SelectItem value="Processing">
                                Processing
                              </SelectItem>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Delivered">
                                Delivered
                              </SelectItem>
                              <SelectItem value="Cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
                          />
                          <p>Shipping Charges</p>
                          <input
                            type="text"
                            value={
                              item2.shippingcharges ? item2.shippingcharges : 0
                            }
                            disabled={disabled}
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
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
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
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
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
                          />
                          <p>Due Date</p>
                          <input
                            type="date"
                            disabled={disabled}
                            value={item2.duedate}
                            onChange={(e) => {
                              handleSale(
                                item2.saleid,
                                editableFields,
                                setEditableFields,
                                "duedate",
                                e
                              );
                            }}
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
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
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
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
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
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
                            className="rounded-md border-[1px] border-black  w-80 h-[30px]"
                          />
                        </>
                      );
                    }
                  })}
                {viewMoreVisible[item.saleid] && (
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
                            <TableRow key={saleitem.uniqueproductname}>
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
                )}

                <div className="mt-4">
                  <button
                    onClick={() => {
                      setViewMoreVisible((prev) => ({
                        ...prev,
                        [cardId]: !prev[cardId],
                      }));
                    }}
                    className="rounded border-[0.5px] bg-[#4A84F3] pl-[6px] pr-[6px] pt-[4px] pb-[4px] text-white  border-[#4A84F3] mr-8"
                  >
                    {viewMoreVisible[item.saleid] ? "Hide" : "View More"}
                  </button>

                  {viewMoreVisible[item.saleid] &&
                    editModes &&
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
  const customers = [...new Set(resp1.data.map((sale) => sale.customername))];
  resp1.data.sort((a, b) => {
    return b.saleid - a.saleid;
  });

  return {
    props: {
      sales: resp1.data,
      saleItems: resp2.data,
      cargoProviders: resp3.data,
      customers,
    },
  };
}
