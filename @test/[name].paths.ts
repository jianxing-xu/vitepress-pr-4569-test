import fs from "fs";
import path from "path";
import { defineRoutes } from "vitepress";

const regex = /ui\/([^/]+)\.md/;

export default defineRoutes({
  watch: [path.resolve(process.cwd(), "../ui/*.md")],
  paths(watchFiles) {
    console.log("en rebuild", watchFiles);
    const paths = watchFiles;
    const demos = paths.map((p) => {
      const content = fs.readFileSync(p, "utf-8");
      const match = p.match(regex);
      const componentName = match?.[1];
      return {
        componentName,
        content,
      };
    });
    return demos.map((d) => ({
      params: { name: d.componentName as string },
      content: d.content,
    }));
  },
});
