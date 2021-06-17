import React from 'react';
import { TiTick, TiTimes } from "react-icons/ti";


const PreviewList = (props) => {
    const { onImageUpdate, onImageRemove, imageList, uploadSuccess } = props;


    return (
        <>
            <div className="image-box">
                {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="100" />
                            {
                                !uploadSuccess &&
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>
                                    <TiTick size={30} color="#11df78"/>
                                    </button>
                                    <button onClick={() => onImageRemove(index)}>
                                        <TiTimes size={30} color="#e65a5a"/>
                                    </button>
                                </div>
                            }
                    </div>
                ))}
            </div>
        </>
    );
}

export default PreviewList;