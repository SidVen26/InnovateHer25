"use client"

import React, { useState, useEffect } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Loader2 } from "lucide-react"
import { CircularNav } from "@/components/CircularNav"

interface MapMarker {
  lat: number
  lng: number
  name: string
}

const containerStyle = {
  width: "100%",
  height: "500px",
}

const defaultCenter = {
  lat: 40.4237,
  lng: -86.9212,
}

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter)
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [showResources, setShowResources] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setCurrentLocation(userLocation)
        },
        () => {
          setCurrentLocation(defaultCenter)
        },
      )
    } else {
      setCurrentLocation(defaultCenter)
    }
  }

  const toggleResources = () => {
    setIsLoading(true)
    if (!showResources) {
      const service = new google.maps.places.PlacesService(document.createElement("div"))
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
            }))
            setMarkers(newMarkers)
            setShowResources(true)
          } else {
            console.error("Error fetching resources:", status)
          }
          setIsLoading(false)
        },
      )
    } else {
      setMarkers([])
      setShowResources(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserLocation()
  }, [currentLocation]) // Added currentLocation to dependencies

  return (
    <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-center mb-8 text-black">SafeSpace Location Services</h1>
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        {/* <CardTitle className="text-2xl font-bold">Nearby Resources</CardTitle> */}
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={toggleResources} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : showResources ? (
              "Hide Resources"
            ) : (
              "Show Resources"
            )}
          </Button>
        </div>
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} libraries={["places"]}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={currentLocation}
              zoom={12}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
              }}
            >
              <Marker
                position={currentLocation}
                title="Your Location"
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />

              {markers.map((marker, index) => (
                <Marker key={index} position={marker} title={marker.name} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Blue marker: Your location</p>
          <p>Red markers: Nearby resources</p>
        </div>
      </CardContent>
      <CircularNav currentPage="/locator" />
    </Card>
    </div>
  )
}

