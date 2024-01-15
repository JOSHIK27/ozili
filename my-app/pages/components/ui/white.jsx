import { supabase } from "../../../db/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePickerDemo from "../../../shadcn/datePicker";
import { useRecoilState } from "recoil";
import { item } from "@/store/states";

export default function White({ suppliers, cargoProviders, fabricTypes }) {
  const [list_items, setListItems] = useRecoilState(item);
  const handleCargoProvider = (e, y) => {
    const updatedList = list_items?.map((x) => {
      const {
        id,
        fabric,
        supplier,
        orderDate,
        deliveryDate,
        quantity,
        price,
        products,
        subProduct,
        productType,
        cargoProvider,
        cargoCharges,
        additionalCharges,
        invoiceNumber,
        cpuBt,
        gstPaid,
        gstRate,
        cpuAt,
        net,
        cargoPaidBySupplier,
        totalCost,
      } = x;
      if (x.id === y.id) {
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider: e,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleProductType = (e, idd, x) => {
    const updatedList = list_items?.map((x) => {
      const {
        id,
        fabric,
        supplier,
        orderDate,
        deliveryDate,
        quantity,
        price,
        products,
        subProduct,
        productType,
        cargoProvider,
        cargoCharges,
        additionalCharges,
        invoiceNumber,
        cpuBt,
        gstPaid,
        gstRate,
        cpuAt,
        net,
        cargoPaidBySupplier,
        totalCost,
      } = x;
      if (x.id === idd) {
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType: e,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleSupplier = (e, idd, x) => {
    const updatedList = list_items?.map((x) => {
      const {
        id,
        fabric,
        supplier,
        orderDate,
        deliveryDate,
        quantity,
        price,
        products,
        subProduct,
        productType,
        cargoProvider,
        cargoCharges,
        additionalCharges,
        invoiceNumber,
        cpuBt,
        gstPaid,
        gstRate,
        cpuAt,
        net,
        cargoPaidBySupplier,
        totalCost,
      } = x;
      if (x.id === idd) {
        return {
          id,
          fabric,
          supplier: e,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleSubmit = (x) => {
    console.log(x);
    if (
      x.id &&
      x.fabric &&
      x.supplier &&
      x.orderDate &&
      x.deliveryDate &&
      x.quantity &&
      x.price != null &&
      x.products &&
      x.subProduct &&
      x.productType &&
      x.productType &&
      x.cargoProvider &&
      x.additionalCharges &&
      x.invoiceNumber &&
      x.cpuBt &&
      x.cpuAt &&
      x.totalCost
    ) {

      fetch("/api/whiteStock", {

        method: "post",
        body: JSON.stringify(x),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((x) => {
          alert("successfully added to stocks database");
        });
    } else {
      alert("Enter all the missing fields");
    }
  };
  const handleSomthing = (e, idd, x) => {
    const updatedList = list_items?.map((x) => {
      const {
        id,
        fabric,
        supplier,
        orderDate,
        deliveryDate,
        quantity,
        price,
        products,
        subProduct,
        productType,
        cargoProvider,
        cargoCharges,
        additionalCharges,
        invoiceNumber,
        cpuBt,
        gstPaid,
        gstRate,
        cpuAt,
        net,
        cargoPaidBySupplier,
        totalCost,
      } = x;
      if (x.id === idd) {
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct: e,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleFabric = (e, idd, x) => {
    const updatedList = list_items?.map((x) => {
      const { id, fabric, ...rest } = x;
      if (x.id === idd) {
        return { id, fabric: e, ...rest };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
    handleSubProducts(x, e, updatedList, idd);
  };
  const handleQuantity = (e, y) => {
    const updatedList = list_items?.map((x) => {
      const {
        id,
        fabric,
        supplier,
        orderDate,
        deliveryDate,
        quantity,
        price,
        products,
        subProduct,
        productType,
        cargoProvider,
        cargoCharges,
        additionalCharges,
        invoiceNumber,
        cpuBt,
        gstPaid,
        gstRate,
        cpuAt,
        net,
        cargoPaidBySupplier,
        totalCost,
      } = x;
      if (y.id === id) {
        let val =
          parseFloat(x.cpuBt) * (parseFloat(x.gstRate) / 100 + 1) +
          (parseFloat(x.cargoCharges) + parseFloat(x.additionalCharges)) /
            parseFloat(e.target.value);
        let tot = val * parseFloat(e.target.value);
        let aftertax = parseFloat(x.cpuBt) * (parseFloat(x.gstRate) / 100 + 1);
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity: e.target.value,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt: aftertax,
          net: val,
          cargoPaidBySupplier,
          totalCost: tot,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handlePrice = (e, y) => {
    const updatedList = list_items?.map((x) => {
      const {
        id,
        fabric,
        supplier,
        orderDate,
        deliveryDate,
        quantity,
        price,
        ...rest
      } = x;
      if (y.id === id) {
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price: e.target.value,
          ...rest,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleSubProducts = async (x, e, updatedList, idd) => {
    const resp = await supabase
      .from("subFabric")
      .select("subFabric")
      .eq("fabric", e);

    let arr = resp.data?.map((x) => {
      return x.subFabric;
    });
    const updatedListt = updatedList?.map((x) => {
      const { id, fabric, ...rest } = x;
      return x.id === idd ? { ...x, products: arr } : x;
    });
    setListItems(updatedListt);
  };
  const handleGst = (id) => {
    const new_items = list_items?.map((x) => {
      if (x.id == id) {
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        } = x;
        if (gstPaid == true) gstPaid = false;
        else {
          (gstPaid = true), (gstRate = 0);
        }
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  const handleCargo = (id) => {
    const new_items = list_items?.map((x) => {
      if (x.id == id) {
        let val =
          x.cpuBt * (x.gstRate / 100 + 1) +
          (0 + parseFloat(x.additionalCharges)) / parseFloat(x.quantity);
        let tot = val * parseFloat(x.quantity);
        let aftertax = x.cpuBt * (x.gstRate / 100 + 1);
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        } = x;
        if (cargoPaidBySupplier == false) cargoPaidBySupplier = true;
        else {
          cargoPaidBySupplier = false;
        }
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges: 0,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt: aftertax,
          net: val,
          cargoPaidBySupplier,
          totalCost: tot,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  const handleCargoCharges = (e, id) => {
    const new_items = list_items?.map((x) => {
      if (x.id == id) {
        let val =
          x.cpuBt * (x.gstRate / 100 + 1) +
          (parseFloat(e.target.value) + parseFloat(x.additionalCharges)) /
            parseFloat(x.quantity);
        let tot = val * parseFloat(x.quantity);
        let aftertax = x.cpuBt * (x.gstRate / 100 + 1);
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        } = x;
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges: e.target.value,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt: aftertax,
          net: val,
          cargoPaidBySupplier,
          totalCost: tot,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  const handleInvoiceNumber = (e, id) => {
    console.log(e.target.value);
    const new_items = list_items.((x) => {
      if (x.id == id) {
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          ...rest
        } = x;
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber: parseInt(e.target.value),
          ...rest,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  const handleCPUBT = (e, id) => {
    const new_items = list_items?.map((x) => {
      if (x.id == id) {
        let val =
          parseFloat(e.target.value) * (parseFloat(x.gstRate) / 100 + 1) +
          (parseFloat(x.cargoCharges) + parseFloat(x.additionalCharges)) /
            parseFloat(x.quantity);

        let tot = val * parseFloat(x.quantity);
        let afterTax = parseFloat(e.target.value) * (x.gstRate / 100 + 1);
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        } = x;
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt: e.target.value,
          gstPaid,
          gstRate,
          cpuAt: afterTax,
          net: val,
          cargoPaidBySupplier,
          totalCost: tot,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  const handleCPUAT = (e, id) => {
    const new_items = list_items?.map((x) => {
      if (x.id == id) {
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        } = x;
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt: e.target.value,
          net,
          cargoPaidBySupplier,
          totalCost,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  const handleGstRate = (e, id) => {
    const new_items = list_items?.map((x) => {
      if (x.id == id) {
        let val =
          parseFloat(x.cpuBt) * (parseFloat(e.target.value) / 100 + 1) +
          (parseFloat(x.cargoCharges) + parseFloat(x.additionalCharges)) /
            parseFloat(x.quantity);
        let tot = val * parseFloat(x.quantity);
        let afterTax =
          parseFloat(x.cpuBt) * (parseFloat(e.target.value) / 100 + 1);
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        } = x;
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate: e.target.value,
          cpuAt: afterTax,
          net: val,
          cargoPaidBySupplier,
          totalCost: tot,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  const handleAdditionalCharges = (e, id) => {
    const new_items = list_items?.map((x) => {
      if (x.id == id) {
        let val =
          parseFloat(x.cpuBt) * (parseFloat(x.gstRate) / 100 + 1) +
          (parseFloat(x.cargoCharges) + parseFloat(e.target.value)) /
            parseFloat(x.quantity);
        let tot = val * parseFloat(x.quantity);
        let afterTax = parseFloat(x.cpuBt) * (parseFloat(x.gstRate) / 100 + 1);
        let {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt,
          net,
          cargoPaidBySupplier,
          totalCost,
        } = x;
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity,
          price,
          products,
          subProduct,
          productType,
          cargoProvider,
          cargoCharges,
          additionalCharges: e.target.value,
          invoiceNumber,
          cpuBt,
          gstPaid,
          gstRate,
          cpuAt: afterTax,
          net: val,
          cargoPaidBySupplier,
          totalCost: tot,
        };
      } else {
        return x;
      }
    });
    setListItems(new_items);
  };
  return (
    <div>
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/fluency-systems-filled/48/cut-paper.png"
          alt="cut-paper"
        />
        <h1 className="text-2xl">WHITE STOCK MASTER</h1>
      </div>
      {list_items.length &&
        list_items?.map((x) => {
          return (
            <div key={x.id}>
              <div>
                <div className="flex  mb-[10px] ml-4">
                  <h1 className="mr-[48px] text-sm">Order Date</h1>
                  <DatePickerDemo message={"date"} x={x} o={true} />
                </div>
                <div className="flex  mb-[10px] ml-4">
                  <h1 className="mr-[30px] text-sm">Delivery Date</h1>
                  <DatePickerDemo message={"date"} x={x} o={false} />
                </div>
                <div className="flex ml-4 mb-[10px]">
                  <h1 className="mr-[12px] text-sm">Invoice Number</h1>
                  <Input
                    onChange={(e) => {
                      handleInvoiceNumber(e, x.id);
                    }}
                    className="w-[150px] h-[8px] absolute ml-[200px]"
                    placeholder="Value"
                  />
                </div>

                <div className="flex mx-auto mb-[10px] ml-4">
                  <h1 className="mr-[70px] text-sm">Supplier</h1>
                  <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
                    <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {suppliers?.map((i) => {
                        return (
                          <SelectItem key={i.name} value={i.name}>
                            {i.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex mb-[10px] ml-4">
                  <h1 className="text-sm mr-[50px]">Fabric Type</h1>
                  <Select
                    onValueChange={(e) => {
                      handleFabric(e, x.id, x);
                    }}
                  >
                    <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
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
                <div className="flex ml-4 mb-[10px]">
                  <h1 className="mr-[20px] text-sm">Fabric Sub</h1>
                  <Select
                    onValueChange={(e) => {
                      handleSomthing(e, x.id, x);
                    }}
                  >
                    <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {x.products &&
                        x.products?.map((u) => {
                          return (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex ml-4 mb-[10px]">
                  <h1 className="mr-[87px] text-sm">Units</h1>
                  <Select
                    onValueChange={(e) => {
                      handleProductType(e, x.id, x);
                    }}
                  >
                    <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Meters">Meters</SelectItem>
                      <SelectItem value="Pieces">Pieces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex  mb-[10px] ml-4">
                  <h1 className="mr-[68px] text-sm">Quantity</h1>
                  <Input
                    onChange={(e) => {
                      handleQuantity(e, x);
                    }}
                    className="w-[150px] h-[8px] absolute ml-[200px]"
                    placeholder="Value"
                  />
                </div>
                {/* <div className="flex mb-[10px] ml-4">
                  <h1 className="mr-[92px] text-sm">Price</h1>
                  <Input
                    onChange={(e) => {
                      handlePrice(e, x);
                    }}
                    className="w-[150px] h-[8px] absolute ml-[200px]"
                    placeholder="Value"
                  />
                </div> */}
                <div className="flex ml-4 mb-[10px]">
                  <h1 className="mr-[17px] text-sm">Cargo Provider</h1>
                  <Select
                    onValueChange={(e) => {
                      handleCargoProvider(e, x);
                    }}
                  >
                    <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
                      <SelectValue placeholder="Value" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {cargoProviders?.map((i) => {
                        return (
                          <SelectItem key={i.name} value={i.name}>
                            {i.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex ml-4 mb-[10px]">
                  <h1 className="mr-[16px] text-sm">Cargo Charges</h1>
                  <Input
                    className="w-[150px] h-[8px] absolute ml-[200px]"
                    placeholder="Value"
                    onChange={(e) => {
                      handleCargoCharges(e, x.id);
                    }}
                    disabled={x.cargoPaidBySupplier}
                  />
                </div>
                <div className="flex  ml-4 mb-[10px]">
                  <h1 className="text-sm mr-[20px]">Free Shipping</h1>
                  <input
                    className="absolute ml-[200px]"
                    type="checkbox"
                    onChange={() => {
                      handleCargo(x.id);
                    }}
                  />
                </div>
                <div className="flex  ml-4 mb-[10px]">
                  <h1 className="text-sm mr-[60px]">GST PAID</h1>
                  <input
                    type="checkbox"
                    className="absolute ml-[200px]"
                    onChange={() => {
                      handleGst(x.id);
                    }}
                  />
                </div>
                <div className="flex  ml-4 mb-[10px]">
                  <h1 className="text-sm">GST Rate in %</h1>
                  <Input
                    onChange={(e) => {
                      handleGstRate(e, x.id);
                    }}
                    className="absolute w-[150px] h-[8px] ml-[200px]"
                    disabled={x.gstPaid}
                    placeholder="Value"
                  />
                </div>
                <div className="flex ml-4 mb-[10px]">
                  <h1 className="mr-[16px] text-sm">Additional Charges</h1>
                  <Input
                    className="w-[150px] h-[8px] absolute ml-[200px]"
                    placeholder="Value"
                    onChange={(e) => {
                      handleAdditionalCharges(e, x.id);
                    }}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="flex  ml-4 mb-[10px]">
                    <h1 className="text-sm mr-[10px]">Cost per unit BT</h1>
                    <Input
                      onChange={(e) => {
                        handleCPUBT(e, x.id);
                      }}
                      className="w-[150px] h-[8px] absolute ml-[200px]"
                      placeholder="Value"
                    />
                  </div>

                  <div className="flex  ml-4 mb-[10px]">
                    <h1 className="text-sm mr-[10px]">Cost per unit AT</h1>
                    <Input
                      onValueChange={(e) => {
                        handleCPUAT(e, x.id);
                      }}
                      className="absolute w-[150px] h-[8px] ml-[200px]"
                      placeholder={x.cpuAt}
                    />
                  </div>
                  <div className="flex  ml-4 mb-[10px]">
                    <h1 className="text-sm mr-[60px]">Net</h1>
                    <Input
                      className="absolute ml-[200px] w-[150px] h-[8px]"
                      placeholder={x.net}
                    />
                  </div>

                  <div className="flex flex-wrap ml-4 mb-[10px]">
                    <h1 className="text-sm mr-[60px]">Total Cost</h1>
                    <Input
                      className="absolute w-[150px] h-[8px] ml-[200px]"
                      placeholder={x.totalCost}
                    />
                  </div>
                  <div className="flex ml-4 mb-[20px]">
                    <h1 className="mr-[12px] text-sm">Upload Invoice</h1>
                    <input
                      className="absolute ml-[200px]"
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/png, image/jpeg"
                    />
                  </div>
                  <div>
                    <Button className="border-4 m-8 border-neutral-400">
                      CLEAR
                    </Button>
                    <Button
                      onClick={() => {
                        handleSubmit(x);
                      }}
                      className="border-4 m-8 border-neutral-400"
                    >
                      SUBMIT
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
