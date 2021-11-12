import { Plugin } from "vite";
import * as fs from "fs";
import * as readline from "readline";
import { PluginOptions } from "../types";
import { isNullOrUnDefOrStringEmpty, toCamelCase } from "../utils";
import math from "mathjs";

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
              if (varItem) {
                row.value = row.value.replace(
                  name,
                  varItem.value.replace(";", "")
                );

                // expression calculate
                let newValue = "";
                if (row.value) {
                  const regEx = /[0-9\+\-\*\.]/gi;
                  const evalValue = row.value.match(regEx)?.join("");
                  const val1 = math.evaluate(evalValue || "").toFixed(2);
                  newValue += val1 + row.value.replace(regEx, "");
                }

                row.value = newValue.replace(/\s*/g, "");
              }
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
        let { name, value } = row;
        outStr += `export const ${toCamelCase(name)} = '${value
          .trimLeft()
          .replace(";", "")}'\n`;
      });
      const filePath = getFilePath() + "/" + "index.ts";
      fs.writeFileSync(filePath, outStr);
    },
  };
}
