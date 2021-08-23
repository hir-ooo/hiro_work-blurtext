export enum EMbadPropTypes {
    TEXT = "text",
    NUMBER = "number",
    HTML = "html",
    COLOR = "color",
    OPTION="option",
    GOOGLE_FONT="google_font"
}

export interface IHiroPropBase<T> {
    value: T,
    label: string,
    type: EMbadPropTypes
}

export interface IHiroProp_Text extends IHiroPropBase<string> {
    value: string;
    type: EMbadPropTypes.TEXT
}

export interface IHiroProp_Html extends IHiroPropBase<string> {
    value: string;
    type: EMbadPropTypes.HTML
}

export interface IHiroProp_Color extends IHiroPropBase<string> {
    value: string;
    rgbaValue?: { r: number, g: number, b: number, a: number };
    type: EMbadPropTypes.COLOR
}


export interface IHiroProp_Number extends IHiroPropBase<number> {
    value: number;
    range: {
        min: number|null,
        max: number|null
    };
    step: number|null;
    unit: string|null;
    type: EMbadPropTypes.NUMBER
}

export interface IHiroProp_Options<T> extends IHiroPropBase<string|number> {
    options: {
        label: string,
        value: T
    }[];
    multiple: boolean;
    value: number;
    type: EMbadPropTypes.OPTION
}

export interface IHiroProp_GoogleFont extends IHiroPropBase<string> {
    value: string;
    type: EMbadPropTypes.GOOGLE_FONT
}

export type TMbadProps = IHiroProp_Color
    | IHiroProp_Number
    | IHiroProp_Html
    | IHiroProp_Text
    | IHiroProp_Options<string|number>
    | IHiroProp_GoogleFont;

export interface IHiroProps {
    [key: string]: TMbadProps
}

export interface IPackage{
    name: string;
    developer: string;
    author: string;
    version: string;
}

export interface IHiroConfig extends IPackage{
    props: IHiroProps;
    devUrl: string;
}