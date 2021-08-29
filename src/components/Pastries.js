import { AddShoppingCart } from '@material-ui/icons';
import React from 'react'
import { useState } from 'react';
import { useStateValue } from './StateProvider';

export default function Pastries() {

    const [ { products}, dispatch] = useStateValue();
    const [currentItem, setCurrentItem] = useState();

        const findSelection = async (e) => {
        const targetID = e.target.parentNode.parentNode.parentNode.parentNode.id

        if(targetID){
            setCurrentItem(...products.filter( prod => prod.product_id === targetID && prod))
        }
    }
    const addToCart = async (e) => { 
        findSelection(e).then( data => {
            if(currentItem !== undefined){
                dispatch({
                type: "add_to_cart",
                item: currentItem
                })
            }
        })
    }
    
    return (
        <section className="products_page">
        {
            products.map( (product, i) => 

            product.product_cat === "pastries" &&
            <div key={product.product_id} className={(i % 2 === 0) ? "products_div" : "products_div products_div_reversed"} >
                <div className="products_image_div">
                    <img className="product_img" src={product.product_image} alt="Product"/>
                </div>
                <div className="products_desc_div">
                    <h3 className="product_title">{product.product_name}</h3>
                    <p>{product.product_descr} {product.product_descr} {product.product_descr} {product.product_descr}
                    </p>
                    <button className="btn_purchase_div">
                        <p className="product_price">Ksh. {product.product_price}</p>
                        <p><AddShoppingCart onClick={addToCart}/></p>
                    </button>
                </div>
            </div>
            )

        }
        </section>    
    )
}
