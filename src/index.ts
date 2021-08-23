import { IMbadProp_Color, IMbadProp_Html, IMbadProp_Number, IMbadProp_Options } from "./mbad.types.d";
import { calcCenterPoint, calcDistance, mapRange, Point } from "./utils";

interface IAppProps {
    fontSize: IMbadProp_Number;
    blurVolume: IMbadProp_Number;
    textColor: IMbadProp_Color;
    backgroundColor: IMbadProp_Color;
    content: IMbadProp_Html;
    positionX: IMbadProp_Options<number>
    positionY: IMbadProp_Options<number>
}

interface IAppState extends IAppProps {
    maxDistance: number;
    center: Point
    frameWidth: number,
    frameHeight: number
}

const props: IAppProps = require("./mbad.props.json");


const wrapper = document.createElement("div");
const container = document.createElement("div");
const content = document.createElement("div");

content.innerHTML = <string>props.content.value;

container.append(content);
wrapper.append(container)
document.body.append(wrapper);

wrapper.classList.add("wrapper");
container.classList.add("container");
container.classList.add("blur");

// container.style.position = "relative";
// container.style.position = "absolute";
container.style.fontSize = `${props.fontSize.value}px`;
container.style.textShadow = `${props.textColor.value} 0 0 ${props.blurVolume.value}px`;


const positionYCss = props.positionY.options[props.positionY.value].value;
const positionXCss = props.positionX.options[props.positionX.value].value;


(function app() {
    props.blurVolume.range.min = Math.max(props.blurVolume.range.min, 0);
    props.blurVolume.range.max = Math.min(props.blurVolume.range.max, props.fontSize.value);

    let state: IAppState = {
        center: new Point(0, 0),
        blurVolume: props.blurVolume,
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

        state.blurVolume.value = ~~mapRange(
            dx,
            0,
            state.maxDistance,
            props.blurVolume.range.min,
            props.blurVolume.range.max
        )
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
        wrapper.style.width = state.frameWidth + "px";
        wrapper.style.height = state.frameHeight + "px";
        wrapper.style.background = `${props.backgroundColor.value}`;

        container.style.alignItems = positionYCss;
        container.style.justifyContent = positionXCss;

        container.style.fontSize = `${props.fontSize.value}px`;
        container.style.textShadow = `${props.textColor.value} 0 0 ${state.blurVolume.value}px`;
    }

    render();
    onResize();
})();


