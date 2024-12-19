import { useEffect, useState } from "react";
import { getRecord } from "../Networking";
import DocumentDisplay from "./DocumentDisplay";
import { useParams } from "react-router";

export default function RecordView() {
    const params = useParams();
    const [documents, setDocuments] = useState<string[]>([]);

    useEffect(() => {
        async function getData() {
            const data = await getRecord(params.archive!, params.record!);
            setDocuments(data.documents);
        }
        getData();
    }, [params]);

    return (
        <>
            {documents.map((hash, i) => (
                <DocumentDisplay key={i} archive={params.archive!} hash={hash} />
            ))}
        </>
    );
}
