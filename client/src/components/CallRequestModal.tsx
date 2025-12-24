import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CallRequestModalProps {
  open: boolean;
  onClose: () => void;
  type: "voice" | "video";
}

export function CallRequestModal({ open, onClose, type }: CallRequestModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    // intentionally no logic here (as requested)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">
            {type === "voice" ? "Voice Call Request" : "Video Call Request"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="w-full" onClick={onClose}>
              Cancel
            </Button>
            <Button className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
