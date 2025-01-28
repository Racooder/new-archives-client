import { Link } from "react-router";
import DocumentDisplay from "./DocumentDisplay";

export default function UnsortedListItem({ archive, hash }: { archive: string, hash: string }) {
    return (<>
        <div>
            
        </div>
        <DocumentDisplay archive={archive} hash={hash} />
    </>)
}
