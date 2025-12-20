const API_BASE_URL = 'http://localhost:8080/api';

export interface Type {
  id: string;
  type: string;
}

export interface TypeDTO {
  type: string;
}

export interface EfficiencyRating {
  id: string;
  efficiencyRating: string;
}

export interface EfficiencyRatingDTO {
  efficiencyRating: string;
}

export interface PowerSupply {
  id: string;
  brand: string;
  model: string;
  power: number;
  numberOfPCI: number;
  numberOfSATA: number;
  numberOfM2: number;
  price: number;
  type: Type;
  efficiencyRating: EfficiencyRating;
}

export interface PowerSupplyDTO {
  brand: string;
  model: string;
  power: number;
  numberOfPCI: number;
  numberOfSATA: number;
  numberOfM2: number;
  price: number;
  typeId: string;
  efficiencyRatingId: string;
}

export const typesApi = {
  getAll: async (): Promise<Type[]> => {
    const response = await fetch(`${API_BASE_URL}/types`);
    return response.json();
  },

  getById: async (id: string): Promise<Type> => {
    const response = await fetch(`${API_BASE_URL}/types/${id}`);
    if (!response.ok) throw new Error('Failed to fetch type');
    return response.json();
  },

  create: async (dto: TypeDTO): Promise<Type> => {
    const response = await fetch(`${API_BASE_URL}/types/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to create type');
    return response.json();
  },

  update: async (id: string, dto: TypeDTO): Promise<Type> => {
    const response = await fetch(`${API_BASE_URL}/types/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to update type');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/types/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete type');
  },
};

export const efficiencyRatingsApi = {
  getAll: async (): Promise<EfficiencyRating[]> => {
    const response = await fetch(`${API_BASE_URL}/efficiency-ratings`);
    return response.json();
  },

  getById: async (id: string): Promise<EfficiencyRating> => {
    const response = await fetch(`${API_BASE_URL}/efficiency-ratings/${id}`);
    if (!response.ok) throw new Error('Failed to fetch efficiency rating');
    return response.json();
  },

  create: async (dto: EfficiencyRatingDTO): Promise<EfficiencyRating> => {
    const response = await fetch(`${API_BASE_URL}/efficiency-ratings/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to create efficiency rating');
    return response.json();
  },

  update: async (id: string, dto: EfficiencyRatingDTO): Promise<EfficiencyRating> => {
    const response = await fetch(`${API_BASE_URL}/efficiency-ratings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to update efficiency rating');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/efficiency-ratings/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete efficiency rating');
  },
};

export const powerSuppliesApi = {
  getAll: async (): Promise<PowerSupply[]> => {
    const response = await fetch(`${API_BASE_URL}/power-supply/get-all`);
    if (!response.ok) throw new Error('Failed to fetch power supplies');
    return response.json();
  },

  getById: async (id: string): Promise<PowerSupply> => {
    const response = await fetch(`${API_BASE_URL}/power-supply/get-power-supply/${id}`);
    if (!response.ok) throw new Error('Failed to fetch power supply');
    return response.json();
  },

  create: async (dto: PowerSupplyDTO): Promise<PowerSupply> => {
    const response = await fetch(`${API_BASE_URL}/power-supply/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to create power supply');
    return response.json();
  },

  update: async (id: string, dto: PowerSupplyDTO): Promise<PowerSupply> => {
    const response = await fetch(`${API_BASE_URL}/power-supply/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to update power supply');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/power-supply/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete power supply');
  },
};

