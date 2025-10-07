import ClientNavbar from "@/app/(main)/components/Navbar"
import ClientFooter from "@/app/(main)/components/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
       <ClientNavbar />
        <main className="flex-1">
          {children}
        </main>
        <ClientFooter />
    </div>
  );
}