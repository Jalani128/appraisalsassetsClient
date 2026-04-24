import Header from "@/components/layout/Header";
import TopHeader from "@/components/layout/TopHeader";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopHeader />
      <Header />
      {children}
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
