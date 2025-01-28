import { Link } from "react-router";
import { MenuElementData } from "./DynamicMenu";

export default function DynamicMenuElement({ data }: { data: MenuElementData }) {
    data.href = data.href || "";
    return (<Link to={data.href}>
        <div className="dynamic-menu-element">
            {data.heading && <h2>{data.heading}</h2>}
            {data.content && data.content}
        </div>
    </Link>);
}
