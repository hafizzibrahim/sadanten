import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import BackgroundDecorations from "../../components/home/BackgroundDecorations";

export default function ParticipationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      <BackgroundDecorations />

      <div className="sticky top-0 z-50">
                <Navbar />     {" "}
      </div>

      {/* Add spacing for navbar */}
      <div className="flex-grow pt-20">        {children}      </div>

      <Footer />
    </div>
  );
}
