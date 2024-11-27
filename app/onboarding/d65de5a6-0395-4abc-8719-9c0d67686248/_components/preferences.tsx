"use client";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { learningPreferences } from "@/lib/prefrencesData";

export default function Preferences({
  handleNext,
}: {
  handleNext: (preferences: any) => Promise<any | void>;
}) {
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedPreferences.length === 0) return;
    setIsLoading(true);
    const selectedItems = learningPreferences.filter((item) =>
      selectedPreferences.includes(item.id)
    );
    console.log("Selected Items:", selectedItems);
    const preferences = selectedItems.map((item) => ({
      label: item.label,
      metadata: item.metadata,
    }));
    const res = await handleNext(preferences);
    if (res?.error) {
      console.log(res.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="grid grid-cols-3 gap-3">
        {learningPreferences.map((item) => (
          <label
            key={item.id}
            className="relative flex cursor-pointer flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
          >
            <div className="flex justify-between gap-2">
              <Checkbox
                id={`checkbox-${item.id}`}
                value={item.id}
                className="order-1 after:absolute after:inset-0"
                onCheckedChange={() => handleCheckboxChange(item.id)}
              />
              <item.icon
                className="opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
            <Label htmlFor={`checkbox-${item.id}`}>{item.label}</Label>
          </label>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={!selectedPreferences.length}>
        Next
      </Button>
    </div>
  );
}
