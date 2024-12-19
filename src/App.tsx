import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RecordList from "./components/RecordListView";
import RecordView from "./components/RecordView";
import ArchiveView from "./components/ArchiveView";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<h1>Home</h1>} />
                    <Route path="a/:archive">
                        <Route index element={<ArchiveView />} />
                        <Route path="records" element={<RecordList />} />
                        <Route path="r/:record" element={<RecordView />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
