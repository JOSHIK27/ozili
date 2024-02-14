import React, { useState } from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { supabase } from "@/db/supabase";
import UpdatedNav from "../components/ui/updatedNav";
import { useEffect } from "react";
export default function OrderList({ customers, orders }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [processingCount, setProcessingCount] = useState(0);
  const [fullfilledCount, setFullFilledCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  console.log(orderDetails);
  useEffect(() => {
    let process_cnt = 0,
      fullfill_cnt = 0,
      cancel_cnt = 0,
      amount = 0;
    orders.forEach((item) => {
      amount = amount + item.unitprice;
      if (item.orderstatus == "Processing") {
        process_cnt = process_cnt + 1;
      } else if (item.orderstatus == "Cancelled") {
        cancel_cnt = cancel_cnt + 1;
      } else {
        fullfill_cnt = fullfill_cnt + 1;
      }
    });

    setFullFilledCount(fullfill_cnt);
    setCancelledCount(cancel_cnt);
    setProcessingCount(process_cnt);
    setTotalAmount(amount);
    setOrderDetails(orders);
  }, []);
  const handleSearch = () => {
    if (!fromDate) {
      alert("Enter From Date");
      return;
    }
    if (!toDate) {
      alert("Enter To Date");
      return;
    }
    let process_cnt = 0,
      fullfill_cnt = 0,
      cancel_cnt = 0,
      amount = 0,
      newOrderDetails;
    if (!customerName) {
      newOrderDetails = orders.filter((item) => {
        const d = new Date(item.orderdate);
        const t = new Date(toDate);
        const f = new Date(fromDate);
        if (d >= f && d <= t) {
          amount = amount + item.unitprice;
          if (item.orderstatus == "Processing") {
            process_cnt = process_cnt + 1;
          } else if (item.orderstatus == "Cancelled") {
            cancel_cnt = cancel_cnt + 1;
          } else {
            fullfill_cnt = fullfill_cnt + 1;
          }
        }
        return d >= f && d <= t;
      });
    } else {
      newOrderDetails = orders.filter((item) => {
        const d = new Date(item.orderdate);
        const t = new Date(toDate);
        const f = new Date(fromDate);
        if (item.customername === customerName && d >= f && d <= t) {
          amount = amount + item.unitprice;
          if (item.orderstatus == "Processing") {
            process_cnt = process_cnt + 1;
          } else if (item.orderstatus == "Cancelled") {
            cancel_cnt = cancel_cnt + 1;
          } else {
            fullfill_cnt = fullfill_cnt + 1;
          }
        }
        return item.customername === customerName && d >= f && d <= t;
      });
    }
    setFullFilledCount(fullfill_cnt);
    setCancelledCount(cancel_cnt);
    setProcessingCount(process_cnt);
    setTotalAmount(amount);
    setOrderDetails(newOrderDetails);
  };
  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };
  const handleCustomer = (e) => {
    setCustomerName(e);
  };
  return (
    <div>
      <UpdatedNav />
      <div className="container2">
        <div className="bg-[#efecec] mb-4">
          <br />
          <SearchSelect
            onValueChange={handleCustomer}
            className="mb-4 ml-4 w-80"
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
          <div className="flex justify-around mb-4">
            <input
              type="date"
              onChange={handleFromDate}
              className="rounded-md border-[1px] border-black w-[200px] h-[30px]"
            />
            <input
              type="date"
              onChange={handleToDate}
              className="rounded-md border-[1px] border-black w-[200px] h-[30px]"
            />
            <a
              onClick={handleSearch}
              class=" h-[30px] inline-flex cursor-pointer items-center justify-center rounded-md sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-blue-500 to-blue-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm w-fit px-4 text-sm sm:w-fit"
            >
              Search
            </a>
          </div>
          <br></br>
        </div>

        <div className="bg-[#efecec]">
          <h2>Summary</h2>
          <p>
            <strong>Pre Orders:</strong>{" "}
            {orderDetails ? orderDetails.length : 0}
          </p>
          <p>
            <strong>Pre Orders Value:</strong> {totalAmount}
          </p>
          <p>
            <strong>Processing :</strong> {processingCount}
          </p>
          <p>
            <strong>Fullfilled :</strong> {fullfilledCount}
          </p>
          <p>
            <strong>Cancelled :</strong> {cancelledCount}
          </p>
        </div>
        <br />

        {/* Sample order cards */}
        {orderDetails &&
          orderDetails.map((order) => (
            <div className="order-card bg-[#efecec] mb-4" key={order.id}>
              <h3>{`Order #${order.id}`}</h3>
              <p>
                <strong>Customer Name:</strong> {order.customername}
              </p>
              <p>
                <strong>Date:</strong> {order.orderdate}
              </p>
              <p>
                <strong>Amount:</strong> {order.unitprice}
              </p>
              <p>
                <strong>Expected Date</strong> {order.expecteddeliverydate}
              </p>
              <p>
                <strong>Target Delivery Date</strong> {order.targetdeliverydate}
              </p>
              <p>
                <strong>Product</strong> {order.productname}
              </p>
              <p>
                <strong>Quantity</strong> {order.quantity}
              </p>
              <p>
                <strong>Instructions</strong> {order.instructions}
              </p>
              <p>
                <strong>Payment Status</strong> {order.paymentstatus}
              </p>
              <p>
                <strong>Order Status</strong> {order.orderstatus}
              </p>
              <br></br>
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("customertbl").select("nickname");
  let temp = data;
  const customers = temp?.map((x) => x.nickname);
  const resp = await supabase.from("preorderstbl").select();
  const sortedorders = resp.data.sort((a, b) => b.id - a.id);
  return {
    props: {
      customers,
      orders: sortedorders,
    },
  };
}
