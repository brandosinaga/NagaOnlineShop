import React from "react";

export default class Content extends React.Component{


    
    render(){

        const {shoppingProducts, textFilter, dataFilter, addToCart, delCart} = this.props;
         const items = [];
        
       
        shoppingProducts.map((e) => {

            const price = Number(e.price);
            const lowPrice  = Number(dataFilter.lowPrice);
            const highPrice = Number(dataFilter.highPrice);
            
                if(e.category.indexOf(dataFilter.category) === -1)return;
                
                        if(e.gender.indexOf(dataFilter.gender) === -1) return;

                                    if(e.name.toLocaleLowerCase().indexOf(textFilter.toLocaleLowerCase()) === -1)return;

                                           
                                        if(lowPrice > price && lowPrice !== 0 ) return;


                                                if(highPrice < price && highPrice !== 0) return;
                                    

          
     items.push(<Item key={e.id} product = {e} addToCart = {addToCart} inCart = {e.inCart} delCart = {delCart}/>)

              
            
        });



        return (
                <div className="content">
                    {items}
                </div>
                
                )
    }
}













class Item extends React.Component {


    addToCart = () => this.props.addToCart(this.props.product);


    delCart = () => this.props.delCart(this.props.product);



    render(){

        const {product, inCart} = this.props;


        return (
                <div className="item">
                    <img className="image-item" src={product.image} />
                    <div>

                        <p>{product.name}</p>
                        <p>{product.price}</p>

                        {
                        (inCart) ? 
                        <button onClick={this.delCart}><span className="material-symbols-outlined">delete_sweep</span></button> : 
                                <button  onClick={this.addToCart}  > <span className="material-symbols-outlined" style={{cursor : "pointer"}}>add_circle</span></button> 
                                }
                    </div>
                </div>)
    }
}


