import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/signin";
import SignUp from "./pages/SignUp/signup";
import Dashboard from "./pages/Dashboard/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const theme = createTheme();
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />     
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          
          <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
