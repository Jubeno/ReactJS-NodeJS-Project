import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeather, selectorWeather } from './weatherSlice';
import ReactMapGL, { Marker } from 'react-map-gl';
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from '../../util/constant';
import { IoLocationSharp } from "react-icons/io5";
import styled from 'styled-components';

const COORDINATES_HANOI = {
    lat: 21.028511,
    lng: 105.804817
}

const Weather = () => {
    const weatherSelector = useSelector(selectorWeather);
    const nameCurrentPosition = weatherSelector.weather.data.name;
    const dispatch = useDispatch();

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100vh',
        latitude: COORDINATES_HANOI.lat,
        longitude: COORDINATES_HANOI.lng,
        zoom: 8
    });
    const [coordinates, setCoordinates] = useState({
        lat: COORDINATES_HANOI.lat,
        lng: COORDINATES_HANOI.lng
    });


    useEffect(() => {
        console.log('%c weatherSelector.weather.data.name: ', 'color: red' , weatherSelector.weather.data.name);
    }, [weatherSelector.weather.data.name])

    const setCurrentPositionMarker = (lat, lng) => setCoordinates({ lat, lng})

    const getWeatherOfCurrentPosition = (lat, lon) => {
        dispatch({
            type: getWeather().type,
            payload: { lat, lon }
        });
    }
    
    const handleClick = pointEvent => {
        const lat = pointEvent.lngLat[1];
        const lng = pointEvent.lngLat[0];

        setCurrentPositionMarker(lat, lng);
        getWeatherOfCurrentPosition(lat, lng);
    };

    return (
        <>
            <Wrapper>
                <ReactMapGL
                    {...viewport}
                    onClick={handleClick}
                    mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                >
                    <Marker
                        latitude={coordinates.lat}
                        longitude={coordinates.lng}
                        offsetLeft={0}
                        offsetTop={0}
                    >
                        <div
                            style={{ position: 'relative' }}
                        >
                            <IoLocationSharp
                                color="red"
                                size="40"
                                style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)'}}
                            ></IoLocationSharp>
                        </div>
                    </Marker>
                </ReactMapGL>
                <WeatherArea>
                    123dqwdqwdqwdqwd
                </WeatherArea>
            </Wrapper>
        </>
    )
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WeatherArea = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 500px;
    height: 500px;
    background-color: rgba(0, 0, 0, 0.5);
    filter: blur(8px);
`;
export default Weather;