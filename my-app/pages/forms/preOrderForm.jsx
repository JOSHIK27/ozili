import { useState } from "react";
import { supabase } from "@/db/supabase";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
export default function PreOrder({ customers, products, printTypes }) {
  const [formData, setFormData] = useState({
    customerName: "",
    orderDate: "",
    expectedDeliveryDate: "",
    targetDeliveryDate: "",
    productName: "",
    printType: "",
    quantity: "",
    unitPrice: "",
    instructions: "",
    paymentStatus: "",
    orderStatus: "",
  });
  console.log(formData);
  const isAtLeastThreeDaysPrior = (firstDateStr, secondDateStr) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const firstDate = new Date(firstDateStr);
    const secondDate = new Date(secondDateStr);

    const timeDifferenceInDays = Math.floor(
      (secondDate.getTime() - firstDate.getTime()) / oneDayInMilliseconds
    );

    return timeDifferenceInDays >= 3;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleOrderStatus = (e) => {
    setFormData({
      customerName: formData.customerName,
      orderDate: formData.orderDate,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      targetDeliveryDate: formData.targetDeliveryDate,
      productName: formData.productName,
      printType: formData.printType,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      instructions: formData.instructions,
      paymentStatus: formData.paymentStatus,
      orderStatus: e,
    });
  };
  const handlePaymentStatus = (e) => {
    setFormData({
      customerName: formData.customerName,
      orderDate: formData.orderDate,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      targetDeliveryDate: formData.targetDeliveryDate,
      productName: formData.productName,
      printType: formData.printType,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      instructions: formData.instructions,
      paymentStatus: e,
      orderStatus: formData.orderStatus,
    });
  };
  const handleProducts = (e) => {
    setFormData({
      customerName: formData.customerName,
      orderDate: formData.orderDate,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      targetDeliveryDate: formData.targetDeliveryDate,
      productName: e.product,
      printType: formData.printType,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      instructions: formData.instructions,
      paymentStatus: formData.paymentStatus,
      orderStatus: formData.orderStatus,
    });
  };
  const handlePrintTypes = (e) => {
    setFormData({
      customerName: formData.customerName,
      orderDate: formData.orderDate,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      targetDeliveryDate: formData.targetDeliveryDate,
      productName: formData.productName,
      printType: e.printtype,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      instructions: formData.instructions,
      paymentStatus: formData.paymentStatus,
      orderStatus: formData.orderStatus,
    });
  };
  const handleCustomer = (e) => {
    setFormData({
      customerName: e,
      orderDate: formData.orderDate,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      targetDeliveryDate: formData.targetDeliveryDate,
      productName: formData.productName,
      printType: formData.printType,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      instructions: formData.instructions,
      paymentStatus: formData.paymentStatus,
      orderStatus: formData.orderStatus,
    });
  };
  const handleClear = () => {
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }
    if (
      isAtLeastThreeDaysPrior(
        formData.expectedDeliveryDate,
        formData.targetDeliveryDate
      )
    ) {
      alert(
        "Target Delivery Date is less than 3 days from the Expected Delivery Date"
      );
      return;
    }
    fetch("../api/preOrder", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((x) => {
        if (x[0] == "success") {
          alert("PreOrder Successfully Added");
          window.location.reload();
        } else {
          alert("Error");
        }
      });
  };
  return (
    <div>
      <UpdatedNav />
      <div class="container">
        <h2 className="text-2xl font-900">Pre-Order Form</h2>
        <br />
        <form id="preOrderForm">
          <div class="form-control">
            <h1>Customer Name</h1>
            <SearchSelect onValueChange={handleCustomer}>
              {customers &&
                customers.map((item) => {
                  return (
                    <SearchSelectItem key={item} value={item}>
                      {item}
                    </SearchSelectItem>
                  );
                })}
            </SearchSelect>
          </div>
          <div class="form-control">
            <label for="orderDate">Order Date</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="orderDate"
              name="orderDate"
              required
            />
          </div>
          <div class="form-control">
            <label for="expectedDeliveryDate">Expected Delivery Date</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="expectedDeliveryDate"
              name="expectedDeliveryDate"
              required
            />
          </div>
          <div class="form-control">
            <label for="targetDeliveryDate">Target Delivery Date</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="targetDeliveryDate"
              name="targetDeliveryDate"
              required
            />
          </div>
          <div class="form-control">
            <h1>Products</h1>
            <SearchSelect onValueChange={handleProducts}>
              {products &&
                products.map((item) => {
                  return (
                    <SearchSelectItem key={item.product} value={item}>
                      {item.product}
                    </SearchSelectItem>
                  );
                })}
            </SearchSelect>
          </div>
          <div class="form-control">
            <h1>Print Type</h1>
            <SearchSelect onValueChange={handlePrintTypes}>
              {printTypes &&
                printTypes.map((item) => {
                  return (
                    <SearchSelectItem key={item.printtype} value={item}>
                      {item.printtype}
                    </SearchSelectItem>
                  );
                })}
            </SearchSelect>
          </div>
          <div class="form-control">
            <label for="quantity">Quantity</label>
            <input
              onChange={handleInputChange}
              type="number"
              id="quantity"
              name="quantity"
              required
            />
          </div>
          <div class="form-control">
            <label for="unitPrice">Unit Price</label>
            <input
              onChange={handleInputChange}
              type="number"
              id="unitPrice"
              name="unitPrice"
              required
            />
          </div>
          <div class="form-control">
            <label for="instructions">Instructions</label>
            <textarea
              onChange={handleInputChange}
              id="instructions"
              name="instructions"
              rows="4"
            ></textarea>
          </div>
          <div class="form-control">
            <h1>Payment Status</h1>
            <SearchSelect onValueChange={handlePaymentStatus}>
              <SearchSelectItem value="Pending">Pending</SearchSelectItem>
              <SearchSelectItem value="PartiallyPaid">
                Partially Paid
              </SearchSelectItem>
              <SearchSelectItem value="FullPaid">Fully Paid</SearchSelectItem>
            </SearchSelect>
          </div>
          <div class="form-control">
            <h1>Order Status</h1>
            <SearchSelect onValueChange={handleOrderStatus}>
              <SearchSelectItem value="Processing">Processing</SearchSelectItem>
              <SearchSelectItem value="Fulfilled">Fulfilled</SearchSelectItem>
              <SearchSelectItem value="Cancelled">Cancelled</SearchSelectItem>
            </SearchSelect>
          </div>
          <button onClick={handleSubmit} type="submit" class="submit-btn">
            Submit
          </button>
          <button onClick={handleClear} type="clear" class="submit-btn">
            Clear
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("customertbl").select("nickname");
  let temp = data;
  const customers = temp?.map((x) => x.nickname);
  const resp1 = await supabase.from("products").select("product");
  const resp2 = await supabase.from("printtypestbl").select("printtype");
  console.log(customers, resp1.data, resp2.data);
  return {
    props: {
      customers,
      products: resp1.data,
      printTypes: resp2.data,
    },
  };
}
