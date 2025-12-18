import React from "react";

const AppShell = ({ children }) => {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* GLOBAL BACKGROUND DEPTH */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* PAGE WRAPPER */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
