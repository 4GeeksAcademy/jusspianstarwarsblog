import React, { useState, useEffect, createContext } from "react";

export const Context = createContext(null);

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
      planets: [],
      vehicles: [],
      favorites: []
    },
    actions: {
      loadData: () => {
        getActions().loadCategory("people", "characters");
        getActions().loadCategory("planets", "planets");
        getActions().loadCategory("vehicles", "vehicles");
      },
      loadCategory: (endpoint, stateKey) => {
        fetch(`https://www.swapi.tech/api/${endpoint}`)
          .then(res => res.json())
          .then(data => {
            const store = getStore();
            setStore({ ...store, [stateKey]: data.results });
          })
          .catch(err => console.error(err));
      },
      addFavorite: (item) => {
        const store = getStore();
        if (!store.favorites.includes(item)) {
          setStore({ ...store, favorites: [...store.favorites, item] });
        }
      },
      removeFavorite: (item) => {
        const store = getStore();
        setStore({ ...store, favorites: store.favorites.filter(fav => fav !== item) });
      }
    }
  };
};

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [store, setStore] = useState({
      characters: [],
      planets: [],
      vehicles: [],
      favorites: []
    });

    const actions = {
      loadData: () => {
        actions.loadCategory("people", "characters");
        actions.loadCategory("planets", "planets");
        actions.loadCategory("vehicles", "vehicles");
      },
      loadCategory: (endpoint, stateKey) => {
        fetch(`https://www.swapi.tech/api/${endpoint}`)
          .then(res => res.json())
          .then(data => {
            setStore(prevStore => ({
              ...prevStore,
              [stateKey]: data.results
            }));
          })
          .catch(err => console.error(err));
      },
      addFavorite: (item) => {
        setStore(prevStore => ({
          ...prevStore,
          favorites: prevStore.favorites.includes(item)
            ? prevStore.favorites
            : [...prevStore.favorites, item]
        }));
      },
      removeFavorite: (item) => {
        setStore(prevStore => ({
          ...prevStore,
          favorites: prevStore.favorites.filter(fav => fav !== item)
        }));
      }
    };

    useEffect(() => {
      actions.loadData();
    }, []);

    return (
      <Context.Provider value={{ store, actions }}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };

  return StoreWrapper;
};

export { injectContext };
