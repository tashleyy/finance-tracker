module.exports = {
    "env": {
        "browser": true
    },
    "extends": "google",
    "rules": {
        "no-undef": "off",
        "no-console": "off",
        "require-jsdoc": "off",
        "max-len": "off",
        "spaced-comment": "off",
        "valid-jsdoc": "off",
        "max-nested-callbacks": "off",
        "guard-for-in": "off",
        "brace-style": [
            "error",
            "1tbs",
            {"allowSingleLine": true}
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};