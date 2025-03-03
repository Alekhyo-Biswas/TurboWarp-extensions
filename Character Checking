class CharCheckExtension {
    getInfo() {
        return {
            id: "charCheck",
            name: "Character Checker",
            blocks: [
                {
                    opcode: "containsAny",
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: "Does [WORD] contain any of [LIST]?",
                    arguments: {
                        WORD: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "hello"
                        },
                        LIST: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "aeiou"
                        }
                    }
                }
            ]
        };
    }

    containsAny(args) {
        return args.WORD.split("").some(c => args.LIST.includes(c));
    }
}

Scratch.extensions.register(new CharCheckExtension());
