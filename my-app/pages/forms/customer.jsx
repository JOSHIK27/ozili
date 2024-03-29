import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { Button } from "@tremor/react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";
const sourceOptions = ["Youtube", "Facebook", "Direct", "Referral"];
const groupOptions = ["Retail", "Wholesale"];
const handleCustomer = async (e, setFormData, setCustomer, setnickname) => {
  const { data } = await supabase
    .from("customertbl")
    .select()
    .eq("nickname", e);
  console.log(data);
  let temp = data[0];
  setCustomer(e);
  if (e) {
    setFormData({
      nickname: temp.nickname,
      customerfullname: temp.customerfullname,
      primaryno: temp.primaryno,
      secondaryno: temp.secondaryno,
      source: temp.source,
      isReferred: temp.referral,
      profession: temp.profession,
      group: temp.group,
      addressline1: temp.addressline1,
      addressline2: temp.addressline2,
      addressline3: temp.addressline3,
      city: temp.city,
      state: temp.state,
      pincode: temp.pincode,
      email: temp.emailid,
    });
    setnickname(temp.nickname);
  } else {
    setFormData({
      nickname: "",
      customerfullname: "",
      primaryno: "",
      secondaryno: "",
      source: "",
      ifReferred: "",
      profession: "",
      group: "",
      addressline1: "",
      addressline2: "",
      addressline3: "",
      city: "",
      state: "",
      pincode: "",
      email: "",
    });
  }
};

const stateOptions = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function UserForm({ customers }) {
  const [btn, setBtn] = useState(false);
  const [update, setUpdate] = useState(false);
  const [customer, setCustomer] = useState("");
  const [nickname, setnickname] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    customerfullname: "",
    primaryno: "",
    secondaryno: "",
    source: "",
    ifReferred: "",
    profession: "",
    group: "",
    addressline1: "",
    addressline2: "",
    addressline3: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
  });
  console.log(formData, nickname);

  const handleChange = (e) => {
    console.log(e, e.target);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectDropDown = (e, nme) => {
    const name = nme;
    const value = e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    event.preventDefault();
    if (typeof document !== "undefined") {
      document.getElementById("submitButton").disabled = true;
    }
    if (update) {
      console.log("request hit");
      fetch("../api/customer", {
        body: JSON.stringify([formData, nickname]),
        method: "PUT",
      })
        .then(async (resp) => {
          if (!resp.ok) {
            return resp.json().then((errorData) => {
              console.log(errorData);
              throw new Error(errorData.error);
            });
          } else {
            return resp.json();
          }
        })
        .then(() => {
          window.location.reload();
          alert("added to db");
        })
        .catch((error) => {
          document.getElementById("submitButton").disabled = false;
          alert(error);
        });
    } else {
      fetch("../api/customer", {
        body: JSON.stringify([formData, nickname]),
        method: "POST",
      })
        .then(async (resp) => {
          if (!resp.ok) {
            return resp.json().then((errorData) => {
              console.log(errorData);
              throw new Error(errorData.error);
            });
          } else {
            return resp.json();
          }
        })
        .then(() => {
          document.getElementById("submitButton").disabled = false;
          window.location.reload();
          alert("added to db");
        })
        .catch((error) => {
          document.getElementById("submitButton").disabled = false;
          alert(error);
        });
    }
  };

  return (
    <div>
      <UpdatedNav />
      <div className="flex justify-center mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex mb-8 ml-[32px] mt-4">
            <h1 className="text-2xl font-semibold">CUSTOMER FORM</h1>
          </div>
          <div className="flex justify-between">
            <SearchSelect
              className="w-[250px] sm:w-[330px]"
              onValueChange={(e) => {
                handleCustomer(e, setFormData, setCustomer, setnickname);
              }}
            >
              {customers.map((item) => {
                return (
                  <SearchSelectItem key={item} value={item}>
                    {item}
                  </SearchSelectItem>
                );
              })}
            </SearchSelect>

            <Button
              onClick={() => {
                setUpdate(!update);
              }}
              size="lg"
              variant="primary"
              disabled={!customer}
            >
              Edit
            </Button>
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Nickname</h1>
            <TextInput
              className={`border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px] ${
                formData.nickname ? "" : "border-red-500"
              }`}
              type="text"
              name="nickname"
              value={formData.nickname ? formData.nickname : ""}
              onChange={handleChange}
              disabled={customer && !update}
              required
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Primary Number</h1>
            <TextInput
              className={`border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px] ${
                formData.primaryno ? "" : "border-red-500" // Add a red border if the field is empty
              }`}
              type="text"
              name="primaryno"
              value={formData.primaryno ? formData.primaryno : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Secondary Number</h1>
            <TextInput
              className="border-[0.25px] bg-white rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              type="text"
              name="secondaryno"
              value={formData.secondaryno ? formData.secondaryno : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Email</h1>
            <TextInput
              className="border-[0.25px] bg-white rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              type="text"
              name="email"
              value={formData.email ? formData.email : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Source</h1>
            <Select
              onValueChange={(e) => {
                handleSelectDropDown(e, "source");
              }}
              disabled={customer && !update}
              required
            >
              <SelectTrigger
                className={`w-[345px] sm:w-[400px] h-[30px] bg-white ${
                  formData.source ? "" : "border-red-500"
                }`}
              >
                <SelectValue
                  placeholder={formData.source ? formData.source : "Value"}
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {sourceOptions?.map((x) => {
                  return (
                    <SelectItem key={x} value={x}>
                      {x}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {formData.source == "Referral" && (
            <div className=" mb-[10px]">
              <h1 className="text-sm mb-[4px]">Referred By</h1>
              <TextInput
                type="text"
                className="border-[0.25px] bg-white rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
                name="ifReferred"
                value={formData.ifReferred ? formData.ifReferred : ""}
                onChange={handleChange}
                disabled={customer && !update}
              />
            </div>
          )}
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Profession</h1>
            <TextInput
              type="text"
              className="border-[0.25px] bg-white rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              name="profession"
              value={formData.profession ? formData.profession : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Group</h1>
            <Select
              disabled={customer && !update}
              onValueChange={(e) => {
                handleSelectDropDown(e, "group");
              }}
              required
            >
              <SelectTrigger
                className={`w-[345px] sm:w-[400px] h-[30px] bg-white ${
                  formData.group ? "" : "border-red-500"
                }`}
              >
                <SelectValue
                  placeholder={formData.group ? formData.group : "Value"}
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {groupOptions?.map((x) => {
                  return (
                    <SelectItem key={x} value={x}>
                      {x}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Name</h1>
            <TextInput
              className="border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              type="text"
              name="customerfullname"
              value={formData.customerfullname ? formData.customerfullname : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Address Line 1</h1>
            <TextInput
              type="text"
              className="border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              name="addressline1"
              value={formData.addressline1 ? formData.addressline1 : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Address Line 2</h1>
            <TextInput
              type="text"
              className="border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              name="addressline2"
              value={formData.addressline2 ? formData.addressline2 : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Address Line 3</h1>
            <TextInput
              type="text"
              className="border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              name="addressline3"
              value={formData.addressline3 ? formData.addressline3 : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">City</h1>
            <TextInput
              type="text"
              name="city"
              className="border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              value={formData.city ? formData.city : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">State</h1>
            <SearchSelect
              disabled={customer && !update}
              onValueChange={(e) => {
                handleSelectDropDown(e, "state");
              }}
            >
              {stateOptions?.map((x) => {
                return (
                  <SearchSelectItem key={x} value={x}>
                    {x}
                  </SearchSelectItem>
                );
              })}
            </SearchSelect>
          </div>
          <div className=" mb-[10px]">
            <h1 className="text-sm mb-[4px]">Pincode</h1>
            <TextInput
              type="text"
              name="pincode"
              className="border-[0.25px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
              value={formData.pincode ? formData.pincode : ""}
              onChange={handleChange}
              disabled={customer && !update}
            />
          </div>
          <br />
          <div
            onClick={() => {
              window.location.reload();
            }}
            className="rounded-md mb-[8px] cursor-pointer mx-auto w-[345px]  sm:w-[400px] text-center  py-2 border-green-700 border-[0.25px] bg-white text-green-700"
          >
            CLEAR
          </div>
          <button
            onClick={handleSubmit}
            disabled={btn}
            id="submitButton"
            className="rounded-md cursor-pointer mx-auto w-[345px] border-[0.25px] sm:w-[400px] text-center  py-2 bg-green-700 text-white"
          >
            {update == false ? "Submit" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("customertbl").select("nickname");
  let temp = data;
  const customers = temp?.map((x) => x.nickname);
  return {
    props: {
      customers,
    },
  };
}
