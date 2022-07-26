import Agent from "./Agent";
export default class LocalStorage extends Agent {
    protected static localStorage: any;
    protected static get storage(): any;
}
