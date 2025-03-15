
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
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
