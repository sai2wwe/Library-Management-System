import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Query from "./components/Query.jsx";
import BookDetail from "./components/Book.jsx";


import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Answer from "./pages/Answer.jsx";
import AllBooks from "./pages/AllBooks.jsx";

import SignUp from "./Auth/Signup.jsx";
import Login from "./Auth/Login.jsx";

import AdminLogin from "./admin/adminlogin.jsx";
import AdminHome from "./admin/adminhome.jsx";

import "./App.css";

import { useAuthContext } from "./hooks/useAuthContext.jsx";

function App() {
  const { state } = useAuthContext();

  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={state.isAuth ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={state.isAuth ? <About /> : <Navigate to="/login"/>} />
          <Route path="/books" element={state.isAuth ? <AllBooks /> : <Navigate to="/login"/>} />
          <Route path="/books/:id" element={state.isAuth ? <BookDetail /> : <Navigate to="/login"/>} />
          <Route path="/books/:id/query" element={state.isAuth ? <Query /> : <Navigate to="/login"/>}>
          </Route>
          <Route path="/books/:id/query/:qid" element={state.isAuth ? <Answer /> : <Navigate to="/login"/>} />
          <Route
            path="/signup"
            element={!state.isAuth ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!state.isAuth ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/adminlogin" element={!state.isAuth ? (
            <AdminLogin/>
          ): (
            <Navigate to="/adminhome" />
          )
          } />
          <Route
            path="/adminhome"
            element={
              (state.isAuth && state.role === 'admin') ? (
                <AdminHome />
              ) : (
                <Navigate to="/adminlogin" />
              )
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
