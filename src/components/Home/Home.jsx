import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import MainSlider from "../MainSlider/MainSlider.jsx";
import RecentProducts from "../RecentProducts/RecentProducts.jsx";
// import style from "./Home.module.css";

function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}

export default Home;
