import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
    <section className="main_page_section">
        <div className="home_banner">
            <div className="home_left">
                {/* <!-- REM Overlay Bottom left corner + add dashed border --> */}
                {/* <div className="social_icons_div">
                    <Link to=""><i class="fab fa-twitter"></i></Link>
                    <Link to=""><i class="fab fa-facebook"></i></Link>
                </div> */}
            </div>
            <div className="home_right">
                <h3 className="product_title">Cafe Kora</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia corrupti nulla, quos aspernatur vero rem quis culpa eveniet nemo fugiat, id voluptatem ad reprehenderit dolorem? Asperiores tempore veritatis dolore, accusantium explicabo nulla rerum iure aut laborum obcaecati incidunt voluptate dignissimos.</p>
            </div>

        </div>

        <div className="home_banner_overlay">
            <img src="images/nobg_mb3.png" alt="Coffee Main"/>
            <Link to="#breads"></Link>
        </div>

        <div className="site_headers">
            <h5>Check out our delicious</h5>
            <h3 >MENU ITEMS</h3>
        </div>

        <div className="products_div" id="breads">
            <div className="products_image_div">
                <img src="images/breads/idk3.png" alt="Breads Main"/>
            </div>
            <div className="products_desc_div">
                <h3 className="product_title">Breads</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magnam at consequuntur ducimus porro consectetur unde. Fugiat quidem id veritatis praesentium, quas numquam fuga doloremque maxime assumenda repellat sit nisi.</p>
                <Link to="/bread">
                <button className="btn_view">View Bread Collection</button>
                </Link>
            </div>
        </div>

        <div className="products_div products_div_reversed">
            <div className="products_image_div">
                <img src="images/pastries/nobg_cinnroll3.png" alt="Pastries Main"/>
            </div>
            <div className="products_desc_div">
                <h3 className="product_title">Pastries</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magnam at consequuntur ducimus porro
                    consectetur unde. Fugiat quidem id veritatis praesentium, quas numquam fuga doloremque maxime assumenda
                    repellat sit nisi.
                </p>
                <Link to="/pastries">
                <button className="btn_view">View Pastries Collection</button></Link>
            </div>
        </div>

        <div className="products_div">
            <div className="products_image_div">
                <img src="images/main_banner5.png" alt="Coffee MAIN"/>
            </div>
            <div className="products_desc_div">
                <h3 className="product_title">Coffee</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi magnam at consequuntur ducimus porro
                    consectetur unde. Fugiat quidem id veritatis praesentium, quas numquam fuga doloremque maxime assumenda
                    repellat sit nisi.</p>
            </div>
        </div>

    </section>

    )
}
