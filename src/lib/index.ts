import { Plugin } from "vite";
import * as fs from "fs";
import * as readline from "readline";
import { PluginOptions } from "../types";
import { isNullOrUnDefOrStringEmpty, toCamelCase } from "../utils";

interface LessVarObj {
  name: string;
  value: string;
}

export default function lessVarsGenerator({ lessPath }: PluginOptions): Plugin {
  return {
    name: "vite-plugin-less-vars-generator",
    apply: "serve",
    async buildStart() {
      const lessVarList: LessVarObj[] = [];

      const readlineInstance = readline.createInterface({
        input: fs.createReadStream(lessPath),
      });

      // get less vars data from less file
      const getLessVarList = () => {
        return new Promise((resolve) => {
          readlineInstance.on("line", (line) => {
            const arr = line.split(":");
            const name = arr[0];
            const value = arr[1];
            !isNullOrUnDefOrStringEmpty(name) &&
              !isNullOrUnDefOrStringEmpty(value) &&
              lessVarList.push({
                name,
                value,
              });
          });
          readlineInstance.on("close", () => {
            resolve(lessVarList);
          });
        });
      };
      await getLessVarList();

      // replace vars
      const lessVars: LessVarObj[] = JSON.parse(JSON.stringify(lessVarList));
      lessVars
        .map((x: LessVarObj) => x.name)
        .forEach((name) => {
          const list = lessVars.filter((x) => x.value.includes(name));
          list.length > 0 &&
            list.forEach((row) => {
              const varItem = lessVars.find((x) => x.name === name);
              varItem && (row.value = row.value.replace(name, varItem.value));
            });
        });

      // write file
      const getFilePath = () => {
        const arr = lessPath.split("/");
        const arrLength = arr.length;
        return arr.slice(0, arrLength - 1).join("/");
      };
      let outStr = "";
      lessVars.forEach((row) => {
        const { name, value } = row;
        outStr += `export const ${toCamelCase(name)} = '${value
          .trimLeft()
          .replace(";", "")}';\n`;
      });
      const filePath = getFilePath() + "/" + "index.ts";
      fs.writeFileSync(filePath, outStr);
    },
  };
}
