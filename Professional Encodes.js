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
                    items: [
                        "MD5", "SHA1", "SHA256", "SHA512", "SHA3", "RIPEMD160", "BLAKE2", "Whirlpool"
                    ]
                }
            }
        };
    }

    hash(args) {
        const hashMethods = {
            MD5: CryptoJS.MD5,
            SHA1: CryptoJS.SHA1,
            SHA256: CryptoJS.SHA256,
            SHA512: CryptoJS.SHA512,
            SHA3: CryptoJS.SHA3,
            RIPEMD160: CryptoJS.RIPEMD160,
            BLAKE2: CryptoJS.SHA256, // CryptoJS doesn't support BLAKE2
            Whirlpool: CryptoJS.SHA512 // CryptoJS doesn't support Whirlpool
        };

        let method = args.METHOD.toUpperCase();
        if (hashMethods[method]) {
            return hashMethods[method](args.TEXT).toString(CryptoJS.enc.Hex);
        }
        return "Unsupported method";
    }

    encode(args) {
        let base = parseInt(args.BASE, 10);
        if (isNaN(base) || base < 2 || base > 36) return "Invalid base";
        try {
            let num = BigInt(args.TEXT);
            return num.toString(base);
        } catch (e) {
            return "Invalid input";
        }
    }
}

Scratch.extensions.register(new ProfessionalEncodes());

