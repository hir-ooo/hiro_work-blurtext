import { calcCenterPoint, calcDistance, mapRange, Point } from "./utils";
const WebFont = require('webfontloader');

import {
    IHiroProp_Color, IHiroProp_GoogleFont,
    IHiroProp_Html,
    IHiroProp_Number,
    IHiroProp_Options, IHiroProps,
} from "./hiro.types";

export interface IAppProps extends IHiroProps{
    fontSize: IHiroProp_Number;
    font: IHiroProp_GoogleFont;
    blurVolumeThreshHold: IHiroProp_Number;
    textColor: IHiroProp_Color;
    backgroundColor: IHiroProp_Color;
    content: IHiroProp_Html;
    positionX: IHiroProp_Options<string>
    positionY: IHiroProp_Options<string>
}

interface IAppState{
    maxDistance: number;
    center: Point;
    frameWidth: number;
    frameHeight: number;
    blurVolume: number;
}


export function app(props: IAppProps) {
    const wrapper = document.createElement("div");
    const container = document.createElement("div");
    const content = document.createElement("div");

    container.append(content);
    wrapper.append(container)
    document.body.append(wrapper);

    wrapper.classList.add("wrapper");
    container.classList.add("container");
    container.classList.add("blur");

    const positionYCss = props.positionY.options[props.positionY.value].value;
    const positionXCss = props.positionX.options[props.positionX.value].value;


    const getMaxBlurVolume = () => {
        return props.blurVolumeThreshHold.value * props.fontSize.value;
    };

    const getMinBlurVolume = () => {
        return 0;
    }

    const getBlurVolume = () => {
        return props.blurVolumeThreshHold.value * props.fontSize.value;
    }

    let state: IAppState = {
        center: new Point(0, 0),
        blurVolume: getBlurVolume(),
        frameHeight: window.innerHeight,
        frameWidth: window.innerWidth,
        maxDistance: 0,
        ...props
    }

    const onMousemove = (event: MouseEvent) => {
        const dx = calcDistance(
            {x: event.clientX, y: event.clientY},
            state.center
        );


        state.blurVolume = ~~mapRange(
            dx,
            0,
            state.maxDistance,
            getMinBlurVolume(),
            getMaxBlurVolume()
        );

        render();
    }

    const onResize = () => {
        const kid = container.children[0];
        state.center = calcCenterPoint(kid.getBoundingClientRect());

        state.maxDistance = Math.max(
            calcDistance(
                state.center,
                {x: state.frameWidth, y: state.frameHeight}
            ),
            calcDistance(
                state.center,
                {x: 0, y: 0}
            )
        )

        state.frameWidth = window.innerWidth;
        state.frameHeight = window.innerHeight;

        render();
    }

    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("resize", onResize);

    const render = () => {
        content.innerHTML = <string>props.content.value;

        wrapper.style.width = state.frameWidth + "px";
        wrapper.style.height = state.frameHeight + "px";
        wrapper.style.background = `${props.backgroundColor.value}`;

        container.style.alignItems = positionYCss;
        container.style.justifyContent = positionXCss;

        container.style.fontSize = `${props.fontSize.value}px`;
        container.style.textShadow = `${props.textColor.value} 0 0 ${state.blurVolume}px`;
    }

    render();
    onResize();

    WebFont.load({
        google: {
            families: [props.font.value]
        },
        fontactive: function(familyName, fvd) {
            document.body.style.fontFamily = `${familyName}, sans-serif`;
        },
    })
};
