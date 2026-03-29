import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F0F0F5]">
        <div className="max-w-[1280px] mx-auto w-full px-6" style={{ paddingTop: "49.54px", paddingBottom: "49.54px" }}>
          {children}
        </div>
      </main>
    </>
  );
}
