import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function DisclaimerPopup({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyan-900 border border-cyan-700 sm:max-w-md">
        <DialogHeader className="border-b border-gray-900 pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-amber-500 h-5 w-5" />
            <DialogTitle className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">
              Important Medical Disclaimer
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4 py-2 text-sm text-cyan-950 dark:text-cyan-100">
          <p>
            This AI Health Assistant provides{" "}
            <span className="font-semibold">symptom analysis, home remedies, and medicine alternatives</span>{" "}
            for{" "}
            <span className="font-semibold">informational purposes only</span> and{" "}
            <span className="text-red-400 font-semibold">does not</span> offer{" "}
            <span className="font-semibold">medical advice, diagnosis, or treatment</span>.
          </p>
          <p>
            Always consult a{" "}
            <span className="font-semibold">qualified healthcare professional</span>{" "}
            before making any medical decisions or changes to your treatment plan.
          </p>
          <p>
            The information provided is{" "}
            <span className="font-semibold">suggested, not prescribed</span>, and may
            not always be accurate or applicable to your specific situation.
          </p>
          <p>
            By continuing to use this application, you agree that the{" "}
            <span className="font-semibold">developers are not responsible</span>{" "}
            for any decisions made based on the information provided.
          </p>
        </div>
        <DialogFooter className="pt-6 border-t border-gray-900">
          <Button
            onClick={onClose}
            className="bg-cyan-600 border-0 ring-0 hover:bg-cyan-500 cursor-pointer text-white w-full"
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}