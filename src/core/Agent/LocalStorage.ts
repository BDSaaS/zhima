import WebStorage from "../Helper/Storage/WebStorage";
import Agent from "./Agent";

export default class LocalStorage extends Agent {
    protected static localStorage = null


    protected static get storage() {
        if (LocalStorage.localStorage) {
            return LocalStorage.localStorage
        }
        LocalStorage.localStorage = new WebStorage({type: 'localStorage'})
        return LocalStorage.localStorage
    }
}
