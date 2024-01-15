import { atom } from "recoil";
export const item = atom({
  key: "abc",
  default: [
    {
      id: 1,
      fabric: "",
      supplier: "",
      orderDate: "",
      deliveryDate: "",
      quantity: 1,
      price: 0,
      products: [],
      subProduct: "",
      productType: "",
      cargoProvider: "",
      cargoCharges: 0,
      additionalCharges: 0,
      invoiceNumber: null,
      cpuBt: 0,
      gstPaid: true,
      gstRate: 0,
      cpuAt: 0,
      net: 0,
      cargoPaidBySupplier: false,
      totalCost: 0,
    },
  ],
});

export const cutting = atom({
  key: "cutting",
  default: {
    date: "",
    fabric: "",
    subFabric: "",
    quantityAvailable: 0,
    quantityCut: 0,
    quantityLeft: 0,
    wastage: 0,
    cutBy: "",
    length: 0,
  },
});
