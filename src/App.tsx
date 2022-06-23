import { Routes, Route, HashRouter } from "react-router-dom";
import React from "react";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Detailed from "./pages/Detailed/Detailed";
import TrailerProvider from "./context/detail-context";
import Footer from "@components/Footer/Footer";

/* This allows me to modify a module */
declare module "react-progressive-graceful-image" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProgressiveImageProps {
    children: (src: string, loading: boolean) => JSX.Element;
  }
}

const App = (): JSX.Element => {
  return (
    <TrailerProvider>
      <HashRouter>
        <Routes>
          {/* This Nav component is a parent to all pages */}
          <Route element={<Nav />}>
            {/* As well as this Footer component */}
            <Route element={<Footer />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/detailed" element={<Detailed />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </TrailerProvider>
  );
};

export default App;
