import React from 'react';
import PropTypes from 'prop-types';
import {Wrapper} from './styles';
import {TopNav, StickyNav} from "../../../components";
import {StickyContainer} from "react-sticky";
import {useCookies} from "react-cookie";
import Footer from "../../../components/footer";

export default function DefaultLayout({children, path}) {
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token']);
    let hasPermission = 0;
    if (tokenCookie.role) {
        hasPermission = tokenCookie.role;
    }
    return <Wrapper>
        <TopNav role={hasPermission} token={tokenCookie}></TopNav>


        <StickyNav path={path}></StickyNav>
        <section className={"content"}> {children}</section>
        <Footer/>
    </Wrapper>;
}
DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
