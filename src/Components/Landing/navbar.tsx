import React from "react";
import { FaSearch, FaBell, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-custom-black text-white p-5 flex fixed left-0 top-10 w-full items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-2" onClick={() => navigate("/")}>
          <h1 className="text-xl font-bold font-poppins">Quest</h1>
          <button className="text-xs font-semibold bg-purple-600 px-2 py-1 rounded">
            Beta
          </button>
        </div>

        {/* Center Section */}
        <div className="flex space-x-2 text-sm font-poppins text-white">
          <a
            className="px-3 py-2 rounded transition-colors cursor-pointer text-white hover:bg-purple-600 hover:text-white"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </a>
          <a
            className="px-3 py-2 rounded transition-colors cursor-pointer text-white hover:bg-purple-600 hover:text-white"
            onClick={() => navigate("/products")}
          >
            Products
          </a>
          <a
            className="px-3 py-2 rounded transition-colors cursor-pointer text-white hover:bg-purple-600 hover:text-white"
            onClick={() => navigate("/servers")}
          >
            Servers
          </a>
          <a
            className="px-3 py-2 rounded transition-colors cursor-pointer text-white hover:bg-purple-600 hover:text-white"
            onClick={() => navigate("/internships")}
          >
            Internships
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded hover:bg-purple-600 transition-colors cursor-pointer">
            <FaSearch className="text-xl text-white" />
          </div>
          <div
            className="p-2 rounded hover:bg-purple-600 transition-colors cursor-pointer"
            onClick={() => (document.getElementById('notifications_modal') as HTMLDialogElement)?.showModal()}
          >
            <FaBell className="text-xl text-white" />
          </div>
          <div className="p-2 rounded hover:bg-purple-600 transition-colors cursor-pointer">
            <a href="https://www.linkedin.com/company/quest12/?viewAsMember=true" target="_blank">
              <FaLinkedin className="text-xl text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      <dialog id="notifications_modal" className="modal">
        <div className="modal-box bg-custom-black text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Notifications</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-white">✕</button>
            </form>
          </div>
          
          <div className="border border-gray-700 rounded-lg p-4 min-h-[200px]">
            {/* Notification content will go here */}
            <p className="text-gray-400 text-center">No new notifications</p>
          </div>

          <div className="modal-action">
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
