import Hero from "../componentes/Hero";
import Highlights from "../componentes/Highlights";
import FeaturedProducts from "../componentes/FeaturedProducts";
import OnSaleProducts from "../componentes/OnSaleProducts";
function Home() {
  return (
    <div>
      <Hero />
      <div className="p-8">
        <Highlights />
        <FeaturedProducts />
        <OnSaleProducts />
      </div>
    </div>
  );
}

export default Home;
