import React from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ListPartner({ ArrImages }) {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <div id='listPartner'>           
            <Slider {...settings}>
                {
                    ArrImages.map((partner, index) => {
                        return (
                            <div key={index} className='partner_item'>
                                <img src={partner.Image.url} alt={partner.name}/>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}

export default ListPartner;