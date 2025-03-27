module.exports = {
    //diz ao jest como processar os arquivos js modernos com o babel
    transform: {"^.\\.[jt]sx?$": "babel-jest" },
    // ignora o erro do axios
    transformIgnorePatterns: ["/node_modules/(?!axios)"],
    // define aliases para caminhos customizados nos imports
    moduleNameMapper: { "\\.(css|less|scss|sass)$ ": "identity-obj-proxy" },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
}