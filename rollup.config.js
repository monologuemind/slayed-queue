import { terser } from "rollup-plugin-terser";

const files = [
  "getData.js",
  "replaceBadText.js",
  "getGroups.js",
  "findGroupByName.js",
];

export default files.map((file) => ({
  input: file,
  output: {
    file: `lib/${file.replace(".js", "")}.min.js`,
    format: "iife",
  },
  plugins: [terser()],
}));
