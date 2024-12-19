import { useState } from "react";
import { useParams } from "react-router";
import { uploadDocument } from "../Networking";

export default function ArchiveView() {
    const params = useParams();
    const [file, setFile] = useState<File | null>(null);

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) return;
        uploadDocument(file, params.archive!, "racooder"); // TODO: Dynamic user
    }

    return <>
        <h1>Archive ({params.archive!})</h1>
        <input type="file" onChange={onFileChange} />
        {file && (
            <section>
                <h2>File Info</h2>
                <p>Name: {file.name}</p>
                <p>Type: {file.type}</p>
                <p>Size: {file.size} bytes</p>
            </section>
        )}
        {file && (
            <button
                onClick={handleUpload}
                className="primary"
            >Upload File</button>
        )}
    </>;
}
