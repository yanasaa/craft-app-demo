import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import App from "./App";
import Router from "./routes/Router";
import "./sass/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const basename = process.env.NODE_ENV === "production" ? "/craft-app-demo" : "";

root.render(
  <BrowserRouter  basename={basename}>
    <Provider store={store}>
      <App>
        <Router />
      </App>
    </Provider>
  </BrowserRouter>
);
