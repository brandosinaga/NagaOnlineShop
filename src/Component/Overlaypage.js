
import React from "react";



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
                 
                <button onClick={this.handleClick}>Change Data</button>

                </div>
                
                )
    }
}










class OverlayCart extends React.Component{
    
    btnStatus = () => this.props.btnStatus();
    


    render(){

        const {cart, addThisItem, decThisItem, deleteItem, totalBayar, } = this.props;
        const showItems = []; 
            
        cart.map((item) => showItems.push(<Cart id={item.id} item = {item} addThisItem={addThisItem} decThisItem={decThisItem} deleteItem={deleteItem} />))
        


        return (<div className="overlayCart">
                  
                  {showItems}

                <h1>total bayar : {totalBayar}</h1>
                <button onClick={this.btnStatus}><span className="material-symbols-outlined">arrow_back</span>Back to Shop</button>
                </div>)
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
                        <button onClick={this.addThisItem.bind(this)}><span className="material-symbols-outlined">add</span></button>
                                <span>{item.quantityInCart}</span>
                                {item.quantityInCart > 1 &&  <button onClick={this.decThisItem}><span className="material-symbols-outlined">remove</span></button>}
                                {item.quantityInCart === 1 && <button onClick={this.deleteItem}><span className="material-symbols-outlined">delete_sweep</span></button>}
                    </div>

                    </div>
                 </div>)
}


}



