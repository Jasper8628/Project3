import React, { useState, useEffect } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps";
import Geocode from "react-geocode";
import mapStyle from "../assets/mapStyle";
import { useCountContext } from "../utils/GlobalState";
Geocode.setApiKey("AIzaSyCxo5m4EhnOvW9TOdazdQRHhjWo4cyOQ54");
Geocode.enableDebug();
const api = "AIzaSyCxo5m4EhnOvW9TOdazdQRHhjWo4cyOQ54";

function GoogleMaps(props) {

    const [state, dispatch] = useCountContext();
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
    function Map() {
        const [selectedUser, setSelectedUser] = useState();
        return (
            <div>
                <GoogleMap
                    defaultZoom={18}
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
                                <h4>{selectedUser.name}</h4>
                                <p>My shopping list </p>
                                <button onClick={()=>{
                                    console.log("clicked infoWindow")
                                    const request= {
                                        name:selectedUser.name,
                                        address:selectedUser.address,
                                        shoppingList:selectedUser.shoppingList
                                    }
                                    dispatch({type:"add",request:request})
                                }}>Accept</button>
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
                        options={{ strokeColor: "#FFD300" }}

                        radius={50}
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
                containerElement={<div style={{ 'height': `400px` }} />}
                mapElement={<div style={{ 'height': `100%` }} />}
            />
        </div>
    )
}

export default GoogleMaps
