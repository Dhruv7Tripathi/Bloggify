import "../globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <NavBar />
        <main className="">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
// this is not working as expected
// import "../globals.css";
// import NavBar from "@/components/navbar";
// import Footer from "@/components/footer";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <NavBar />
//       <main>{children}</main>
//       <Footer />
//     </>
//   );
// }

