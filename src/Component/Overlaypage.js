
import React from "react";

import { Card,Button,Nav,Navbar,NavDropdown,Container,Image, Row, Col, ListGroup, ListGroupItem, Badge, Alert} from 'react-bootstrap';





export default class Overlaypage extends React.Component{

    render(){

          const {call_overlay,cart,addThisItem,decThisItem,totalBayar,deleteItem,btnStatus,filterData} = this.props;


          const overlayCartProps = {
                cart : cart,
                 addThisItem : addThisItem,
                  decThisItem : decThisItem,
                    totalBayar : totalBayar,
                     deleteItem : deleteItem,
                        btnStatus  : btnStatus
            }


            const call_Overlay = ( call_overlay === "call_cart")? <OverlayCart {...overlayCartProps} /> :<OverlayFilter filterData = {filterData}  />



        return (
                <div className="overlaypage">
                    {call_Overlay}
                </div>
                    )
    }
}







class OverlayFilter extends React.Component{

    state = {  list : {}, gender : ''};
    


    FilterGender = (e) => {

        const gender = e.target.value;

             if(gender === "male") document.getElementById("woman").disabled = true;
                
                        if(gender === "woman") document.getElementById("male").disabled = true;
                

                this.setState({gender : gender});

    }





  handleClick = () => {

        const {list,gender} = this.state;

                list.gender = gender;
                list.category = document.getElementById("category").value;
                list.lowPrice = document.getElementById("lowPrice").value;
                list.highPrice = document.getElementById("highPrice").value;

                this.setState({list : list});

                    this.props.filterData(list);

    }




    render(){

        console.log("this filter data banner")

        return (
        
                <div className="overlayFilter"> 
                    <label style={{display : "block"}}>For Man <input id="male" type="checkbox" value="male" onClick={this.FilterGender} /></label>
                    <label style={{display : "block"}}>For Woman <input id="woman" type="checkbox" value="woman" onClick={this.FilterGender} /></label>
                    <select id="category" name="category"> 
                        <option value="">--choose category--</option>
                        <option value="Sport Goods">Sport Goods</option>
                        <option value="Casual Goods">Casual Goods</option>
                    </select>
                    <p><label>Price <input id="lowPrice" type="number" /> - <input id="highPrice" type="number" /></label></p>
                 
                <button onClick={this.handleClick}>filter</button>

                </div>
                
                )
    }
}















class OverlayCart extends React.Component{
    
    state = {
            status : false,
        }



    btnStatus = () => this.props.btnStatus();

    handleClick= () =>  this.setState({status : !this.state.status}, this.changeDisplay);

    
    changeDisplay = () => {

        const cartBanner = document.querySelector(".overlayCart");

        if(this.state.status === true){

                         cartBanner.style.display = "none";
        } else {
            
                            cartBanner.style.display = "block"
        }
    }


    render(){

        const {cart, addThisItem, decThisItem, deleteItem, totalBayar, } = this.props;
        const {status} = this.state;
        const showItems = []; 
        let count = 0;

        let CartComponentProperties = {
                                
                addThisItem : addThisItem,
                decThisItem : decThisItem,
                deleteItem : deleteItem

        }


        cart.map((item) => {
        
        showItems.push(<Cart key={count} item = {item} {...CartComponentProperties} />)
        
        count++
    
        })
        
            

        return (
        <>
        <div className="overlayCart">
                  
                  {showItems}

                <h1>total bayar : {totalBayar}</h1>
                <button onClick={this.btnStatus}><span className="material-symbols-outlined">arrow_back</span>Back to Shop</button>
                <button onClick={this.handleClick}>Bayar</button>
               
                </div>
                 {this.state.status && <Pay handleClick = {this.handleClick} cart={cart} totalBayar = {totalBayar} />}
                
                </> )
    }
}
















class Pay extends React.Component {

    render(){

        const {cart,handleClick,totalBayar} = this.props;
        
        let showItems = [];

        cart.map((e) => showItems.push(<DefaultExample item = {e} />))

        return (
        <div className="payment">
            <h1>Payment Details :</h1>
            <ListGroup as="ol" numbered>
                 {showItems} 
            </ListGroup>
           
            <ListGroup as="ol" >
                  
            <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">
              <Button onClick={handleClick}>Kembali</Button>
              </div>
            </div>
            <Badge bg="warning" pill>
              Total Payment
            </Badge>
            <Button bg="primary" pill>
            {totalBayar}
            </Button>
          </ListGroup.Item>
            </ListGroup>

            <Nav variant="pills" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link><Button>Bayar</Button></Nav.Link>
                </Nav.Item>
            </Nav>

          
            </div>
        )
    }
}









class DefaultExample extends React.Component{

    render(){

        let item = this.props.item;
    
        return (

            <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              {item.quantityInCart} *  ${item.price}
            </div>
            <Badge bg="warning" pill>
              $
            </Badge>
            <Button bg="primary" pill>
              {item.price * item.quantityInCart}
            </Button>
          </ListGroup.Item>

        )
    }
}


  
  


























class Cart extends React.Component {


addThisItem = () => this.props.addThisItem(this.props.item);

decThisItem = () => this.props.decThisItem(this.props.item);

deleteItem = () => this.props.deleteItem(this.props.item);


render(){
   
    let item = this.props.item;

    return (<div className="cart-overlay">
                <div className="container-cart-img"><img  src={item.image} /></div>
                <div className="container-cart-name"><p>{item.name}</p></div>
                <div className="container-cart-price">
                    <p>{`$ `+item.price}</p>
                    <div className="container-cart-btn">
                        <button onClick={this.addThisItem}><span className="material-symbols-outlined">add</span></button>
                                <span>{item.quantityInCart}</span>
                                {item.quantityInCart > 1 &&  <button onClick={this.decThisItem}><span className="material-symbols-outlined">remove</span></button>}
                                {item.quantityInCart === 1 && <button onClick={this.deleteItem}><span className="material-symbols-outlined">delete_sweep</span></button>}
                    </div>

                    </div>
                 </div>)
}


}



