import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MealPlanPage from './pages/MealPlanPage';
import MyRecipesPage from './pages/MyRecipesPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import GroceryListPage from './pages/GroceryListPage';
import TutorialsPage from './pages/TutorialsPage';

const Routes = () => {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/meal-plan" component={MealPlanPage} />
      <Route path="/my-recipes" component={MyRecipesPage} />
      <Route path="/profile-settings" component={ProfileSettingsPage} />
      <Route path="/grocery-list" component={GroceryListPage} />
      <Route path="/tutorials" component={TutorialsPage} />
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
};

export default Routes;
