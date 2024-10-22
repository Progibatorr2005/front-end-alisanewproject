import Home from "@/screens/home/Home";
import { ProductService } from "@/services/product/product.sevice";
import { TypePaginationProducts } from "@/types/product.interface";
import { GetServerSideProps, NextPage } from "next";

const HomePage: NextPage<TypePaginationProducts> = ({ lenght, products }) => {
  return <Home products={products} lenght={length} />;
};

export const getServerSideProps: GetServerSideProps<TypePaginationProducts> = async () => {
  const data = await ProductService.getAll({
    page: 1,
    perPage: 100000
  });

  return {
    props: data
  };
};

export default HomePage;
