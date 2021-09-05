import { AddShoppingCart, Done, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import "../App.css";
import { useStateValue } from './StateProvider';

export default function Pastries() {
    const [ { products}, dispatch] = useStateValue();
    const [currentItem, setCurrentItem] = useState();

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const loadProducts = async () => {
        dispatch({
            type: "fetch_products"
        })       
    }
    const addToCart = (product) => { 
        dispatch({
        type: "add_to_cart",
        item: product
        })
    }
    useEffect(() => {
        loadProducts().then( () => console.log())
    }, []) 
    return (
        <section className="products_page">
        {
            products.map( (product, i) => 
            product.product_cat === "pastries" &&
            <div id={product.product_id}  key={product.product_id} className={(i % 2 === 0) ? "products_div" : "products_div products_div_reversed"} >
                <div className="products_image_div">
                    <img className="product_img" src={product.product_image} alt="Product"/>
                </div>
                <div className="products_desc_div">
                    <h3 className="product_title">{product.product_name}</h3>
                    <p>{product.product_descr} {product.product_descr} {product.product_descr} {product.product_descr}
                    </p>
                    <div className="btn_purchase_div">
                        <p className="product_price">Ksh. {product.product_price}</p>
                        {/* {
                            product.inCart === true ?
                            <button className="btn_purchase" id={product.product_id}>
                            <p>Remove From Cart</p>
                            <Remove />
                            </button>
: */}
                            <button className="btn_purchase" onClick={() => addToCart(product)}>
                            <p>Add To Cart</p>
                            <AddShoppingCart />
                            </button>
                        {/* } */}

                    </div>
                </div>
            </div>
            )

        }
        </section>

    )
}
