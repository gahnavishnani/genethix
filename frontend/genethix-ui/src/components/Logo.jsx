import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src="/genethix-logo.png"
        alt="GENETHIX Logo"
        className="w-14 h-14 object-contain"
      />

      <div className="leading-tight">
        <h1 className="text-[1.05rem] font-bold text-genethix-dark tracking-tight">
          GENETHIX AI BANKING
        </h1>
        <p className="text-[0.72rem] text-genethix-primary font-medium tracking-wide">
          Responsible Ethicals
        </p>
      </div>
    </div>
  );
}
