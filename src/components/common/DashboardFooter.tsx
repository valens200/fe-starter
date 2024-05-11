import React from "react";
// import { Button } from '../Button'
import { useRecoilState } from "recoil";
import { showContactSupportState } from "../../atoms";

export default function DashboardFooter() {
  const [, setShowContactSupport] = useRecoilState(showContactSupportState);

  return (
    <div className="py-3 border-t absolute bottom-0 w-full  ">
      <div className="max-w-[85rem] flex justify-between  mx-auto">
        <p className="text-gray-600 text-sm italic">
          copyright &copy; <span className="font-semibold">EDS</span>{" "}
          {new Date().getFullYear()}. All rights reserved
        </p>
        <button onClick={() => setShowContactSupport(true)}>
          Contact Support
        </button>
      </div>
    </div>
  );
}
