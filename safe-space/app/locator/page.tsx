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

export default function locator() {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [searchType, setSearchType] = useState<string>("");
  const [markers, setMarkers] = useState<MapMarker[]>([]);

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
        // If location access is denied, use default location
        () => {
          setCurrentLocation(defaultCenter);
        }
      );
    } else {
      setCurrentLocation(defaultCenter);
    }
  };
  // Load user's location
  useEffect(() => {
    getUserLocation();
  }, []);

  // Function to search for nearby places
  const searchNearbyPlaces = (type: string) => {
    setSearchType(type);
    const mockMarkers: MapMarker[] = [
      { lat: currentLocation.lat + 0.01, lng: currentLocation.lng + 0.01, name: `${type} 1` },
      { lat: currentLocation.lat - 0.01, lng: currentLocation.lng - 0.01, name: `${type} 2` }
    ];
    
    setMarkers(mockMarkers);
  };

  const handleCustomSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      searchNearbyPlaces(target.value);
    }
  };

  return (
    <div className="map-container">
      <h1>SafeSpace Location Services</h1>
      
      <div className="search-buttons">
        <button onClick={() => searchNearbyPlaces("Hospitals")}>Hospitals</button>
        <button onClick={() => searchNearbyPlaces("Domestic Abuse Shelters")}>Domestic Abuse Shelters</button>
        <button onClick={() => searchNearbyPlaces("Abortion Clinics")}>Abortion Clinics</button>
        <button onClick={() => setSearchType("Other")}>Other</button>
      </div>

      {searchType === "Other" && (
        <input 
          type="text" 
          placeholder="Enter location type"
          onKeyPress={handleCustomSearch}
        />
      )}

      <LoadScript 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={12}
        >
          <Marker position={currentLocation} title="Your Location" />
          
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
