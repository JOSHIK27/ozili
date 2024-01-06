import { atom } from "recoil";
export const item = atom({
    key: "1000",
    default: [{
        id: 1,
        fabric: "",
        supplier: "",
        orderDate: "",
        deliveryDate: "",
        quantity: 0,
        price: 0,
        products: [],
        subProduct: "",
        productType: "",
        cut: false,
    }]
})