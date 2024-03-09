import { supabase } from "@/db/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import UpdatedNav from "../components/ui/updatedNav";
export default function W({ suppliers, cargoProviders, fabricTypes }) {
  const [formData, setFormData] = useState({
    orderDate: "",
    receivedDate: "",
    invoiceNumber: "",
    supplierName: "",
    cargoProvider: "",
    freeShipping: false,
    cargoCharges: 0,
    cargoPaidBySupplier: false,
    gstPaid: false,
    gstRate: 0,
    amountPaybleToSupplier: "",
    totalAmount: 0,
    discount: 0,
    additionalCharges: 0,
  });
  const [formItems, setFormItems] = useState([]);

  useEffect(() => {
    formItems?.forEach((item) => {
      calculatePriceAfterGst(item.id);
      calculateLineTotal(item.id);
    });
    calculateTotalAmount();
  }, [formData, formItems]);

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

  const handleAddMore = () => {
    let temp;
    if (formItems) {
      temp = [
        ...formItems,
        {
          id: formItems.length,
          fabric: "",
          subFabricList: "",
          subFabric: "",
          units: "",
          additionalCharges: "",
          cpubt: "",
          cpuat: "",
          net: "",
        },
      ];
    } else {
      temp = [
        {
          id: 0,
          fabric: "",
          subFabricList: "",
          subFabric: "",
          units: "",
          additionalCharges: "",
          cpubt: "",
          cpuat: "",
          net: "",
        },
      ];
    }
    setFormItems(temp);
  };
  const handleItem = (e, field) => {
    setItem({
      ...item,
      [field]: e,
    });
  };

  const handleFormItemText = (id, e, field) => {
    const updatedFormItems = formItems.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          [field]: e.target.value,
        };
      } else {
        return item;
      }
    });
    setFormItems(updatedFormItems);
  };

  const handleFormItemDropDown = async (id, e, field) => {
    if (field == "fabric") {
      const resp = await supabase
        .from("subfabrictbl")
        .select("subfabric")
        .eq("fabric", e);
      const subFabricList = resp.data.map((subFabric) => {
        return subFabric.subfabric;
      });
      const updatedFormItems = formItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            [field]: e,
            subFabricList: subFabricList,
          };
        } else {
          return item;
        }
      });
      setFormItems(updatedFormItems);
    } else if (field == "subFabric") {
      const { data, error } = await supabase
        .from("subfabrictbl")
        .select("units")
        .eq("subfabric", e);
      const updatedFormItems = formItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            [field]: e,
            unitsList: data[0].units,
          };
        } else {
          return item;
        }
      });
      setFormItems(updatedFormItems);
    } else {
      const updatedFormItems = formItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            [field]: e,
          };
        } else {
          return item;
        }
      });
      setFormItems(updatedFormItems);
    }
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
  const handleSubmit = () => {
    let quantity = 0;
    formItems.forEach((item) => {
      console.log(item);
      quantity = quantity + parseFloat(item.quantity);
    });

    let temp = formItems.map((item, index) => {
      const priceAfterTax = parseFloat(
        document.getElementById(`priceAfterTax_${index}`).value
      );
      let netPrice = !formData.freeShipping
        ? priceAfterTax +
          (parseFloat(formData.cargoCharges ? formData.cargoCharges : 0) +
          parseFloat(formData.additionalCharges)
            ? parseFloat(formData.additionalCharges)
            : 0) /
            quantity
        : 0;
      return {
        ...item,
        ["lineTotal"]: document.getElementById(`lineTotal_${index}`).value,
        ["priceAfterTax"]: document.getElementById(`priceAfterTax_${index}`)
          .value,

        netPrice,
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
    fetch("../api/whiteStock", {
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
        <div className="bg-[#efecec] p-8">
          <h2 className="text-xl">White Stock Form</h2>
          <br></br>
          <div className="mb-[10px]">
            <h1>Order Date</h1>
            <input
              id="orderDate"
              type="date"
              onChange={(e) => {
                handleFormData(e.target.value, "orderDate");
              }}
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
            />
          </div>
          <div className="mb-[10px]">
            <h1>Received Date</h1>
            <input
              type="date"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              onChange={(e) => {
                handleFormData(e.target.value, "receivedDate");
              }}
              id="receivedDate"
            />
          </div>
          <div className="mb-[10px]">
            <h1>Invoice Number</h1>
            <input
              type="text"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="invoiceNumber"
              onChange={(e) => {
                handleFormData(e.target.value, "invoiceNumber");
              }}
            />
          </div>
          <div className="mb-[10px]">
            <h1>Supplier Name</h1>
            <Select
              onValueChange={(e) => {
                handleFormData(e, "supplierName");
              }}
              id="supplierName"
            >
              <SelectTrigger className="w-[345px] sm:w-[400px] h-[30px] bg-white">
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
          <div className="mb-[10px]">
            <h1>Cargo Provider</h1>
            <Select
              onValueChange={(e) => {
                handleFormData(e, "cargoProvider");
              }}
              id="cargoProvider"
            >
              <SelectTrigger className="w-[345px] sm:w-[400px] h-[30px] bg-white">
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
          <div className="mb-[10px]">
            <h1>Free Shipping</h1>
            <input
              type="checkbox"
              id="freeShipping"
              onClick={(e) => {
                handleFormCheckBox("freeShipping");
              }}
            />
          </div>
          <div id="cargoChargesContainer" className="mb-[10px]">
            <h1
              style={{
                display: `${formData.freeShipping == true ? "none" : "block"}`,
              }}
            >
              Cargo Charges
            </h1>
            <input
              type="text"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="cargoCharges"
              style={{
                display: `${formData.freeShipping == true ? "none" : "block"}`,
              }}
              onChange={(e) => {
                handleFormData(e.target.value, "cargoCharges");
              }}
            />
          </div>
          <div id="cargoPaidBySupplierContainer" className="mb-[10px]">
            <h1>Cargo Paid By Supplier</h1>
            <input
              type="checkbox"
              id="cargoPaidBySupplier"
              onChange={(e) => {
                handleFormCheckBox("cargoPaidBySupplier");
              }}
            />
          </div>
          <div className="mb-[10px] w-[345px] sm:w-[400px]">
            <h1>GST Paid</h1>
            <input
              type="checkbox"
              id="gstPaid"
              onChange={(e) => {
                handleFormCheckBox("gstPaid");
              }}
            />
          </div>
          <div id="gstRateContainer" className="mb-[10px]">
            <h1
              style={{
                display: `${formData.gstPaid != true ? "none" : "block"}`,
              }}
            >
              GST Rate
            </h1>
            <input
              type="text"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="gstRate"
              onChange={(e) => {
                handleFormData(e.target.value, "gstRate");
              }}
              style={{
                display: `${formData.gstPaid != true ? "none" : "block"}`,
              }}
            />
          </div>
          <div className="mb-[10px]">
            <h1>Total Amount Spent</h1>
            <input
              type="text"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="totalAmount"
              onChange={(e) => {
                handleFormData(e.target.value, "totalAmount");
              }}
            />
          </div>
          <div className="mb-[10px]">
            <h1>Amount Payable to Supplier</h1>
            <input
              type="text"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="amountPayableToSupplier"
              onChange={(e) => {
                handleFormData(e.target.value, "amountPayableToSupplier");
              }}
            />
          </div>
          <div className="mb-[10px]">
            <h1>Discount Amount</h1>
            <input
              type="text"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="discount"
              onChange={(e) => {
                handleFormData(e.target.value, "discount");
              }}
            />
          </div>
          <div>
            <h1>Additional Charges</h1>
            <input
              type="text"
              className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              id="additionalCharges"
              onChange={(e) => {
                handleFormData(e.target.value, "additionalCharges");
              }}
            />
          </div>
          <br />
        </div>
      </div>
      <br />
      {formItems &&
        formItems.map((item, index) => {
          return (
            <div key={index} className="flex justify-center mb-12">
              <div className="bg-[#efecec] p-8">
                <div className="bg-[#efecec] p-8">
                  <h2 className="text-xl">ITEM NUMBER {item.id + 1}</h2>
                </div>
                <div className="mb-[10px]">
                  <h1 className="text-sm">Fabric</h1>
                  <Select
                    onValueChange={(e) => {
                      handleFormItemDropDown(index, e, "fabric");
                    }}
                  >
                    <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {fabricTypes?.map((x) => {
                        return (
                          <SelectItem key={x.fabric} value={x.fabric}>
                            {x.fabric}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-[10px]">
                  <h1 className="text-sm">Sub Fabric</h1>
                  <Select
                    onValueChange={(e) => {
                      handleFormItemDropDown(index, e, "subFabric");
                    }}
                  >
                    <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {item.subFabricList &&
                        item.subFabricList?.map((u) => {
                          return (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-[10px]">
                  <h1 className="text-sm">Units</h1>
                  <Select
                    onValueChange={(e) => {
                      handleFormItemDropDown(index, e, "units");
                    }}
                  >
                    <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {item.unitsList && (
                        <SelectItem value={item.unitsList}>
                          {item.unitsList}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-[10px]">
                  <h1 className="text-sm">Quantity</h1>
                  <Input
                    id={`quantity_${item.id}`}
                    onChange={(e) => {
                      handleFormItemText(index, e, "quantity");
                    }}
                    className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
                  />
                </div>

                <div className="mb-[10px]">
                  <div>
                    <h1 className="text-sm">Cost per unit BT</h1>
                    <Input
                      id={`priceBeforeTax_${item.id}`}
                      className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
                      onChange={(e) => {
                        handleFormItemText(index, e, "cpubt");
                      }}
                    />
                  </div>
                </div>
                <div className="mb-[10px]">
                  <h1 className="text-sm">Cost per unit AT</h1>
                  <Input
                    id={`priceAfterTax_${item.id}`}
                    className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
                    readOnly
                  />
                </div>
                <div className="mb-[10px]">
                  <h1 className="text-sm">Gross Cost</h1>
                  <Input
                    id={`lineTotal_${item.id}`}
                    className=" bg-white w-[345px] sm:w-[400px] h-[30px]"
                    readOnly
                  />
                </div>
              </div>
            </div>
          );
        })}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            window.location.reload();
          }}
          className="border-[0.5px] mr-4 border-neutral-400 border-[#4A84F3]"
        >
          CLEAR
        </Button>
        <button onClick={handleAddMore} id="addMore" class="submit-btn">
          Add
        </button>
        <button
          id="submitButton"
          disabled={false}
          onClick={handleSubmit}
          class="submit-btn"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let { data, error } = await supabase
    .from("suppliertbl")
    .select("supplier")
    .ilike("type", "%Fabric%");

  let resp1 = await supabase
    .from("suppliertbl")
    .select("supplier")
    .eq("type", "Logistics");
  let resp2 = await supabase.from("fabrictbl").select("fabric");
  return {
    props: {
      suppliers: data,
      cargoProviders: resp1.data,
      fabricTypes: resp2.data,
    },
  };
}
