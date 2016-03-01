

export class Keyboard {
    private element: HTMLElement | HTMLDocument;
    private keyStates: Object = {
        87: {ascii: "w", pressed: false},
        65: {ascii: "a", pressed: false},
        83: {ascii: "s", pressed: false},
        68: {ascii: "d", pressed: false}
    };
    
    public static KEYS = {
        "w": 87,
        "a": 65,
        "s": 83,
        "d": 68
    }
    
    constructor(element?: HTMLElement) {
        this.element = element || document;
        
        this.element.addEventListener("keydown", (e: KeyboardEvent) => {
            if(e.keyCode in this.keyStates)
                this.setKeyState(e);
        });
        
        this.element.addEventListener("keyup", (e: KeyboardEvent) => {
            if(e.keyCode in this.keyStates)
                this.setKeyState(e);
        });
    }
    
    private setKeyState(e: KeyboardEvent): void {
        this.keyStates[e.keyCode].pressed = (e.type === 'keydown');
    }
    
    public isKeyPressed(key: string): boolean {
        return this.keyStates[ Keyboard.KEYS[key] ].pressed;
    }
}