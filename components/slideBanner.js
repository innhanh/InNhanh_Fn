import React, { useState } from 'react';

function SlideBanner({ ArrImages }) {
    const [view, setView] = useState(ArrImages[0]);
    return (
        <div id='slideBanner'>
            <div className='showImg'>
                <img src={view.url} alt={view.name} className='w-100 img-fluid' />
            </div>
            <div className='slide_content d-flex'>
                {
                    ArrImages.map((img, index) => {
                        return (
                            <div key={index} className='slide_item'>
                                <img onClick={() => setView(img)} src={img.url} alt={img.name} className='w-100 img-fluid' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SlideBanner;