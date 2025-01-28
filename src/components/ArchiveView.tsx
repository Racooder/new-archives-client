import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Archive, getArchive, uploadDocuments } from "../Networking";

export default function ArchiveView() {
    const params = useParams();
    const [files, setFiles] = useState<FileList>();
    const [data, setData] = useState<Archive>();

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;
        setFiles(event.target.files);
    }

    async function handleUpload() {
        if (!files) return;
        setFiles(undefined);
        const hashes = await uploadDocuments(files, params.archive!, "racooder"); // TODO: Dynamic user
    }

    useEffect(() => {
        async function getData() {
            const archiveData = await getArchive(params.archive!);
            setData(archiveData);
        }
        getData();
    }, [params]);

    return (<>
        <h1>Archive ({params.archive!})</h1>
        {data && (
            <div>
                <p>Owner: {data.owner}</p>
                <p>Created at: {data.createdAt.toDateString()}</p>
                <p>Last updated: {data.updatedAt.toDateString()}</p>
            </div>
        )}
        <input type="file" onChange={onFileChange} multiple />
        {files && (
            <section>
                <h2>{files.length} Files</h2>
            </section>
        )}
        {files && (
            <button
                onClick={handleUpload}
                className="primary"
            >Upload Fine</button>
        )}
        <br/> {/* TODO: This Code is awfull */}
        <Link to="records">
            <button>Recordes</button>
        </Link>
        <Link to="unsorted">
            <button>Unsalted Documentes</button>
        </Link>
    </>);
}
