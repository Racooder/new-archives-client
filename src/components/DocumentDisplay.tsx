import { useEffect, useState } from "react";
import { documentObjectUrl, getDocumentMeta } from "../Networking";
import TextDisplay from "./TextDisplay";

type DocViewData = {
    objectUrl: string;
    fileType: string;
}

function documentDisplay(fileType: string, objectUrl: string) {
    if (fileType.startsWith("image/")) {
        return <img src={objectUrl} alt="Document" />;
    } else if (fileType.startsWith("text/")) {
        return <TextDisplay dataUrl={objectUrl} />;
    } else {
        return <a href={objectUrl} target="_blank" rel="noreferrer">Download</a>;
    }
}

export default function DocumentDisplay({archive, hash}: { archive: string, hash: string }) {
    const [data, setData] = useState<DocViewData>();

    useEffect(() => {
        async function getData() {
            const meta = await getDocumentMeta(archive, hash);
            setData({
                objectUrl: documentObjectUrl(archive, hash),
                fileType: meta.fileType,
            });
        }
        getData();
    }, [archive, hash]);

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {documentDisplay(data.fileType, data.objectUrl)}
        </>
    );
}
