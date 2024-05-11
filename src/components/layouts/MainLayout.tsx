import React from "react";
import DashboardFooter from "../common/DashboardFooter";
// import Navbar from "../common/Navbar";
import ContactSupportModal from "../modals/ContactSupportModal";

interface LayoutProps {
  children: React.ReactNode;
  navLinks: { label: string; href: string }[];
}

export default function MainLayout({ children, navLinks }: LayoutProps) {
  return (
    <>
      <ContactSupportModal />
      <div className="min-h-screen w-full bg-gray-50 flex flex-col justify-between">
        {/* <Navbar navLinks={navLinks} /> */}
        <main className="mb-6">
          <div className="mx-auto max-w-[85rem] py-6 px-4 ">{children}</div>
        </main>
        <DashboardFooter />
      </div>
    </>
  );
}
