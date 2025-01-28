import { useEffect, useState } from "react";
import { getRecord, Record } from "../Networking";
import DocumentDisplay from "./DocumentDisplay";
import { useParams } from "react-router"

export default function RecordView() {
    const params = useParams();
    const [data, setData] = useState<Record | undefined>(undefined);

    useEffect(() => {
        async function getData() {
            const data = await getRecord(params.archive!, params.record!);
            setData(data);
        }
        getData();
    }, [params]);

    return (<div>
        {data && (
            <div>
                <h1>{data.name}</h1>
                <p>Creator: {data.creator}</p>
                <p>Created at: {data.createdAt.toDateString()}</p>
                <p>Last updated: {data.updatedAt.toDateString()}</p>
            </div>
        )}
        <hr/>
        {data && data.documents.map((hash, i) => (
            <DocumentDisplay key={i} archive={params.archive!} hash={hash} />
        ))}
    </div>);
}
