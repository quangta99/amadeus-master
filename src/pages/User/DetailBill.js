import React from "react";
import axios from 'axios';
import Footer from "../../components/Footer.js";
import Header from "../../components/Header";
import ItemBill from "./itemBill.js";
import { Link } from "react-router-dom";
export default class DetailBill extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Order:{
            paid: false,
            _id:"",
            userId: "",
            email:"",
            products:[{
            _id:"",
            productId:{
                _id:"",
                name:"",
                nameURL:"",
                img:"",
                price:0,
                id:"",
            },
            nameURL:"",
            quantity: 0,
            price: 0,
            }],
            total: 0,
            createAt:"",
            __v: 0
            },
            ListOrders:[{
                paid: false,
                _id:"",
                userId: "",
                email:"",
                products:[{
                  _id:"",
                  productId:{
                      _id:"",
                      name:"",
                      nameURL:"",
                      img:"",
                      price:0,
                      id:"",
                  },
                  nameURL:"",
                  quantity: 0,
                  price: 0,
                }],
                total: 0,
                createAt:"",
                __v: 0
               }]
        };
    };
    getToken(){
        return sessionStorage.getItem("accessToken") || null;
    }
    componentDidMount() {
        const token = this.getToken();
        if(token){
          axios.get("https://amadeuss.herokuapp.com/order/get", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then(response => {
            const ListOrders = response.data;
            this.setState({ListOrders});
            this.state.ListOrders.forEach((item) =>{
                if(item._id === this.props.match.params._id){
                    this.state.Order = item;
                    this.setState(this.state.Order);
                }
            });
          }).catch((error) => {
          })
        }
    }
    render() {
        const formatter = new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
          });
        return(
            <div>
            <Header/>            
         <div
           className=""
           style={{
             backgroundColor: "black",
           }}
         >
                <div className="container flex justify-content-center text-white margin-top-100">
                    <div className="col-lg-9">
                        <div className="row text-white">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left">
                            <h6>Chi ti???t ????n h??ng - {this.state.Order._id}</h6>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left">
                                <h6>Ng??y ?????t h??ng: {this.state.Order.createAt}</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <h6>?????A CH??? NG?????I NH???N</h6>
                                <div className="p-1 bill-infor" style={{backgroundColor: "white",}}>
                                    <strong>{this.state.Order.email}</strong>   
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <h6>H??NH TH???C GIAO H??NG</h6>
                                <div className="p-1 bill-infor" style={{backgroundColor: "white",}}>
                                    <p>Nh???n h??ng qua email: {this.state.Order.email}</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <h6>H??NH TH???C THANH TO??N</h6>
                                <div className="p-1 bill-infor" style={{backgroundColor: "white",}}>
                                    <p>Pay</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1 ml-0 mb-0 mr-0">
                        <table className="table table-hover text-sm" style={{backgroundColor: "white"}}>
                            <thead>
                            <tr>
                                <th scope="col">S???n ph???m</th>
                                <th scope="col">Gi??</th>
                                <th scope="col">S??? l?????ng</th>
                                <th scope="col">T???m t??nh</th>
                            </tr>
                            </thead>
                            {this.state.Order.products.map((value, key) =>{
                                return(
                                    <ItemBill
                                        key={key}
                                        name={value.productId.name}
                                        nameURL={value.productId.nameURL}
                                        img={value.productId.img}
                                        price ={value.price}
                                        quantity={value.quantity}
                                    />
                                )
                            })}
                            <tfoot className="flex">  
                                <tr className="">
                                    <td className="text-right">T???ng c???ng</td>
                                    <td className="text-right">{formatter.format(this.state.Order.total)}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <Link to="/nguoi-dung">
                            <p>Quay v??? ????n h??ng c???a t??i</p>
                        </Link>
                        </div>
                    </div>
                </div>
           <Footer />
         </div>
       </div>
        );
    }
}