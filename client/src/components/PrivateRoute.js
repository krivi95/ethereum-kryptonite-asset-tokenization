import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


/**
 * Wrapper arount React Route that checks wheather the user is logged in or not.
 * In case he's logged in (user details saved in React Context) component and props are passed to the regular Route.
 * And in other case, user is redirected to the login screen. 
 */
export default function PrivateRoute({ component: RouteComponent, ...rest }) {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route {...rest} render={routeProps => !!currentUser ? (<RouteComponent {...routeProps} />) : (<Redirect to={"/login"} />)}
        />
    );
};

