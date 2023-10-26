import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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

import CreateOrderModal from "./components/Orders/CreateOrder";

import MyOrdersPage from "./components/Orders";

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
          <ProtectedRoute path="/orders">
            <CreateOrderModal />
            <MyOrdersPage />
          </ProtectedRoute>
          <ProtectedRoute path="/drinks/new">
            <AddDrinkPage />
          </ProtectedRoute>
          <ProtectedRoute path="/drinks/:id/edit">
            <EditDrinkPage />
          </ProtectedRoute>
          <Route path="/drinks/:id">
            <DrinkDetailsPage />
          </Route>
          <Route path="/drinks">
            <AllDrinksPage />
          </Route>
          <ProtectedRoute path="/toppings/new">
            <AddToppingPage />
          </ProtectedRoute>
          <ProtectedRoute path="/toppings/:id/edit">
            <EditToppingPage />
          </ProtectedRoute>
          <Route path="/toppings/:id">
            <ToppingDetailsPage />
          </Route>
          <Route path="/toppings">
            <AllToppingsPage />
          </Route>
          <ProtectedRoute path="/reviews/create/:orderId">
            <CreateReviewPage />
          </ProtectedRoute>
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
