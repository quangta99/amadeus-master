import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductBlock from "../components/ProductBlock";
import axios from "axios";
import { useForm } from "react-hook-form";
import Carousel from "../components/Carousel";
import bag from "../Asset/Img/empty-cart.png";

function Search(props) {
  const [ setStt] = useState(0);
  const [products, setProducts] = useState([]);
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const [ setError] = useState(null);

  const onSubmit = values => {
    setError(null);
    setLoading(true);
    axios
      .post(`https://amadeuss.herokuapp.com/products/search`, {
        keySearch: values.keySearch,
      })
      .then(response => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  };
  const ascending = event => {
    let handled = products;
    for (let i = 1; i < handled.length; i++) {
      let j = i - 1;
      let temp = handled[i];
      while (j >= 0 && handled[j].price > temp.price) {
        handled[j + 1] = handled[j];
        j--;
      }
      handled[j + 1] = temp;
    }
    setProducts(handled);
    setStt(1);
  };
  const decrease = () => {
    let handled = products;
    for (let i = 1; i < handled.length; i++) {
      let j = i - 1;
      let temp = handled[i];
      while (j >= 0 && handled[j].price < temp.price) {
        handled[j + 1] = handled[j];
        j--;
      }
      handled[j + 1] = temp;
    }
    setProducts(handled);
    setStt(2);
  };
  const displayCheck = () => {
    if (products.length > 0) {
      return (
        <div>
          {products.map((value, key) => {
            return (
              <ProductBlock
                key={key}
                prID={value.id}
                prImg={value.img}
                prTitle={value.name}
                prPrice={value.price}
                prFake={value.priceFake}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="row justify-content-center">
          <div className="empty-form col-lg-6 text-center m-4 p-2">
            <h3 className="mt-3">K???t qu??? tr???ng</h3>
            <img alt="img" className="ml-4 img-fluid" src={bag} />
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <Header />
      <Carousel />
      <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-3 pr-3">
            <h4 className="text-white mt-3">S???p x???p s???n ph???m</h4>
            <hr className="border-white mt-2" />
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <div
                className="nav-link text-white sort-menu"
                type="button"
                data-toggle="pill"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={event => {
                  ascending(event);
                }}
              >
                Gi?? t??ng d???n
              </div>
              <div
                className="nav-link text-white sort-menu"
                type="button"
                data-toggle="pill"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={event => {
                  decrease(event);
                }}
              >
                Gi?? gi???m d???n
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 px-3 mt-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="input-group form-inline mb-3 w-100"
            >
              <input
                name="keySearch"
                ref={register({
                  required: "T??? kho?? kh??ng ???????c ????? tr???ng",
                })}
                className="form-control mr-sm-2"
                placeholder="Nh???p t??n s???n ph???m mu???n t??m ki???m..."
                type="search"
              />
              <input
                type="submit"
                className="btn btn-success"
                value={loading ? "Loading..." : "T??m ki???m"}
                disabled={loading}
              />
            </form>
            {displayCheck()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
