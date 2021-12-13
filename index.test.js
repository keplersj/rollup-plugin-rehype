import { jest } from "@jest/globals";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeFormat from "rehype-format";

const testDocument = `
<!DOCTYPE html>
<html>
  <head>
      <title>Test</title>
      <style>
        body {
            margin: 2em;
        }
      </style>
  <head>
  <body>
      <p>Test!</p>
  </body>
</html>
`;

describe("Rollup-Rehype Plugin", () => {
  describe("#tranform", () => {
    it("returns code that has been processed by Rehype", async () => {
      const { default: rollupRehypePlugin } = await import("./index.js");
      const pluginInstance = rollupRehypePlugin();
      const { transform } = pluginInstance;

      expect(await transform(testDocument, "index.html"))
        .toMatchInlineSnapshot(`
"<!doctype html><html><head>
      <title>Test</title>
      <style>
        body {
            margin: 2em;
        }
      </style>
  
  </head><body>
      <p>Test!</p>
  

</body></html>"
`);
    });

    it("returns minified code when minified preset is provided", async () => {
      const { default: rollupRehypePlugin } = await import("./index.js");
      const pluginInstance = rollupRehypePlugin({
        plugins: [rehypePresetMinify],
      });
      const { transform } = pluginInstance;

      expect(await transform(testDocument, "index.html")).toMatchInlineSnapshot(
        `"<!doctypehtml><title>Test</title><style>body{margin:2em}</style><p>Test!"`
      );
    });

    it("returns formatted code when format preset is provided", async () => {
      const { default: rollupRehypePlugin } = await import("./index.js");
      const pluginInstance = rollupRehypePlugin({
        plugins: [rehypeFormat],
      });
      const { transform } = pluginInstance;

      expect(await transform(testDocument, "index.html"))
        .toMatchInlineSnapshot(`
"<!doctype html>
<html>
  <head>
    <title>Test</title>
    <style>body {
margin: 2em;
}</style>
  </head>
  <body>
    <p>Test!</p>
  </body>
</html>
"
`);
    });

    it("calls plugins provided to it (through unified)", async () => {
      const mockPlugin = jest.fn();

      const { default: rollupRehypePlugin } = await import("./index.js");
      const pluginInstance = rollupRehypePlugin({
        plugins: [mockPlugin],
      });
      const { transform } = pluginInstance;

      expect(await transform(testDocument, "index.html"))
        .toMatchInlineSnapshot(`
"<!doctype html><html><head>
      <title>Test</title>
      <style>
        body {
            margin: 2em;
        }
      </style>
  
  </head><body>
      <p>Test!</p>
  

</body></html>"
`);

      expect(mockPlugin).toBeCalledTimes(1);
    });

    it("returns null if file is not HTML", async () => {
      const { default: rollupRehypePlugin } = await import("./index.js");
      const pluginInstance = rollupRehypePlugin();
      const { transform } = pluginInstance;

      expect(await transform("export default true;", "index.js")).toBeNull();
    });
  });
});
