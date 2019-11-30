import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect, Link} from "react-router-dom";

import DefaultLayout from "../pages/_layouts/default";
import AuthLayout from "../pages/_layouts/auth";
import {useCookies} from "react-cookie";

export default function RouteWrapper({
                                         component: Component,
                                         isPrivate,
                                         ...rest
                                     }) {

    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);

    const signed = false;
    let hasPermission = false;
    if (tokenCookie.role) {
        hasPermission = tokenCookie.role;
    }

    /**
     * Redirect user to SignIn page if he tries to access a private route
     * without authentication.
     */
    if (isPrivate ) {
        if(!hasPermission){
            return <Redirect to="/"/>;
        }
    }

    /**
     * Redirect user to Main page if he tries to access a non private route
     * (SignIn or SignUp) after being authenticated.
     */
    if (!isPrivate && signed) {
        return <Redirect to="/dashboard"/>;
    }

    // const Layout = signed ? AuthLayout : DefaultLayout;
    const Layout = DefaultLayout;

    /**
     * If not included on both previous cases, redirect user to the desired route.
     */
    return (

        <Route

            {...rest}
            render={props => (
                <Layout role={hasPermission} path={props.location.pathname}>

                    <Component {...props} />
                </Layout>
            )}
        />
    );
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false
};
