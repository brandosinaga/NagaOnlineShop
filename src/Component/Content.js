import React from "react";

export default class Content extends React.Component{
    
    render(){
        let products = this.props.shoppingProducts;
        let textFilter = this.props.textFilter.toLocaleLowerCase();
        let items = [];
        let dataFilter = this.props.dataFilter;
       

       

        products.map((e) => {

            let price = Number(e.price);
            let lowPrice  = Number(dataFilter.lowPrice);
            let highPrice = Number(dataFilter.highPrice);
            
                if(e.category.indexOf(dataFilter.category) === -1)return;
                
                        if(e.gender.indexOf(dataFilter.gender) === -1) return;

                                    if(e.name.toLocaleLowerCase().indexOf(textFilter) === -1)return;

                                           
    if(lowPrice > price && lowPrice !== 0 ) return;


    if(highPrice < price && highPrice !== 0) return;
                                    

          
                items.push(<Item key={e.id} product = {e} addToCart = {this.props.addToCart} inCart = {e.inCart} delCart = {this.props.delCart}/>)

              
            
        });


        return (<div className="content">
                {items}
                </div>)
    }
}







class Item extends React.Component {


    addToCart(){this.props.addToCart(this.props.product)};
    delCart(){this.props.delCart(this.props.product)}

    render(){

   
        let product = this.props.product;
        let ItemIncart = this.props.inCart;
        return (<div className="item">
                    <img className="image-item" src={product.image} />
                    <div>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        {(ItemIncart) ? <button onClick={this.delCart.bind(this)}><span className="material-symbols-outlined">delete_sweep</span></button> : <button  onClick={this.addToCart.bind(this)}  > <span className="material-symbols-outlined" style={{cursor : "pointer"}}>add_circle</span></button> }

{/*                         
                       <button disabled = {this.props.inCart} onClick={this.addToCart.bind(this)}  > <span className="material-symbols-outlined" style={{cursor : "pointer"}}>add_circle</span></button>
                       <button onClick={this.deleteItem.bind(this)}><span className="material-symbols-outlined">delete_sweep</span></button> */}
                    </div>
                </div>)
    }
}


