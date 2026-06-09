import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const sourceDir = "output/imagegen/storybook";
const targetDir = "public/art";

mkdirSync(targetDir, { recursive: true });

for (let page = 1; page <= 9; page += 1) {
  const name = `page-${String(page).padStart(2, "0")}.png`;
  const source = join(sourceDir, name);
  const target = join(targetDir, name);

  if (!existsSync(source)) {
    throw new Error(`Missing generated image: ${source}`);
  }

  copyFileSync(source, target);
  console.log(`${source} -> ${target}`);
}
