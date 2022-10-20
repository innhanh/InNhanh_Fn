import React, { useEffect, useState } from 'react';
import { ApiClients } from '../apiConfig/axiosClients';
import { Carousel } from "react-bootstrap";

function Banner(props) {
    const [carousels, setCarousel] = useState([]);
    useEffect(() => {
        const GetCarousels = async () => {
            await ApiClients.Carousel(setCarousel);
        };
        GetCarousels();
    }, [])
    return (
        <div id='carousels'>
            <Carousel>
                {
                    carousels.map((carousel, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={carousel.url}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        )
                    })
                }

            </Carousel>
        </div>
    );
}

export default Banner;