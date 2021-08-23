export enum EMbadPropTypes {
    TEXT = "text",
    NUMBER = "number",
    HTML = "html",
    COLOR = "color",
    OPTION="option"
}

export interface IMbadPropBase<T> {
    value: T,
    label: string,
    type: EMbadPropTypes
}

export interface IMbadProp_Text extends IMbadPropBase<string> {
    value: string;
    type: EMbadPropTypes.TEXT
}

export interface IMbadProp_Html extends IMbadPropBase<string> {
    value: string;
    type: EMbadPropTypes.HTML
}

export interface IMbadProp_Color extends IMbadPropBase<string> {
    value: string;
    rgbaValue?: { r: number, g: number, b: number, a: number };
    type: EMbadPropTypes.COLOR
}

export interface IMbadProp_Number extends IMbadPropBase<number> {
    value: number;
    range: {
        min: number|null,
        max: number|null
    };
    step: number|null;
    type: EMbadPropTypes.NUMBER
}

export interface IMbadProp_Options<T> extends IMbadPropBase<string|number> {
    options: {
        label: string,
        value: T
    }[];
    multiple: boolean;
    value: number;
    type: EMbadPropTypes.OPTION
}

export type TMbadProps = IMbadProp_Color
| IMbadProp_Number
| IMbadProp_Html
| IMbadProp_Text
| IMbadProp_Options<string|number>;

export interface IMbadProps {
    [key: string]: TMbadProps
}

export interface IPackage{
    name: string;
    developer: string;
    author: string;
    version: string;
}

export interface IMbadConfig extends IPackage{
    props: IMbadProps;
    devUrl: string;
}
