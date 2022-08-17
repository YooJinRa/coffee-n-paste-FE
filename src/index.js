import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// :: 전역 저장공간 적용
import store from "./redux/configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// :: 전역 스타일 적용
import GlobalStyle from "./components/global/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
