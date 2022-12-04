import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";
import Slider from "~/components/Slider";
import Categories from "~/components/Categories";
import Products from "~/components/Products";
import Newsletter from "~/components/Newsletter";
import Footer from "~/components/Footer";
import { useEffect } from "react";
const Home = () => {

  useEffect(() => {
    document.title = "SPORTY SHOE - Welcome"
  }, [])

  return (
    <div className="">
      {/* Home của Tuân */}
      <Announcement />
      {/* <Navbar /> */}
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
