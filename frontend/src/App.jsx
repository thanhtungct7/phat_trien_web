import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./components/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;