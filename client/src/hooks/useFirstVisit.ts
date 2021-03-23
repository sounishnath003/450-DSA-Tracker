import React, { useEffect, useState } from "react";

type IUseFirstVisit = [
  showPopUp: boolean,
  setshowPopUp: React.Dispatch<React.SetStateAction<boolean>>
];

export function useFirstVisit(): IUseFirstVisit {
  let firstVisited: boolean = sessionStorage["alreadyVisited"];
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  useEffect(() => {
    if (firstVisited) {
      setShowPopUp(false);
    } else {
      sessionStorage["alreadyVisited"] = true;
      setShowPopUp(true);
    }
  }, [firstVisited]);

  return [showPopUp, setShowPopUp];
}
