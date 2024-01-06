
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroupDemo } from "../../../shadcn/radiobutton"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import  DatePickerDemo  from "../../../shadcn/datePicker";
import { useRecoilState } from "recoil";
import { item } from "@/store/states";

export default function White() {

  const cottonProducts = ["c1", "c2", "c3", "c4"];
  const mangalagiriProducts = ["m1", "m2", "m3", "m4"];
  const nelloreProducts = ["n1", "n2", "n3", "n4"];
  const kotaProducts = ["k1", "k2", "k3", "K4"];
  const shimmerProducts = ["s1", "s2", "s3"];
  const [list_items, setListItems] = useRecoilState(item);
  const handleProductType = (e, idd, x) => {
    const updatedList = list_items.map((x) => {
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
        cut,
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
          cut,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleSupplier = (e, idd, x) => {
    const updatedList = list_items.map((x) => {
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
        cut,
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
          cut,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleSubmit = (x) => {

    if (
      x.id &&
      x.fabric &&
      x.supplier &&
      x.orderDate &&
      x.deliveryDate &&
      x.quantity &&
      x.price &&
      x.products &&
      x.subProduct &&
      x.productType
    ) {
      fetch("http://localhost:3000/api/whiteStock", {
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
    const updatedList = list_items.map((x) => {
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
        cut,
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
          cut,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handleFabric = (e, idd, x) => {
    const updatedList = list_items.map((x) => {
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
    const updatedList = list_items.map((x) => {
      const {
        id,
        fabric,
        supplier,
        orderDate,
        deliveryDate,
        quantity,
        ...rest
      } = x;
      if (y.id === id) {
        return {
          id,
          fabric,
          supplier,
          orderDate,
          deliveryDate,
          quantity: e.target.value,
          ...rest,
        };
      } else {
        return x;
      }
    });
    setListItems(updatedList);
  };
  const handlePrice = (e, y) => {
    const updatedList = list_items.map((x) => {
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
  const handleSubProducts = (x, e, updatedList, idd) => {
    let arr;
    if (e === "Cotton") {
      arr = cottonProducts;
    } else if (e === "Nellore") {
      arr = nelloreProducts;
    } else if (e === "Mangalagiri") {
      arr = mangalagiriProducts;
    } else if (e === "Kota") {
      arr = kotaProducts;
    } else if (e === "Shimmer") {
      arr = shimmerProducts;
    }
    const updatedListt = updatedList.map((x) => {
      const { id, fabric, ...rest } = x;
      return x.id === idd ? { ...x, products: arr } : x;
    });
    setListItems(updatedListt);
  };

  const handleAdd = () => {
    const list = list_items;
    const newElement = {
      id: list.length + 1,
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
    };
    const newList = [...list, newElement];

    setListItems(newList);
  };
  return (
    <div>
      <div className="m-4">
        <Button
          onClick={() => {
            handleAdd();
          }}
          className="h-[25px]"
          variant="outline"
        >
          Add
        </Button>
      </div>
      {list_items.length &&
        list_items.map((x) => {
          return (
            <div key={x.id}>
              <div className="flex flex-wrap">
                <div className="m-4">
                  <Select
                    onValueChange={(e) => {
                      handleFabric(e, x.id, x);
                    }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Fabric" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Cotton">Cotton</SelectItem>
                      <SelectItem value="Nellore">Nellore Khiladi</SelectItem>
                      <SelectItem value="Mangalagiri">Mangalagiri</SelectItem>
                      <SelectItem value="Kota">Kota</SelectItem>
                      <SelectItem value="Shimmer">Shimmer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="m-4">
                  <Select onValueChange={(e) => handleSupplier(e, x.id, x)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Supplier" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Name1">Name1</SelectItem>
                      <SelectItem value="Name2">Name2</SelectItem>
                      <SelectItem value="Name3">Name3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  onChange={(e) => {
                    handleQuantity(e, x);
                  }}
                  className="w-40 m-4"
                  placeholder="Quantity"
                />
                <Input
                  onChange={(e) => {
                    handlePrice(e, x);
                  }}
                  className="w-40 m-4"
                  placeholder="Price"
                />
                <div className="m-4">
                  <DatePickerDemo message={"Order Date"} x={x} o={true} />
                </div>
                <div className="m-4">
                  <DatePickerDemo message={"Delivery Date"} x={x} o={false} />
                </div>
                <div className="pt-[4px] m-4">
                  <Button
                    onClick={() => {

                      handleSubmit(x);
                    }}
                    className="h-[25px]"
                    variant="outline"
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap">
                  <div className="m-4">
                    <Select
                      onValueChange={(e) => {
                        handleSomthing(e, x.id, x);
                      }}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Product" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {x.products &&
                          x.products.map((u) => {
                            return <SelectItem key={u} value={u}>{u}</SelectItem>;
                          })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="m-4">
                    <Select
                      onValueChange={(e) => {
                        handleProductType(e, x.id, x);
                      }}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Product Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Meters">Meters</SelectItem>
                        <SelectItem value="Pieces">Pieces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="m-4">
                    <RadioGroupDemo
                      x={x.productType === "Meters" ? false : true}
                    />
                  </div>
                  <div className="m-4">
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Cargo Provider" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="cp1">cp1</SelectItem>
                        <SelectItem value="cp2">cp2</SelectItem>
                        <SelectItem value="cp3">cp3</SelectItem>
                        <SelectItem value="cp4">cp4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input className="w-40 m-4" placeholder="Cargo Charges" />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}