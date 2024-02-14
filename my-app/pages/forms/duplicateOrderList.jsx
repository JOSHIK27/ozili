import React, { useState, useEffect } from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { supabase } from "@/db/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import UpdatedNav from "../components/ui/updatedNav";

export default function OrderList({ customers, orders }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [processingCount, setProcessingCount] = useState(0);
  const [fullfilledCount, setFullFilledCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [editableFields, setEditableFields] = useState({
    id: "",
    customerName: "",
    orderDate: "",
    amount: "",
    expectedDeliveryDate: "",
    targetDeliveryDate: "",
    printType: "",
    productName: "",
    quantity: "",
    instructions: "",
    paymentStatus: "",
    orderStatus: "",
  });
  const [editModes, setEditModes] = useState({});

  useEffect(() => {
    let process_cnt = 0,
      fullfill_cnt = 0,
      cancel_cnt = 0,
      amount = 0;
    orders.forEach((item) => {
      amount = amount + item.unitprice;
      if (item.orderstatus === "Processing") {
        process_cnt = process_cnt + 1;
      } else if (item.orderstatus === "Cancelled") {
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
  const handleDelete = (id) => {
    fetch("../api/preOrder", {
      body: JSON.stringify({ id }),
      method: "DELETE",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((x) => {
        alert("Deleted");
        window.location.reload();
      });
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

  const handleEditableFieldChange = (field, value) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const toggleEditMode = (orderId) => {
    orderDetails.forEach((item) => {
      if (item.id == orderId) {
        setEditableFields({
          id: item.id,
          customerName: item.customername,
          orderDate: item.orderdate,
          amount: item.unitprice,
          expectedDeliveryDate: item.expecteddeliverydate,
          targetDeliveryDate: item.targetdeliverydate,
          productName: item.productname,
          quantity: item.quantity,
          instructions: item.quantity,
          paymentStatus: item.paymentstatus,
          orderStatus: item.orderstatus,
        });
      }
    });
    setEditModes((prevModes) => ({
      ...prevModes,
      [orderId]: !prevModes[orderId],
    }));
  };

  const handleSave = (orderId) => {
    let newOrderList = orderDetails.map((item) => {
      if (item.id == orderId) {
        console.log(editableFields);
        return editableFields;
      } else {
        return item;
      }
    });
    console.log(newOrderList, orderDetails);
    fetch("../api/preOrder", {
      body: JSON.stringify(editableFields),
      method: "PUT",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((x) => {
        alert("Updated DB");
        window.location.reload();
      });
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
          <div className="flex justify-around flex-wrap mb-4">
            <input
              type="date"
              onChange={handleFromDate}
              className="rounded-md border-[1px] border-black w-[120px] sm:w-[200px] h-[30px]"
            />
            <input
              type="date"
              onChange={handleToDate}
              className="rounded-md border-[1px] border-black w-[120px] sm:w-[200px] h-[30px]"
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
        <div className="bg-[#efecec] pl-8 pt-8">
          <h2 className="text-xl fon-600 mb-4">Summary</h2>
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
        <div>
          {/* ... (rest of the component) */}
          {orderDetails &&
            orderDetails.map((order) => (
              <div
                className="order-card bg-[#efecec] pl-8 pt-8 mb-4"
                key={order.id}
              >
                <h3>{`Order #${order.id}`}</h3>
                {/* ... (other non-editable fields) */}
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
                  <strong>Product:</strong> {order.productname}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Expected Delivery Date:</strong> <br></br>
                  {editModes[order.id] ? (
                    <input
                      type="date"
                      onChange={(e) =>
                        handleEditableFieldChange(
                          "expectedDeliveryDate",
                          e.target.value
                        )
                      }
                      value={
                        editableFields.expectedDeliveryDate ||
                        order.expecteddeliverydate
                      }
                      className="rounded-md border-[1px] border-black w-[120px] sm:w-[200px] h-[20px]"
                    />
                  ) : (
                    order.expecteddeliverydate
                  )}
                </p>
                <p>
                  <strong>Target Delivery Date:</strong> <br></br>
                  {editModes[order.id] ? (
                    <input
                      type="date"
                      onChange={(e) =>
                        handleEditableFieldChange(
                          "targetDeliveryDate",
                          e.target.value
                        )
                      }
                      value={
                        editableFields.targetDeliveryDate ||
                        order.targetdeliverydate
                      }
                      className="rounded-md border-[1px] border-black w-[120px] sm:w-[200px] h-[20px]"
                    />
                  ) : (
                    order.targetdeliverydate
                  )}
                </p>

                <p>
                  <strong>Payment Status:</strong> <br></br>
                  {editModes[order.id] ? (
                    <SearchSelect
                      onValueChange={(e) => {
                        handleEditableFieldChange("paymentStatus", e);
                      }}
                      className="w-[200px]"
                    >
                      <SearchSelectItem value="Pending">
                        Pending
                      </SearchSelectItem>
                      <SearchSelectItem value="PartiallyPaid">
                        Partially Paid
                      </SearchSelectItem>
                      <SearchSelectItem value="FullPaid">
                        Fully Paid
                      </SearchSelectItem>
                    </SearchSelect>
                  ) : (
                    order.paymentstatus
                  )}
                </p>
                <p>
                  <strong>Order Status:</strong> <br></br>
                  {editModes[order.id] ? (
                    <SearchSelect
                      onValueChange={(e) =>
                        handleEditableFieldChange("orderStatus", e)
                      }
                      className="w-[200px]"
                    >
                      <SearchSelectItem value="Processing">
                        Processing
                      </SearchSelectItem>
                      <SearchSelectItem value="Fulfilled">
                        Fulfilled
                      </SearchSelectItem>
                      <SearchSelectItem value="Cancelled">
                        Cancelled
                      </SearchSelectItem>
                    </SearchSelect>
                  ) : (
                    order.orderstatus
                  )}
                </p>
                <p>
                  <strong>Instructions:</strong> <br></br>
                  {editModes[order.id] ? (
                    <textarea
                      onChange={(e) =>
                        handleEditableFieldChange(
                          "instructions",
                          e.target.value
                        )
                      }
                      id="instructions"
                      name="instructions"
                      rows="4"
                    ></textarea>
                  ) : (
                    order.instructions
                  )}
                </p>
                <br></br>
                {/* Save and Edit buttons */}
                {editModes[order.id] ? (
                  <a
                    onClick={() => handleSave(order.id)}
                    class=" h-[30px] inline-flex cursor-pointer items-center justify-center rounded-md sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-blue-500 to-blue-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm w-fit px-4 text-sm sm:w-fit"
                  >
                    Save
                  </a>
                ) : (
                  <a
                    onClick={() => toggleEditMode(order.id)}
                    class=" h-[30px] inline-flex cursor-pointer items-center justify-center rounded-md sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-blue-500 to-blue-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm w-fit px-4 text-sm sm:w-fit"
                  >
                    Edit
                  </a>
                )}

                <AlertDialog className="bg-white">
                  <AlertDialogTrigger className="h-[30px] ml-4 inline-flex cursor-pointer items-center justify-center rounded-md sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-red-500 to-red-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm w-fit px-4 text-sm sm:w-fit">
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanantly delete this pre order from the
                        database
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(order.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
        </div>
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
