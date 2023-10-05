import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllDrinks from "./components/Drinks";
import DrinkDetailsPage from "./components/Drinks/DrinkDetail";
import AddDrinkPage from "./components/Drinks/AddDrink";
import EditDrinkPage from "./components/Drinks/EditDrink";

// import Cart from './components/Cart';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/drinks/new">
            <AddDrinkPage />
          </Route>
          <Route path="/drinks/:id/edit">
            <EditDrinkPage />
          </Route>
          <Route path="/drinks/:id">
            <DrinkDetailsPage />
          </Route>
          <Route path="/drinks">
            <AllDrinks />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
