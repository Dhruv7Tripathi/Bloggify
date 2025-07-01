import "../globals.css";
// import NavigationBar from "@/components/(secondary)/sidebar";
import Navbar from "@/components/landingpage/navbar";
import Footer from "@/components/landingpage/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Navbar />
        {/* <NavigationBar /> */}
        <main className="">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

