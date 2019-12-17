import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn";

import Profile from "../pages/Profile";
import {Home} from "../pages/Home/index";
import Vendeur from "../pages/vendeur";
import Products from '../pages/acheteur/index'
import {Contact} from '../pages/contact'
import DashBoard from '../pages/dashboard';
import {ConditionGeneral} from "../pages/condition_general";
import {ConditionVente} from "../pages/condition_vente";
import Announce from "../pages/announce";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/acheteur" component={Products} exact />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/condition_generales" exact component={ConditionGeneral} />
            <Route path="/condition_vente" exact component={ConditionVente} />
            <Route path="/announce/:id" component={Announce} />


            <Route path="/vendeur" component={Vendeur}  />

            <Route path="/profile" component={Profile} isPrivate />
            <Route path="/dashBoard" component={DashBoard} isPrivate />

            {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
            <Route component={Home} />
        </Switch>
    );
}
