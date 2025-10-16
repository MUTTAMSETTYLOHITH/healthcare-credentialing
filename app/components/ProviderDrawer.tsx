"use client";
import { Fragment } from "react";
import { Transition } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
  open: boolean;
  onClose: () => void;
  data: { id: number; name: string; dept: string; status: "Pending"|"Verified"|"Flagged" } | null;
};

export default function ProviderDrawer({ open, onClose, data }: Props){
  return (
    <div
      style={{ pointerEvents: open ? "auto" : "none" }}
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition ${open ? "opacity-100" : "opacity-0"}`}
      />
      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-[380px] panel shadow-xl transform transition
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">Provider Details</div>
          <button onClick={onClose} className="btn btn-ghost"><XMarkIcon className="w-5 h-5"/></button>
        </div>

        {data ? (
          <div className="p-4 space-y-4 text-[14px]">
            <div>
              <div className="text-[13px] text-gray-500">Name</div>
              <div className="font-medium">{data.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[13px] text-gray-500">Department</div>
                <div>{data.dept}</div>
              </div>
              <div>
                <div className="text-[13px] text-gray-500">Status</div>
                <div>{data.status}</div>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="font-semibold mb-2">Credentials</div>
              <ul className="space-y-2">
                <li className="flex justify-between"><span>Medical License</span><span className="chip bg-green-50 text-green-700 border border-green-200">Valid</span></li>
                <li className="flex justify-between"><span>DEA</span><span className="chip bg-amber-50 text-amber-800 border border-amber-200">Renew in 30d</span></li>
                <li className="flex justify-between"><span>OIG Exclusion</span><span className="chip bg-green-50 text-green-700 border border-green-200">Clear</span></li>
                <li className="flex justify-between"><span>Malpractice</span><span className="chip bg-rose-50 text-rose-700 border border-rose-200">Missing</span></li>
              </ul>
            </div>

            <div className="border-t pt-3">
              <div className="font-semibold mb-2">Actions</div>
              <div className="flex gap-2">
                <button className="btn btn-primary">Request Docs</button>
                <button className="btn btn-ghost">Open Profile</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 text-sm text-gray-500">No provider selected.</div>
        )}
      </div>
    </div>
  );
}
