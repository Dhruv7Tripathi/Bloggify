import "../globals.css";
import NavigationBar from "@/components/sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        {/* <NavBar /> */}
        <NavigationBar />
        <main className="">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

