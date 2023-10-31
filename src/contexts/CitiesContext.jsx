import { useEffect } from 'react';
import { useCallback } from 'react';
import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

const CitiesProvider = ({ children }) => {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  function reducer(state, action) {
    switch (action.type) {
      case 'loading':
        return { ...state, isLoading: true };
      case 'cities/loaded':
        return { ...state, isLoading: false, cities: action.payload };
      case 'city/loaded':
        return { ...state, isLoading: false, currentCity: action.payload };
      case 'city/created':
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };
      case 'city/deleted':
        return {
          ...state,
          isLoading: false,
          cities: [
            ...state.cities.filter((city) => city.id !== action.payload),
          ],
          currentCity: {},
        };
      case 'rejected':
        return { ...state, isLoading: false, error: action.payload };

      default:
        throw new Error('Unknown action type');
    }
  }

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: 'There was err!' });
      }
    };
    fetchCities();
  }, []);

  const getCity = useCallback(
    () =>
      async function getCity(id) {
        if (+id === currentCity.id) return;
        dispatch({ type: 'loading' });
        try {
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          const data = await res.json();
          dispatch({ type: 'city/loaded', payload: data });
        } catch (err) {
          dispatch({ type: 'rejected', payload: 'There was err!' });
        }
      },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: 'There was err!' });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({ type: 'rejected', payload: 'There was err!' });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('Not defined context!');
  return context;
}

export { CitiesProvider, useCities };
