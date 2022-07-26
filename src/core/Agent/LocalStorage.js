import WebStorage from "../Helper/Storage/WebStorage";
import Agent from "./Agent";
export default class LocalStorage extends Agent {
    static get storage() {
        if (LocalStorage.localStorage) {
            return LocalStorage.localStorage;
        }
        LocalStorage.localStorage = new WebStorage({ type: 'localStorage' });
        return LocalStorage.localStorage;
    }
}
LocalStorage.localStorage = null;
//# sourceMappingURL=LocalStorage.js.map