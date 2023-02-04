import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card,Button,Nav,Navbar,NavDropdown,Container,Image, Row, Col} from 'react-bootstrap';
import React, { useState, setState, Fragment, useEffect, createContext, useContext, useRef,useReducer } from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import Header from './Component/Header';
import Content from './Component/Content';
import Overlaypage from './Component/Overlaypage';
import {shoppingProducts} from './index.js'

// ***************************************************************************************************************


class App extends React.Component {

    constructor(props){
        super(props);
            this.state = {list : [], 
                btn_status : false,
                     call_overlay : "", 
                        dataToFilter : {gender : "", category : "", lowPrice : "", highPrice : "" }, 
                            textToFilter:"",
                                 itemIntCart : 0,
                                    countPay : 0};
         }




    handleBtnfilter(e){this.setState({btn_status : !this.state.btn_status, call_overlay : e})};

    filterData(e){this.setState({dataToFilter : e}); this.setState({btn_status : !this.state.btn_status})};

    textFilter(e){this.setState({textToFilter : e})}




    handleAddToCart(e){

                  let list = this.state.list;
                    let countPay = this.state.countPay + shoppingProducts[e.id]

                    list.push(shoppingProducts[e.id]);
                        shoppingProducts[e.id].inCart = true;
                            shoppingProducts[e.id].quantityInCart = 1;
        this.setState({list : list, countCart : this.state.countCart + shoppingProducts[e.id].quantityInCart, countPay : this.state.countPay + shoppingProducts[e.id].price, itemIntCart : this.state.itemIntCart + 1})

                  
    }





    addThisItem(e){

            let items = this.state.list;

            items.forEach((item) => {
                
                if(item.name === e.name){
                  item.quantityInCart = item.quantityInCart + 1;
                   shoppingProducts[e.id].quantityInCart = item.quantityInCart;
                    }
            })


            this.setState({list : items, countPay : this.state.countPay + shoppingProducts[e.id].price, itemIntCart : this.state.itemIntCart + 1})



    }



    
    decThisItem(e){


        let items = this.state.list;

        items.forEach((item) => {

            if(item.name === e.name){
              item.quantityInCart = item.quantityInCart - 1;
              
              shoppingProducts[e.id].quantityInCart = item.quantityInCart;
                }
        })


        this.setState({list : items, countPay : this.state.countPay - shoppingProducts[e.id].price, itemIntCart : this.state.itemIntCart - 1})
    }
    


    deleteItem(e){


        let newList = [];

        this.state.list.forEach((item) => {
        
            if(item.id === e.id){
                    return ;
                }

                newList.push(item)

        })


        shoppingProducts[e.id].inCart = false;
        shoppingProducts[e.id].quantityInCart = 0;
        
       
        this.setState({list : newList, countPay : this.state.countPay - e.price, itemIntCart : this.state.itemIntCart - 1})
    }



    render(){



        let btn_status = this.state.btn_status;
        let headerProps = {callOverlayPage : this.handleBtnfilter.bind(this), textFilter : this.textFilter.bind(this), itemInCart : this.state.itemIntCart};
        let contentProps = {shoppingProducts : this.props.shoppingProducts, textFilter : this.state.textToFilter, dataFilter : this.state.dataToFilter, addToCart : this.handleAddToCart.bind(this), delCart : this.deleteItem.bind(this)};
        let overlaypageprops = {call_overlay: this.state.call_overlay, filterData : this.filterData.bind(this), cart : this.state.list, addThisItem : this.addThisItem.bind(this), decThisItem : this.decThisItem.bind(this), totalBayar : this.state.countPay, deleteItem : this.deleteItem.bind(this), btnStatus : this.handleBtnfilter.bind(this) }




        return <div className='root-firstchild'>    
                    <Header {...headerProps}/>
                        <Content {...contentProps} />
                            {(btn_status === true) && <Overlaypage {...overlaypageprops} />}

                 </div>
    }
}











export default App;


