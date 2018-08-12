class localStorageController {

    static get(key) {
        return localStorage.getItem(btoa(key));
    }

    static set(key, value) {
        return localStorage.setItem(btoa(key), value);
    }

}

export default localStorageController;