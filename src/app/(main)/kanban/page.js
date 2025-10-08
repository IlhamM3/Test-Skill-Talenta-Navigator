"use client";

import Image from "next/image";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/redux/SliceListData";
import { useState, useEffect } from "react";
import ModalAdd from "../components/Modal/ModalAdd";
import ModalDelete from "../components/Modal/ModalDelete";

export default function ClientKanban() {
  const [ModalAddId, setModalAddId] = useState(null);
  const [ModalDeleteId, setModalDeleteId] = useState(null);
  const [ModalHover, setModalHover] = useState(null);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.tasks == null) {
      dispatch(fetchData());
    }
  }, []);
  const colorStatus = [
    {
      status: "Ready to start",
      color: "bg-blue-800",
      persen: data.persentase.status.start || 0,
    },
    {
      status: "In Progress",
      color: "bg-yellow-600",
      persen: data.persentase.status.progress || 0,
    },
    {
      status: "Done",
      color: "bg-lime-600",
      persen: data.persentase.status.done || 0,
    },
    {
      status: "Waiting for review",
      color: "bg-gray-600",
      persen: data.persentase.status.waiting || 0,
    },
    {
      status: "Stuck",
      color: "bg-red-600",
      persen: data.persentase.status.stuck || 0,
    },
    {
      status: "Pending Deploy",
      color: "bg-rose-500",
      persen: data.persentase.status.pending || 0,
    },
  ];
  const colorPriority = [
    {
      priority: "Critical",
      color: "bg-red-800",
      persen: data.persentase.priority.critical || 0,
    },
    {
      priority: "High",
      color: "bg-pink-600",
      persen: data.persentase.priority.high || 0,
    },
    {
      priority: "Medium",
      color: "bg-blue-600",
      persen: data.persentase.priority.medium || 0,
    },
    {
      priority: "Low",
      color: "bg-slate-400",
      persen: data.persentase.priority.low || 0,
    },
    {
      priority: "Best Effort",
      color: "bg-orange-600",
      persen: data.persentase.priority.best || 0,
    },
  ];
  const colorType = [
    {
      type: "Feature Enhancements",
      color: "bg-teal-400",
      persen: data.persentase.type.feature || 0,
    },
    {
      type: "Other",
      color: "bg-violet-400",
      persen: data.persentase.type.outher || 0,
    },
    {
      type: "Bug",
      color: "bg-red-400",
      persen: data.persentase.type.bug || 0,
    },
  ];
  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-full max-w-screen-xl md:px-0 px-5">
          <div className="flex flex-col gap-5 w-full text-black">
            <div className="w-full flex flex-col gap-10 md:pt-7 md:pb-10 pb-7 pt-3">
              <div className="flex items-start justify-start md:justify-between md:items-center md:flex-row flex-col w-full  md:gap-0 gap-3">
                <div className="flex flex-col gap-3 w-full">
                  <h1 className="font-semibold md:text-xl text-base tracking-wider">
                    Todo List Type Kanban
                  </h1>
                  <div className="flex gap-5 md:items-center w-full flex-wrap md:flex-nowrap">
                    <button
                      onClick={() => setModalAddId(1)}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-500 bg-blue-600 text-white text-base rounded-md flex items-center gap-2"
                    >
                      <CiSquarePlus className="text-xl font-semibold" /> New
                      Task
                    </button>
                    <div className=" px-2 bg-gray-200 border border-gray-500  text-gray-900 text-base rounded-md flex items-center text-center gap-2 md:w-[18%] w-[50%] ">
                      <IoIosSearch className="text-xl font-semibold cursor-pointer hover:text-gray-500 md:w-[10%] " />{" "}
                      <input
                        type="search"
                        placeholder="Search"
                        className="outline-none border-l border-l-gray-900  py-2 pl-2 w-[50%] "
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
                    <div className="flex justify-center rounded-md w-[30%]">
                      {colorStatus.map((item, index) => (
                        <div
                          key={index}
                          className={`h-7 ${item.color} ${
                            index == 0 && "rounded-l-md"
                          } ${index === 5 && "rounded-r-md"}`}
                          style={{ width: `${item.persen}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {colorStatus.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className={`${item.color} px-3 py-2 rounded-t-md`}>
                      <h1 className="text-white font-semibold text-lg">
                        {item.status}
                      </h1>
                    </div>
                    <div className="p-5 bg-gray-300 rounded-b-md text-gray-200 flex flex-col gap-5 ">
                      {data.tasks &&
                        data.tasks
                          .filter((data) => data.status === item.status)
                          .map((data, i) => (
                            <div
                              key={i}
                              className="bg-gray-800 px-3 py-2 rounded-md flex flex-col gap-5"
                            >
                              <h1 className="text-lg font-semibold">
                                {data.title}
                              </h1>
                              <div className="flex flex-wrap gap-3 item-center">
                                <div className="flex items-center ">
                                  <div
                                    className={`rounded-l-md  w-1 h-full ${
                                      colorPriority.find(
                                        (color) =>
                                          color.priority === data.priority
                                      )?.color ?? ""
                                    }`}
                                  ></div>{" "}
                                  <p className="p-1 pr-3 text-sm rounded-r-md bg-gray-600">
                                    {data.priority}
                                  </p>
                                </div>
                                <div className="flex items-center ">
                                  <div
                                    className={`rounded-l-md  w-1 h-full ${
                                      colorType.find(
                                        (color) => color.type === data.type
                                      )?.color ?? ""
                                    }`}
                                  ></div>{" "}
                                  <p className="p-1 pr-3 text-sm rounded-r-md bg-gray-600">
                                    {data.type}
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between relative">
                                <IoPersonCircleOutline
                                  onMouseEnter={() => setModalHover(data.id)}
                                  onMouseLeave={() => setModalHover(null)}
                                  className="text-2xl font-semibold "
                                />
                                {ModalHover == data.id && (
                                  <div className="bg-white border text-gray-900 border-gray-300 px-2 py-1 rounded-md absolute left-7 top-0 z-50 flex items-center justify-center">
                                    {data.developer}
                                  </div>
                                )}
                                <div className="flex items-center gap-5">
                                  <button
                                    onClick={() => setModalDeleteId(data.id)}
                                    className="text-red-700 hover:text-red-500 text-lg cursor-pointer"
                                  >
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
      {ModalAddId && <ModalAdd setModalAddId={setModalAddId} />}
      {ModalDeleteId && (
        <ModalDelete id={ModalDeleteId} setModalDeleteId={setModalDeleteId} />
      )}
    </>
  );
}
