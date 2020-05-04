import React, { useState, useEffect } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps";
import Geocode from "react-geocode";
import mapStyle from "../assets/mapStyle";
import { useCountContext } from "../utils/GlobalState";
import API from '../utils/API';
Geocode.setApiKey("AIzaSyCxo5m4EhnOvW9TOdazdQRHhjWo4cyOQ54");
Geocode.enableDebug();
const api = "AIzaSyCxo5m4EhnOvW9TOdazdQRHhjWo4cyOQ54";

function GoogleMaps(props) {

    const [state, dispatch] = useCountContext();
    const [selectedUser, setSelectedUser] = useState();
    const [mapPosition, setMapPosition] = useState({
        lat: "",
        lng: ""
    });
    useEffect(() => {
        loadGeo();

    }, []);
    function loadGeo() {
        let lat = '';
        let lng = '';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                setMapPosition({ lat: lat, lng: lng });
                console.log("lat: ", lat);
                console.log("lng: ", lng);
                Geocode.fromLatLng(lat, lng)
                    .then(res => {
                    })
            }, function error(msg) { alert('Please enable your GPS position feature.'); },
                { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });
        } else {
            console.log("Geolocation privilege denied");
        }
    }
    function onMarkerDragEnd(event) {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setMapPosition({
            lat: newLat,
            lng: newLng
        });
        console.log(newLat, newLng);
        Geocode.fromLatLng(newLat, newLng)
            .then(res => {
                const postcode = res.results[0].address_components[6].long_name;
                console.log(postcode);
                dispatch({ type: "drag", lat: newLat, lng: newLng, postcode: postcode });
            })
    }
    function handleAccept(event) {
        const btnWidth = state.requests.length + 4;
        const newWidth = 100 / btnWidth;
        const root = document.documentElement;
        root.style.setProperty('--btnWidth', `${newWidth}%`);

        console.log("clicked infoWindow", selectedUser.request);
        const request = {
            name: selectedUser.name,
            line1: selectedUser.line1,
            line2: selectedUser.line2,
            requestID: selectedUser.request
        }
        const data = {
            name: state.userName,
            to: selectedUser.name
        }
        // API.confirm(data);
        dispatch({ type: "add", request: request })
    }
    function Map() {
        return (
            <div>
                <GoogleMap
                    defaultZoom={17.5}
                    defaultCenter={state.lat ?
                        {
                            lat: state.lat,
                            lng: state.lng
                        } : {
                            lat: mapPosition.lat,
                            lng: mapPosition.lng
                        }}
                    defaultOptions={{ styles: mapStyle }}
                >
                    <Marker
                        name={"You're here"}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        position={state.lat ?
                            {
                                lat: state.lat,
                                lng: state.lng
                            } : {
                                lat: mapPosition.lat,
                                lng: mapPosition.lng
                            }
                        }
                        options={{ strokeColor: "#FFD300" }}
                    />
                    {props.userList ?
                        (props.userList.map(user => (
                            <Marker
                                key={user.id}
                                position={{ lat: user.lat, lng: user.lng }}
                                onClick={() => {
                                    setSelectedUser(user);
                                }}
                            />
                        ))) : ("")}
                    {selectedUser && (
                        <InfoWindow
                            position={{
                                lat: selectedUser.lat,
                                lng: selectedUser.lng
                            }}
                            onCloseClick={() => {
                                setSelectedUser(null)
                            }}>
                            <div>
                                <p>{selectedUser.name}</p>
                                <p>requests {selectedUser.numItem} items</p>
                                <button onClick={handleAccept}>Accept</button>
                            </div>
                        </InfoWindow>
                    )}

                    <Circle
                        defaultCenter={state.lat ?
                            {
                                lat: state.lat,
                                lng: state.lng
                            } : {
                                lat: mapPosition.lat,
                                lng: mapPosition.lng
                            }}
                        options={{ strokeColor: "#bbbbbb" }}

                        radius={state.radius}
                    />
                </GoogleMap>
            </div>
        )
    }
    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <div style={{ width: "100%", height: "300px" }}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api}`}
                loadingElement={<div style={{ 'height': `100%` }} />}
                containerElement={<div style={{ 'height': `300px` }} />}
                mapElement={<div style={{ 'height': `100%` }} />}
            />
        </div>
    )
}

export default GoogleMaps
