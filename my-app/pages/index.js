import { supabase } from "@/db/supabase";
import dynamic from "next/dynamic";
const Overview = dynamic(() => import("./dashboards/overview"), {
  loading: () => <p>Loading...</p>,
});
export default function Home({
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
  return (
    <div>
      <Overview
        last30={last30}
        lastSale={lastSale}
        monthlyUniqueCustomers={monthlyUniqueCustomers}
        totalSaleValue={totalSaleValue}
        directSaleValue={directSaleValue}
        ecommerceSaleValue={ecommerceSaleValue}
        retailSaleValue={retailSaleValue}
        wholeSaleValue={wholeSaleValue}
        customerCount={customerCount}
        fabricSoldArray={fabricSoldArray}
        fabricAmountArray={fabricAmountArray}
        printSoldArray={printSoldArray}
        printAmountArray={printAmountArray}
        stockWorth={stockWorth}
        totalSales={totalSales}
        currentMonthValue={currentMonthValue}
      />
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
