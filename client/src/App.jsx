import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ChatLayout from "./pages/chat/ChatLayout";
import Chat from "./pages/chat/Chat";
import NewChat from "./pages/chat/NewChat";
import { ToastProvider } from "./context/ToastContext.jsx";
import { useToast } from "./hooks/useToast";
import Toast from "./components/Toast.jsx";

const queryClient = new QueryClient();

function ToastContainer() {
  const { toast, setToast } = useToast();
  
  if (!toast) return null;
  
  return (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => setToast(null)}
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatLayout />}>
            <Route index element={<NewChat />} />
            <Route path=":id" element={<Chat />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
