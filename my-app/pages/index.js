import { supabase } from "@/db/supabase";

import Overview from "./dashboards/overview";

export default function Home({
  last30DaysData,
  lastSale,
  monthlyUniqueCustomers,
  totalSaleValue,
  directSaleValue,
  ecommerceSaleValue,
  retailSaleValue,
  wholeSaleValue,
}) {
  return (
    <div>
      <Overview
        last30DaysData={last30DaysData}
        lastSale={lastSale}
        monthlyUniqueCustomers={monthlyUniqueCustomers}
        totalSaleValue={totalSaleValue}
        directSaleValue={directSaleValue}
        ecommerceSaleValue={ecommerceSaleValue}
        retailSaleValue={retailSaleValue}
        wholeSaleValue={wholeSaleValue}
      />
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
      last30DaysData,
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
