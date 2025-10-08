"use client";

export default function ClientFooter() {
  return (
    <>
      <footer className="bg-white rounded-lg shadow-sm ">
        <hr className=" border-gray-200" />
        <div className="flex items-center justify-center">
          <div className="max-w-screen-xl items-center py-3 ">
            <span className="block text-sm text-gray-500 sm:text-center">
              © 2025{" "}
              <a
                href="https://ilhamm3.my.id/"
                rel="noreferrer noopener"
                className="hover:underline"
              >
                Ilham Maulana™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
