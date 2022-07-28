import React from "react";
import { watchesApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_WATCHES") {
    return {
      ...state,
      watches: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    watches: [],
  });
  const [searchWord, setSearchWord] = React.useState("");
  const [filterByPrice, setFilterByPrice] = React.useState([0, 999999]);

  const limit = 2;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  // ! Округление
  // Math.round(10 / 4);

  // let products = ["a", "a", "a", "a", "a", "a", "a"];
  // let countOnPage = 2;
  // let count = Math.ceil(products.length / countOnPage);

  // ! Math.ceil(1.2) округляет до ближайшего большего целого числа
  // ! Math.floor(1.9) округляет до ближайшего меньшешего целого числа
  // ! Math.round(1.2) 1, 1.5 => 2 округляет по математической формуле

  const getWatches = () => {
    fetch(
      `${watchesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_WATCHES",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! HOW TO ADD BASKET FUNCTION:

  const addWatchToBasket = (watch) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let watchToBasket = {
      ...watch,
      count: 1,
      subPrice: watch.price,
    };
    basket.products.push(watchToBasket);
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    console.log(basket);
  };

  const data = {
    watches: state.watches,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    getWatches,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addWatchToBasket,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
