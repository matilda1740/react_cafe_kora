import React from 'react'
import "../App.css";

export default function Breads() {
    return (
        <section className="products_page">
            <div className="products_div">
                <div className="products_image_div">
                    <img className="product_img" src="images/breads/idk3.png" alt=""/>
                </div>
                <div className="products_desc_div">
                    <h3 className="product_title">Sourdough</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magnam at consequuntur ducimus porro
                        consectetur unde. Fugiat quidem id veritatis praesentium, quas numquam fuga doloremque maxime assumenda
                        repellat sit nisi.
                    </p>
                    <button className="btn_purchase">
                        <p className="product_price">Ksh. 450.00 </p>
                        <hr className="path"/>
                        <p>
                            {/* <!-- fiiled heart --> */}
                            {/* <!-- <i class="fas fa-heart"></i> --> */}
                            <i class="far fa-heart"></i>
                            <i class="fas fa-cart-plus"></i>
                        </p>
                    </button>
                </div>
            </div>
        
            <div className="products_div products_div_reversed">
                <div className="products_image_div">
                    <img src="images/breads/nobg_barbaribread.png" alt=""/>
                </div>
                <div className="products_desc_div">
                    <h3 className="product_title">BarBari Bread</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magnam at consequuntur ducimus porro
                        consectetur unde. Fugiat quidem id veritatis praesentium, quas numquam fuga doloremque maxime assumenda
                        repellat sit nisi.</p>
                </div>
            </div>

            <div className="products_div">
                <div className="products_image_div">
                    <img src="images/breads/nobg_brioche.png" alt=""/>
                </div>
                <div className="products_desc_div">
                    <h3 className="product_title">Brioche Bread</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magnam at consequuntur ducimus porro
                        consectetur unde. Fugiat quidem id veritatis praesentium, quas numquam fuga doloremque maxime assumenda
                        repellat sit nisi.</p>
                </div>
            </div>

        </section>

    )
}
