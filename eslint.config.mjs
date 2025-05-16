import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  {
    plugins: {
      prettier,
    },
    extends: [
      ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "plugin:prettier/recommended",
      ),
      ...compat.plugins("eslint-plugin-prettier", "boundaries"),
    ],
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          type: "app",
          pattern: "app",
        },
        {
          type: "screens",
          pattern: "src/screens/*",
          capture: ["page"],
        },
        {
          type: "widgets",
          pattern: "widgets/*",
          capture: ["widget"],
        },
        {
          type: "features",
          pattern: "features/*",
          capture: ["feature"],
        },
        {
          type: "entities",
          pattern: "entities/*",
          capture: ["entity"],
        },
        {
          type: "shared",
          pattern: "shared/*",
          capture: ["segment"],
        },
      ],
    },
    rules: {
      "prettier/prettier": "error",
      "boundaries/entry-point": [
        2,
        {
          default: "disallow",
          rules: [
            {
              target: [
                [
                  "shared",
                  {
                    segment: "lib",
                  },
                ],
              ],
              allow: "*/index.ts",
            },
            {
              target: [
                [
                  "shared",
                  {
                    segment: "lib",
                  },
                ],
              ],
              allow: "*.(ts|tsx)",
            },
            {
              target: [
                [
                  "shared",
                  {
                    segment: "constants",
                  },
                ],
              ],
              allow: "index.ts",
            },
            {
              target: [
                [
                  "shared",
                  {
                    segment: "(ui|api)", // ("ui"|"constants")
                  },
                ],
              ],
              allow: "**",
            },
            {
              target: ["app", "screens", "widgets", "features", "entities"],
              allow: "index.(ts|tsx)",
            },
            {
              target: ["app", "screens", "widgets", "features", "entities"],
              allow: "pub/*.(ts|tsx)",
            },
          ],
        },
      ],
      "boundaries/element-types": [
        2,
        {
          default: "allow",
          message: "${file.type} is not allowed to import (${dependency.type})",
          rules: [
            {
              from: ["shared"],
              disallow: ["app", "screens", "widgets", "features", "entities"],
              message:
                "Shared module must not import upper layers (${dependency.type})",
            },
            {
              from: ["entities"],
              message:
                "Entity must not import upper layers (${dependency.type})",
              disallow: ["app", "screens", "widgets", "features"],
            },
            {
              from: ["entities"],
              message: "Entity must not import other entity",
              disallow: [
                [
                  "entities",
                  {
                    entity: "!${entity}",
                  },
                ],
              ],
            },
            {
              from: ["features"],
              message:
                "Feature must not import upper layers (${dependency.type})",
              disallow: ["app", "screens", "widgets"],
            },
            {
              from: ["features"],
              message: "Feature must not import other feature",
              disallow: [
                [
                  "features",
                  {
                    feature: "!${feature}",
                  },
                ],
              ],
            },
            {
              from: ["widgets"],
              message:
                "Feature must not import upper layers (${dependency.type})",
              disallow: ["app", "screens"],
            },
            {
              from: ["widgets"],
              message: "Widget must not import other widget",
              disallow: [
                [
                  "widgets",
                  {
                    widget: "!${widget}",
                  },
                ],
              ],
            },
            {
              from: ["screens"],
              message: "Page must not import upper layers (${dependency.type})",
              disallow: ["app"],
            },
            {
              from: ["screens"],
              message: "Page must not import other page",
              disallow: [
                [
                  "screens",
                  {
                    page: "!${page}",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
  },
]);
