import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { persister, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function FrameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Router>{children}</Router>
      </PersistGate>
    </Provider>
  );
}
