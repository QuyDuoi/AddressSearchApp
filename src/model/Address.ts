export class Address {
    id: string;
    label: string;
    latitude: number;
    longitude: number;
  
    constructor(id: string, label: string, latitude: number, longitude: number) {
      this.id = id;
      this.label = label;
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }
  