import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl';

export default defineConfig(({ mode }) => {
    const plugins = [
      glsl({
        root:"/node_modules",
        checkRecursiveImports:false
      }),
    ];

  return {
    plugins,
  };
});