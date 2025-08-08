// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React, { useState } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";

// function Sidebar() {
//   const location = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const navLinks = [
//     {
//       name: "Dashboard",
//       to: "dashboard",
//       icon: <ChartNoAxesColumn size={20} />,
//     },
//     {
//       name: "Courses",
//       to: "course",
//       icon: <SquareLibrary size={20} />,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       {/* Toggle Button - visible on small screens */}
//       <button
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-500 text-white rounded-md"
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } lg:block fixed lg:static z-40 w-[250px] sm:w-[280px] h-full bg-gradient-to-b from-emerald-800 via-emerald-900 to-gray-900 dark:from-gray-900 dark:via-gray-950 dark:to-black border-r p-6 shadow-md transition-transform duration-300`}
//       >
//         <div className="mt-20 space-y-2">
//           {navLinks.map(({ name, to, icon }) => {
//             const isActive = location.pathname.includes(to);
//             return (
//               <Link
//                 key={name}
//                 to={to}
//                 onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile
//                 className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300
//                   ${
//                     isActive
//                       ? "bg-blue-600/90 text-white shadow-inner"
//                       : "text-slate-200 hover:bg-white/10"
//                   }`}
//               >
//                 <span className={`shrink-0 ${isActive ? "text-white" : "text-blue-300"}`}>
//                   {icon}
//                 </span>
//                 <span>{name}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 sm:p-6 md:p-10 lg:p-12 xl:p-16 bg-[#f9fafb] dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300 ml-0 lg:ml-[250px]">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default Sidebar;

import { ChartNoAxesColumn, School2, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      to: "dashboard",
      icon: <ChartNoAxesColumn size={20} />,
    },
    {
      name: "Courses",
      to: "course",
      icon: <SquareLibrary size={20} />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Mobile Drawer) */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-[250px] transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gradient-to-b from-emerald-800 via-emerald-900 to-gray-900 p-6 lg:hidden`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <School2 />
            E-learning
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>
        <nav className="space-y-2">
          {navLinks.map(({ name, to, icon }) => {
            const isActive = location.pathname.includes(to);
            return (
              <Link
                key={name}
                to={to}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600/90 text-white shadow-inner"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <span className={isActive ? "text-white" : "text-blue-300"}>
                  {icon}
                </span>
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-[250px] flex-col sticky top-0 h-screen bg-gradient-to-b from-emerald-800 via-emerald-900 to-gray-900 shadow-md p-6 z-30">
        <div className="flex items-center gap-2 text-white font-bold text-xl mb-10">
          <School2 size={24} />
          <span>E-learning</span>
        </div>
        <div className="space-y-2 flex-1 overflow-auto">
          {navLinks.map(({ name, to, icon }) => {
            const isActive = location.pathname.includes(to);
            return (
              <Link
                key={name}
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600/90 text-white shadow-inner"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <span className={isActive ? "text-white" : "text-blue-300"}>
                  {icon}
                </span>
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Topbar */}
        <div className="lg:hidden flex items-center justify-between p-4 shadow-md sticky top-0 bg-white dark:bg-black z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl text-emerald-700 dark:text-white"
          >
            ☰
          </button>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-white font-bold text-lg">
            <School2 size={20} />
            <span>E-learning</span>
          </div>
        </div>

        {/* Scrollable Main */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 lg:p-12 xl:p-16 bg-[#f9fafb] dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Sidebar;
