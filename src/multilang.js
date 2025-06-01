export const state = {
    language: "de"
};


// JavaScript object to handle multilanguage support
// Need localStorage to hold the language setting under key "lang"
class MultiLang {
    constructor() {
        this.phrases = {
            "incoming": { 'en': "incomming", 'de': "eingehend" },
            "reflected": { 'en': "reflected", 'de': "reflektiert" },
            "transmitted": { 'en': "transmitted", 'de': "transmittiert" },
            "air": { 'en': "Air", 'de': "Luft" },
            "mirror": { 'en': "Mirror", 'de': "Spiegel" },
            "water": { 'en': "Water", 'de': "Wasser" },
            "oil": { 'en': "Oil", 'de': "Öl" },
            "aceton": { 'en': "Aceton", 'de': "Aceton" },
            "honey": { 'en': "Honey", 'de': "Honig" },
            'submit': { 'en': "To Emilie", 'de': "Zu Emilie" },

        };
    }


    // Shorthand for getPhrase
    _(key) {
        let language = state.language;
        return this.getPhrase(key, language);
    }

    
    // get phrase by key
    getPhrase(key, language) {
        // console.log("getPhrase: key: '" + key + "' language: '" + language + "'");
        if (this.phrases[key] !== undefined) {
            if (this.phrases[key][language] !== undefined) {
                // console.log(this.phrases[key][language]);
                return this.phrases[key][language];
            } else {
                console.log("language: '" + language + "' not found for key '" + key + "'" );
            }
        } else {
            console.log("key not found: " + key);
        }
        console.log("return key: " + key);
        return key;
    }
    }

const L = new MultiLang();
export const _ = L._.bind(L);
export const getPhrase = L.getPhrase.bind(L);
export default L;

