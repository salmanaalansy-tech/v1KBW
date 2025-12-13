 
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 864, min: 0 }, items: 1 },
};

function Hero({ deviceType = "desktop" }) {
  return (
  <div className="w-full max-w-[1500px] mx-auto">
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={6000}
      ssr={true}
      infinite={true}
      keyBoardControl={true}
      customTransition="all .9s ease-in-out"
      transitionDuration={900}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}

      itemClass="px-0"

           /** =============== الأزرار المخصصة =============== */
      customLeftArrow={
        <button
          className="absolute text-[30px] left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full shadow-lg hover:bg-black/80 z-10"
        >
          ‹
        </button>
      }
      customRightArrow={
        <button
          className="absolute text-[30px]  right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full shadow-lg hover:bg-black/80 z-10"
        >
          ›
        </button>
      }
    >
      {/* Slide 1 */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center">
        <img
          src="/logo/images (1).jpg"
          alt="Ad 1"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Text Content */}
        <div className="relative text-center px-4 sm:px-10">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-xl animate-fadeUp">
            Discover Knowledge
          </h1>
          <p className="text-gray-200 mt-4 sm:text-lg md:text-xl animate-fadeUp delay-200">
            Explore the best curated books for every reader
          </p>
          <a
            href="#featured"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-lg transition-all animate-fadeUp delay-300"
          >
            Browse Collection
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center">
        <img
          src="/logo/images (2).jpg"
          alt="Ad 2"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="relative text-center px-4">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-xl animate-fadeUp">
            Read Without Limits
          </h1>
          <p className="text-gray-200 mt-4 sm:text-lg md:text-xl animate-fadeUp delay-200">
            Thousands of premium titles available
          </p>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center">
        <img
          src="/logo/images (3).jpg"
          alt="Ad 3"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="relative text-center px-4">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-xl animate-fadeUp">
            Your Library, Your World
          </h1>
          <p className="text-gray-200 mt-4 sm:text-lg md:text-xl animate-fadeUp delay-200">
            A modern platform for book lovers
          </p>
        </div>
      </div>
    </Carousel>

    {/* Animation Styles */}
    <style jsx>{`
      @keyframes fadeUp {
        0% {
          opacity: 0;
          transform: translateY(25px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fadeUp {
        animation: fadeUp 1s ease-out forwards;
      }
      .delay-200 {
        animation-delay: 0.2s;
      }
      .delay-300 {
        animation-delay: 0.3s;
      }
    `}</style>
  </div>
);

}

export default Hero;
