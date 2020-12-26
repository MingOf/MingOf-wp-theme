export {};
declare global {
    interface Element {
        isOpen: boolean;
        innerText: string;
        style: object;
    }
    interface Object {
        top: string;
        zIndex: number;
        left: string;
        position: string;
        opacity: number;
        color: string;
        fontWeight: string;
        display: string;
    }
}
