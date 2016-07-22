module.exports = {
"extends": "airbnb",
"installedESLint": true,
"plugins": [
"react"
],
"modules": false,
"rules": {
"no-var": "off",
"no-console": "off",
"strict": "off",
"vars-on-top": "off",
"no-use-before-define": ["error", { "functions": false, "classes": true }]
}
};
