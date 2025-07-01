import "../globals.css";
// import NavBar from "@/components/landingpage/navbar";
import Footer from "@/components/landingpage/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        {/* <NavBar /> */}
        <main className="">{children}</main>
        <Footer />
      </div>
    </div>
  );
}