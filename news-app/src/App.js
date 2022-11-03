import "./App.css";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import DrawerAppBar from "./Components/DrawerAppBar";
import Loader from "./Components/Loader";
import Nav from "./Components/Nav";
import News from "./Components/News";
import NewsItem from "./Components/NewsItem";
import State from "./Context/State";

// https://newsapi.org/v2/top-headlines?country=us&apiKey=4e57ac1b6993479b9ca5d590ecdb1c37

function App() {
  return (
    <>
      <State>
        <BrowserRouter>
          {/* <Nav Title="News App" /> */}
          <DrawerAppBar /> {/*Nav-Bar*/}
          <Routes>
            <Route
              exact
              path="/"
              element={<News key="general" category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<News key="business" category="business" />}
            />
            <Route
              exact
              path="/health"
              element={<News key="health" category="health" />}
            />
            <Route
              exact
              path="/education"
              element={<News key="education" category="education" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News key="entertainment" category="entertainment" />}
            />
            <Route
              exact
              path="/science"
              element={<News key="science" category="science" />}
            />
            <Route
              exact
              path="/technology"
              element={<News key="technology" category="technology" />}
            />
          </Routes>
        </BrowserRouter>
      </State>
    </>
  );
}

export default App;
