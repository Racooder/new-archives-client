import { useEffect, useState } from "react";
import { findRecords, Record } from "../Networking";
import { useParams, useSearchParams } from "react-router";
import LinkButton from "./LinkButton";

export default function RecordListView() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        async function getData() {
            const query: any = {};
            if (searchParams.get("name"))
                query.name = searchParams.get("name");
            if (searchParams.get("includeTags"))
                query.includeTags = searchParams.get("includeTags")!.split(",");
            if (searchParams.get("excludeTags"))
                query.excludeTags = searchParams.get("excludeTags")!.split(",");
            if (searchParams.get("filterTags"))
                query.filterTags = searchParams.get("filterTags")!.split(",");

            const data = await findRecords(params.archive!, query);
            setRecords(data);
        }
        getData();
    }, [searchParams, params]);

    return (<>
        <h1>Records ({params.archive})</h1>
        {records.map((record, i) => (
            <LinkButton to={`/a/${record.archive}/r/${record._id}`} content={record.name} key={i} />
        ))}
    </>);
}
