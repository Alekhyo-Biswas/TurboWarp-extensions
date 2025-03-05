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

    async hash(args) {
        const crypto = await import("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js");
        const hashMethods = {
            MD5: crypto.MD5,
            SHA1: crypto.SHA1,
            SHA256: crypto.SHA256,
            SHA512: crypto.SHA512,
            SHA3: crypto.SHA3,
            RIPEMD160: crypto.RIPEMD160
        };

        let method = args.METHOD.toUpperCase();
        if (hashMethods[method]) {
            return hashMethods[method](args.TEXT).toString(crypto.enc.Hex);
        }
        return "Unsupported method";
    }

    encode(args) {
        let base = parseInt(args.BASE, 10);
        if (isNaN(base) || base < 2 || base > 36) return "Invalid base";

        try {
            let encoded = Buffer.from(args.TEXT, "utf8").toString("base" + base);
            return encoded;
        } catch (e) {
            return "Invalid input";
        }
    }
}

Scratch.extensions.register(new ProfessionalEncodes());
