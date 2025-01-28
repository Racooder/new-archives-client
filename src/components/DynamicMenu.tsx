import DynamicMenuElement from "./DynamicMenuElement";

export type MenuElementData = {
    href?: string;
    heading?: string;
    content?: JSX.Element;
}

export default function DynamicMenu({ elements, firstElement }: { elements: MenuElementData[], firstElement?: MenuElementData }) {
    return (<div className="dynamic-menu-holder">
        {firstElement && <DynamicMenuElement data={firstElement} />}
        {elements.map((element, i) => (<DynamicMenuElement data={element} />))}
    </div>);
}
