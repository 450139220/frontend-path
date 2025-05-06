import UserStateProvider from "@/store/user-state";
import WebRoutes from "@/router";

function App() {
  return (
    <UserStateProvider>
      <WebRoutes />
    </UserStateProvider>
  );
}

export default App;
