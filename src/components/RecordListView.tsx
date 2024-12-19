import { useEffect, useState } from "react";
import { findRecords, Record } from "../Networking";
import { Link, useParams, useSearchParams } from "react-router";

export default function RecordList() {
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

    return (
        <>
            {records.map((record, i) => (
                <Link key={i} to={`/a/${params.archive}/r/${record._id}`}>
                    <span>
                        {record.name}
                    </span>
                </Link>
            ))}
        </>
    );
}
