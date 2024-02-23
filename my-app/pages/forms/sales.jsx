import { supabase } from "@/db/supabase";
import React, { useState, useEffect } from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { Button } from "@/components/ui/button";
export default function SalesForm({ productNames, customers, cargoProviders }) {
  const [btn, setBtn] = useState(false);
  const [initialFormState, setFormState] = useState({
    saleDate: "",
    customerName: "",
    saleMode: "",
    discountByPercentage: 0,
    discountByAmount: 0,
    amountReceived: "",
    grossAmount: 0,
    netAmount: 0,
    dueDate: "",
    modeOfPayment: "",
    paymentRefNumber: "",
    specialInstructions: "",
    cargoProvider: "",
    trackingNumber: "",
    orderStatus: "",
    dateOfShipment: "",
    dateOfDelivery: "",
    saleType: "",
  });
  console.log(initialFormState);
  const [products, setProducts] = useState([
    {
      productName: "",
      printType: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
    },
  ]);

  const addProductField = () => {
    setProducts([
      ...products,
      {
        productName: "",
        printType: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
      },
    ]);
  };

  const handleClear = () => {
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof document !== "undefined") {
      document.getElementById("submitButton").disabled = true;
    }
    const temp = {
      ...initialFormState,
      discountByPercentage: document.getElementById("discountByPercentage")
        .value,
      discountByAmount: document.getElementById("discountByAmount").value,
      amountReceived: document.getElementById("amountReceived").value,
      grossAmount: document.getElementById("grossAmount").value,
      netAmount: document.getElementById("netAmount").value,
      amountDue: document.getElementById("finalBalance").value,
    };
    const final = [temp, products];

    fetch("../api/sales", {
      body: JSON.stringify(final),
      method: "POST",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((response) => {
        document.getElementById("submitButton").disabled = false;
        if (response[0] == "success") {
          alert("added to db");
        } else {
          let message = "The following products quantity are not available:\n";
          response.forEach((item) => {
            message += `${item.productName}\n`;
          });
          alert(message);
          window.location.reload();
          return;
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  const handleFormInputChange = (field, value) => {
    let total = 0;
    products.forEach((product) => {
      const quantity = parseFloat(product.quantity) || 0;
      const unitPrice = parseFloat(product.unitPrice) || 0;
      const totalPrice = quantity * unitPrice;
      total += totalPrice;
    });

    if (field == "discount") {
      if (value == "") {
        value = 0;
      }
      const discountPerc = parseFloat(value);
      const d = (discountPerc * parseFloat(total)) / 100;
      document.getElementById("discountByAmount").value = d;
      if (document.getElementById("discountByAmount").value) {
        document.getElementById("netAmount").value = total - parseFloat(d);
      } else {
        document.getElementById("netAmount").value = total;
      }
      document.getElementById("finalBalance").value =
        -parseFloat(document.getElementById("amountReceived").value) +
          parseFloat(document.getElementById("netAmount").value || 0) >=
        0
          ? -parseFloat(document.getElementById("amountReceived").value) +
            parseFloat(document.getElementById("netAmount").value || 0)
          : 0;
      if (document.getElementById("finalBalance").value != "0") {
        document.getElementById("dueDateContainer").style.display = "block";
      } else {
        document.getElementById("dueDateContainer").style.display = "none";
      }
      setFormState({
        ...initialFormState,
        [field]: value,
        ["discountByAmount"]: d,
      });
    } else if (field == "discountByAmount") {
      if (value == "") {
        value = 0;
      }
      const discountAmt = parseFloat(value);

      const d = parseFloat((discountAmt / total) * 100);
      document.getElementById("discountByPercentage").value = d;
      if (document.getElementById("discountByAmount").value) {
        document.getElementById("netAmount").value = total - discountAmt;
      } else {
        document.getElementById("netAmount").value = total;
      }
      document.getElementById("finalBalance").value =
        -parseFloat(document.getElementById("amountReceived").value) +
          parseFloat(document.getElementById("netAmount").value || 0) >=
        0
          ? -parseFloat(document.getElementById("amountReceived").value) +
            parseFloat(document.getElementById("netAmount").value || 0)
          : 0;

      if (document.getElementById("finalBalance").value != "0") {
        document.getElementById("dueDateContainer").style.display = "block";
      } else {
        document.getElementById("dueDateContainer").style.display = "none";
      }
      setFormState({
        ...initialFormState,
        [field]: value,
        ["discountByPercentage"]: d,
      });
    } else if (field == "amountReceived") {
      document.getElementById("finalBalance").value =
        -parseFloat(document.getElementById("amountReceived").value) +
          parseFloat(document.getElementById("netAmount").value || 0) >=
        0
          ? -parseFloat(document.getElementById("amountReceived").value) +
            parseFloat(document.getElementById("netAmount").value || 0)
          : 0;
      if (document.getElementById("finalBalance").value != "0") {
        document.getElementById("dueDateContainer").style.display = "block";
      } else {
        document.getElementById("dueDateContainer").style.display = "none";
      }
      setFormState({
        ...initialFormState,
        [field]: value,
      });
    } else {
      setFormState({
        ...initialFormState,
        [field]: value,
      });
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    if (!value) {
      updatedProducts[index]["totalPrice"] = 0;
    } else if (
      updatedProducts[index]["quantity"] &&
      updatedProducts[index]["unitPrice"]
    ) {
      console.log("Inside");
      updatedProducts[index]["totalPrice"] =
        parseFloat(updatedProducts[index]["quantity"]) *
        parseFloat(updatedProducts[index]["unitPrice"]);
    }

    let total = 0;
    products.forEach((product) => {
      const quantity = parseFloat(product.quantity) || 0;
      const unitPrice = parseFloat(product.unitPrice) || 0;
      const totalPrice = quantity * unitPrice;
      total += totalPrice;
    });

    const discountPerc = document.getElementById("discountByPercentage").value;
    const d = (discountPerc * parseFloat(total)) / 100;
    document.getElementById("discountByAmount").value = d;
    if (document.getElementById("discountByAmount").value) {
      document.getElementById("netAmount").value = total - parseFloat(d);
    } else {
      document.getElementById("netAmount").value = total;
    }
    document.getElementById("finalBalance").value =
      -parseFloat(document.getElementById("amountReceived").value) +
        parseFloat(document.getElementById("netAmount").value || 0) >=
      0
        ? -parseFloat(document.getElementById("amountReceived").value) +
          parseFloat(document.getElementById("netAmount").value || 0)
        : 0;
    document.getElementById("discountByAmount").value = d;

    document.getElementById("grossAmount").value = total;
    if (document.getElementById("discountByAmount").value) {
      document.getElementById("netAmount").value =
        total - parseFloat(document.getElementById("discountByAmount").value);
    } else {
      document.getElementById("netAmount").value = total;
    }

    document.getElementById("finalBalance").value =
      -parseFloat(document.getElementById("amountReceived").value) +
        parseFloat(document.getElementById("netAmount").value || 0) >=
      0
        ? -parseFloat(document.getElementById("amountReceived").value) +
          parseFloat(document.getElementById("netAmount").value || 0)
        : 0;
    if (document.getElementById("finalBalance").value != "0") {
      document.getElementById("dueDateContainer").style.display = "block";
    } else {
      document.getElementById("dueDateContainer").style.display = "none";
    }
    setProducts(updatedProducts);
  };

  return (
    <div>
      <UpdatedNav />
      <form
        id="salesForm"
        className="max-w-screen-md mx-auto p-4 border-1 border-solid border-gray-300 rounded bg-gray-100"
      >
        <h2 className="text-center mb-4 text-2xl">Sales User Form</h2>
        <div className="flex-container mb-[10px]">
          <div className="flex-item">
            <h1 htmlFor="saleDate">Sale Date:</h1>
            <input
              type="date"
              id="saleDate"
              name="saleDate"
              onChange={(e) => {
                handleFormInputChange("saleDate", e.target.value);
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="customerName">Customer Name:</h1>
            <SearchSelect
              id="customerName"
              name="customerName"
              required
              style={{ width: "100%" }}
              onValueChange={(e) => {
                handleFormInputChange("customerName", e);
              }}
            >
              {customers?.map((i) => {
                return (
                  <SearchSelectItem key={i} value={i}>
                    {i}
                  </SearchSelectItem>
                );
              })}
            </SearchSelect>
          </div>
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="saleMode">Mode of Sale:</h1>
            <select
              onChange={(e) => {
                handleFormInputChange("saleMode", e.target.value);
              }}
              id="saleMode"
              name="saleMode"
              style={{ width: "100%" }}
            >
              <option value="Direct">Direct</option>
              <option value="Telephone">Telephone</option>
              <option value="YouTube">YouTube</option>
              <option value="Facebook">Facebook</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Promotion">Promotion</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="saleType">Sale Type</h1>
            <select
              onChange={(e) => {
                handleFormInputChange("saleType", e.target.value);
              }}
              id="saleType"
              name="saleType"
              style={{ width: "100%" }}
            >
              <option value="Retail">Retail</option>
              <option value="WholeSale">WholeSale</option>
              <option value="Free">Free</option>
              <option value="Self Consumption">Self Consumption</option>
              <option value="Dead Stock">Dead Stock</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <table className="w-full mb-[10px]">
          <thead className="mb-[10px]">
            <tr>
              <th className="bg-blue-500 text-white">Product Name</th>
              <th className="bg-blue-500 text-white">Qty</th>
              <th className="bg-blue-500 text-white">Price</th>
              <th className="bg-blue-500 text-white">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="product">
                <td>
                  <SearchSelect
                    name="productName[]"
                    className="productName"
                    required
                    value={product.productName}
                    onValueChange={(e) =>
                      handleInputChange(index, "productName", e)
                    }
                  >
                    {productNames?.map((i) => {
                      return (
                        <SearchSelectItem
                          key={i.uniqueProductName}
                          value={i.uniqueProductName}
                        >
                          {i.uniqueProductName}
                        </SearchSelectItem>
                      );
                    })}
                  </SearchSelect>
                </td>

                <td>
                  <input
                    type="text"
                    className="quantity"
                    name="quantity[]"
                    required
                    value={product.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="unitPrice"
                    name="unitPrice[]"
                    required
                    value={product.unitPrice}
                    onChange={(e) =>
                      handleInputChange(index, "unitPrice", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="totalPrice"
                    name="totalPrice[]"
                    value={product.totalPrice}
                    readOnly
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="add-product-btn w-full py-2 bg-blue-500 text-white mb-[10px]"
          onClick={addProductField}
        >
          Add Product
        </button>
        <div className="flex-container">
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="discountByPercentage">Discount (%):</h1>
            <input
              type="text"
              onChange={(e) => {
                handleFormInputChange("discount", e.target.value);
              }}
              id="discountByPercentage"
              name="discountByPercentage"
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="discountByAmount">Discount (Amount):</h1>
            <input
              type="text"
              id="discountByAmount"
              onChange={(e) => {
                handleFormInputChange("discountByAmount", e.target.value);
              }}
              name="discountByAmount"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="flex-container mb-[10px]">
          <div className="flex-item">
            <h1 htmlFor="grossAmount">Gross Amount:</h1>
            <input
              type="number"
              id="grossAmount"
              name="grossAmount"
              readOnly
              disabled
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="netAmount">Net Amount:</h1>
            <input
              type="number"
              id="netAmount"
              name="netAmount"
              readOnly
              disabled
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="flex-container ">
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="amountReceived">Amount Received:</h1>
            <input
              type="text"
              onChange={(e) => {
                handleFormInputChange("amountReceived", e.target.value);
              }}
              id="amountReceived"
              name="amountReceived"
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex-item">
            <h1 htmlFor="finalBalance">Amount Due:</h1>
            <input
              type="number"
              id="finalBalance"
              name="finalBalance"
              readOnly
              disabled
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="flex-container " id="dueDateContainer">
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="dueDate" id="dueDateLabel">
              Due Date:
            </h1>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
        {initialFormState.amountReceived &&
          initialFormState.amountReceived != 0 && (
            <div className="flex-container">
              <div className="flex-item mb-[10px]">
                <h1 htmlFor="modeOfPayment">Mode of Payment:</h1>
                <select
                  id="modeOfPayment"
                  name="modeOfPayment"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    handleFormInputChange("modeOfPayment", e.target.value);
                  }}
                >
                  <option value="gpay">Google Pay</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="paytm">Paytm</option>
                  <option value="otherUPI">Other UPI</option>
                  <option value="bankTransfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div className="flex-item mb-[10px]">
                <h1 htmlFor="paymentRefNumber">Payment Reference Number:</h1>
                <input
                  type="text"
                  onChange={(e) => {
                    handleFormInputChange("paymentRefNumber", e.target.value);
                  }}
                  id="paymentRefNumber"
                  name="paymentRefNumber"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}
        <div className="flex-container">
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="specialInstructions">Special Instructions:</h1>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              style={{ width: "100%" }}
              onChange={(e) => {
                handleFormInputChange("specialInstructions", e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item mb-[10px]">
            <h1 htmlFor="orderStatus">Order Status:</h1>
            <select
              onChange={(e) => {
                handleFormInputChange("orderStatus", e.target.value);
              }}
              id="orderStatus"
              name="orderStatus"
              style={{ width: "100%" }}
            >
              <option value="Select">Select</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        {(initialFormState.orderStatus == "Shipped" ||
          initialFormState.orderStatus == "Delivered") && (
          <div className="flex-container">
            <div className="flex-item mb-[10px]">
              <h1 htmlFor="cargoProvider">Cargo Provider:</h1>
              <SearchSelect
                id="cargoProvider"
                name="cargoProvider"
                style={{ width: "100%" }}
                onValueChange={(e) => {
                  handleFormInputChange("cargoProvider", e);
                }}
              >
                {cargoProviders?.map((i) => {
                  return (
                    <SearchSelectItem key={i.supplier} value={i.supplier}>
                      {i.supplier}
                    </SearchSelectItem>
                  );
                })}
              </SearchSelect>
            </div>
            <div className="flex-container mb-[10px]">
              <div className="flex-item">
                <h1 htmlFor="saleDate">Date Of Shipment:</h1>
                <input
                  type="date"
                  id="dateOfShippment"
                  onChange={(e) => {
                    handleFormInputChange("dateOfShipment", e.target.value);
                  }}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="flex-item mb-[10px]">
              <h1 htmlFor="trackingNumber">Tracking Number:</h1>
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                style={{ width: "100%" }}
                onChange={(e) => {
                  handleFormInputChange("trackingNumber", e.target.value);
                }}
              />
            </div>
            {initialFormState.orderStatus == "Delivered" && (
              <div className="flex-container mb-[10px]">
                <div className="flex-item">
                  <h1 htmlFor="saleDate">Date Of Delivery:</h1>
                  <input
                    type="date"
                    id="dateOfDelivery"
                    onChange={(e) => {
                      handleFormInputChange("dateOfDelivery", e.target.value);
                    }}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <Button
          onClick={handleClear}
          className="border-[0.5px] m-8 border-neutral-400 border-[#4A84F3]"
        >
          Clear
        </Button>
        <Button
          onClick={handleSubmit}
          id="submitButton"
          disabled={btn}
          className="border-[0.5px] m-8 border-neutral-400 border-[#4A84F3]"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const resp1 = await supabase
    .from("readystock_view2")
    .select("uniqueproductname");
  const uniqueProducts = Array.from(
    new Set(resp1.data.map((item) => item.uniqueproductname))
  ).map((uniqueProductName) => ({
    uniqueProductName,
  }));
  const { data, error } = await supabase.from("customertbl").select("nickname");
  let temp = data;
  const customers = temp?.map((x) => x.nickname);
  let resp2 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Logistics");
  return {
    props: {
      productNames: uniqueProducts,
      customers,
      cargoProviders: resp2.data,
    },
  };
}
