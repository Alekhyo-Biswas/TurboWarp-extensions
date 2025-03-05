class ProfessionalEncodes {
    getInfo() {
        return {
            id: "professionalEncodes",
            name: "Professional Encodes",
            blocks: [
                {
                    opcode: "hash",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "hash [TEXT] using [METHOD]",
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" },
                        METHOD: {
                            type: Scratch.ArgumentType.STRING,
                            menu: "hashMethods"
                        }
                    }
                },
                {
                    opcode: "encode",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "encode [TEXT] by [BASE] bit",
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" },
                        BASE: { type: Scratch.ArgumentType.STRING, defaultValue: "64" }
                    }
                },
                {
                    opcode: "decode",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "decode [TEXT] from [BASE] bit",
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "aGVsbG8=" },
                        BASE: { type: Scratch.ArgumentType.STRING, defaultValue: "64" }
                    }
                }
            ],
            menus: {
                hashMethods: {
                    acceptReporters: false,
                    items: ["MD5", "SHA1", "SHA256", "SHA512", "SHA3", "RIPEMD160"]
                }
            }
        };
    }

    async loadCryptoJS() {
        if (!window.CryptoJS) {
            window.CryptoJS = await import("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js")
                .then(module => module.default || module)
                .catch(() => null);
        }
        return !!window.CryptoJS;
    }

    async hash(args) {
        const loaded = await this.loadCryptoJS();
        if (!loaded) return "CryptoJS failed to load";

        const hashMethods = {
            MD5: window.CryptoJS.MD5,
            SHA1: window.CryptoJS.SHA1,
            SHA256: window.CryptoJS.SHA256,
            SHA512: window.CryptoJS.SHA512,
            SHA3: window.CryptoJS.SHA3,
            RIPEMD160: window.CryptoJS.RIPEMD160
        };

        let method = args.METHOD.toUpperCase();
        if (hashMethods[method]) {
            return hashMethods[method](args.TEXT).toString(window.CryptoJS.enc.Hex);
        }
        return "Unsupported method";
    }

    encode(args) {
        let base = parseInt(args.BASE, 10);
        if (isNaN(base) || base < 2 || base > 64) return "Invalid base";

        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
        let bytes = new TextEncoder().encode(args.TEXT);
        let num = BigInt("0x" + [...bytes].map(b => b.toString(16).padStart(2, "0")).join(""));

        let result = "";
        while (num > 0) {
            let remainder = num % BigInt(base);
            result = chars[Number(remainder)] + result;
            num = num / BigInt(base);
        }

        return result || "0";
    }

    decode(args) {
        let base = parseInt(args.BASE, 10);
        if (isNaN(base) || base < 2 || base > 64) return "Invalid base";

        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
        let num = BigInt(0);

        for (let char of args.TEXT) {
            let index = chars.indexOf(char);
            if (index === -1 || index >= base) return "Invalid input";
            num = num * BigInt(base) + BigInt(index);
        }

        let hexString = num.toString(16);
        if (hexString.length % 2 !== 0) hexString = "0" + hexString;

        let bytes = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        return new TextDecoder().decode(bytes);
    }
}

Scratch.extensions.register(new ProfessionalEncodes());
