import { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import SingleCoursePage from "./pages/single-course-page/SingleCoursePage";
import PageNotFound from "./components/page-not-found/PageNotFound";
import PersonalizeFieldPage from "./pages/personalize-field-page/PersonalizeFieldPage";
import SignupPage from "./pages/auth-page/signup-page/SignupPage";
import { fetchSeveralCourses } from "./service/api.service";
import LoginPage from "./pages/auth-page/login-page/LoginPage";
import EditProfilePage from "./pages/edit-profile-page/EditProfilePage";

export const Data = createContext();
export const FetchState = createContext();
export const SearchTermContext = createContext();
export const SetSearchTermContext = createContext();

function App() {
  const [coursesData, setCoursesData] = useState({});
  const [fetched, setAsFetched] = useState(false);

  useEffect(() => {
    // const getData = () => {
    //   fetch("https://api.npoint.io/97d7e0d71e507947a59f")
    //     .then((response) => response.json())
    //     .then((jsonFile) => {
    //       setCoursesData(jsonFile["data"]);
    //       setAsFetched(true);
    //     });
    // };
    // getData();

    loadData()
  }, []);

  const loadData = async () => {
    const res = await fetchSeveralCourses()
    setCoursesData(res.data);
    setAsFetched(true);

    console.log(res.data)
  }

  return (
    <Data.Provider value={coursesData}>
      <FetchState.Provider value={fetched}>
        <Router>
          {" "}
          <Routes>
            {" "}
            <Route path="/" element={<HomePage />} />{" "}
            <Route
              path="/courses/:courseId"
              element={<SingleCoursePage />}
            ></Route>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route path="field" element={<PersonalizeFieldPage />}></Route>
            <Route path="edit-profile" element={<EditProfilePage />}></Route>
            <Route path="signup" element={<SignupPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
          </Routes>{" "}
        </Router>
      </FetchState.Provider>
    </Data.Provider>
  );
}

export default App;
