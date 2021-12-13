import utils from "@rollup/pluginutils";
import { unified } from "unified";
import { VFile } from "vfile";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

export default function rollupPluginRehype(options = {}) {
  options = {
    plugins: [],
    include: "**/*.html",
    ...options,
  };

  const filter = utils.createFilter(options.include, options.exclude);

  const processor = unified()
    .use(rehypeParse)
    .use(options.plugins)
    .use(rehypeStringify)
    .freeze();

  return {
    name: "rehype",
    transform: (code, id) =>
      filter(id)
        ? processor
            .process(new VFile({ path: id, value: code }))
            .then((file) => String(file))
        : null,
  };
}
