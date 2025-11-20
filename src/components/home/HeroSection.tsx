const HeroSection = () => {
  return (
    <section className="relative bg-linear-to-r from-[#003876] to-[#00509e] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            부산광역시 축제 안내
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            부산에서 개최되는 다양한 축제 정보를 한눈에 확인하세요
          </p>
          <button
            onClick={() => document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#003876] px-6 py-3 font-medium hover:bg-gray-100 transition-colors border border-gray-200"
          >
            축제 정보 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
