import React, { useState } from "react";
import Context from "./Context";

const State = (props) => {
  const [Articles, setArticles] = useState(null);
  const [PageNumber, setPageNumber] = useState(1);
  const [PageSize, setPageSize] = useState(8);
  const [Country, setCountry] = useState("us");
  const [Loading, setLoading] = useState(false);
  const [Category, setCategory] = useState("general");

  const fetchData = async (isCategoryChanged) => {
    // setCategory("health");
    setLoading(true);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${Country}&apiKey=e26986475b8742d580fbf92ace49d01d&pagesize=${PageSize}&page=${PageNumber}&category=${Category}`
    );
    const json = await response.json();

    setLoading(false);

    console.log({ ...json });

    // if the 'Category' is changed from [App.js], then "NEVER", Concatinate the "Previous-Data", instead Over-Write The Whole-Dom With "Other-Category-Data"
    if (Articles && !isCategoryChanged) {

      // If Articles Already Got Data, then Concatinate [New-Fetched-Data] With [Previous-Data], But If there's no Articles, means it's the first time to fetch new-Data, and there's no need to concatination at all..!
      json.articles = [...Articles.articles, ...json.articles];
    }

    // setting the [fetched-json], if it's the first time then, aisy heee asign Krdo.. warna concatinate karo... "previous-articles ko issy"
    setArticles(json);
  };

  return (
    // Exporting the states
    <Context.Provider
      value={{
        fetchData,
        Articles,

        PageNumber,
        setPageNumber,

        PageSize,
        setPageSize,
        Loading,

        Category,
        setCategory,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
