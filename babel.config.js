module.exports = {
  presets: [
    '@vue/app'
  ],
  //按需引入iview
  "plugins": [
    ["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }],[
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]]
}
