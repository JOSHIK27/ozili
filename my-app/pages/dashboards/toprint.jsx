import { supabase } from "@/db/supabase";
import {
  Card,
  Metric,
  Text,
  Flex,
  ProgressBar,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  Badge,
  TableCell,
} from "@tremor/react";
import { Switch } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { use, useEffect, useState } from "react";
import {
  convertDateFormat,
  calculateDaysBetweenDates,
  convertToIndianNumberSystem,
} from "@/lib/utils";
import {
  List,
  ListItem,
  DateRangePicker,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";

const handleToggle = (type, setType) => {
  if (type == "FOR PRINTING BY DYE TYPE") {
    setType("FOR PRINTING BY FABRIC");
  } else {
    setType("FOR PRINTING BY DYE TYPE");
  }
};

export default function ToPrint({
  stilltoprint1,
  stilltoprint2,
  printCharges,
  uniqueMainPrinters,
  uniquePrintTypes,
}) {
  const [type, setType] = useState("FOR PRINTING BY DYE TYPE");
  const [filter, setFilter] = useState(null);
  const [records, setRecords] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [charges, setCharges] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfWorkDays, setNumberOfWorkDays] = useState(0);
  console.log(filter);

  useEffect(() => {
    let quantity = 0,
      charges = 0;
    printCharges.forEach((item) => {
      quantity = quantity + parseInt(item.total_quantity);
      charges = charges + parseInt(item.total_charges);
    });
    setQuantity(quantity);
    setCharges(charges);
    setNumberOfDays(daysCount(printCharges));
    setRecords(printCharges);
    setNumberOfWorkDays(workingDaysCount(printCharges));
  }, []);
  const handlePrinter = (e) => {
    setFilter({
      ...filter,
      printerName: e,
    });
  };
  const handleDateRange = (e) => {
    setFilter({
      ...filter,
      from: e.from,
      to: e.to,
    });
  };
  const handlePrintType = (e) => {
    setFilter({
      ...filter,
      printType: e,
    });
  };
  const daysCount = (arr) => {
    const transactionDates = arr.map(
      (transaction) => new Date(transaction.transaction_date)
    );
    const smallestDate = new Date(Math.min.apply(null, transactionDates));
    const largestDate = new Date(Math.max.apply(null, transactionDates));
    const daysDifference = Math.floor(
      (largestDate - smallestDate) / (1000 * 60 * 60 * 24)
    );
    return daysDifference;
  };
  const workingDaysCount = (arr) => {
    const temp = Array.from(new Set(arr.map((item) => item.transaction_date)));
    return temp.length;
  };
  const handleSearch = () => {
    const updatedRecords = printCharges.filter((item) => {
      const date = new Date(item.transaction_date);
      if (
        (filter.printerName ? item.mainprinter == filter.printerName : true) &&
        (filter.printType ? item.printtype == filter.printType : true) &&
        (filter.from && filter.to
          ? date >= filter.from && date <= filter.to
          : true)
      ) {
        return true;
      } else {
        false;
      }
    });
    let quantity = 0,
      charges = 0;
    updatedRecords.forEach((item) => {
      quantity = quantity + parseInt(item.total_quantity);
      charges = charges + parseInt(item.total_charges);
    });
    if (filter.from && filter.to) {
      setNumberOfDays(calculateDaysBetweenDates(filter.from, filter.to));
    } else {
      setNumberOfDays(daysCount(updatedRecords));
    }

    setQuantity(quantity);
    setCharges(charges);

    setNumberOfWorkDays(workingDaysCount(updatedRecords));
    setRecords(updatedRecords);
  };
  return (
    <>
      <UpdatedNav />
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <div className="flex justify-between">
            <Text className="font-[800] colors-green">{type}</Text>
            <Switch
              onChange={() => {
                handleToggle(type, setType);
              }}
            />
          </div>

          <div className="flex justify-between">
            <Metric className="text-7xl">{stilltoprint1.Total}</Metric>
            <i className="text-[16px] mt-[7px]">
              ₹
              {convertToIndianNumberSystem(
                parseFloat(stilltoprint1.stock_worth)
              )}
            </i>
          </div>
          {type == "FOR PRINTING BY DYE TYPE" &&
            Object.entries(stilltoprint1).map(([key, value]) => {
              if (key != "Total" && key != "stock_worth") {
                return (
                  <div key={key}>
                    <Flex className="mt-4">
                      <Text>{key}</Text>
                      <Text>{value}</Text>
                    </Flex>
                    <ProgressBar value={value} className="mt-2" />
                  </div>
                );
              }
            })}
          {type == "FOR PRINTING BY FABRIC" && (
            <List>
              {Object.entries(stilltoprint2).map(([key, value]) => {
                if (key != "Total") {
                  return (
                    <ListItem key={key}>
                      <span>{key}</span>
                      <span>{value}</span>
                    </ListItem>
                  );
                }
              })}
            </List>
          )}
        </Card>
      </div>
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <DateRangePicker
            onValueChange={handleDateRange}
            className="mx-auto max-w-sm mb-4"
            enableSelect={false}
          />

          <SearchSelect
            onValueChange={handlePrinter}
            placeholder="Select Printer"
            className="mb-4"
          >
            {uniqueMainPrinters.map((item) => {
              return (
                <SearchSelectItem key={item} value={item}>
                  {item}
                </SearchSelectItem>
              );
            })}
          </SearchSelect>
          <SearchSelect
            onValueChange={handlePrintType}
            placeholder="Select Print Types"
            className="mb-4"
          >
            {uniquePrintTypes.map((item) => {
              return (
                <SearchSelectItem key={item} value={item}>
                  {item}
                </SearchSelectItem>
              );
            })}
          </SearchSelect>
          <div
            onClick={handleSearch}
            className="rounded-md mb-4 cursor-pointer mx-auto  border-[0.25px]  text-center  py-2 border-green-700 text-green-700"
          >
            Search
          </div>

          <Card>
            <div className="flex justify-between">
              <div>
                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                  Charges
                </p>
                <div className="mt-2 flex items-baseline space-x-2.5">
                  <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    ₹{convertToIndianNumberSystem(charges)} &nbsp;
                  </p>
                  for<p className="text-green-700 pl-0">{quantity}</p>
                  &nbsp;pieces
                </div>
                <div className="flex justify-between">
                  <h1 className="text-[13px]">
                    No of Days - {numberOfDays + 1}{" "}
                    <span className="text-green-700">
                      (Avg Qty - {(quantity / (numberOfDays + 1)).toFixed(0)})
                    </span>
                  </h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-[13px]">
                    Work Days - {numberOfWorkDays}{" "}
                    <span className="text-green-700">
                      (Avg Qty -{" "}
                      {convertToIndianNumberSystem(
                        (quantity / numberOfWorkDays).toFixed(0)
                      )}
                      )
                    </span>
                  </h1>
                </div>
                <h1 className="text-[13px]">
                  Avg Print Charge - {(charges / quantity).toFixed(0)}
                </h1>
                <h1 className="text-[13px]">
                  Avg Wage -{" "}
                  {convertToIndianNumberSystem(
                    (charges / numberOfWorkDays).toFixed(0)
                  )}
                </h1>
              </div>
            </div>
          </Card>

          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Main Printer</TableHeaderCell>
                <TableHeaderCell>Print Type</TableHeaderCell>
                <TableHeaderCell>Total</TableHeaderCell>
                <TableHeaderCell>Rate</TableHeaderCell>
                <TableHeaderCell>Charges</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {convertDateFormat(item.transaction_date)}
                    </TableCell>
                    <TableCell>
                      <Text>{item.mainprinter}</Text>
                    </TableCell>
                    <TableCell>{item.printtype}</TableCell>
                    <TableCell>{item.total_quantity}</TableCell>
                    <TableCell>{item.rate}</TableCell>
                    <TableCell>{item.total_charges}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase.from("stilltoprint_view").select();
  const resp = await supabase.from("screenblendtoprint_view").select();
  const stilltoprint1 = {};
  data.forEach((item) => {
    const keys = Object.keys(item).filter(
      (key) => key !== "product" && key != "total"
    );
    keys.forEach((key) => {
      stilltoprint1[key] = (stilltoprint1[key] || 0) + item[key];
    });
  });
  const d = resp.data;
  d.forEach((item) => {
    stilltoprint1["Total"] += item.Total;
    stilltoprint1["Screen Blend"] =
      (stilltoprint1["Screen Blend"] || 0) + item.Total;
  });

  let keyValueArray = Object.entries(stilltoprint1);

  keyValueArray.sort((a, b) => b[1] - a[1]);

  let sortedObject = Object.fromEntries(keyValueArray);

  const resp_obj = await supabase.from("stilltoprintbyfabric_view").select();
  const resp2 = await supabase.from("screenblendbyfabric_view").select();
  const stilltoprint2 = {};

  resp_obj.data.forEach((item) => {
    stilltoprint2["Total"] = (stilltoprint2["Total"] || 0) + item.Total;
    stilltoprint2[item.fabric] = (stilltoprint2[item.fabric] || 0) + item.Total;
  });
  const d2 = resp2.data;
  d2.forEach((item) => {
    stilltoprint2["Total"] = (stilltoprint2["Total"] || 0) + item.Remaining;
    stilltoprint2[item.fabric] =
      (stilltoprint2[item.fabric] || 0) + item.Remaining;
  });

  let keyValueArray2 = Object.entries(stilltoprint2);

  keyValueArray2.sort((a, b) => b[1] - a[1]);

  let sortedObject2 = Object.fromEntries(keyValueArray2);
  const resp3 = await supabase.from("printcharges_view").select();
  console.log(resp3);
  const uniqueMainPrinters = Array.from(
    new Set(resp3.data.map((transaction) => transaction.mainprinter))
  );
  const uniquePrintTypes = Array.from(
    new Set(resp3.data.map((transaction) => transaction.printtype))
  );
  return {
    props: {
      stilltoprint1: sortedObject,
      stilltoprint2: sortedObject2,
      printCharges: resp3.data,
      uniqueMainPrinters,
      uniquePrintTypes,
    },
  };
}
