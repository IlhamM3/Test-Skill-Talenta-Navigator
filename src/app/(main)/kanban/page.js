"use client";

import Image from "next/image";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ClientKanban() {
    const colorStatus = [
    {
      status: "Ready to start",
      color: "bg-blue-800",
    },
    {
      status: "In Progress",
      color: "bg-yellow-600",
    },
    {
      status: "Waiting for review",
      color: "bg-gray-600",
    },
    {
      status: "Done",
      color: "bg-lime-600",
    },
    {
      status: "Stuck",
      color: "bg-red-600",
    },
    {
      status: "Pending Deploy",
      color: "bg-rose-500",
    },
  ];
  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-full max-w-screen-xl md:px-0 px-5">
          <div className="flex flex-col gap-5 w-full text-black">
            <div className="w-full flex flex-col gap-10 md:pt-7 md:pb-10 pb-7 pt-3">
              <div className="flex items-start justify-start md:justify-between md:items-center md:flex-row flex-col w-full  md:gap-0 gap-3">
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold md:text-xl text-base tracking-wider">
                    Todo List Type Kanban
                  </h1>
                  <div className="flex gap-5 md:items-center w-full flex-wrap md:flex-nowrap">
                    <button className="px-3 py-2 cursor-pointer hover:bg-blue-500 bg-blue-600 text-white text-base rounded-md flex items-center gap-2">
                      <CiSquarePlus className="text-xl font-semibold" /> New
                      Task
                    </button>
                    <div className=" px-2 bg-gray-200 border border-gray-500  text-gray-900 text-base rounded-md flex items-center text-center gap-2 md:w-[25%] w-[50%] ">
                      <IoIosSearch className="text-xl font-semibold cursor-pointer hover:text-gray-500 md:w-[20%] " />{" "}
                      <input
                        type="search"
                        placeholder="Search"
                        className="outline-none border-l border-l-gray-900  py-2 pl-2 w-[90%] "
                        required
                      />
                    </div>
                    <button className="px-3 py-2 cursor-pointer hover:bg-gray-300 bg-gray-200 border border-gray-500  text-gray-900 text-base rounded-md flex items-center gap-2">
                      <IoPersonCircleOutline className="text-xl font-semibold" />{" "}
                      Person
                    </button>
                    <button className="px-3 py-2 cursor-pointer hover:bg-gray-300 bg-gray-200 border border-gray-500  text-gray-900 text-base rounded-md flex items-center gap-2">
                      <TbArrowsSort className="text-xl font-semibold" /> Sort
                    </button>
                    <div className="flex justify-center rounded-md">
                      {colorStatus.map((item, index) => (
                        <div
                          key={index}
                          className={`w-12 h-8 ${index == 0 && "rounded-l-md"} ${index === 5 && "rounded-r-md"} ${item.color}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {colorStatus.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <div  className={`${item.color} px-3 py-2 rounded-t-md`}>
                        <h1 className="text-white font-semibold text-lg">{item.status}</h1>
                      </div>
                      <div className="p-5 bg-gray-300 rounded-b-md text-gray-200 flex flex-col gap-5 ">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="bg-gray-800 px-3 py-2 rounded-md flex flex-col gap-5">
                            <h1 className="text-lg font-semibold">title</h1>
                            <div className="flex flex-wrap gap-3 item-center">
                              <div className="flex items-center ">
                                <div className="rounded-l-md bg-white w-1 h-full"></div>
                                <p className="p-1 pr-3 text-sm rounded-r-md bg-gray-600">Best Effect</p>
                              </div>
                              <div className="flex items-center ">
                                <div className="rounded-l-md bg-white w-1 h-full"></div>
                                <p className="p-1 pr-3 text-sm rounded-r-md bg-gray-600">Best Effect</p>
                              </div>
                              <div className="flex items-center ">
                                <div className="rounded-l-md bg-white w-1 h-full"></div>
                                <p className="p-1 pr-3 text-sm rounded-r-md bg-gray-600">Best Effect</p>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <IoPersonCircleOutline className="text-2xl font-semibold" />
                              <div className="flex items-center gap-5">
                                <button className="text-blue-700 hover:text-blue-500 text-lg cursor-pointer ">
                                  <FiEdit />
                                </button>
                                <button className="text-red-700 hover:text-red-500 text-lg cursor-pointer ">
                                  <RiDeleteBin5Line />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
