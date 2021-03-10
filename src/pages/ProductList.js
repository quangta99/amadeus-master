import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import ProductBlockCat from "../components/ProductBlockCat";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel";

const toSlug = (str) => {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, "");

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, "");

  // return
  return str;
};

function ProductList(props) {
  const [setStt] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const products = await axios.get(
        `https://amadeuss.herokuapp.com/products`
      );
      setProducts(products.data);
    })();
  }, []);
  let { category } = useParams();
  const ascending = (event) => {
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
  return (
    <div>
      <Header />
      <Carousel/>
      <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-3 pr-3">
            <h4 className="text-white mt-3">Sắp xếp sản phẩm</h4>
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
                onClick={(event) => {
                  ascending(event);
                }}
              >
                Giá tăng dần
              </div>
              <div
                className="nav-link text-white sort-menu"
                type="button"
                data-toggle="pill"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={(event) => {
                  decrease(event);
                }}
              >
                Giá giảm dần
              </div>
              {/* <a
                className="nav-link text-white sort-menu"
                type="button"
                data-toggle="pill"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={(event) => {
                  latest(event);
                }}
              >
                Mới nhất
              </a> */}
            </div>
          </div>
          <div className="col-12 col-md-9 px-5 mt-3">
            {products.map((value, key) => {
              var flag = false;
              value.category.map((value, key) => {
                if (toSlug(value) === category) {
                  flag = true;
                }
              });
              if (flag === true) {
                console.log(value.price);

                return (
                  <ProductBlockCat
                    key={key}
                    prID={value.id}
                    prImg={value.img}
                    prTitle={value.name}
                    prPrice={value.price}
                    prFake={value.priceFake}
                    prCategory={category}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductList;
