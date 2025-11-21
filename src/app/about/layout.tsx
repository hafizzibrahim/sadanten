import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import BackgroundDecorations from "@/src/components/home/BackgroundDecorations";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      <BackgroundDecorations />{" "}
      <div className="sticky top-0 z-50">
<Navbar />
      </div>
      <div className="flex-grow">{children} </div>
      <Footer />
    </div>
  );
}
