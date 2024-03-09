import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { useState } from "react";
import UpdatedNav from "../components/ui/updatedNav";
import { supabase } from "@/db/supabase";
export default function Payments({ supplierNames, customerNames, otherNames }) {
  const [payment, setPayment] = useState(null);
  console.log(payment);
  const handleInput = (e, field) => {
    setPayment({
      ...payment,
      [field]: e.target.value,
    });
  };
  const handleDropDown = (e, field) => {
    console.log(e);
    setPayment({
      ...payment,
      [field]: e,
    });
  };
  const handleSubmit = () => {
    fetch("../api/payment", {
      body: JSON.stringify(payment),
      method: "POST",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((r) => {
        if (r[0] == "success") {
          alert("Added to DB");
          window.location.reload();
        }
      });
  };
  return (
    <div>
      <UpdatedNav />

      <div className="flex justify-center mt-12">
        <div className="bg-[#efecec] p-8">
          <div className="mb-[10px]">
            <div className="mb-[10px]">
              <h1>Transaction Type:</h1>
              <Select
                onValueChange={(e) => {
                  handleDropDown(e, "transactionType");
                }}
              >
                <SelectTrigger className="w-[345px] sm:w-[400px] h-[30px] bg-white">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Incoming">Incoming</SelectItem>
                  <SelectItem value="Outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-[10px]">
              <h1>Type</h1>
              <Select
                onValueChange={(e) => {
                  handleDropDown(e, "personType");
                }}
              >
                <SelectTrigger className="w-[345px] sm:w-[400px] h-[30px] bg-white">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Supplier">Supplier</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {payment && payment.personType == "Customer" && (
              <div className="mb-[10px]">
                <h1>Customer Name:</h1>
                <SearchSelect
                  onValueChange={(e) => {
                    handleDropDown(e, "customer");
                  }}
                >
                  {customerNames.map((item) => {
                    return (
                      <SearchSelectItem
                        key={item.nickname}
                        value={item.nickname}
                      >
                        {item.nickname}
                      </SearchSelectItem>
                    );
                  })}
                </SearchSelect>
              </div>
            )}

            {payment && payment.personType == "Supplier" && (
              <div className="mb-[10px]">
                <h1>Supplier Name:</h1>
                <SearchSelect
                  onValueChange={(e) => {
                    handleDropDown(e, "supplier");
                  }}
                >
                  {supplierNames.map((item) => {
                    return (
                      <SearchSelectItem
                        key={item.supplier}
                        value={item.supplier}
                      >
                        {item.supplier}
                      </SearchSelectItem>
                    );
                  })}
                </SearchSelect>
              </div>
            )}
            {payment && payment.personType == "Others" && (
              <div className="mb-[10px]">
                <h1>Others :</h1>
                <input
                  onChange={(e) => {
                    handleInput(e, "others");
                  }}
                  type="text"
                  id="name"
                  name="name"
                  className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
                  required
                />
              </div>
            )}

            <div className="mb-[10px]">
              <h1>Contact Number:</h1>
              <input
                type="text"
                id="contact_number"
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
                onChange={(e) => {
                  handleInput(e, "contactNumber");
                }}
                required
              />
            </div>

            <div className="mb-[10px]">
              <h1>Amount:</h1>
              <input
                type="number"
                id="amount"
                name="amount"
                min="0"
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
                onChange={(e) => {
                  handleInput(e, "amount");
                }}
                required
              />
            </div>

            <div className="mb-[10px]">
              <h1 htmlFor="paymentMethod">Payment Method:</h1>
              <Select
                onValueChange={(e) => {
                  handleDropDown(e, "paymentMethod");
                }}
              >
                <SelectTrigger className="w-[345px] sm:w-[400px] h-[30px] bg-white">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="gpay">Google Pay</SelectItem>
                  <SelectItem value="phonepe">PhonePe</SelectItem>
                  <SelectItem value="paytm">Paytm</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-[10px]">
              <h1 htmlFor="date">Date of Payment:</h1>
              <input
                type="date"
                id="date"
                name="date"
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
                onChange={(e) => {
                  handleInput(e, "dateOfPayment");
                }}
                required
              />
            </div>

            <div className="mb-[10px]">
              <h1 htmlFor="account">Account:</h1>
              <input
                type="text"
                id="account"
                name="account"
                onChange={(e) => {
                  handleInput(e, "account");
                }}
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
                required
              />
            </div>

            <div className="mb-[10px]">
              <h1 htmlFor="reference_number">Reference Number:</h1>
              <input
                type="text"
                id="reference_number"
                name="reference_number"
                onChange={(e) => {
                  handleInput(e, "referenceNumber");
                }}
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
              />
            </div>

            <div className="mb-[10px]">
              <h1 htmlFor="payment_category">Payment Category:</h1>
              <Select
                id="payment_category"
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[30px]"
                onValueChange={(e) => {
                  handleDropDown(e, "paymentCategory");
                }}
              >
                <SelectTrigger className="w-[345px] sm:w-[400px] h-[30px] bg-white">
                  <SelectValue placeholder="Value" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Loan">Loan</SelectItem>
                  <SelectItem value="EMI">EMI</SelectItem>
                  <SelectItem value="Gold Loan">Gold Loan</SelectItem>
                  <SelectItem value="Debts">Debts</SelectItem>
                  <SelectItem value="Expenses">Expenses</SelectItem>
                  <SelectItem value="Payments">Payments</SelectItem>
                  <SelectItem value="Donations">Donations</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-[10px]">
              <h1>Payment Description:</h1>
              <select
                id="payment_description"
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[40px]"
                onChange={(e) => {
                  handleInput(e, "paymentDescription");
                }}
              >
                <optgroup label="Loan">
                  <option value="Home Loan">Home Loan</option>
                  <option value="Car Loan">Car Loan</option>
                </optgroup>
                <optgroup label="EMI">
                  <option value="Phone EMI">Phone EMI</option>
                  <option value="Appliance EMI">Appliance EMI</option>
                  <option value="Vehicle EMI">Vehicle EMI</option>
                </optgroup>
                <optgroup label="Gold Loan">
                  <option value="Loan Against Gold">Loan Against Gold</option>
                  <option value="Gold Mortgage">Gold Mortgage</option>
                </optgroup>
                <optgroup label="Debts">
                  <option value="Personal Debts">Personal Debts</option>
                  <option value="Business Debts">Business Debts</option>
                </optgroup>
                <optgroup label="Expenses">
                  <option value="Household Expense">Household Expense</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Education Fee">Education Fee</option>
                </optgroup>
                <optgroup label="Payments">
                  <option value="Supplier Payment">Supplier Payment</option>
                  <option value="Employee Salary">Employee Salary</option>
                  <option value="Wages">Wages</option>
                  <option value="Utility Bills">Utility Bills</option>
                  <option value="Card Repayment">Card Repayment</option>
                </optgroup>
                <optgroup label="Donations">
                  <option value="Charity">Charity</option>
                  <option value="Religious Donation">Religious Donation</option>
                </optgroup>
                <optgroup label="Income">
                  <option value="Sales">Sales</option>
                  <option value="Service Income">Service Income</option>
                  <option value="Investment Income">Investment Income</option>
                </optgroup>
              </select>
            </div>

            <div className="mb-[10px]">
              <h1 htmlFor="notes">Notes:</h1>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                onChange={(e) => {
                  handleInput(e, "notes");
                }}
                className="rounded-md border-[1px] border-black w-[345px] sm:w-[400px] h-[80px]"
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="rounded-md border-[1px] border-black px-4 py-2 bg-blue-500 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let resp1 = await supabase.from("suppliertbl").select("supplier");
  let resp2 = await supabase.from("customertbl").select("nickname");
  console.log(resp2.data);
  return {
    props: {
      supplierNames: resp1.data,
      customerNames: resp2.data,
    },
  };
}
