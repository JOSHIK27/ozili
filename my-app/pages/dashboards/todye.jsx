import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  DateRangePicker,
  SearchSelect,
  SearchSelectItem,
} from "@tremor/react";

import { Text } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";
import {
  convertToIndianNumberSystem,
  convertDateFormat,
  calculateDaysBetweenDates,
} from "@/lib/utils";
import { useEffect, useState } from "react";
export default function ToPrint({
  data,
  dyeCharges,
  uniqueDyerNames,
  uniqueDyeTypes,
}) {
  data.sort((a, b) => a.component.localeCompare(b.component));
  const [filter, setFilter] = useState(null);
  const [records, setRecords] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [charges, setCharges] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfWorkDays, setNumberOfWorkDays] = useState(0);
  useEffect(() => {
    let quantity = 0,
      charges = 0;
    dyeCharges.forEach((item) => {
      quantity = quantity + parseInt(item.total_quantity);
      charges = charges + parseInt(item.total_charges);
    });
    setQuantity(quantity);
    setCharges(charges);
    setNumberOfDays(daysCount(dyeCharges));
    setRecords(dyeCharges);
    setNumberOfWorkDays(workingDaysCount(dyeCharges));
  }, []);
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
    console.log(filter);
    const updatedRecords = dyeCharges.filter((item) => {
      const date = new Date(item.transaction_date);
      console.log(item);
      if (
        (filter.dyerName ? item.primarydyer == filter.dyerName : true) &&
        (filter.dyeType ? item.dyetype == filter.dyeType : true) &&
        (filter.from && filter.to
          ? date >= filter.from && date <= filter.to
          : true)
      ) {
        return true;
      } else {
        false;
      }
    });
    console.log(updatedRecords);
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
  const handleDateRange = (e) => {
    setFilter({
      ...filter,
      from: e.from,
      to: e.to,
    });
  };
  const handlePrinter = (e) => {
    setFilter({
      ...filter,
      dyerName: e,
    });
  };
  const handlePrintType = (e) => {
    setFilter({
      ...filter,
      dyeType: e,
    });
  };

  return (
    <>
      <UpdatedNav />
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <span className="font-semibold text-xl">WHITE STOCK VS DYED</span>
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
        </Card>
      </div>
      <div className="flex justify-center sm:justify-start">
        <Card className="w-[360px] m-4 colors-tremor-background-faint shadow-2xl">
          <div className="font-semibold text-xl mb-8">DYE CHARGES</div>

          <DateRangePicker
            onValueChange={handleDateRange}
            className="mx-auto max-w-sm mb-4"
            enableSelect={false}
          />

          <SearchSelect
            onValueChange={handlePrinter}
            placeholder="Select Dyer"
            className="mb-4"
          >
            {uniqueDyerNames.map((item) => {
              return (
                <SearchSelectItem key={item} value={item}>
                  {item}
                </SearchSelectItem>
              );
            })}
          </SearchSelect>
          <SearchSelect
            onValueChange={handlePrintType}
            placeholder="Select Dye Types"
            className="mb-4"
          >
            {uniqueDyeTypes.map((item) => {
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
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Primary Dyer</TableHeaderCell>
                <TableHeaderCell>Dye Type</TableHeaderCell>
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
                      <Text>{item.primarydyer}</Text>
                    </TableCell>
                    <TableCell>{item.dyetype}</TableCell>
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
  const { data, error } = await supabase.from("stilltodye_view").select();
  const resp1 = await supabase.from("dyecharges_view").select();
  const uniqueDyerNames = Array.from(
    new Set(resp1.data.map((transaction) => transaction.primarydyer))
  );
  const uniqueDyeTypes = Array.from(
    new Set(resp1.data.map((transaction) => transaction.dyetype))
  );
  return {
    props: {
      data: data,
      dyeCharges: resp1.data,
      uniqueDyerNames,
      uniqueDyeTypes,
    },
  };
}
