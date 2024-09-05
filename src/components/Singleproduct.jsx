import { useParams } from "react-router-dom";
import Singlecard from "./Singlecard";
import { useGetProductByIdQuery } from "../slices/productSlice";
import Spinner from "./Spinner";
import Error from "./Error";
const Singleproduct = () => {
  const { id } = useParams();
const{data:product,isLoading,error}=useGetProductByIdQuery(id)
 
  return (
    <>
      {error ? (
        <Error>{error.message || error.error}</Error>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Singlecard product={product} />
        </div>
      )}
    </>
  );
};

export default Singleproduct;
