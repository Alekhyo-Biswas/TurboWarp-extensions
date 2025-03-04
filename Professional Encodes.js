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
                        "MD5", "SHA-1", "SHA-256", "SHA-512", "SHA-3", "RIPEMD-160", "BLAKE2", "Whirlpool"
                    ]
                }
            }
        };
    }

    async hash(args) {
        const crypto = await import("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js");
        let method = args.METHOD.toUpperCase().replace(/-/g, "");
        if (crypto[method]) {
            return crypto[method](args.TEXT).toString();
        }
        return "Unsupported method";
    }

    encode(args) {
        let base = parseInt(args.BASE, 10);
        if (isNaN(base) || base < 2 || base > 36) return "Invalid base";
        return parseInt(args.TEXT, 36).toString(base);
    }
}

Scratch.extensions.register(new ProfessionalEncodes());
