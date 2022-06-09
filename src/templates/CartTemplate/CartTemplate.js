/** @format */

import { PageHeader } from "antd";
import React from "react";
import { Route } from "react-router-dom";
import { history } from "../../App";

import Cart from "./Layout/Cart";


export default function CartTemplate(props) {
  return (
    <Route
      exact
      path={props.path}
      render={(propsRouter) => {
        return (
          <>
            <PageHeader
              className="site-page-header border-bottom border-dark page_header"
              onBack={() => history.goBack()}
              title="Xác Nhận Đặt Phòng"
              
            />
            <Cart item={<props.component />} />
            {/* <props.component {...propsRouter} /> */}
          </>
        );
      }}
    />
  );
}
