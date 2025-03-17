
// import NavBar from "@/components/navbar";
// import Footer from "@/components/footer";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//           <Provider>
//             <NavBar />
//             {children}
//             <Footer />
//           </Provider >
//       </body>
//     </html>
//   );
// }

// this is not working as expected
import "../globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

