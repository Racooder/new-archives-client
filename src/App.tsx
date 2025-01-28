import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RecordListView from "./components/RecordListView";
import RecordView from "./components/RecordView";
import ArchiveView from "./components/ArchiveView";
import ArchiveListView from "./components/ArchiveListView";
import UnsortedListView from "./components/UnsortedListView";
import ErrorView from "./components/ErrorView";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<ErrorView status={404}/>} />
                <Route path="/">
                    <Route index element={<ArchiveListView />} />
                    <Route path="error/:status" element={<ErrorView status={undefined}/>} />
                    <Route path="a/:archive">
                        <Route index element={<ArchiveView />} />
                        <Route path="records" element={<RecordListView />} />
                        <Route path="r/:record" element={<RecordView />} />
                        <Route path="unsorted" element={<UnsortedListView />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
