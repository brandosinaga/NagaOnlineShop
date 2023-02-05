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

    state = {
        list : [], 
        btn_status : false,
        call_overlay : "", 
        dataToFilter : {
                        gender : "", 
                            category : "", 
                             lowPrice : "", 
                                 highPrice : ""
                                 }, 
        textToFilter:"",
        itemIntCart : 0,
        countPay : 0
    };
        




    handleBtnfilter = (e) => this.setState({btn_status : !this.state.btn_status, call_overlay : e});




    filterData = (e) => {this.setState({dataToFilter : e}); this.setState({btn_status : !this.state.btn_status})};




    textFilter = (e) => this.setState({textToFilter : e});




    handleAddToCart = (e) => {

        const {list,countPay, countCart, itemIntCart} = this.state;
            
        list.push(shoppingProducts[e.id]);
            shoppingProducts[e.id].inCart = true;
            shoppingProducts[e.id].quantityInCart = 1;

            
            this.setState({
                list : list,
                     countCart : countCart + shoppingProducts[e.id].quantityInCart,
                         countPay : countPay + shoppingProducts[e.id].price,
                                 itemIntCart : itemIntCart + 1})

                  
    };





    addThisItem = (e) => {

        const {list, countPay, itemIntCart} = this.state

        const items = list;

            
        items.forEach((item) => {
                
         if(item.name === e.name){
            item.quantityInCart = item.quantityInCart + 1;
                shoppingProducts[e.id].quantityInCart = item.quantityInCart;
                
            }
        });


        this.setState({
            list : items,
                 countPay : countPay + shoppingProducts[e.id].price,
                     itemIntCart : itemIntCart + 1
                    })

    };





    
    decThisItem = (e) => {

        const{list, countPay, itemIntCart} = this.state;

        const items = list;



        items.forEach((item) => {

            if(item.name === e.name){

              item.quantityInCart = item.quantityInCart - 1;
              
              shoppingProducts[e.id].quantityInCart = item.quantityInCart;
                }
        })


        this.setState({
            list : items, 
                countPay : countPay - shoppingProducts[e.id].price,
                    itemIntCart : itemIntCart - 1
            })
    };
    



    


    deleteItem = (e) => {

        const{list,countPay,itemIntCart} = this.state;
            let newList = [];

        list.forEach((item) => {
                    if(item.id === e.id){
                            return ;
                }
                newList.push(item)

        })

        shoppingProducts[e.id].inCart = false;
        shoppingProducts[e.id].quantityInCart = 0;
           
        this.setState({list : newList, countPay : countPay - e.price, itemIntCart : itemIntCart - 1})
    };





    render(){

        const {btn_status, call_overlay, textToFilter, list, itemIntCart, dataToFilter, countPay } = this.state;
        const shoppingProducts = this.props.shoppingProducts
        
        const headerProps = {callOverlayPage : this.handleBtnfilter, textFilter : this.textFilter, itemInCart : itemIntCart};
        const contentProps = {shoppingProducts : shoppingProducts, textFilter : textToFilter, dataFilter : dataToFilter, addToCart : this.handleAddToCart, delCart : this.deleteItem};
        const overlaypageprops = {call_overlay: call_overlay, filterData : this.filterData, cart : list, addThisItem : this.addThisItem, decThisItem : this.decThisItem, totalBayar : countPay, deleteItem : this.deleteItem, btnStatus : this.handleBtnfilter}




        return ( 
        
        
        <div className='root-firstchild'>    
                    <Header {...headerProps}/>
                        <Content {...contentProps} />
                            {(btn_status === true) && <Overlaypage {...overlaypageprops} />}

         </div>

        )
    }
};











export default App;


