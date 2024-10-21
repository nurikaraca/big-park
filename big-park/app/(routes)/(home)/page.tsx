import CategoryList from "../_components/CategoryList";
import ProductList from "../_components/Product/ProductList";
import SliderComponent from "../_components/SliderComponent";


export default function Home() {
  return (
    <>

      <SliderComponent />
      <CategoryList />
      <ProductList/>
    </>
  );
}
