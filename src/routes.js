import { Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import LoginRegisterPage from "./pages/login-register/login-register.components";
import { selectCurrentUser } from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/checkout.component";
import { isAuthenticated } from "./utils/auth";
import { Spinner } from "@chakra-ui/react";
import ProfilePage from "./pages/profile/profile.component";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      const auth = await isAuthenticated();
      setIsAuth(auth);
      setLoading(false);
    };
    asyncFunc();
  });

  if (loading) {
    return <Spinner />;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
              }}
            />
          );
        }
      }}
    />
  );
};

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route path="/collections/:collectionId" component={ShopPage} />
          <PrivateRoute path="/profile" exact component={ProfilePage} />
          <Route exact path="/sign-in" component={LoginRegisterPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currUser: selectCurrentUser(state),
});
export default connect(mapStateToProps)(Routes);
