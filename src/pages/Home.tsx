import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFestivals } from "../hooks/useFestivals";
import { Header, HeroSection, QuickLinks, FestivalList, Footer } from "../components/home";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfRows = 9;

  const { user, handleLogout } = useAuth();
  const { festivals, loading, totalCount } = useFestivals(currentPage);

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} onLogout={handleLogout} />
      <HeroSection />
      <QuickLinks />
      <FestivalList
        festivals={festivals}
        loading={loading}
        currentPage={currentPage}
        totalCount={totalCount}
        numOfRows={numOfRows}
        onPageChange={setCurrentPage}
      />
      <Footer />
    </div>
  );
};

export default Home;