
import React from "react";





export default class Overlaypage extends React.Component{

    render(){
        let call_overlay = (this.props.call_overlay === "call_cart")? <OverlayCart cart = {this.props.cart} addThisItem={this.props.addThisItem} decThisItem= {this.props.decThisItem} totalBayar={this.props.totalBayar} deleteItem={this.props.deleteItem} btnStatus={this.props.btnStatus} /> : <OverlayFilter filterData = {this.props.filterData}  />

        return (<div className="overlaypage">
                    {call_overlay}
                    </div>)
    }
}








class OverlayFilter extends React.Component{

    constructor(props){
        super(props);
            this.state = {list : {},gender : ''};
    }


    FilterGender(e){

        let gender = e.target.value;

             if(gender === "male"){
                    document.getElementById("woman").disabled = true;
                }
                        if(gender === "woman"){
                            document.getElementById("male").disabled = true;
                }

                this.setState({gender : gender})
    }


    handleClick(){
                    let FilterList = this.state.list;
                        FilterList.gender = this.state.gender;
                        FilterList.category = document.getElementById("category").value;
                        FilterList.lowPrice = Number(document.getElementById("lowPrice").value)
                        FilterList.highPrice = Number(document.getElementById("highPrice").value)
                    this.setState({list : FilterList});
                    this.props.filterData(this.state.list);
    }

    render(){

       
        return (<div className="overlayFilter"> 
                    <label style={{display : "block"}}>For Man <input id="male" type="checkbox" value="male" onClick={this.FilterGender.bind(this)} /></label>
                    <label style={{display : "block"}}>For Woman <input id="woman" type="checkbox" value="woman" onClick={this.FilterGender.bind(this)} /></label>
                    <select id="category" name="category"> 
                        <option value="">--choose category--</option>
                        <option value="Sport Goods">Sport Goods</option>
                        <option value="Casual Goods">Casual Goods</option>
                    </select>
                    <p><label>Price <input id="lowPrice" type="number" /> - <input id="highPrice" type="number" /></label></p>
                 
                <button onClick={this.handleClick.bind(this)}>Change Data</button>

                </div>)
    }
}










class OverlayCart extends React.Component{
    
    btnStatus(){
        this.props.btnStatus()
    }
    
    render(){

        let itemsInCart = this.props.cart;
        let showItems = [] 
        itemsInCart.map((item) =>showItems.push(<Cart id={item.id} item = {item} addThisItem={this.props.addThisItem} decThisItem={this.props.decThisItem} deleteItem={this.props.deleteItem} />))
        
     
      

        return (<div className="overlayCart">
                  {showItems}

                <h1>total bayar : {this.props.totalBayar}</h1>
                <button onClick={this.btnStatus.bind(this)}><span class="material-symbols-outlined">arrow_back</span>Back to Shop</button>
                </div>)
    }
}




class Cart extends React.Component {



addThisItem(){this.props.addThisItem(this.props.item)}

decThisItem(){this.props.decThisItem(this.props.item)}

deleteItem(){this.props.deleteItem(this.props.item)}


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
                                {item.quantityInCart > 1 &&  <button onClick={this.decThisItem.bind(this)}><span className="material-symbols-outlined">remove</span></button>}
                                {item.quantityInCart === 1 && <button onClick={this.deleteItem.bind(this)}><span className="material-symbols-outlined">delete_sweep</span></button>}
                    </div>

                    </div>
                 </div>)
}


}



