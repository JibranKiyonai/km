"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../Sidebar/index";
import Header from "../HeaderS/index";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Star ===== --> */}
      <div className="flex h-scree overflow-hidden">
        {/* <!-- ===== Sidebar Star ===== --> */}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Star ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Star ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-20">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
