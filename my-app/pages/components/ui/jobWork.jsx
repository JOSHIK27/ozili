import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobState } from "@/store/states";
import { useRecoilState } from "recoil";
import { supabase } from "@/db/supabase";

const handleDate = (e, job, setJob) => {
  const { date, ...rest } = job;
  setJob({
    date: e.target.value,
    ...rest,
  });
};

const handleJobWorkerName = (e, job, setJob) => {
  console.log(e);
  const { date, name, ...rest } = job;
  setJob({
    date,
    name: e,
    ...rest,
  });
};

const handleWorkType = (e, job, setJob) => {
  const { date, name, workType, ...rest } = job;
  setJob({
    date,
    name,
    workType: e,
    ...rest,
  });
};

const handleDyeType = (e, job, setJob) => {
  const { date, name, workType, dyeType, ...rest } = job;
  setJob({
    date,
    name,
    workType,
    dyeType: e,
    ...rest,
  });
};

const handleMovementType = (e, job, setJob) => {
  const { date, name, workType, dyeType, movementType, ...rest } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType: e,
    ...rest,
  });
};

const handleFabric = async (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    ...rest
  } = job;
  const { data, error } = await supabase
    .from("products")
    .select("Product")
    .eq("fabric", e);
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric: e,
    productList: data,
    ...rest,
  });
};

const handleProduct = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    ...rest
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product: e,
    ...rest,
  });
};

const handlePrintType = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    ...rest
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType: e,
    ...rest,
  });
};

const handleQuantity = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    ...rest
  } = job;

  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity: parseFloat(e.target.value),
    ...rest,
  });
};

const handleRollingRequired = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    ...rest
  } = job;
  let val = rollingRequired;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired: !val,
    ...rest,
  });
};
const handleTransaction = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction: e,
  });
};
export default function JobWork({
  fabric,
  dyeType,
  printType,
  jobWorkType,
  names,
}) {
  const [job, setJob] = useRecoilState(jobState);
  console.log(job);
  return (
    <div className="ml-[400px] mt-20">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/ios-filled/50/lawyer.png"
          alt="lawyer"
        />
        <h1 className="text-2xl">JOBWORK FORM</h1>
      </div>
      <div className="flex mb-[10px] ml-4">
        <h1 className="mr-[48px] text-sm">Job Work Date</h1>
        <input
          onChange={(e) => {
            handleDate(e, job, setJob);
          }}
          type="date"
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Job Worker Name</h1>
        <Select
          onValueChange={(e) => {
            handleJobWorkerName(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {names?.map((x) => {
              return (
                <SelectItem key={x.name} value={x.name}>
                  {x.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Work Type</h1>
        <Select
          onValueChange={(e) => {
            handleWorkType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {jobWorkType?.map((x) => {
              return (
                <SelectItem key={x.jbType} value={x.jbType}>
                  {x.jbType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Dye Type</h1>
        <Select
          onValueChange={(e) => {
            handleDyeType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {dyeType?.map((x) => {
              return (
                <SelectItem key={x.dyeType} value={x.dyeType}>
                  {x.dyeType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Movement Type</h1>
        <Select
          onValueChange={(e) => {
            handleMovementType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"out"}>Out</SelectItem>
            <SelectItem value={"in"}>In</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Fabric</h1>
        <Select
          onValueChange={(e) => {
            handleFabric(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {fabric?.map((x) => {
              return (
                <SelectItem key={x.fabric} value={x.fabric}>
                  {x.fabric}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Product</h1>
        <Select
          onValueChange={(e) => {
            handleProduct(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {job.productList?.map((x) => {
              return (
                <SelectItem key={x.Product} value={x.Product}>
                  {x.Product}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Print Type</h1>
        <Select
          onValueChange={(e) => {
            handlePrintType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {printType?.map((x) => {
              return (
                <SelectItem key={x.printType} value={x.printType}>
                  {x.printType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Quantity</h1>
        <input
          onChange={(e) => {
            handleQuantity(e, job, setJob);
          }}
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px] w-[150px] h-[16px]"
        />
      </div>
      <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm mr-[60px]">Rolling Required</h1>
        <input
          type="checkbox"
          onChange={(e) => {
            handleRollingRequired(e, job, setJob);
          }}
          className="bg-[#FFF4ED] border-[1px] border-black absolute ml-[200px]"
        />
      </div>
      <div className="flex  mb-[10px] ml-4">
        <h1 className="text-sm sm: mr-4">Transaction</h1>
        <Select
          onValueChange={(e) => {
            handleTransaction(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[150px] h-[8px] absolute ml-[200px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"regular"}>regular</SelectItem>
            <SelectItem value={"adjustment"}>adjustment</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button className="border-4 m-8 border-neutral-400">CLEAR</Button>
        <Button
          onClick={() => {
            handleSubmit(x, list_items, setListItems);
          }}
          className="border-4 m-8 border-neutral-400"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}
