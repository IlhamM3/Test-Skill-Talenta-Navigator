"use client";

import Image from "next/image";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ModalAdd from "./components/Modal/ModalAdd";
import ModalDelete from "./components/Modal/ModalDelete";
import { fetchData, updateTask, addTaskNoData } from "@/redux/SliceListData";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import loading from "@/app/lottiefiles/loading";
import DatePicker from "react-datepicker";

export default function Home() {
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const [ModalAddId, setModalAddId] = useState(null);
  const [ModalDeleteId, setModalDeleteId] = useState(null);
  const [SearchTitle, setSearchTitle] = useState("");
  const [SearchTipe, setSearchTipe] = useState("title");
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (data.tasks == null) {
      dispatch(fetchData());
    }
  }, []);

  let DataSearch;
  if (data.tasks) {
    DataSearch = data.tasks.filter((item) =>
      item[SearchTipe].toLowerCase().includes(SearchTitle.toLowerCase())
    );
  }

  const handleChangeValue = (id, field, value) => {
    try {
      dispatch(updateTask({ id, field, value }));
      if (field != "title" && field != "developer") {
        notifySuccess(`Berhasil Merubah ${field} task`);
      }
    } catch (error) {
      if (field != "title" && field != "developer") {
        notifyError(`Gagal Merubah ${field} task`);
      }
    }
  };

  const [selectedId, setSelectedId] = useState([]);

  let isAllSelected;
  if(data.tasks){
    isAllSelected = selectedId.length === data.tasks.length;
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedId(data.tasks.map((t) => t.id)); 
    } else {
      setSelectedId([]); 
    }
  };

  const handleSelectRow = (id) => {
    setSelectedId((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id) 
        : [...prev, id] 
    );
  };

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
                    <button
                      onClick={() => setModalAddId(1)}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-500 bg-blue-600 text-white text-base rounded-md flex items-center gap-2"
                    >
                      <CiSquarePlus className="text-xl font-semibold" /> New
                      Task
                    </button>
                    <div className=" px-2 bg-gray-200 border border-gray-500  text-gray-900 text-base rounded-md flex items-center text-center gap-2 md:w-[25%] w-[50%] ">
                      <IoIosSearch className="text-xl font-semibold cursor-pointer hover:text-gray-500 md:w-[20%] " />{" "}
                      <input
                        type="search"
                        placeholder="Cari Title"
                        onChange={(e) => {
                          setSearchTipe("title");
                          setSearchTitle(e.target.value);
                        }}
                        className="outline-none border-l border-l-gray-900  py-2 pl-2 w-[90%] "
                        required
                      />
                    </div>
                    <div className=" px-2 bg-gray-200 border border-gray-500  text-gray-900 text-base rounded-md flex items-center text-center gap-2 md:w-[25%] w-[50%] ">
                      <IoPersonCircleOutline className="text-xl font-semibold cursor-pointer hover:text-gray-500 md:w-[20%] " />{" "}
                      <input
                        type="search"
                        placeholder="Cari Person"
                        onChange={(e) => {
                          setSearchTipe("developer");
                          setSearchTitle(e.target.value);
                        }}
                        className="outline-none border-l border-l-gray-900  py-2 pl-2 w-[90%] "
                        required
                      />
                    </div>
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
                          {data.tasks && (
                            <input
                              type="checkbox"
                              checked={isAllSelected}
                              onChange={handleSelectAll}
                              className="w-5 h-5 cursor-pointer"
                            />
                          )}
                        </th>
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
                      {(data.isLoading || !data) && (
                        <tr>
                          <td colSpan={9} className="border border-gray-500">
                            <div className="flex items-center justify-center relative h-24">
                              <div className="h-36 w-36 absolute ">
                                <Lottie animationData={loading} loop autoplay />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                      {data.tasks &&
                      data.isLoading == false &&
                      SearchTitle &&
                      DataSearch.length === 0 ? (
                        <tr>
                          <td
                            colSpan="9"
                            className="px-2 py-4  border border-gray-500 text-lg text-gray-900 text-center">
                            Title "{SearchTitle}" Tidak Ditemukan
                          </td>
                        </tr>
                      ) : (
                        data.tasks &&
                        data.isLoading == false &&
                        (SearchTitle ? DataSearch : data.tasks).map(
                          (item, index) => (
                            <tr
                              key={index}
                              className="bg-white text-black  text-center"
                            >
                              <td className="px-2 py-2  border border-gray-500 relative  ">
                                <input
                                checked={selectedId.includes(item.id)}
                                onChange={() => handleSelectRow(item.id)}
                                  type="checkbox"
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </td>
                              <th
                                scope="row"
                                className="px-3 py-2 font-medium whitespace-nowrap  w-60  text-left border border-gray-500"
                              >
                                <input
                                  type="text"
                                  id="title"
                                  name="title"
                                  value={item.title || ""}
                                  onChange={(e) =>
                                    handleChangeValue(
                                      item.id,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  placeholder="title"
                                  className="w-full p-2 focus:ring-none focus:outline-none"
                                ></input>
                              </th>
                              <td className="px-2 py-2  border border-gray-500 relative  ">
                                <div className="flex items-center ">
                                  <IoPersonCircleOutline className="text-xl font-semibold" />
                                  <input
                                    type="text"
                                    id="developer"
                                    name="developer"
                                    value={item.developer || ""}
                                    onChange={(e) =>
                                      handleChangeValue(
                                        item.id,
                                        "developer",
                                        e.target.value
                                      )
                                    }
                                    placeholder="developer"
                                    className="w-32 p-2 focus:ring-none focus:outline-none"
                                  ></input>
                                </div>
                              </td>
                              <td
                                className={`py-2 border border-gray-500 ${
                                  (colorStatus.find(
                                    (color) => color.status === item.status
                                  )?.color ?? "bg-gray-400") + " text-white"
                                }`}
                              >
                                <select
                                  name="status"
                                  id="status"
                                  value={item.status || ""}
                                  onChange={(e) =>
                                    handleChangeValue(
                                      item.id,
                                      "status",
                                      e.target.value
                                    )
                                  }
                                  className="w-full  p-2 focus:ring-none focus:outline-none  cursor-pointer"
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="text-black"
                                  >
                                    Pilih Status
                                  </option>
                                  {colorStatus.map((item, index) => (
                                    <option
                                      className="text-black"
                                      key={index}
                                      value={item.status}
                                    >
                                      {item.status}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td
                                className={`py-2 border border-gray-500 ${
                                  (colorPriority.find(
                                    (color) => color.priority === item.priority
                                  )?.color ?? "bg-gray-400") + " text-white"
                                }`}
                              >
                                <select
                                  name="priority"
                                  id="priority"
                                  value={item.priority || ""}
                                  onChange={(e) =>
                                    handleChangeValue(
                                      item.id,
                                      "priority",
                                      e.target.value
                                    )
                                  }
                                  className="w-full  p-2 focus:ring-none focus:outline-none  cursor-pointer"
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="text-black"
                                  >
                                    Pilih Priority
                                  </option>
                                  {colorPriority.map((item, index) => (
                                    <option
                                      className="text-black"
                                      key={index}
                                      value={item.priority}
                                    >
                                      {item.priority}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td
                                className={`px-1 py-2 border border-gray-500 ${
                                  (colorType.find(
                                    (color) => color.type === item.type
                                  )?.color ?? "bg-gray-400") + " text-white"
                                }`}
                              >
                                <select
                                  name="type"
                                  id="type"
                                  value={item.type || ""}
                                  onChange={(e) =>
                                    handleChangeValue(
                                      item.id,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                  className="w-full  p-2 focus:ring-none focus:outline-none  cursor-pointer"
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="text-black"
                                  >
                                    Pilih Type
                                  </option>
                                  {colorType.map((item, index) => (
                                    <option
                                      className="text-black"
                                      key={index}
                                      value={item.type}
                                    >
                                      {item.type}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className=" py-2 border border-gray-500">
                                <DatePicker
                                  selected={item.date || ""}
                                  onChange={(date) =>
                                    handleChangeValue(
                                      item.id,
                                      "date",
                                      new Date(date).toDateString()
                                    )
                                  }
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="Pilih Tanggal"
                                  minDate={new Date()}
                                  className="w-32 focus:ring-none focus:outline-none h-[2.5rem] cursor-pointer bg-white  text-sm px-6"
                                />
                              </td>
                              <td className="py-2 border border-gray-500 w-34">
                                <input
                                  type="number"
                                  id="Estimated"
                                  name="Estimated"
                                  value={item["Estimated SP"]}
                                  onChange={(e) =>
                                    handleChangeValue(
                                      item.id,
                                      "Estimated",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Estimated SP"
                                  className="w-[90%] focus:ring-none focus:outline-none"
                                ></input>
                              </td>
                              <td className="py-2 border border-gray-500 w-32">
                                <input
                                  type="number"
                                  id="Actual"
                                  name="Actual"
                                  value={item["Actual SP"]}
                                  onChange={(e) =>
                                    handleChangeValue(
                                      item.id,
                                      "Actual",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Actual SP"
                                  className="w-[90%] focus:ring-none focus:outline-none"
                                ></input>
                              </td>
                              <td className="py-2 border border-gray-500">
                                <div className="flex item-center gap-3 justify-center">
                                  <button
                                    onClick={() => setModalDeleteId(item.id)}
                                    className="text-red-700 hover:text-red-500 text-lg cursor-pointer "
                                  >
                                    <RiDeleteBin5Line />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )
                      )}
                      <tr
                        onClick={() => dispatch(addTaskNoData())}
                        className="text-gray-900 "
                      >
                        <td
                          colSpan={10}
                          className="border border-gray-500 px-3 py-2 cursor-pointer group"
                        >
                          <div className="flex items-center gap-2 group-hover:text-gray-500 font-semibold">
                            <CiSquarePlus className="text-base " /> New Task
                          </div>
                        </td>
                      </tr>
                      <tr className=" text-black text-center">
                        <td></td>
                        <td></td>
                        <td className="px-3 py-2 rounded-bl-md bg-gray-200"></td>
                        <td className="px-2 py-2 border border-gray-500 bg-gray-200">
                          <div className="flex justify-center">
                            {colorStatus.map((item, index) => (
                              <div
                                key={index}
                                className={`h-7 ${item.color}`}
                                style={{ width: `${item.persen}%` }}
                              ></div>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          <div className="flex justify-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2"></div>
                            {colorPriority.map((item, index) => (
                              <div
                                key={index}
                                className={`h-7 ${item.color}`}
                                style={{ width: `${item.persen}%` }}
                              ></div>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          <div className="flex justify-center">
                            {colorType.map((item, index) => (
                              <div
                                key={index}
                                className={`h-7 ${item.color}`}
                                style={{ width: `${item.persen}%` }}
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
                          {data.tasks && data.isLoading == false
                            ? data.totalEstimated
                            : 0}
                        </td>
                        <td className="px-3 py-2 border border-gray-500 bg-gray-200">
                          {data.tasks && data.isLoading == false
                            ? data.totalActual
                            : 0}
                        </td>
                        <td className="px-3 py-2 rounded-br-md bg-gray-200"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {ModalAddId && <ModalAdd setModalAddId={setModalAddId} />}
              {ModalDeleteId && (
                <ModalDelete
                  id={ModalDeleteId}
                  setModalDeleteId={setModalDeleteId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="md:text-sm text-xs font-semibold capitalize py-2 px-4 w-auto"
        bodyClassName="md:text-sm text-xs capitalize"
      />
    </>
  );
}
