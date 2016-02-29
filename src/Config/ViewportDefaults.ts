import { Viewport } from "../Types/Types"

const ViewportDefaults: Viewport = {
    SCREEN_WIDTH: window.innerWidth,
    SCREEN_HEIGHT: window.innerHeight,
    FOV: 45,
    ASPECT_RATIO: window.innerWidth / window.innerHeight,
    NEAR: 0.1,
    FAR: 1000
}

export { ViewportDefaults };
