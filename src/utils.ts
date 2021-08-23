export class Point {
    constructor(public x: number, public y: number) {}
};

export const mapRange = (value: number, low1: number, high1: number, low2: number, high2: number): number => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export const calcCenterPoint = (rect: DOMRect | ClientRect): Point => {
    const x = rect instanceof DOMRect ? rect.x : rect.left;
    const y = rect instanceof DOMRect ? rect.y : rect.top;
    return new Point(
        x + (rect.width / 2),
        y + (rect.height / 2)
    )
};

export const calcDistance = (p1: Point, p2: Point): number => {
    const a = p2.x - p1.x;
    const b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);
};

