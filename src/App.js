// ::: 기본 Style 적용 확인용
// import StyleTest from "./StyleTest";
import MainPage from "./pages/MainPage";
import { Provider } from "react-redux";
import store from "./redux/configStore";

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
