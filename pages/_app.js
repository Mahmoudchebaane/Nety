import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { Provider } from 'react-redux';
import store from './store/index';

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </>
  );
}
export default appWithTranslation(App);
