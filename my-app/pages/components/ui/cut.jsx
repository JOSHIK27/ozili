import { supabase } from "@/db/supabase";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { useState } from "react";

function isToday(dateString) {
  const today = new Date();
  const inputDate = new Date(dateString);

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth() + 1;
  const inputDay = inputDate.getDate();

  return (
    todayYear === inputYear &&
    todayMonth === inputMonth &&
    todayDay === inputDay
  );
}

const handleClick = (cut) => {
  if (typeof document !== "undefined") {
    document.getElementById("submitButton").disabled = true;
  }
  fetch("../api/cutStock", {
    body: JSON.stringify(cut),
    method: "POST",
  })
    .then((x) => {
      return x.json();
    })
    .then((resp) => {
      document.getElementById("submitButton").disabled = false;
      if (resp[0] == "Quantity Insufficient") {
        alert("Insufficient White Stock");
      } else if (resp[0] == "success") {
        window.location.reload();
        alert("added to db");
      }
    });
};

export default function Cut({ fabricTypes }) {
  const [cut, setCut] = useState({
    date: "",
    fabric: "",
    subFabric: "",
    productComponent: "",
    subFabricList: [],
    productComponentList: [],
    metersCut: "",
    wastage: false,
    wastageQuantity: "",
    cutBy: "",
  });
  console.log(cut);
  const handleCheckBox = () => {
    setCut({
      ...cut,
      wastage: !cut.wastage,
      componentQuantity: 0,
      metersCut: 0,
    });
  };
  const handleDropDown = async (e, field) => {
    if (field == "fabric") {
      const resp = await supabase
        .from("subfabrictbl")
        .select("subfabric")
        .eq("fabric", e);
      console.log(resp.data);
      setCut({
        ...cut,
        [field]: e,
        subFabricList: resp.data,
        subFabric: "",
        productComponent: "",
        quantityAvailable: 0,
        metersCut: 0,
        wastageQuantity: 0,
        componentQuantity: 0,
      });
    } else if (field == "subFabric") {
      const resp1 = await supabase
        .from("componentstbl")
        .select("component")
        .eq("subfabric", e);
      const resp2 = await supabase
        .from("stilltocut_view")
        .select("stilltocut")
        .eq("subfabric", e);
      setCut({
        ...cut,
        [field]: e,
        productComponentList: resp1.data,
        quantityAvailable: resp2.data,
        productComponent: "",
        metersCut: 0,
        wastageQuantity: 0,
        componentQuantity: 0,
      });
    } else if (field == "productComponent") {
      if (cut.metersCut) {
        const resp = await supabase
          .from("componentstbl")
          .select("metersperpiece")
          .eq("component", e);
        console.log(resp);
        let roundedUp = 0;
        if (resp && resp.data && resp.data.length) {
          roundedUp = Math.floor(
            parseFloat(cut.metersCut ? cut.metersCut : 0) /
              resp.data[0].metersperpiece
          );
        }
        setCut({
          ...cut,
          [field]: e,
          componentQuantity: roundedUp,
        });
      } else {
        setCut({
          ...cut,
          [field]: e,
        });
      }
    } else {
      setCut({
        ...cut,
        [field]: e,
      });
    }
  };
  const handleInput = async (e, field) => {
    if (field == "metersCut") {
      const resp = await supabase
        .from("componentstbl")
        .select("metersperpiece")
        .eq("component", cut.productComponent);
      console.log(resp);
      let roundedUp = 0;
      if (resp && resp.data && resp.data.length) {
        roundedUp = Math.floor(
          parseFloat(e.target.value ? e.target.value : 0) /
            resp.data[0].metersperpiece
        );
      }
      console.log(roundedUp);
      setCut({
        ...cut,
        [field]: e.target.value,
        componentQuantity: roundedUp,
        wastageQuantity: 0,
      });
    } else {
      setCut({
        ...cut,
        [field]: e.target.value,
      });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/ios/50/cut.png"
          alt="cut"
        />
        <h1 className="text-2xl font-semibold">CUTTING</h1>
      </div>
      <div className="mb-[10px]">
        <h1 className="text-sm mb-[4px]">Date</h1>
        <input
          type="date"
          className="border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
          onChange={(e) => {
            handleInput(e, "date");
          }}
        />
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Fabric</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleDropDown(e, "fabric");
          }}
          className="mb-4"
        >
          {fabricTypes?.map((x) => {
            return (
              <SearchSelectItem key={x.fabric} value={x.fabric}>
                {x.fabric}
              </SearchSelectItem>
            );
          })}
        </SearchSelect>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Sub Fabric</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleDropDown(e, "subFabric");
          }}
          className="mb-4"
        >
          {cut &&
            cut.subFabricList?.map((x) => {
              return (
                <SearchSelectItem key={x.subfabric} value={x.subfabric}>
                  {x.subfabric}
                </SearchSelectItem>
              );
            })}
        </SearchSelect>
      </div>
      <div className=" mb-[18px]">
        <h1 className="text-sm">
          Quantity Available :{" "}
          <strong className="text-xl text-green-700">
            {cut.quantityAvailable &&
            cut.quantityAvailable.length &&
            cut.quantityAvailable[0].stilltocut
              ? cut.quantityAvailable[0].stilltocut
              : 0}
          </strong>
        </h1>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Product Component</h1>
        <SearchSelect
          onValueChange={(e) => {
            handleDropDown(e, "productComponent");
          }}
          className="mb-4"
        >
          {cut &&
            cut.productComponentList?.map((x) => {
              return (
                <SearchSelectItem key={x.component} value={x.component}>
                  {x.component}
                </SearchSelectItem>
              );
            })}
        </SearchSelect>
      </div>
      {!cut.wastage && (
        <div className=" mb-[10px]">
          <h1 className="text-sm">Component Quantity</h1>
          <input
            value={cut.componentQuantity ? cut.componentQuantity : 0}
            className="w-[345px] sm:w-[400px] h-[30px] bg-white rounded border-[0.25px]"
            onChange={(e) => {
              handleInput(e, "componentQuantity");
            }}
          />
        </div>
      )}

      {!cut.wastage && (
        <div className=" mb-[10px]">
          <h1 className="text-sm">Meters Cut</h1>
          <input
            className="w-[345px] sm:w-[400px] h-[30px] bg-white rounded border-[0.25px]"
            id="mts"
            onChange={(e) => {
              handleInput(e, "metersCut");
            }}
          />
        </div>
      )}

      <div className=" mb-[10px]">
        <h1 className="text-sm">Wastage - Adj</h1>
        <input
          onChange={(e) => {
            handleCheckBox();
          }}
          type="checkbox"
          className="bg-white border-[0.25px]"
        />
      </div>
      {cut.wastage && (
        <div className=" mb-[10px]">
          <h1 className="text-sm">Wastage Quantity</h1>
          <input
            value={cut.wastageQuantity}
            onChange={(e) => {
              handleInput(e, "wastageQuantity");
            }}
            className="w-[345px] sm:w-[400px] h-[30px] bg-white rounded border-[0.25px]"
          />
        </div>
      )}
      <div className=" mb-[10px]">
        <h1 className="text-sm mr-[60px]">Cut By</h1>
        <input
          className="w-[345px] sm:w-[400px] h-[30px] bg-white rounded border-[0.25px]"
          onChange={(e) => {
            handleInput(e, "cutBy");
          }}
        />
      </div>
      <br />

      <div
        onClick={() => {
          window.location.reload();
        }}
        className="rounded-md mb-[8px] cursor-pointer mx-auto w-[345px] sm:w-[400px] text-center  py-2 border-green-700 border-[0.25px] bg-white text-green-700"
      >
        CLEAR
      </div>
      <button
        onClick={() => {
          handleClick(cut);
        }}
        id="submitButton"
        disabled={false}
        className="rounded-md cursor-pointer mx-auto w-[345px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
      >
        Submit
      </button>
    </div>
  );
}
