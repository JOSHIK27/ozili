import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo({ x }) {
  return (
    <RadioGroup disabled={x} defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Cut" id="r2" />
        <Label htmlFor="r2">Cut</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Uncut" id="r3" />
        <Label htmlFor="r3">UnCut</Label>
      </div>
    </RadioGroup>
  );
}