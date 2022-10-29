import React, { useEffect, useState } from 'react';
import { ApiClients } from '../apiConfig/axiosClients';
import { Carousel, Container } from "react-bootstrap";
import BannerHome from './carouselHome';

function Banner(props) {
    const [carousels, setCarousel] = useState([]);
    useEffect(() => {
        const GetCarousels = async () => {
            await ApiClients.Carousel(setCarousel);
        };
        GetCarousels();
    }, [])
    return (
        <div id='myCarousel'>
            <Container>
                <Carousel>
                    <Carousel.Item className='item1'>
                        <BannerHome />
                        <div className='item_1_text'>
                            <h1 className='text_inBanVe'>In <span>BẢN VẼ</span></h1>
                            <h1 className='text_innhanh'>In <span>NHANH <span>{"&"}</span></span></h1>
                            <h1 className='text_inQuangCao'>In <span>QUẢNG CÁO</span></h1>
                            <button className='btn btn_more'>Xem Thêm</button>
                        </div>
                    </Carousel.Item>
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
            </Container>
        </div>
    );
}

export default Banner;