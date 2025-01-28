import { useEffect, useState } from "react";
import { getUnsorted } from "../Networking";
import { useParams, useSearchParams } from "react-router";
import UnsortedListItem from "./UnsortedListItem";

export default function UnsortedListView() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [unsorted, setUnsorted] = useState<string[]>([]);

    useEffect(() => {
        async function requestUnsorted() {
            const hashes = await getUnsorted(params.archive!);
            setUnsorted(hashes);
        }
        requestUnsorted();
    }, [searchParams, params]);

    return (<>
        <h1>Unsorted Documents ({params.archive})</h1>
        {unsorted.map((hash, i) => (
            <UnsortedListItem key={i} archive={params.archive!} hash={hash} />
        ))}
    </>);
}
