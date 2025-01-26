"use client";
import React, {useState, useEffect} from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

interface MapMarker {
  lat: number;
  lng: number;
  name: string;
}

const containerStyle = {
  width: "90%",
  height: "400px",
};

const defaultCenter = {
  lat: 40.4237,
  lng: -86.9212,
};

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [showResources, setShowResources] = useState(false);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(userLocation);
        },
        () => {
          setCurrentLocation(defaultCenter);
        }
      );
    } else {
      setCurrentLocation(defaultCenter);
    }
  };

  const toggleResources = () => {
    if (!showResources) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.nearbySearch(
        {
          location: currentLocation,
          radius: 15000,
          type: "hospital",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const newMarkers = results.map((place) => ({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              name: place.name || "Unknown",
            }));
            setMarkers(newMarkers);
            setShowResources(true);
          } else {
            console.error("Error fetching resources:", status);
          }
        }
      );
    } else {
      setMarkers([]);
      setShowResources(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="map-container">
      <h1>Nearby Resources</h1>
      <button onClick={toggleResources}>
        {showResources ? "Hide Resources" : "Show Resources"}
      </button>
      <LoadScript 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={12}
        >
          <Marker 
            position={currentLocation} 
            title="Your Location" 
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}/>
          
          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              position={marker} 
              title={marker.name} 
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
