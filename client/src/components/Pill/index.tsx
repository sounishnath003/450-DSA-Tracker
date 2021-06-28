import React from "react";

export const DonePill: React.FC = () => {
    return <span
        className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
                  Done
                </span>
}

export const PendingPill: React.FC = () => {
    return <span
        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Pending
                </span>
}