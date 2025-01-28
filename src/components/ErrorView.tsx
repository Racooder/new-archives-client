import { useParams } from "react-router";

export default function ErrorView({ status }: { status: number | undefined }) {
    const params = useParams();
    if (status === undefined) {
        if (params.status?.match(/\d+/)) {
            status = parseInt(params.status);
        } else {
            status = 404;
        }
    }

    return (<div id="error-container">
        <img id="error-image" src={`https://http.cat/${status}`} alt={`Error ${status}`} />
    </div>);
}
