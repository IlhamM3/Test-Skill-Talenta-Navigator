"use client";

import Image from "next/image";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Home() {
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
      status: "Done",
      color: "bg-lime-600",
    },
    {
      status: "Waiting for review",
      color: "bg-gray-600",
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
  const colorPriority = [
    {
      priority: "Critical",
      color: "bg-red-800",
    },
    {
      priority: "High",
      color: "bg-pink-600",
    },
    {
      priority: "Medium",
      color: "bg-blue-600",
    },
    {
      priority: "Low",
      color: "bg-slate-400",
    },
    {
      priority: "Best Effort",
      color: "bg-orange-600",
    },
  ];
  const colorType = [
    {
      type: "Feature Enchancements",
      color: "bg-teal-400",
    },
    {
      type: "other",
      color: "bg-violet-400",
    },
    {
      type: "Bug",
      color: "bg-red-400",
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-full max-w-screen-xl md:px-0 px-5">
          <div className="flex flex-col gap-5 w-full text-black">
            <div className="w-full flex flex-col gap-5 md:pt-7 md:pb-10 pb-7 pt-3">
              <div className="flex items-start justify-start md:justify-between md:items-center md:flex-row flex-col w-full  md:gap-0 gap-3">
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold md:text-xl text-base tracking-wider">
                    Todo List Type Table
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
                  </div>
                </div>
              </div>
              <div className="relative overflow-x-auto">
                <div className="relative w-full min-w-[1200px]">
                  <table className="w-full text-sm text-left rtl:text-right text-white capitalize ">
                    <thead className="text-xs text-white uppercase bg-gray-500  text-center">
                      <tr className="">
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700"
                        >
                          Task
                        </th>
                        <th
                          scope="col"
                          className=" px-3 py-2 border border-gray-700"
                        >
                          Developer
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700"
                        >
                          Priority
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700 "
                        >
                          <div className="flex items-center gap-1 justify-center">
                            Estimated Sp{" "}
                            <AiOutlineExclamationCircle className="text-base" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700 "
                        >
                          <div className="flex items-center gap-1 justify-center">
                            Actual Sp{" "}
                            <AiOutlineExclamationCircle className="text-base" />
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 border border-gray-700 "
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white text-black  text-center">
                        <th
                          scope="row"
                          className="px-3 py-2 font-medium whitespace-nowrap  w-60  text-left border border-gray-500"
                        >
                          Title
                        </th>
                        <td className="py-2  border border-gray-500 ">
                          <div className="flex justify-center items-center">
                            <IoPersonCircleOutline className="text-xl font-semibold" />
                          </div>
                        </td>
                        <td className="py-2 border border-gray-500">
                          status color
                        </td>
                        <td className="py-2 border border-gray-500">
                          Priority color
                        </td>
                        <td className="py-2 border border-gray-500">
                          Type color
                        </td>
                        <td className="py-2 border border-gray-500">
                          Date (dd:mm:yyyy)
                        </td>
                        <td className="py-2 border border-gray-500">
                          Estimated sp (int)
                        </td>
                        <td className="py-2 border border-gray-500">
                          Actual sp (int)
                        </td>
                        <td className="py-2 border border-gray-500">
                          <div className="flex item-center gap-3 justify-center">
                            <button className="text-blue-700 hover:text-blue-500 text-lg cursor-pointer ">
                              <FiEdit />
                            </button>
                            <button className="text-red-700 hover:text-red-500 text-lg cursor-pointer ">
                              <RiDeleteBin5Line />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-900 ">
                        <td
                          colSpan={9}
                          className="border border-gray-500 px-3 py-2 cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 group-hover:text-gray-500 font-semibold">
                            <CiSquarePlus className="text-base " /> New Task
                          </div>
                        </td>
                      </tr>
                      <tr className=" text-black text-center">
                        <td></td>
                        <td className="px-3 py-2 rounded-bl-md bg-gray-200"></td>
                        <td className="px-2 py-2 border border-gray-500 bg-gray-200">
                          <div className="flex justify-center">
                            {colorStatus.map((item, index) => (
                              <div
                                key={index}
                                className={`w-7 h-7 ${item.color}`}
                              ></div>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          <div className="flex justify-center">
                            {colorPriority.map((item, index) => (
                              <div
                                key={index}
                                className={`w-7 h-7 ${item.color}`}
                              ></div>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          <div className="flex justify-center">
                            {colorType.map((item, index) => (
                              <div
                                key={index}
                                className={`w-7 h-7 ${item.color}`}
                              ></div>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          <div className="rounded-full bg-white border border-gray-400 px-2 py-1">
                            -
                          </div>
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          Estimated sp (int)
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          Actual sp (int)
                        </td>
                        <td className="px-3 py-2 rounded-br-md bg-gray-200"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
