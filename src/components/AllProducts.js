import { AddShoppingCart } from '@material-ui/icons';
import React from 'react'
import { useStateValue } from './StateProvider';

export default function AllProducts({product_id, product_name, product_image, product_descr, product_cat, product_price}) {
    const [ { products}, dispatch] = useStateValue();

    return (
        <section className="products_page">
          {
            products.map( (product, i) => 
            <div id={product_id}  key={product_id} className={(i % 2 === 0) ? "products_div" : "products_div products_div_reversed"} >
                <div className="products_image_div">
                    <img className="product_img" src={product_image} alt="Product"/>
                </div>
                <div className="products_desc_div">
                    <h3 className="product_title">{product_name}</h3>
                    <p>{product_descr} {product_descr} {product_descr} {product_descr}
                    </p>
                    <button className="btn_purchase_div">
                        <p className="product_price">Ksh. {product_price}</p>
                        <p><AddShoppingCart/>
                        </p>
                    </button>
                </div>
            </div>
            )

        }          
        </section>
    )
}
