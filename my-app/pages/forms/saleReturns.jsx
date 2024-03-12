import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { useState } from "react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";
export default function SalesReturnsForm() {
  const [formData, setFormData] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);
  console.log(formData);
  const handleSubmit = () => {
    let arr = [];
    orderDetails.forEach((item, i) => {
      if (document.getElementById("checkbox_" + i).checked) {
        arr.push({
          ...item,
          return: document.getElementById("returnAmount_" + i).value,
          total: document.getElementById("total_" + i).value,
        });
      }
    });
    if (typeof document !== "undefined") {
      document.getElementById("submitButton").disabled = true;
    }
    fetch("../api/saleReturns", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        returnAmount: document.getElementById("returnAmount").value,
        customerName: orderDetails && orderDetails[0].customername,
        products: arr,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((x) => {
        document.getElementById("submitButton").disabled = false;
        window.location.reload();
        if (x[0] == "success") {
          alert("added to db");
        } else {
          alert("Failed");
        }
      });
  };
  function calculateLineTotal(e, index, len) {
    let quantity = parseInt(e.target.value);

    if (quantity > parseInt(orderDetails[index].quantity)) {
      quantity = parseInt(orderDetails[index].quantity);
      e.target.value = quantity;
      alert("Return Quantity More than Sold Quantity");
    }
    let salePrice = parseFloat(
      e.target.parentElement.previousElementSibling.textContent
    );
    let lineTotalInput = document.getElementById("total_" + index);
    let lineTotal = (quantity ? quantity : 0) * (salePrice ? salePrice : 0);
    lineTotalInput.value = lineTotal.toFixed(2);
    calculateReturnAmount(len);
  }
  const handleCheckBox = () => {
    calculateReturnAmount(orderDetails.length);
  };
  function calculateReturnAmount(len) {
    let lineTotal = 0;
    for (let i = 0; i < len; i++) {
      if (document.getElementById("checkbox_" + i).checked) {
        lineTotal =
          lineTotal +
          parseFloat(
            document.getElementById("total_" + i).value
              ? document.getElementById("total_" + i).value
              : 0
          );
      }
    }
    let charges = parseFloat(document.getElementById("charges").value) || 0;
    let returnAmount = lineTotal - charges;
    document.getElementById("returnAmount").value = returnAmount.toFixed(2);
  }

  const handleInput = (e, field) => {
    if (field == "charges") {
      calculateReturnAmount(orderDetails ? orderDetails.length : 0);
    }
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleDropDown = (e, field) => {
    setFormData({
      ...formData,
      [field]: e,
    });
  };

  const handleOrderDetails = async (id) => {
    const { data, error } = await supabase
      .from("saleitemstbl")
      .select()
      .eq("saleid", id);
    console.log(data);
    if (!data.length) {
      alert("Enter Valid ID");
      setOrderDetails(null);
    } else {
      setOrderDetails(data);
    }
  };

  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-semibold">Sale Returns Form</h1>
          <br />
          <div className="mb-[10px]">
            <h1 htmlFor="orderId">Order ID:</h1>
            <input
              type="text"
              id="orderId"
              name="orderId"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              onChange={(e) => {
                handleInput(e, "orderId");
              }}
              required
            />
          </div>

          <button
            type="button"
            onClick={() => {
              handleOrderDetails(formData.orderId);
            }}
            id="fetchOrderDetails"
            className="rounded-md w-[345px] sm:w-[400px] text-center mb-[16px]  py-2 bg-green-700 text-white"
          >
            Fetch
          </button>
          <div className="mb-[12px] ">
            Customer Name : <br />
            <strong>
              {orderDetails &&
                orderDetails.length &&
                orderDetails[0].customername}
            </strong>
            <br />
            Sale Date : <strong></strong>
          </div>

          {orderDetails && (
            <table className="bg-slate-50 w-[345px] border-collapse sm:w-[400px] shadow-xl block overflow-x-auto mb-[12px]">
              <thead className="bg-slate-200 p-4">
                <tr>
                  <th className="py-4 pl-4 text-left border-l-0">Product</th>
                  <th className="border-l-0	text-left py-4 ">Qty</th>
                  <th className="border-l-0 text-left py-4 ">Price</th>
                  <th className="border-l-0 text-left py-4 pl-[6px]">Return</th>
                  <th className="border-l-0 text-left py-4 pl-[6px]">Total</th>
                  <th className="border-l-0 text-left	py-4">Select</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item, index) => (
                  <tr key={item.id} className="border-l-0">
                    <td
                      id={`uniqueProductName_`}
                      className="border-2 p-2 min-w-[200px] border-l-0 border-r-0"
                    >
                      {item.uniqueproductname}
                    </td>
                    <td
                      id={"quantity_" + index}
                      className="border-2 p-2 min-w-[50px] border-l-0 border-r-0"
                    >
                      {item.quantity}
                    </td>
                    <td className="border-2 p-2 min-w-[50px] border-l-0 border-r-0">
                      {item.unitprice}
                    </td>
                    <td className="border-2 p-2 min-w-[50px] border-l-0 border-r-0">
                      <input
                        type="text"
                        id={"returnAmount_" + index}
                        onChange={(e) => {
                          calculateLineTotal(e, index, orderDetails.length);
                        }}
                        className="w-16 bg-slate-30  border-[0.5px] shadow-xl rounded"
                      ></input>
                    </td>
                    <td className="border-2 p-2 border-l-0 min-w-[50px]  border-r-0">
                      <input
                        id={"total_" + index}
                        className="w-16 bg-slate-30 border-[0.5px] shadow-xl rounded min-w-[80px]"
                        readOnly
                      ></input>
                    </td>
                    <td className="border-2 border-l-0 min-w-[50px] p-4 border-r-0">
                      <input
                        onClick={handleCheckBox}
                        id={"checkbox_" + index}
                        type="checkbox"
                      ></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mb-[10px]">
            <h1 htmlFor="reason">Reason for Return:</h1>
            <Select
              onValueChange={(e) => {
                handleDropDown(e, "reason");
              }}
            >
              <SelectTrigger className="bg-white border-[0.25px] w-[345px] sm:w-[400px] h-[30px]">
                <SelectValue placeholder="Value" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Damaged">Damaged</SelectItem>
                <SelectItem value="Wrong Item">Wrong Item</SelectItem>
                <SelectItem value="Not as Expected">Not as Expected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-[10px]">
            <h1 htmlFor="actionTaken">Action Taken:</h1>

            <Select
              onValueChange={(e) => {
                handleDropDown(e, "actionTaken");
              }}
            >
              <SelectTrigger className="bg-white border-[0.25px] w-[345px] sm:w-[400px] h-[30px]">
                <SelectValue placeholder="Value" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Refund">Refund</SelectItem>
                <SelectItem value="Exchange">Exchange</SelectItem>
                <SelectItem value="Store Credit">Store Credit</SelectItem>
                <SelectItem value="To Be Refunded">To Be Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.actionTaken == "Refund" && (
            <div className="mb-[10px]">
              <h1 htmlFor="refundMethod">Refund Method:</h1>

              <Select
                onValueChange={(e) => {
                  handleDropDown(e, "refundMethod");
                }}
              >
                <SelectTrigger className="bg-white border-[0.25px] w-[345px] sm:w-[400px] h-[30px]">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="gpay">Google Pay</SelectItem>
                  <SelectItem value="phonepe">PhonePe</SelectItem>
                  <SelectItem value="paytm">Paytm</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {formData.actionTaken == "Refund" && (
            <div className="mb-[10px]">
              <h1>Refund Date:</h1>
              <input
                type="date"
                id="refundDate"
                onChange={(e) => {
                  handleInput(e, "refundDate");
                }}
                className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              />
            </div>
          )}

          <div className="mb-[10px]">
            <h1>Charges (if any):</h1>
            <input
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="charges"
              onChange={(e) => {
                handleInput(e, "charges");
              }}
            />
          </div>
          <div className="mb-[10px]">
            <h1>Return Date:</h1>
            <input
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              type="date"
              id="returnDate"
              onChange={(e) => {
                handleInput(e, "returnDate");
              }}
              required
            />
          </div>
          <div className="mb-[10px]">
            <h1>Return Amount:</h1>
            <input
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              type="number"
              id="returnAmount"
              name="returnAmount"
              onChange={(e) => {
                handleInput(e, "returnAmount");
              }}
              required
              readOnly
            />
          </div>
          <div className="mb-[10px]">
            <h1>Remarks:</h1>
            <textarea
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="remarks"
              onChange={(e) => {
                handleInput(e, "remarks");
              }}
            ></textarea>
          </div>
          <div
            onClick={() => {
              window.location.reload();
            }}
            className="rounded-md mb-[8px] cursor-pointer mx-auto w-[345px]  sm:w-[400px] text-center  py-2 border-green-700 border-[0.25px] bg-white text-green-700"
          >
            CLEAR
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            id="submitButton"
            disabled={false}
            className="rounded-md w-[345px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
