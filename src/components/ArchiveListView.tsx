import { useEffect, useState } from "react";
import { listArchives } from "../Networking";
import DynamicMenu from "./DynamicMenu";

export default function ArchiveListView() {
    const [archiveList, setArchiveList] = useState<string[]>([]);

    useEffect(() => {
        async function getArchives() {
            const archives = await listArchives();
            setArchiveList(archives);
        }
        getArchives();
    }, []);

    return (<>
        <h1>Archives</h1>
        <DynamicMenu elements={archiveList.map(name => {
            return {
                href: `a/${name}`,
                heading: name,
            };
        })} firstElement={{
            heading: "+",
        }}/>
    </>);
}
