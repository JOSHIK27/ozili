import React, { useState, useEffect } from "react";
import UpdatedNav from "../components/ui/updatedNav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { readyStockFormData } from "@/store/states";
import { readyStockitem } from "@/store/states";
import { useRecoilState } from "recoil";
import { supabase } from "@/db/supabase";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
export default function ReadyStockForm({
  fabric,
  suppliers,
  cargoProviders,
  products,
  printTypes,
  printCodeMapping,
}) {
  const [formData, setFormData] = useRecoilState(readyStockFormData);
  const [formItems, setFormItems] = useRecoilState(readyStockitem);
  console.log(formData);
  useEffect(() => {
    formItems.forEach((item) => {
      calculatePriceAfterGst(item.id);
      calculateLineTotal(item.id);
    });
  }, [formItems, formData]);

  useEffect(() => {
    calculateTotalAmount();
    formItems.forEach((item, index) => {
      displayUniqueProductName(index);
    });
  }, [formItems, formData]);

  function displayUniqueProductName(itemNumber) {
    let productNameInput = formItems[itemNumber].product;
    let supplierNameInput = formData.supplierName;
    let uniqueProductNameDisplay = document.getElementById(
      "uniqueProductName-" + itemNumber
    );
    let printType = formItems[itemNumber].printType;
    console.log(productNameInput, supplierNameInput, printType);
    if (productNameInput && supplierNameInput && printType) {
      console.log("hitt2");
      let productName = productNameInput;
      let designCode = formItems[itemNumber].designCode;
      console.log(designCode);
      if (!designCode) designCode = "NIL";
      let supplierName = supplierNameInput;
      let printCode = "";
      if (formItems[itemNumber].printType) {
        printCode = printCodeMapping[formItems[itemNumber].printType];
      }
      console.log(productName, designCode, supplierName, printCode);

      if (productName && designCode && supplierName && printCode) {
        let newProductName =
          productName +
          "-" +
          printCode +
          "-" +
          formData.supplierName.substring(0, 4) +
          "-" +
          designCode;
        uniqueProductNameDisplay.innerText = newProductName;
      } else {
        uniqueProductNameDisplay.innerText = "";
      }
    }
  }

  function calculateLineTotal(itemNumber) {
    let quantity = parseFloat(
      document.querySelector("#quantity_" + itemNumber).value
    );

    let priceAfterTax = parseFloat(
      document.querySelector("#priceAfterTax_" + itemNumber).value
    );
    let lineTotal = document.querySelector("#lineTotal_" + itemNumber);
    lineTotal.value = quantity * priceAfterTax;
    calculateTotalAmount();
  }

  function calculateTotalAmount() {
    let totalAmount = 0;
    console.log(formItems);
    formItems.forEach((item) => {
      if (!isNaN(document.getElementById(`lineTotal_${item.id}`).value)) {
        totalAmount += parseFloat(
          document.getElementById(`lineTotal_${item.id}`).value
        );
      }
    });
    totalAmount =
      totalAmount +
      parseFloat(formData.cargoCharges) -
      parseFloat(formData.discount) +
      parseFloat(formData.additionalCharges);
    document.getElementById("totalAmount").value = totalAmount;
    let amount =
      formData.cargoPaidBySupplier == true
        ? 0
        : -1 * parseFloat(formData.cargoCharges);

    // amount =
    //   amount -
    //   parseFloat(formData.discount) -
    //   parseFloat(formData.additionalCharges);
    document.getElementById("amountPayableToSupplier").value =
      amount + parseFloat(totalAmount) - parseFloat(formData.additionalCharges);
  }

  const calculatePriceAfterGst = (itemNumber) => {
    const priceBeforeTax = parseFloat(
      document.getElementById(`priceBeforeTax_${itemNumber}`).value
    );
    const gstRate = parseFloat(document.getElementById("gstRate").value);
    const gstPaid = formData.gstPaid;
    const priceAfterTax = document.getElementById(
      `priceAfterTax_${itemNumber}`
    );

    if (gstPaid) {
      const gstAmount = (priceBeforeTax * gstRate) / 100;
      priceAfterTax.value = priceBeforeTax + gstAmount;
    } else {
      priceAfterTax.value = priceBeforeTax;
    }
  };

  const handleAdd = () => {
    let temp;
    if (formItems) {
      temp = [
        ...formItems,
        {
          id: formItems.length,
          fabric: "",
          product: "",
          productCategory: "",
          printType: "",
          designCode: "",
          quantity: 0,
          priceBeforeTax: 0,
          priceAfterTax: 0,
          lineTotal: 0,
        },
      ];
    } else {
      temp = {
        id: 0,
        fabric: "",
        product: "",
        productCategory: "",
        printType: "",
        designCode: "",
        quantity: 0,
        priceBeforeTax: 0,
        priceAfterTax: 0,
        lineTotal: 0,
      };
    }
    setFormItems(temp);
  };
  const handleFormCheckBox = (field) => {
    if (field == "freeShipping") {
      document.getElementById("cargoCharges").value = 0;
      if (formData[field] == false) {
        setFormData({
          ...formData,
          [field]: !formData[field],
          ["cargoCharges"]: 0,
        });
        return;
      }
    } else if (field == "gstPaid") {
      document.getElementById("gstRate").value = 0;
      if (formData[field] == false) {
        setFormData({
          ...formData,
          [field]: !formData[field],
          ["gstRate"]: 0,
        });
        return;
      }
    }
    setFormData({
      ...formData,
      [field]: !formData[field],
    });
  };
  const handleFormData = (e, field) => {
    if (
      (field == "discount" ||
        field == "cargoCharges" ||
        field == "additionalCharges") &&
      e == ""
    ) {
      e = 0;
    }
    const f = field;
    setFormData({
      ...formData,
      [f]: e,
    });
  };

  const handleFormItemData = (e, field, id) => {
    const res = formItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: e,
        };
      } else {
        return item;
      }
    });
    setFormItems(res);
  };
  const handleSubmit = () => {
    let quantity = 0;
    formItems.forEach((item) => {
      quantity = quantity + parseFloat(item.quantity);
    });

    let temp = formItems.map((item, index) => {
      const priceAfterTax = parseFloat(
        document.getElementById(`priceAfterTax_${index}`).value
      );
      let netPrice = !formData.freeShipping
        ? priceAfterTax +
          (parseFloat(formData.cargoCharges ? formData.cargoCharges : 0) +
            (parseFloat(formData.additionalCharges)
              ? parseFloat(formData.additionalCharges)
              : 0)) /
            quantity
        : 0;
      return {
        ...item,
        ["lineTotal"]: document.getElementById(`lineTotal_${index}`).value,
        ["priceAfterTax"]: document.getElementById(`priceAfterTax_${index}`)
          .value,
        netPrice,
        ["uniqueProductId"]: document.getElementById(
          `uniqueProductName-${index}`
        ).innerText,
      };
    });
    const obj = {
      ...formData,
      items: temp,
      ["amountPayableToSupplier"]: document.getElementById(
        "amountPayableToSupplier"
      ).value,
    };
    obj.totalAmount = document.getElementById("totalAmount").value;
    if (typeof document !== "undefined") {
      document.getElementById("submitButton").disabled = true;
    }
    fetch("../api/readyStock", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((x) => {
        document.getElementById("submitButton").disabled = false;
        if (x[0] == "success") {
          alert("success");
          window.location.reload();
        }
      });
  };

  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold">Ready Stock Form</h2>
          <br></br>
          <div className="mb-[12px]">
            <h1>Order Date</h1>
            <input
              id="orderDate"
              type="date"
              onChange={(e) => {
                handleFormData(e.target.value, "orderDate");
              }}
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className="mb-[12px]">
            <h1>Received Date</h1>
            <input
              type="date"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              onChange={(e) => {
                handleFormData(e.target.value, "receivedDate");
              }}
              id="receivedDate"
            />
          </div>
          <div className="mb-[12px]">
            <h1>Invoice Number</h1>
            <input
              type="text"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="invoiceNumber"
              onChange={(e) => {
                handleFormData(e.target.value, "invoiceNumber");
              }}
            />
          </div>
          <div className="mb-[12px]">
            <h1>Supplier Name</h1>
            <Select
              onValueChange={(e) => {
                handleFormData(e, "supplierName");
              }}
              id="supplierName"
            >
              <SelectTrigger className="w-[345px] border-[0.25px] sm:w-[400px] h-[30px] bg-white">
                <SelectValue placeholder="Value" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {suppliers &&
                  suppliers?.map((item) => {
                    return (
                      <SelectItem key={item.supplier} value={item.supplier}>
                        {item.supplier}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-[12px]">
            <h1>Cargo Provider</h1>
            <Select
              onValueChange={(e) => {
                handleFormData(e, "cargoProvider");
              }}
              id="cargoProvider"
            >
              <SelectTrigger className="w-[345px] border-[0.25px] sm:w-[400px] h-[30px] bg-white">
                <SelectValue placeholder="Value" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {cargoProviders?.map((i) => {
                  return (
                    <SelectItem key={i.supplier} value={i.supplier}>
                      {i.supplier}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-[12px]">
            <h1>Free Shipping</h1>
            <input
              type="checkbox"
              id="freeShipping"
              onClick={(e) => {
                handleFormCheckBox("freeShipping");
              }}
            />
          </div>
          <div id="cargoChargesContainer" className="mb-[12px]">
            <h1
              style={{
                display: `${formData.freeShipping == true ? "none" : "block"}`,
              }}
            >
              Cargo Charges
            </h1>
            <input
              type="text"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="cargoCharges"
              style={{
                display: `${formData.freeShipping == true ? "none" : "block"}`,
              }}
              onChange={(e) => {
                handleFormData(e.target.value, "cargoCharges");
              }}
            />
          </div>
          <div id="cargoPaidBySupplierContainer" className="mb-[12px]">
            <h1>Cargo Paid By Supplier</h1>
            <input
              type="checkbox"
              id="cargoPaidBySupplier"
              onChange={(e) => {
                handleFormCheckBox("cargoPaidBySupplier");
              }}
            />
          </div>
          <div className="mb-[12px]">
            <h1>GST Paid</h1>
            <input
              type="checkbox"
              id="gstPaid"
              onChange={(e) => {
                handleFormCheckBox("gstPaid");
              }}
            />
          </div>
          <div id="gstRateContainer" className="mb-[12px]">
            <h1
              style={{
                display: `${formData.gstPaid != true ? "none" : "block"}`,
              }}
            >
              GST Rate
            </h1>
            <input
              type="text"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="gstRate"
              onChange={(e) => {
                handleFormData(e.target.value, "gstRate");
              }}
              style={{
                display: `${formData.gstPaid != true ? "none" : "block"}`,
              }}
            />
          </div>
          <div className="mb-[12px]">
            <h1>Total Amount Spent</h1>
            <input
              type="text"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="totalAmount"
              onChange={(e) => {
                handleFormData(e.target.value, "totalAmount");
              }}
            />
          </div>
          <div className="mb-[12px]">
            <h1>Amount Payable to Supplier</h1>
            <input
              type="text"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="amountPayableToSupplier"
              onChange={(e) => {
                handleFormData(e.target.value, "amountPayableToSupplier");
              }}
            />
          </div>
          <div className="mb-[12px]">
            <h1>Discount</h1>
            <input
              type="text"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="discount"
              onChange={(e) => {
                handleFormData(e.target.value, "discount");
              }}
            />
          </div>
          <div className="mb-[20px]">
            <h1>Additional Charges</h1>
            <input
              type="text"
              className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="additionalCharges"
              onChange={(e) => {
                handleFormData(e.target.value, "additionalCharges");
              }}
            />
          </div>
          <button
            id="submitButton"
            disabled={false}
            onClick={handleSubmit}
            className="rounded-md cursor-pointer mx-auto w-[345px] border-[0.25px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
          >
            Submit
          </button>
          <br />
        </div>
      </div>
      <br />
      {formItems &&
        formItems.map((item, index) => {
          return (
            <div key={index} className="flex justify-center mb-[12px]">
              <div className="bg-white shadow-lg rounded-lg p-8">
                <div className="bg-white p-8">
                  <h2 className="text-xl">ITEM NUMBER {item.id + 1}</h2>
                </div>
                <div className="mb-[12px]">
                  <h1>Fabric</h1>
                  <Select
                    onValueChange={(e) => {
                      handleFormItemData(e, "fabric", item.id);
                    }}
                  >
                    <SelectTrigger className="w-[345px] border-[0.25px] sm:w-[400px] h-[30px] bg-white">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {fabric?.map((x) => {
                        return (
                          <SelectItem key={x.fabric} value={x.fabric}>
                            {x.fabric}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-[12px]">
                  <h1>Product</h1>
                  <SearchSelect
                    onValueChange={(e) => {
                      handleFormItemData(e.product, "product", item.id);
                    }}
                  >
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
                <div className="mb-[12px]">
                  <h1>Product Category</h1>
                  <Select
                    onValueChange={(e) => {
                      handleFormItemData(e, "productCategory", item.id);
                    }}
                  >
                    <SelectTrigger className="w-[345px] border-[0.25px] sm:w-[400px] h-[30px] bg-white">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Saree">Saree</SelectItem>
                      <SelectItem value="Dress">Dress</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-[12px]">
                  <h1>Print Type</h1>
                  <Select
                    onValueChange={(e) => {
                      handleFormItemData(e, "printType", item.id);
                    }}
                  >
                    <SelectTrigger className="w-[345px] border-[0.25px] sm:w-[400px] h-[30px] bg-white">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {printTypes?.map((x) => {
                        return (
                          <SelectItem key={x.printtype} value={x.printtype}>
                            {x.printtype}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-[12px]">
                  <h1>Design Code</h1>
                  <input
                    type="text"
                    onChange={(e) => {
                      handleFormItemData(e.target.value, "designCode", item.id);
                    }}
                    className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
                  />
                </div>
                <div className="mb-[12px]">
                  <h1>Quantity</h1>
                  <input
                    type="text"
                    id={`quantity_${item.id}`}
                    onChange={(e) => {
                      handleFormItemData(e.target.value, "quantity", index);
                    }}
                    className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
                  />
                </div>
                <div className="mb-[12px]">
                  <h1>Price Before Tax</h1>
                  <input
                    type="text"
                    id={`priceBeforeTax_${item.id}`}
                    onChange={(e) => {
                      handleFormItemData(
                        e.target.value,
                        "priceBeforeTax",
                        item.id
                      );
                    }}
                    className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
                  />
                </div>
                <div className="mb-[12px]">
                  <h1>Price After Tax</h1>
                  <input
                    type="text"
                    id={`priceAfterTax_${item.id}`}
                    className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
                    readOnly
                  />
                </div>
                <div className="mb-[12px]">
                  <h1>Line Total</h1>
                  <input
                    type="text"
                    id={`lineTotal_${item.id}`}
                    class="line-total-input"
                    className="rounded-md border-[0.25px] border-black w-[345px] sm:w-[400px] h-[30px]"
                    readOnly
                  />
                </div>
                <div
                  class="unique-product-name"
                  id={"uniqueProductName-" + item.id}
                ></div>
              </div>
            </div>
          );
        })}
      <br />
      <div className="mx-auto">
        <div
          onClick={handleAdd}
          id="addMoreButton"
          className="rounded-md mb-[8px] cursor-pointer mx-auto w-[345px]  sm:w-[400px] text-center  py-2 border-green-700 border-[0.25px] bg-white text-green-700"
        >
          Add More
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const resp1 = await supabase.from("fabrictbl").select("fabric");
  const resp2 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .ilike("type", "%Ready%");
  const resp3 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Logistics");

  const resp4 = await supabase.from("products").select("product");
  const resp5 = await supabase
    .from("printtypestbl")
    .select("printtype")
    .eq("readymadetbl", true);

  const resp6 = await supabase
    .from("printtypestbl")
    .select("printtype, printcode")
    .eq("readymadetbl", true);
  const printCodeMapping = {};

  resp6.data.forEach((result) => {
    printCodeMapping[result.printtype] = result.printcode;
  });

  return {
    props: {
      fabric: resp1.data,
      suppliers: resp2.data,
      cargoProviders: resp3.data,
      products: resp4.data,
      printTypes: resp5.data,
      printCodeMapping: printCodeMapping,
    },
  };
}
