"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/SliceListData";
import DatePicker from "react-datepicker";
export default function ModalAdd({ setModalAddId }) {
  const dispatch = useDispatch();
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const [selectedDate, setSelectedDate] = useState(null);
  const [FormTasks, setFormTasks] = useState({
    title: "",
    developer: "",
    priority: "",
    status: "",
    type: "",
    Estimated: null,
    Actual: null,
    date: null,
  });
  useEffect(() => {
    if (selectedDate) {
      const DateFormat = new Date(selectedDate).toDateString();
      setFormTasks((prev) => ({
        ...prev,
        date: DateFormat,
      }));
    }
  }, [selectedDate]);

  const handleChangeValue = (e) => {
    const { name, value, type } = e.target;
    setFormTasks((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    try {
    dispatch(addTask(FormTasks));
      notifySuccess("Berhasil Menambahkan Task");
      setModalAddId(null);
      setFormTasks({
        title: "",
        developer: "",
        priority: "",
        status: "",
        type: "",
        Estimated: null,
        Actual: null,
      });
    } catch (error) {
      notifyError("Gagal Menambahkan Task");
    }
  };
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
      type: "Feature Enhancements",
      color: "bg-teal-400",
    },
    {
      type: "Other",
      color: "bg-violet-400",
    },
    {
      type: "Bug",
      color: "bg-red-400",
    },
  ];
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={() => setModalAddId(null)}
          className="absolute inset-0 bg-black/40 "
        ></div>

        <div className="relative z-10 p-4 w-full max-w-xl">
          <div className="relative bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
              <h3 className="text-xl font-medium text-gray-900">Tambah Task</h3>
              <button
                type="button"
                className="cursor-pointer absolute top-3 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                onClick={() => setModalAddId(null)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={submitForm} className="p-4 md:p-5 text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={FormTasks.title}
                    onChange={handleChangeValue}
                    placeholder="title"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  ></input>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="developer">Developer</label>
                  <input
                    type="text"
                    id="developer"
                    name="developer"
                    value={FormTasks.developer}
                    onChange={handleChangeValue}
                    placeholder="developer"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  ></input>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="priority">Priority</label>
                  <select
                    name="priority"
                    id="priority"
                    value={FormTasks.priority}
                    onChange={handleChangeValue}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  >
                    <option value="">-- Pilih Priority --</option>
                    {colorPriority.map((item, index) => (
                      <option key={index} value={item.priority}>
                        {item.priority}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    id="status"
                    value={FormTasks.status}
                    onChange={handleChangeValue}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  >
                    <option value="">-- Pilih Status --</option>
                    {colorStatus.map((item, index) => (
                      <option key={index} value={item.status}>
                        {item.status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="type">Type</label>
                  <select
                    name="type"
                    id="type"
                    value={FormTasks.type}
                    onChange={handleChangeValue}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  >
                    <option value="">-- Pilih Type --</option>
                    {colorType.map((item, index) => (
                      <option key={index} value={item.type}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="Estimated">Estimated SP</label>
                  <input
                    type="number"
                    id="Estimated"
                    name="Estimated"
                    value={FormTasks.Estimated || ""}
                    onChange={handleChangeValue}
                    placeholder="Estimated SP"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  ></input>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="Actual">Estimated SP</label>
                  <input
                    type="number"
                    id="Actual"
                    name="Actual"
                    value={FormTasks.Actual || ""}
                    onChange={handleChangeValue}
                    placeholder="Actual SP"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  ></input>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="date">Date</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Pilih Tanggal"
                    minDate={new Date()}
                    className="w-full h-[2.5rem] items-center focus:outline-blue-500 cursor-pointer bg-white border border-gray-300 placeholder-black text-base px-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="mt-4 cursor-pointer text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2 text-center focus:outline-none focus:ring-4 focus:ring-red-300 bg-green-500 hover:bg-green-500/70"
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
