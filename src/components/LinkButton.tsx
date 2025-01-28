import { ReactNode } from "react";
import { Link } from "react-router";

export default function LinkButton({ to, content }: { to: string, content: ReactNode }) {
    return (<>
        <Link to={to}>
            <button>{content}</button>
        </Link>
    </>);
}
