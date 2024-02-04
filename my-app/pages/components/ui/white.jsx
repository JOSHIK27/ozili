/* eslint no-use-before-define: 0 */
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
import { useRecoilState } from "recoil";
import { item } from "@/store/states";

function compareDates(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (d1 <= d2) {
    return true;
  } else if (d1 > d2) {
    return false;
  }
}

const handleCargoProvider = (e, y, list_items, setListItems) => {
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
      amountPaybleToSupplier,
      freeShipping,
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
        amountPaybleToSupplier,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(updatedList);
};
const handleProductType = (e, idd, x, list_items, setListItems) => {
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
      amountPaybleToSupplier,
      freeShipping,
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
        amountPaybleToSupplier,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(updatedList);
};
const handleSupplier = (e, idd, x, list_items, setListItems) => {
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
      amountPaybleToSupplier,
      freeShipping,
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
        amountPaybleToSupplier,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(updatedList);
};
const handleSubmit = (x, list_items, setListItems) => {
  if (!x.orderDate) {
    alert("Enter Order Date");
    return;
  }
  if (!x.deliveryDate) {
    alert("Enter Delivery Date");
    return;
  }
  if (!compareDates(x.orderDate, x.deliveryDate)) {
    alert("Delivery Date cannot be prior than order date. Please re-enter");
    return;
  }
  if (!x.invoiceNumber) {
    alert("Enter invoice number");
    return;
  }
  if (!x.supplier) {
    alert("Enter Supplier Details");
    return;
  }
  if (!x.fabric) {
    alert("Enter fabric type");
    return;
  }
  if (!x.subProduct) {
    alert("Enter subfabric type");
    return;
  }
  if (!x.productType) {
    alert("Enter units");
    return;
  }
  if (!x.cargoProvider) {
    alert("Enter Cargo Provider Details");
    return;
  }
  if (!x.freeShipping) {
    if (!x.cargoCharges) {
      alert("Enter cargo charges");
      return;
    }
  }
  if (!x.quantity) {
    alert("Enter quantity");
    return;
  }
  if (x.gstPaid && !x.gstRate) {
    alert("Enter GST rate");
    return;
  }
  if (!x.additionalCharges) {
    alert("Enter additional charges");
    return;
  }
  if (!x.cpuBt) {
    alert("Enter cost per unit before tax");
    return;
  }

  fetch("../api/whiteStock", {
    method: "post",
    body: JSON.stringify(x),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((x) => {
      if (x == "success") {
        window.location.reload();
        alert("Added to DB");
      }
    });
};
const handleSomthing = async (e, idd, x, list_items, setListItems) => {
  const { data, error } = await supabase
    .from("subfabrictbl")
    .select("units")
    .eq("subfabric", e);
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
      amountPaybleToSupplier,
      freeShipping,
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
        productType: data[0].units,
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
        amountPaybleToSupplier,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(updatedList);
};

const handleFabric = (e, idd, x, list_items, setListItems) => {
  const updatedList = list_items?.map((x) => {
    const { id, fabric, ...rest } = x;
    if (x.id === idd) {
      return { id, fabric: e, ...rest };
    } else {
      return x;
    }
  });
  setListItems(updatedList);
  handleSubProducts(x, e, updatedList, idd, list_items, setListItems);
};

const handleQuantity = (e, y, list_items, setListItems) => {
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
      amountPaybleToSupplier,
      freeShipping,
    } = x;
    if (y.id === id) {
      let val =
        parseFloat(x.cpuBt) * (parseFloat(x.gstRate) / 100 + 1) +
        (parseFloat(x.cargoCharges) + parseFloat(x.additionalCharges)) /
          parseFloat(e.target.value);
      let tot = val * parseFloat(e.target.value);
      let aftertax = parseFloat(x.cpuBt) * (parseFloat(x.gstRate) / 100 + 1);
      let temp = tot;
      if (!cargoPaidBySupplier) {
        temp = temp - cargoCharges;
      }
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
        amountPaybleToSupplier: temp,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(updatedList);
};

const handlePrice = (e, y, list_items, setListItems) => {
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

const handleSubProducts = async (
  x,
  e,
  updatedList,
  idd,
  list_items,
  setListItems
) => {
  const resp = await supabase
    .from("subfabrictbl")
    .select("subfabric")
    .eq("fabric", e);

  let arr = resp.data?.map((x) => {
    return x.subfabric;
  });
  const updatedListt = updatedList?.map((x) => {
    const { id, fabric, ...rest } = x;
    return x.id === idd ? { ...x, products: arr } : x;
  });
  setListItems(updatedListt);
};

const handleGst = (id, list_items, setListItems) => {
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
        amountPaybleToSupplier,
        freeShipping,
      } = x;
      let val = net;
      let tot = totalCost;
      let afterTax = cpuAt;
      let temp = amountPaybleToSupplier;
      if (gstPaid == true) {
        const element = document.getElementById("gst");
        (element.value = 0), (gstPaid = false), (gstRate = 0);
        val =
          parseFloat(x.cpuBt) +
          (parseFloat(x.cargoCharges) + parseFloat(x.additionalCharges)) /
            parseFloat(x.quantity);
        tot = val * parseFloat(x.quantity);
        afterTax = parseFloat(x.cpuBt);
        temp = tot;
        if (!cargoPaidBySupplier) {
          temp = temp - cargoCharges;
        }
      } else {
        gstPaid = true;
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
        cpuAt: afterTax,
        net: val,
        cargoPaidBySupplier,
        totalCost: tot,
        amountPaybleToSupplier: temp,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(new_items);
};

const handleGstRate = (e, id, list_items, setListItems) => {
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
        amountPaybleToSupplier,
        freeShipping,
      } = x;
      let temp = tot;
      if (!cargoPaidBySupplier) {
        temp = temp - cargoCharges;
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
        gstRate: e.target.value,
        cpuAt: afterTax,
        net: val,
        cargoPaidBySupplier,
        totalCost: tot,
        amountPaybleToSupplier: temp,
        freeShipping,
      };
    }else {
      return x;
    }
    });
    setListItems(updatedList);
  };


const handleCargo = (id, list_items, setListItems) => {
  const element = document.getElementById("cc");
  element.value = 0;
  const new_items = list_items?.map((x) => {
    if (x.id == id) {
      let val =
        x.cpuBt * (x.gstRate / 100 + 1) +
        (0 + parseFloat(x.additionalCharges)) / parseFloat(x.quantity);
      let tot = val * parseFloat(x.quantity);
      let aftertax = x.cpuBt * (x.gstRate / 100 + 1);
      let temp = tot;
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
        amountPaybleToSupplier,
        freeShipping,
      } = x;
      console.log(temp, cargoCharges);
      if (cargoPaidBySupplier) {
        if (!cargoPaidBySupplier) {
          temp = temp - cargoCharges;
        }
      }
      if (freeShipping == false) {
        freeShipping = true;
        const element = document.getElementById("cp");
        element.checked = false;
      } else {
        freeShipping = false;
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
        cargoPaidBySupplier: false,
        totalCost: tot,
        amountPaybleToSupplier: temp,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(new_items);
};

const handleCargoCharges = (e, id, list_items, setListItems) => {
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
        amountPaybleToSupplier,
        freeShipping,
      } = x;
      let temp = tot;
      if (!cargoPaidBySupplier) {
        temp = temp - e.target.value;
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
        amountPaybleToSupplier: temp,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(new_items);
};

const handleAdditionalCharges = (e, id, list_items, setListItems) => {
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
        amountPaybleToSupplier,
        freeShipping,
      } = x;
      let temp = tot;
      if (!cargoPaidBySupplier) {
        temp = temp - cargoCharges;
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
        additionalCharges: e.target.value,
        invoiceNumber,
        cpuBt,
        gstPaid,
        gstRate,
        cpuAt: afterTax,
        net: val,
        cargoPaidBySupplier,
        totalCost: tot,
        amountPaybleToSupplier: temp,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(new_items);
};

const handleCPUAT = (e, id, list_items, setListItems) => {
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
        amountPaybleToSupplier,
        freeShipping,
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
        amountPaybleToSupplier,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(new_items);
};

const handleCPUBT = (e, id, list_items, setListItems) => {
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
        amountPaybleToSupplier,
        freeShipping,
      } = x;
      let temp = tot;
      if (!cargoPaidBySupplier) {
        temp = temp - cargoCharges;
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
        cpuBt: e.target.value,
        gstPaid,
        gstRate,
        cpuAt: afterTax,
        net: val,
        cargoPaidBySupplier,
        totalCost: tot,
        amountPaybleToSupplier: temp,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(new_items);
};

const handleInvoiceNumber = (e, id, list_items, setListItems) => {
  console.log(e.target.value);
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

const handleCargoPaidBySupplier = (e, id, list_items, setListItems) => {
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
        amountPaybleToSupplier,
        freeShipping,
      } = x;
      let t;
      if (cargoPaidBySupplier == true) {
        t = false;
        amountPaybleToSupplier = totalCost - cargoCharges;
      } else {
        t = true;
        amountPaybleToSupplier = totalCost;
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
        cargoPaidBySupplier: t,
        totalCost,
        amountPaybleToSupplier,
        freeShipping,
      };
    } else {
      return x;
    }
  });
  setListItems(new_items);
};
const handleDate = (e, x, list_items, setListItems, o) => {
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
    amountPaybleToSupplier,
    freeShipping,
  } = x;
  let updatedItem;
  if (o == true) {
    updatedItem = {
      id,
      fabric,
      supplier,
      orderDate: e.target.value,
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
      amountPaybleToSupplier,
      freeShipping,
    };
  } else {
    updatedItem = {
      id,
      fabric,
      supplier,
      orderDate,
      deliveryDate: e.target.value,
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
      amountPaybleToSupplier,
      freeShipping,
    };
  }
  const updatedItemList = list_items?.map((y) => {
    if (y.id === x.id) {
      return updatedItem;
    } else return y;
  });
  setListItems(updatedItemList);
};
export default function White({ suppliers, cargoProviders, fabricTypes }) {
  const [list_items, setListItems] = useRecoilState(item);
  return (
    <div>
      {list_items.length &&
        list_items?.map((x) => {
          return (
            <div key={x.id}>
              <div className="flex items-center mb-8 justify-center mt-4">
                <img
                  width="36"
                  height="36"
                  src="https://img.icons8.com/fluency-systems-filled/48/cut-paper.png"
                  alt="cut-paper"
                />
                <h1 className="text-2xl">WHITE STOCK FORM</h1>
              </div>
              <div>
                <div className="mb-[10px] ml-4 flex justify-center">
                  <div>
                    <h1 className="text-sm">Order Date</h1>
                    <input
                      type="date"
                      className=" rounded-md border-[1px] border-black w-[300px] sm:w-[300px] h-[30px]"
                      onChange={(e) => {
                        let o = true;
                        handleDate(e, x, list_items, setListItems, o);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-[10px] ml-4 flex justify-center">
                  <div>
                    <h1 className="text-sm">Delivery Date</h1>
                    <input
                      type="date"
                      className=" rounded-md border-[1px] border-black w-[300px] sm:w-[300px] h-[30px]"
                      onChange={(e) => {
                        let o = false;
                        handleDate(e, x, list_items, setListItems, o);
                      }}
                    />
                  </div>
                </div>
                <div className="ml-4 mb-[10px] flex justify-center">
                  <div>
                    <h1 className="text-sm">Invoice Number</h1>
                    <Input
                      onChange={(e) => {
                        handleInvoiceNumber(e, x.id, list_items, setListItems);
                      }}
                      className="w-[300px] sm:w-[300px] h-[30px]"
                      placeholder="Value"
                    />
                  </div>
                </div>
                <div className="mx-auto mb-[10px] ml-4 flex justify-center">
                  <div>
                    <h1 className="text-sm">Supplier</h1>
                    <Select
                      onValueChange={(e) =>
                        handleSupplier(e, x.id, x, list_items, setListItems)
                      }
                    >
                      <SelectTrigger className="w-[300px] sm:w-[300px] h-[30px]">
                        <SelectValue placeholder="Value" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {suppliers?.map((i) => {
                          return (
                            <SelectItem key={i.supplier} value={i.supplier}>
                              {i.supplier}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-[10px] ml-4 flex justify-center">
                  <div>
                    <h1 className="text-sm">Fabric Type</h1>
                    <Select
                      onValueChange={(e) => {
                        handleFabric(e, x.id, x, list_items, setListItems);
                      }}
                    >
                      <SelectTrigger className="w-[300px] sm:w-[300px] h-[30px]">
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
                </div>
                <div className="ml-4 mb-[10px] flex justify-center">
                  <div>
                    <h1 className="text-sm">Fabric Sub</h1>
                    <Select
                      onValueChange={(e) => {
                        handleSomthing(e, x.id, x, list_items, setListItems);
                      }}
                    >
                      <SelectTrigger className="w-[300px] sm:w-[300px] h-[30px]">
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
                </div>
                <div className="ml-4 mb-[10px] flex justify-center">
                  <div>
                    <h1 className="text-sm">Units</h1>
                    <Select
                      onValueChange={(e) => {
                        handleProductType(e, x.id, x, list_items, setListItems);
                      }}
                    >
                      <SelectTrigger className="w-[300px] sm:w-[300px] h-[30px]">
                        <SelectValue placeholder="Value" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {x.productType && (
                          <SelectItem value={x.productType}>
                            {x.productType}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="ml-4 mb-[10px] flex justify-center">
                  <div>
                    <h1 className="text-sm">Cargo Provider</h1>
                    <Select
                      onValueChange={(e) => {
                        handleCargoProvider(e, x, list_items, setListItems);
                      }}
                    >
                      <SelectTrigger className="w-[300px] sm:w-[300px] h-[30px]">
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
                </div>

                <div className="ml-4 mb-[10px] flex justify-center">
                  <div className="flex">
                    <h1 className="text-sm mr-[50px]">Free Shipping</h1>
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleCargo(x.id, list_items, setListItems);
                      }}
                    />
                  </div>
                </div>
                <div className="ml-4 mb-[10px] flex justify-center">
                  <div className="flex">
                    <h1 className="text-sm mr-[30px]">
                      Cargo Paid By Supplier
                    </h1>
                    <input
                      type="checkbox"
                      id="cp"
                      onChange={(e) => {
                        handleCargoPaidBySupplier(
                          e,
                          x.id,
                          list_items,
                          setListItems
                        );
                      }}
                      disabled={x.freeShipping}
                    />
                  </div>
                </div>
                <div className="ml-4 mb-[10px] w-[300px] flex justify-center">
                  <div className="">
                    <h1 className="mr-[16px] text-sm">Cargo Charges</h1>
                    <Input
                      className="w-[300px] sm:w-[300px] h-[30px]"
                      placeholder={0}
                      onChange={(e) => {
                        handleCargoCharges(e, x.id, list_items, setListItems);
                      }}
                      id="cc"
                      disabled={x.freeShipping}
                    />
                  </div>
                </div>
                <div className="mb-[10px] ml-4 flex justify-center">
                  <div>
                    <h1 className="text-sm">Quantity</h1>
                    <Input
                      onChange={(e) => {
                        handleQuantity(e, x, list_items, setListItems);
                      }}
                      className="w-[300px] sm:w-[300px] h-[30px]"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="ml-4 mb-[10px]">
                  <div className="flex justify-center">
                    <h1 className="text-sm mr-[30px]">GST PAID</h1>
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleGst(x.id, list_items, setListItems);
                      }}
                    />
                  </div>
                </div>
                <div className="ml-4 mb-[10px] flex justify-center">
                  <div>
                    <h1 className="text-sm">GST Rate in %</h1>
                    <Input
                      onChange={(e) => {
                        handleGstRate(e, x.id, list_items, setListItems);
                      }}
                      className="w-[300px] sm:w-[300px] h-[30px]"
                      disabled={!x.gstPaid}
                      placeholder="Value"
                      id="gst"
                    />
                  </div>
                </div>
                <div className="ml-4 mb-[10px] flex justify-center">
                  <div>
                    <h1 className="text-sm">Additional Charges</h1>
                    <Input
                      className="w-[300px] sm:w-[300px] h-[30px]"
                      placeholder="0"
                      onChange={(e) => {
                        handleAdditionalCharges(
                          e,
                          x.id,
                          list_items,
                          setListItems
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="ml-4 mb-[10px] flex justify-center">
                    <div>
                      <h1 className="text-sm">Cost per unit BT</h1>
                      <Input
                        onChange={(e) => {
                          handleCPUBT(e, x.id, list_items, setListItems);
                        }}
                        className="w-[300px] sm:w-[300px] h-[30px]"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="ml-4 mb-[10px] flex justify-center">
                    <div>
                      <h1 className="text-sm">Cost per unit AT</h1>
                      <Input
                        onValueChange={(e) => {
                          handleCPUAT(e, x.id, list_items, setListItems);
                        }}
                        className="w-[300px] sm:w-[300px] h-[30px]"
                        placeholder={x.cpuAt}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="ml-4 mb-[10px] flex justify-center">
                    <div>
                      <h1 className="text-sm">Gross Cost</h1>
                      <Input
                        className="w-[300px] sm:w-[300px] h-[30px]"
                        placeholder={x.net}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="ml-4 mb-[10px] flex justify-center">
                    <div>
                      <h1 className="text-sm">Amount Payable To Supplier</h1>
                      <Input
                        className="w-[300px] sm:w-[300px] h-[30px]"
                        placeholder={x.amountPaybleToSupplier}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="ml-4 mb-[10px] flex justify-center">
                    <div>
                      <h1 className="text-sm">Total Cost</h1>
                      <Input
                        readOnly
                        className="w-[300px] sm:w-[300px] h-[30px] border-[1px] border-black"
                        placeholder={x.totalCost}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center  ml-4 mb-[20px]">
                    <div>
                      <h1 className="text-sm">Upload Invoice</h1>
                      <Input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg"
                        className="w-[300px] sm:w-[300px] h-[40px] border-[1px] border-black"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        window.location.reload();
                      }}
                      className="border-[0.5px] mr-4 border-neutral-400 border-[#4A84F3]"
                    >
                      CLEAR
                    </Button>
                    <a
                      onClick={() => {
                        handleSubmit(x, list_items, setListItems);
                      }}
                      class="inline-flex cursor-pointer items-center justify-center rounded-md py-2 sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-blue-500 to-blue-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm h-10 sm-fit px-4 text-sm sm:w-fit"
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

//ml-[400px] absolute mt-20
