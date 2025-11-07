import "./App.css";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import TEST from "./pages/TEST";
import Poll from "./pages/Poll/Poll";
import Phorums from "./pages/Phorums/Phorums";
import NotFound from "./pages/404/NotFound";
// import IM from "./pages/IM/IM";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import TopicPage from "./pages/Topic/TopicPage";

function App() {
  const protectedRoutes = [
    { path: "/poll", component: <Poll /> },
    { path: "/phorum", component: <Phorums /> },
    { path: "/topic/:id", component: <TopicPage /> },

    // { path: "/im", component: <IM /> },
    // { path: "/notifications", component: <Notifications /> },
    // { path: "/support", component: <Support /> },
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/authentication" element={<Auth />} />
          <Route path="/tEST" element={<TEST />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<MainPage />}>
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
