import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ModalProvider from "./providers/ModalProvider";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";
import ChatListProvider from "./providers/ChatListProvider";
import SocketProvider from "./providers/SocketProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <SocketProvider>
          <ChatListProvider>
            <ModalProvider>
              <RouterProvider router={router} />
            </ModalProvider>
          </ChatListProvider>
        </SocketProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
