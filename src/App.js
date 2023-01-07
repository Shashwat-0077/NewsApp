import { React } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Tiles from "./components/Tiles";
import Navbar from "./components/Navbar";

export default function App() {
    let apiKey = process.env.REACT_APP_BACKUP_API_KEY;

    return (
        <>
            <Router>
                <Navbar></Navbar>

                <Routes>
                    <Route
                        exact
                        path="/business"
                        element={
                            <Tiles
                                key="Business"
                                apiKey={apiKey}
                                category={"Business"}
                                country={"in"}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/entertainment"
                        element={
                            <Tiles
                                key="Entertainment"
                                apiKey={apiKey}
                                category={"Entertainment"}
                                country={"in"}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/general"
                        element={
                            <Tiles
                                key="General"
                                apiKey={apiKey}
                                category={"General"}
                                country={"in"}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/health"
                        element={
                            <Tiles
                                key="Health"
                                apiKey={apiKey}
                                category={"Health"}
                                country={"in"}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/science"
                        element={
                            <Tiles
                                key="Science"
                                apiKey={apiKey}
                                category={"Science"}
                                country={"in"}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/sports"
                        element={
                            <Tiles
                                key="Sports"
                                apiKey={apiKey}
                                category={"Sports"}
                                country={"in"}
                            />
                        }
                    />

                    <Route
                        exact
                        path="/technology"
                        element={
                            <Tiles
                                key="Technology"
                                apiKey={apiKey}
                                category={"Technology"}
                                country={"in"}
                            />
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}
