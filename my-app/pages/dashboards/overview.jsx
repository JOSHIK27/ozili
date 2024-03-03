import { Tracker } from "@tremor/react";
import { Card, SparkAreaChart, Badge } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";
import {
  convertDateFormat,
  getCurrentMonth,
  convertToIndianNumberSystem,
  CalucatePercentage,
} from "@/lib/utils";

export default function Overview({
  last30,
  lastSale,
  monthlyUniqueCustomers,
  totalSaleValue,
  directSaleValue,
  ecommerceSaleValue,
  retailSaleValue,
  wholeSaleValue,
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
        <Card className="max-w-md mb-4">
          <div className="text-[14px]">Total Sales</div>
          <strong className="text-[30px] mb-[2px]">
            ₹{convertToIndianNumberSystem(totalSaleValue)}
          </strong>
          <div className="text-[12px] mb-4">Sales Distribution</div>
          <Card>
            <div className="flex justify-between">
              <div>
                <div className="flex">
                  <div className="text-[16px] mr-[4px]">Direct Sales</div>
                  <Badge size="xs">
                    {CalucatePercentage(directSaleValue, totalSaleValue)} %
                  </Badge>
                </div>
                <strong className="text-[20px] mb-[2px]">
                  ₹{convertToIndianNumberSystem(directSaleValue)}{" "}
                </strong>
              </div>
              <div>
                <div className="flex">
                  <div className="text-[14px] mr-[4px]">Ecommerce Sales</div>
                  <Badge size="xs">
                    {100 - CalucatePercentage(directSaleValue, totalSaleValue)}%
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
                  <div className="text-[14px] mr-[4px]">Retail Sales</div>
                  <Badge size="xs">
                    {CalucatePercentage(retailSaleValue, totalSaleValue)} %
                  </Badge>
                </div>
                <strong className="text-[20px] mb-[2px]">
                  ₹{convertToIndianNumberSystem(retailSaleValue)}
                </strong>
              </div>
              <div>
                <div className="flex">
                  <div className="text-[14px] mr-[4px]">WholeSale Sales</div>
                  <Badge size="xs">
                    {CalucatePercentage(wholeSaleValue, totalSaleValue)} %
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
                  {(temp && temp[0] ? temp[0] : 0) / total}%
                </span>
              </div>
              <div className="text-[12px]">Customer Base : {total}</div>
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
  let totalSaleValue = 0;
  resp1.data.forEach((item) => {
    if (
      item.netamount &&
      item.orderstatus != "Cancelled" &&
      item.saletype != "Free" &&
      item.saletype != "Self Consumption" &&
      item.saletype != "Dead Stock"
    )
      totalSaleValue = totalSaleValue + item.netamount;
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
    },
  };
}
