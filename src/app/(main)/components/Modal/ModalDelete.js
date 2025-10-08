"use client";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeTask } from "@/redux/SliceListData";
export default function ModalDelete({ id, setModalDeleteId }) {
  const dispatch = useDispatch();
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const tasks = useSelector((state) => state.data.tasks);
  const item = tasks.find((data) => data.id === id);
  const handleDelete = () => {
    try {
        const title = item.title;
        setModalDeleteId(null);
        dispatch(removeTask(item.id));
        notifySuccess(`Berhasil Menghapus Tasks "${title}"`)
    } catch (error) {
        notifyError("Gagal Menghapus Task ditemukan");
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={() => setModalDeleteId(null)}
          className="absolute inset-0 bg-black/40 "
        ></div>

        <div className="relative z-10 p-4 w-full max-w-md">
          <div className="relative bg-white rounded-lg shadow-sm">
            <button
              type="button"
              className="cursor-pointer absolute top-3 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={() => setModalDeleteId(null)}
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

            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-red-600 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Apakah Kamu Yakin Ingin Menghapus Task{" "}
                <span className="font-semibold text-gray-700">
                  "{item.title}"
                </span>
                ?
              </h3>

              <button
                onClick={() => handleDelete()}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none 
                          focus:ring-red-300 font-medium rounded-lg text-sm 
                          inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
              >
                Iya
              </button>
              <button
                onClick={() => setModalDeleteId(null)}
                type="button"
                className="cursor-pointer py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none 
                          bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                          focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
