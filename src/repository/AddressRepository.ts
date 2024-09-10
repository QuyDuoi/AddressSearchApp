import axios from 'axios';
import { Address } from '../model/Address';

const API_KEY = 'Your Api Key';
const BASE_URL = 'https://autosuggest.search.hereapi.com/v1/autosuggest';

export const AddressRepository = {
  fetchAddresses: async (query: string, lat: number, lng: number): Promise<Address[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${query}&at=${lat},${lng}&in=countryCode:VNM&limit=8&apiKey=${API_KEY}`
      );
      return response.data.items.map((item: any) =>
        new Address(item.id, item.address.label, item.position.lat, item.position.lng)
      );
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
  }
};
