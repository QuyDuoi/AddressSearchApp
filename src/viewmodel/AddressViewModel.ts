import { useState, useEffect } from 'react';
import { AddressRepository } from '../repository/AddressRepository';
import { Address } from '../model/Address';
import debounce from 'debounce';
import Geolocation from '@react-native-community/geolocation';
import { Alert, PermissionsAndroid } from 'react-native';

export const useAddressViewModel = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);

  // Request location permission
  const requestPermission = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide accurate search results.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Get the current location of the user
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        console.log(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        Alert.alert('Error: ', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    const initLocation = async () => {
      const hasPermission = await requestPermission();
      if (hasPermission) {
        getCurrentLocation();
      } else {
        Alert.alert("Location permission denied", "Cannot fetch nearby locations without location access.");
      }
    };

    initLocation();
  }, []);

  // Fetch addresses based on the query
  const fetchAddresses = debounce(async (searchQuery: string) => {
    if (searchQuery.length > 2 && userLocation) {
      setIsLoading(true);
      const addresses = await AddressRepository.fetchAddresses(searchQuery, userLocation.lat, userLocation.lng);
      setResults(addresses);
      setIsLoading(false);
    } else {
      setResults([]);
    }
  }, 1000); // 1-second debounce

  useEffect(() => {
    if (userLocation) {
      fetchAddresses(query);
    }
  }, [query, userLocation]);

  // Clear the query and results
  const clearQuery = () => {
    setQuery('');
    setResults([]);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    clearQuery,
    userLocation,
  };
};
