import React from 'react';
import { View } from 'react-native';
import RepositoryList from './RepositoryList';
import { Route, Switch, Redirect } from 'react-router-native';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepositoryItem from './SingleRepositoryItem';
import Review from './Review';
import MyReviews from './MyReviews';

const Main = () => {
  return (
    <View>
      <AppBar />
      <Switch>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/review">
          <Review />
        </Route>
        <Route path="/reviews">
          <MyReviews />
        </Route>
        <Route path="/repo/:id">
          <SingleRepositoryItem />
        </Route>
        <Route path="/">
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
