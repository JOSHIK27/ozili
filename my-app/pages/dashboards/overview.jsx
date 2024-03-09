import { Tracker, SparkBarChart } from "@tremor/react";
import { Card, SparkAreaChart, Badge } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";
import {
  convertDateFormat,
  getCurrentMonth,
  convertToIndianNumberSystem,
  calculatePercentage,
  percentWithoutDecimal,
} from "@/lib/utils";
import { Text, Flex } from "@tremor/react";
import TopSoldByFabric from "../components/ui/overview/topSoldByFabric";
import TopSoldByPrint from "../components/ui/overview/topSoldByPrint";
export default function Overview({
  last30,
  lastSale,
  monthlyUniqueCustomers,
  totalSaleValue,
  directSaleValue,
  ecommerceSaleValue,
  retailSaleValue,
  wholeSaleValue,
  customerCount,
  fabricSoldArray,
  fabricAmountArray,
  printSoldArray,
  printAmountArray,
  stockWorth,
  totalSales,
  currentMonthValue,
}) {
  let total = 0;
  const temp =
    monthlyUniqueCustomers &&
    monthlyUniqueCustomers.map((item) => {
      total = total + parseInt(item.uniqueCustomers);
      if (item.month == getCurrentMonth()) {
        return item.uniqueCustomers;
      }
    });
  // const chartdata = [
  //   {
  //     month: "Jan 21",
  //     Performance: 4000,
  //     Benchmark: 3000,
  //   },
  //   {
  //     month: "Feb 21",
  //     Performance: 3000,
  //     Benchmark: 2000,
  //   },
  //   {
  //     month: "Mar 21",
  //     Performance: 2000,
  //     Benchmark: 1700,
  //   },
  //   {
  //     month: "Apr 21",
  //     Performance: 2780,
  //     Benchmark: 2500,
  //   },
  //   {
  //     month: "May 21",
  //     Performance: 1890,
  //     Benchmark: 1890,
  //   },
  //   {
  //     month: "Jun 21",
  //     Performance: 2390,
  //     Benchmark: 2000,
  //   },
  //   {
  //     month: "Jul 21",
  //     Performance: 3490,
  //     Benchmark: 3000,
  //   },
  // ];
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
      if (monthMap.hasOwnProperty(monthName)) {
        monthMap[monthName] =
          (monthMap[monthName] || 0) + parseFloat(item.netamount);
      }
    });

  const chartdata = [];
  for (const month in monthMap) {
    chartdata.push({
      name: month,
      quantity: parseFloat(monthMap[month]),
    });
  }

  const data =
    last30 &&
    last30.map((item) => {
      if (item.itemsquantity != 0) {
        return {
          color: "emerald",
          tooltip: item.itemsquantity,
        };
      } else {
        return { color: "yellow", tooltip: 0 };
      }
    });

  return (
    <div>
      <UpdatedNav />
      <div>
        <Card
          className="max-w-md mb-4 mt-4"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mb-[4px]">
            Current Stock Worth
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            ₹{convertToIndianNumberSystem(stockWorth?.totalvalue || 0)}
          </p>
          {stockWorth &&
            Object.entries(stockWorth).map(([key, value]) => {
              if (key != "valuedate" && key != "totalvalue") {
                return (
                  <div key={key}>
                    <Flex className="mt-4">
                      <Text>{key}</Text>
                      <Text>₹{convertToIndianNumberSystem(value)}</Text>
                    </Flex>
                  </div>
                );
              }
            })}
        </Card>
        <Card className="max-w-md mb-4">
          <div className="flex justify-between">
            <div>
              <div className="text-[14px]">Total Sales</div>
              <strong className="text-[30px] mb-[2px]">
                ₹{convertToIndianNumberSystem(totalSaleValue)}
              </strong>
            </div>
            <SparkBarChart
              data={chartdata}
              index="date"
              categories={["quantity"]}
              colors={["blue"]}
            />
          </div>
          <div className="text-[12px] mb-4 text-fuchsia-950">
            This Month - ₹{convertToIndianNumberSystem(currentMonthValue)}
          </div>
          <Card>
            <div className="flex justify-between">
              <div>
                <div className="flex">
                  <div className="text-[14px] mr-[4px]">In-Store</div>
                  <Badge size="xs">
                    {percentWithoutDecimal(directSaleValue, totalSaleValue)}%
                  </Badge>
                </div>
                <strong className="text-[20px] mb-[2px]">
                  ₹{convertToIndianNumberSystem(directSaleValue)}{" "}
                </strong>
              </div>
              <div>
                <div className="flex">
                  <div className="text-[14px] mr-[4px]">e-Commerce</div>
                  <Badge size="xs">
                    {100 -
                      percentWithoutDecimal(directSaleValue, totalSaleValue)}
                    %
                  </Badge>
                </div>
                <strong className="text-[20px] mb-[2px]">
                  ₹{convertToIndianNumberSystem(ecommerceSaleValue)}
                </strong>
              </div>
            </div>
          </Card>
          <br />
          <Card>
            <div className="flex justify-between">
              <div>
                <div className="flex">
                  <div className="text-[14px] mr-[4px]">Retail</div>
                  <Badge size="xs">
                    {percentWithoutDecimal(retailSaleValue, totalSaleValue)}%
                  </Badge>
                </div>
                <strong className="text-[20px] mb-[2px]">
                  ₹{convertToIndianNumberSystem(retailSaleValue)}
                </strong>
              </div>
              <div>
                <div className="flex">
                  <div className="text-[14px] mr-[4px]">WholeSale</div>
                  <Badge size="xs">
                    {100 -
                      percentWithoutDecimal(retailSaleValue, totalSaleValue)}
                    %
                  </Badge>
                </div>
                <strong className="text-[20px] mb-[2px]">
                  ₹{convertToIndianNumberSystem(wholeSaleValue)}
                </strong>
              </div>
            </div>
          </Card>
        </Card>
        <Card className="max-w-md mb-4">
          <div className="flex justify-between">
            <div>
              <div className="text-[14px]">
                Monthly Active Customers (<strong>{getCurrentMonth()}</strong>)
              </div>
              <div className="flex">
                <span className="text-[30px]">
                  {temp && temp[0] ? temp[0] : 0}
                </span>
                <span className="text-[15px] pt-[16px] pl-4 text-blue-500">
                  {calculatePercentage(temp[0], total)}%
                </span>
              </div>
              <div className="text-[12px]">Active Base : {total}</div>
              <div className="text-[12px]">Customer Base : {customerCount}</div>
            </div>
            <SparkAreaChart
              data={monthlyUniqueCustomers}
              categories={["uniqueCustomers"]}
              index={"month"}
              colors={["blue"]}
              className="h-10 w-36"
            />
          </div>
        </Card>
        <Card className="max-w-md mb-4">
          <div className="text-[14px]">Recent Sale Status</div>
          <div className="text-[10px] mb-[8px]">
            Last Sale - ({convertDateFormat(lastSale)})
          </div>
          <Tracker data={data} />
          <div className="flex justify-between mt-[2px]">
            <div className="text-[14px]">30 days ago</div>
            <div className="text-[14px]">Today</div>
          </div>
        </Card>
        <TopSoldByFabric
          fabricSoldArray={fabricSoldArray}
          fabricAmountArray={fabricAmountArray}
        />
        <TopSoldByPrint
          printSoldArray={printSoldArray}
          printAmountArray={printAmountArray}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase.from("salestbl").select();

  const currentDate = new Date();

  const last30DaysData = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - index);
    const formattedDate = date.toISOString().split("T")[0];

    const totalItemsQuantity = resp1.data
      .filter((sale) => sale.saledate == formattedDate)
      .reduce((sum, sale) => sum + sale.itemsquantity, 0);

    return {
      date: formattedDate,
      itemsquantity: totalItemsQuantity,
    };
  });

  let last30 = last30DaysData.slice().reverse();

  const sortedSalesData = resp1.data.sort(
    (b, a) => new Date(a.saledate) - new Date(b.saledate)
  );
  const lastSale =
    sortedSalesData.length > 0 ? sortedSalesData[0].saledate : null;

  const monthlyCustomerCounts = {};

  resp1.data.forEach((item) => {
    const saleMonth = new Date(item.saledate).toLocaleString("en-US", {
      month: "short",
    });

    if (!monthlyCustomerCounts[saleMonth]) {
      monthlyCustomerCounts[saleMonth] = new Set();
    }

    monthlyCustomerCounts[saleMonth].add(item.customername);
  });

  const result = Object.entries(monthlyCustomerCounts).map(
    ([month, customersSet]) => ({
      month,
      uniqueCustomers: customersSet.size,
    })
  );
  let totalSaleValue = 0,
    currentMonthValue = 0;
  resp1.data.forEach((item) => {
    if (
      item.netamount &&
      item.orderstatus != "Cancelled" &&
      item.saletype != "Free" &&
      item.saletype != "Self Consumption" &&
      item.saletype != "Dead Stock"
    ) {
      const saleDate = new Date(item.saledate);
      if (
        saleDate.getMonth() === currentDate.getMonth() &&
        saleDate.getFullYear() === currentDate.getFullYear()
      ) {
        currentMonthValue = currentMonthValue + parseFloat(item.netamount);
      }
      totalSaleValue = totalSaleValue + item.netamount;
    }
  });

  let directSaleValue = 0,
    ecommerceSaleValue = 0;
  resp1.data.forEach((item) => {
    if (
      item.netamount &&
      (item.salemode == "Direct" || item.salemode == "Exhibition") &&
      item.orderstatus != "Cancelled" &&
      item.saletype != "Free" &&
      item.saletype != "Self Consumption" &&
      item.saletype != "Dead Stock"
    ) {
      directSaleValue = directSaleValue + parseFloat(item.netamount);
    } else if (
      item.netamount &&
      item.orderstatus != "Cancelled" &&
      item.saletype != "Free" &&
      item.saletype != "Self Consumption" &&
      item.saletype != "Dead Stock"
    ) {
      ecommerceSaleValue = ecommerceSaleValue + parseFloat(item.netamount);
    }
  });
  let retailSaleValue = 0,
    wholeSaleValue = 0;
  resp1.data.forEach((item) => {
    if (
      item.netamount &&
      item.saletype == "Retail" &&
      item.orderstatus != "Cancelled" &&
      item.saletype != "Free" &&
      item.saletype != "Self Consumption" &&
      item.saletype != "Dead Stock"
    ) {
      retailSaleValue = retailSaleValue + parseFloat(item.netamount);
    } else if (
      item.netamount &&
      item.saletype == "WholeSale" &&
      item.orderstatus != "Cancelled" &&
      item.saletype != "Free" &&
      item.saletype != "Self Consumption" &&
      item.saletype != "Dead Stock"
    ) {
      wholeSaleValue = wholeSaleValue + parseFloat(item.netamount);
    }
  });
  const resp2 = await supabase.from("customertbl").select();
  ///lsndvskds

  const resp3 = await supabase.from("readystock_view2").select();

  const fabricSoldMap = {};
  const fabricAmountMap = {};
  resp3.data.forEach((product) => {
    const fabric = product.fabric;
    const sold = product.sold;
    const worth = product.sales_worth;
    if (sold !== null) {
      if (fabricSoldMap[fabric] === undefined) {
        fabricSoldMap[fabric] = sold;
        fabricAmountMap[fabric] = worth;
      } else {
        fabricSoldMap[fabric] += sold;
        fabricAmountMap[fabric] += worth;
      }
    }
  });
  const fabricSoldArray = Object.entries(fabricSoldMap);
  const fabricAmountArray = Object.entries(fabricAmountMap);
  fabricSoldArray.sort((a, b) => b[1] - a[1]);
  fabricAmountArray.sort((a, b) => b[1] - a[1]);

  //lsdnlsdnsv
  const resp4 = await supabase.from("readystock_view2").select();

  const printSoldMap = {};
  const printAmountMap = {};
  resp4.data.forEach((product) => {
    const printtype = product.printtype;
    const sold = product.sold;
    const worth = product.sales_worth;
    if (sold !== null) {
      if (printSoldMap[printtype] === undefined) {
        printSoldMap[printtype] = sold;
        printAmountMap[printtype] = worth;
      } else {
        printSoldMap[printtype] += sold;
        printAmountMap[printtype] += worth;
      }
    }
  });
  const printSoldArray = Object.entries(printSoldMap);
  const printAmountArray = Object.entries(printAmountMap);

  printSoldArray.sort((a, b) => b[1] - a[1]);
  printAmountArray.sort((a, b) => b[1] - a[1]);
  //kdsvlsdvsl

  const resp5 = await supabase.from("stockworth_view").select();

  const stockWorth = resp5.data[0];
  let customerCount = resp2.data.length;
  const resp6 = await supabase.from("salestbl").select();
  console.log(resp6);
  return {
    props: {
      last30,
      lastSale,
      monthlyUniqueCustomers: result,
      totalSaleValue,
      directSaleValue,
      ecommerceSaleValue,
      retailSaleValue,
      wholeSaleValue,
      customerCount,
      fabricSoldArray,
      fabricAmountArray,
      printSoldArray,
      printAmountArray,
      stockWorth,
      totalSales: resp6.data,
      currentMonthValue,
    },
  };
}
