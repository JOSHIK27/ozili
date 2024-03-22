import { supabase } from "@/db/supabase";
import React, { useState } from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { Button } from "@/components/ui/button";
export default function SalesForm({ productNames, customers, cargoProviders }) {
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
    shippingCharges: "",
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
  console.log(products);
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

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };
  const handleSearchSelect = () => {};
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
          window.location.reload();
        } else {
          let message = "The following products quantity are not available:\n";
          response.forEach((item) => {
            message += `${item.productName}\n`;
          });
          alert(message);
          return;
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Fetch error:", error);
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
      <div className="flex justify-center mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-center mb-4 text-2xl">Sales Form</h2>
          <div className=" mb-[10px]">
            <div className="flex-item">
              <h1 htmlFor="saleDate">Sale Date:</h1>
              <input
                type="date"
                id="saleDate"
                name="saleDate"
                onChange={(e) => {
                  handleFormInputChange("saleDate", e.target.value);
                }}
                className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
              />
            </div>
          </div>
          <div className="mb-[10px]">
            <h1 htmlFor="customerName">Customer Name:</h1>
            <SearchSelect
              id="customerName"
              name="customerName"
              required
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
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
          <div className="mb-[10px]">
            <h1 htmlFor="saleMode">Mode of Sale:</h1>
            <SearchSelect
              onValueChange={(e) => {
                handleFormInputChange("saleMode", e);
              }}
              id="saleMode"
              name="saleMode"
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            >
              <SearchSelectItem value="Direct">Direct</SearchSelectItem>
              <SearchSelectItem value="Telephone">Telephone</SearchSelectItem>
              <SearchSelectItem value="YouTube">YouTube</SearchSelectItem>
              <SearchSelectItem value="Facebook">Facebook</SearchSelectItem>
              <SearchSelectItem value="Exhibition">Exhibition</SearchSelectItem>
              <SearchSelectItem value="Promotion">Promotion</SearchSelectItem>
              <SearchSelectItem value="Other">Other</SearchSelectItem>
            </SearchSelect>
          </div>
          <div className="mb-[20px]">
            <h1>Sale Type</h1>
            <SearchSelect
              onValueChange={(e) => {
                handleFormInputChange("saleType", e);
              }}
              id="saleType"
              name="saleType"
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            >
              <SearchSelectItem value="Retail">Retail</SearchSelectItem>
              <SearchSelectItem value="WholeSale">WholeSale</SearchSelectItem>
              <SearchSelectItem value="Free">Free</SearchSelectItem>
              <SearchSelectItem value="Self Consumption">
                Self Consumption
              </SearchSelectItem>
              <SearchSelectItem value="Dead Stock">Dead Stock</SearchSelectItem>
              <SearchSelectItem value="Other">Other</SearchSelectItem>
            </SearchSelect>
          </div>
          <table className="bg-slate-50 w-[345px] min-h-40 border-collapse sm:w-[400px] shadow-xl block overflow-x-auto mb-[12px]">
            <thead className="bg-slate-200 p-4">
              <tr>
                <th className="py-4 pl-4 text-left border-l-0">Product Name</th>
                <th className="border-l-0	text-left py-4">Qty</th>
                <th className="border-l-0	text-left py-4">Price</th>
                <th className="border-l-0 text-left py-4 pl-[6px]">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="product">
                  <td className="border-2 p-2 min-w-[200px] border-l-0 border-r-0">
                    <SearchSelect
                      name="productName[]"
                      className="productName text-[10px] pl-0 pr-0 rounded-none"
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
                            className="productName text-[10px] pl-0 pr-0"
                          >
                            {i.uniqueProductName}
                          </SearchSelectItem>
                        );
                      })}
                    </SearchSelect>
                  </td>

                  <td className="border-2 p-2 min-w-[50px] border-l-0 border-r-0">
                    <input
                      type="text"
                      className="quantity text-xs pl-0 pr-0 bg-slate-30  border-[0.5px] shadow-xl rounded"
                      name="quantity[]"
                      required
                      value={product.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td className="border-2 p-2 min-w-[50px] border-l-0 border-r-0">
                    <input
                      type="text"
                      className="unitPrice text-xs pl-0 pr-0 bg-slate-30  border-[0.5px] shadow-xl rounded"
                      name="unitPrice[]"
                      required
                      value={product.unitPrice}
                      onChange={(e) =>
                        handleInputChange(index, "unitPrice", e.target.value)
                      }
                    />
                  </td>
                  <td className="border-2 p-2 min-w-[50px] border-l-0 border-r-0">
                    {product.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button
            type="button"
            className="rounded-md w-[345px] mb-[20px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
            onClick={addProductField}
          >
            Add Product
          </button>
          <div className="mb-[10px]">
            <h1 htmlFor="discountByPercentage">Discount (%):</h1>
            <input
              type="text"
              onChange={(e) => {
                handleFormInputChange("discount", e.target.value);
              }}
              id="discountByPercentage"
              name="discountByPercentage"
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className="mb-[10px]">
            <h1 htmlFor="discountByAmount">Discount (Amount):</h1>
            <input
              type="text"
              id="discountByAmount"
              onChange={(e) => {
                handleFormInputChange("discountByAmount", e.target.value);
              }}
              name="discountByAmount"
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className=" mb-[10px]">
            <h1 htmlFor="grossAmount">Gross Amount:</h1>
            <input
              type="number"
              id="grossAmount"
              name="grossAmount"
              readOnly
              disabled
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className="mb-[10px]">
            <h1 htmlFor="netAmount">Net Amount:</h1>
            <input
              type="number"
              id="netAmount"
              name="netAmount"
              readOnly
              disabled
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className="mb-[10px]">
            <h1 htmlFor="amountReceived">Amount Received:</h1>
            <input
              type="text"
              onChange={(e) => {
                handleFormInputChange("amountReceived", e.target.value);
              }}
              id="amountReceived"
              name="amountReceived"
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className="mb-[12px]">
            <h1 htmlFor="finalBalance">Amount Due:</h1>
            <input
              type="number"
              id="finalBalance"
              name="finalBalance"
              readOnly
              disabled
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className="mb-[10px]" id="dueDateContainer">
            <h1 htmlFor="dueDate" id="dueDateLabel">
              Due Date:
            </h1>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              onChange={(e) => {
                handleFormInputChange("dueDate", e.target.value);
              }}
              className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
            />
          </div>

          {initialFormState.amountReceived &&
            initialFormState.amountReceived != 0 && (
              <div className="">
                <div className="mb-[10px]">
                  <h1 htmlFor="modeOfPayment">Mode of Payment:</h1>
                  <SearchSelect
                    id="modeOfPayment"
                    name="modeOfPayment"
                    style={{ width: "100%" }}
                    onValueChange={(e) => {
                      handleFormInputChange("modeOfPayment", e);
                    }}
                  >
                    <SearchSelectItem value="gpay">Google Pay</SearchSelectItem>
                    <SearchSelectItem value="phonepe">PhonePe</SearchSelectItem>
                    <SearchSelectItem value="paytm">Paytm</SearchSelectItem>
                    <SearchSelectItem value="otherUPI">
                      Other UPI
                    </SearchSelectItem>
                    <SearchSelectItem value="bankTransfer">
                      Bank Transfer
                    </SearchSelectItem>
                    <SearchSelectItem value="cash">Cash</SearchSelectItem>
                  </SearchSelect>
                </div>
                <div className="mb-[10px]">
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
          <div className="">
            <div className="mb-[10px]">
              <h1 htmlFor="specialInstructions">Special Instructions:</h1>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[60px]"
                onChange={(e) => {
                  handleFormInputChange("specialInstructions", e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="">
            <div className="mb-[10px]">
              <h1 htmlFor="orderStatus">Order Status:</h1>
              <SearchSelect
                onValueChange={(e) => {
                  handleFormInputChange("orderStatus", e);
                }}
                id="orderStatus"
                name="orderStatus"
                className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
              >
                <SearchSelectItem value="Confirmed">Confirmed</SearchSelectItem>
                <SearchSelectItem value="Processing">
                  Processing
                </SearchSelectItem>
                <SearchSelectItem value="Shipped">Shipped</SearchSelectItem>
                <SearchSelectItem value="Delivered">Delivered</SearchSelectItem>
                <SearchSelectItem value="Cancelled">Cancelled</SearchSelectItem>
              </SearchSelect>
            </div>
          </div>
          {(initialFormState.orderStatus == "Shipped" ||
            initialFormState.orderStatus == "Delivered") && (
            <div>
              <div className="mb-[10px]">
                <h1 htmlFor="cargoProvider">Cargo Provider:</h1>
                <SearchSelect
                  id="cargoProvider"
                  name="cargoProvider"
                  className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
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
              <div className="mb-[10px]">
                <h1 htmlFor="saleDate">Date Of Shipment:</h1>
                <input
                  type="date"
                  id="dateOfShippment"
                  onChange={(e) => {
                    handleFormInputChange("dateOfShipment", e.target.value);
                  }}
                  className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
                />
              </div>
              <div className="mb-[10px]">
                <h1 htmlFor="trackingNumber">Tracking Number:</h1>
                <input
                  type="text"
                  id="trackingNumber"
                  className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
                  name="trackingNumber"
                  onChange={(e) => {
                    handleFormInputChange("trackingNumber", e.target.value);
                  }}
                />
              </div>
              {initialFormState.orderStatus == "Delivered" && (
                <div className="mb-[10px]">
                  <h1 htmlFor="saleDate">Date Of Delivery:</h1>
                  <input
                    type="date"
                    id="dateOfDelivery"
                    className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
                    onChange={(e) => {
                      handleFormInputChange("dateOfDelivery", e.target.value);
                    }}
                  />
                </div>
              )}
              <div className="mb-[10px]">
                <h1 htmlFor="saleDate">Shipping Charges</h1>
                <input
                  type="text"
                  id="shippingCharges"
                  onChange={(e) => {
                    handleFormInputChange("shippingCharges", e.target.value);
                  }}
                  className="bg-white w-[345px] border-[0.25px] sm:w-[400px] h-[30px]"
                />
              </div>
            </div>
          )}
          <div
            onClick={handleClear}
            className="rounded-md mb-[8px] mt-[30px] cursor-pointer mx-auto w-[345px] sm:w-[400px] text-center  py-2 border-green-700 border-[0.25px] bg-white text-green-700"
          >
            Clear
          </div>
          <button
            onClick={handleSubmit}
            id="submitButton"
            disabled={false}
            className="rounded-md cursor-pointer mx-auto w-[345px] border-[0.25px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
          >
            Submit
          </button>
        </div>
      </div>
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
