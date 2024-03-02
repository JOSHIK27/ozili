import { Tracker } from "@tremor/react";
import { Card, SparkAreaChart } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";
import { convertDateFormat, getCurrentMonth } from "@/lib/utils";
export default function Overview({
  last30DaysData,
  lastSale,
  monthlyUniqueCustomers,
}) {
  let total = 0;

  const temp = monthlyUniqueCustomers.map((item) => {
    total = total + parseInt(item.uniqueCustomers);
    if (item.month == getCurrentMonth()) {
      return item.uniqueCustomers;
    }
  });
  console.log(temp);
  const data = last30DaysData.map((item, result) => {
    if (item.itemsquantity) {
      return {
        color: "emerald",
        tooltip: item.itemsquantity,
      };
    } else {
      return { color: "yellow", tooltip: item.itemsquantity };
    }
  });
  return (
    <div>
      <UpdatedNav />
      <div>
        <Card className="max-w-md mb-4">
          <div className="flex justify-between">
            <div>
              <div className="text-[14px]">
                Monthly Active Customers (<strong>{getCurrentMonth()}</strong>)
              </div>
              <div className="flex">
                <span className="text-[30px]">{temp[0] ? temp[0] : 0}</span>
                <span className="text-[15px] pt-[16px] pl-4 text-blue-500">
                  {(temp[0] ? temp[0] : 0) / total}%
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
  console.log(resp1.data);
  const last30DaysData = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - index);
    const formattedDate = date.toISOString().split("T")[0];
    const totalItemsQuantity = resp1.data
      .filter((sale) => sale.saledate === formattedDate)
      .reduce((sum, sale) => sum + sale.itemsquantity, 0);

    return {
      date: formattedDate,
      itemsquantity: totalItemsQuantity,
    };
  });
  const sortedSalesData = resp1.data.sort((a, b) => b.saleid - a.saleid);

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

  return {
    props: {
      last30DaysData,
      lastSale,
      monthlyUniqueCustomers: result,
    },
  };
}
