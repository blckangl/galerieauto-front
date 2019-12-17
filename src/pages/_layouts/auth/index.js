import React from "react";
import PropTypes from "prop-types";
import { Wrapper, Header } from "./styles";
export default function AuthLayout({ children }) {
    return (
        <>
            <Header />
            <Wrapper>{children}</Wrapper>
        </>
    );
}
AuthLayout.propTypes = {
    children: PropTypes.element.isRequired
};
