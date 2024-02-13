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
      gstPaid: false,
      gstRate: 0,
      cpuAt: 0,
      net: 0,
      cargoPaidBySupplier: false,
      totalCost: 0,
      amountPaybleToSupplier: 0,
      freeShipping: false,
    },
  ],
});

export const cutting = atom({
  key: "cutting",
  default: {
    date: "",
    fabric: "",
    subFabricList: [],
    productComponentList: [],
    quantityAvailable: 0,
    quantityCut: 0,
    productQuantity: 0,
    wastage: false,
    wastageQuantity: 0,
    cutBy: "",
    length: 0,
    subFabric: "",
    productComponent: "",
    metersCut: 0,
  },
});

export const dye = atom({
  key: "dyeing",
  default: {
    primaryDyer: "",
    secondaryDyer: "",
    dyeType: "",
    fabricType: "",
    product: "",
    dyeStyle: "",
    quantity: 0,
    colorComb: "",
    productList: [],
    date: "",
    transaction: "",
  },
});

export const printState = atom({
  key: "printing",
  default: {
    date: "",
    mainPrinter: "",
    secPrinter: "",
    dyeType: "",
    fabric: "",
    productList: [],
    product: "",
    printType: "",
    quantity: 0,
    rollingNotRequired: false,
    transaction: "",
  },
});

export const jobState = atom({
  key: "job",
  default: {
    date: "",
    name: "",
    workType: "",
    dyeType: "",
    movementType: "",
    fabric: "",
    productList: [],
    product: "",
    printType: "",
    quantity: 1,
    rollingRequired: false,
    transaction: "",
    cargoProvider: "",
    cargoCharges: 0,
    additionalCharges: 0,
    cpuBt: 0,
    gstPaid: false,
    gstRate: 0,
    cpuAt: 0,
    net: 0,
    cargoPaidBySupplier: false,
    totalCost: 0,
    amountPaybleToSupplier: 0,
    targetDate: "",
  },
});

export const rollState = atom({
  key: "roll",
  default: {
    date: "",
    name: "",
    rollType: "",
    printType: "",
    movementType: "",
    fabric: "",
    productList: [],
    product: "",
    charges: 0,
    quantity: 0,
    transaction: "",
    damage: false,
  },
});

export const invoiceState = atom({
  key: "invoice",
  default: {
    invoiceNumber: "",
    date: "",
    dueDate: "",
    subTotal: 0,
    discount: 0,
    received: 0,
    balance: 0,
    paymentMode: "",
    currentBalance: 0,
  },
});
