import { useEffect, useState } from "react";

export default function TextDisplay({ dataUrl }: { dataUrl: string }) {
    const [data, setData] = useState("");

    useEffect(() => {
        async function getData() {
            const response = await fetch(dataUrl);
            const text = await response.text();
            setData(text);
        }
        getData();
    }, [dataUrl]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (<p>{data}</p>);
}
