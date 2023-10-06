import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";

import AllDrinksPage from "./components/Drinks/";
import DrinkDetailsPage from "./components/Drinks/DrinkDetail";
import AddDrinkPage from "./components/Drinks/AddDrink";
import EditDrinkPage from "./components/Drinks/EditDrink";

import AllToppingsPage from "./components/Toppings";
import AddToppingPage from "./components/Toppings/AddTopping";
import EditToppingPage from "./components/Toppings/EditTopping";
import ToppingDetailsPage from "./components/Toppings/ToppingDetail";

import ReviewDetailsPage from "./components/Reviews/ReviewDetail";
import CreateReviewPage from "./components/Reviews/CreateReview";
import EditReviewPage from "./components/Reviews/EditReview";

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
          <Route exact path="/">
            <LandingPage />
          </Route>
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
            <AllDrinksPage />
          </Route>
          <Route path="/toppings/new">
            <AddToppingPage />
          </Route>
          <Route path="/toppings/:id/edit">
            <EditToppingPage />
          </Route>
          <Route path="/toppings/:id">
            <ToppingDetailsPage />
          </Route>
          <Route path="/toppings">
            <AllToppingsPage />
          </Route>
          <Route path="/reviews/create/:orderId">
            <CreateReviewPage />
          </Route>
          <Route path="/reviews/edit/:orderId/:reviewId">
            <EditReviewPage />
          </Route>
          <Route path="/reviews/:orderId/:reviewId">
            <ReviewDetailsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
