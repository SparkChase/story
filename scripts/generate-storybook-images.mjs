import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const inputPath = "tmp/imagegen/prompts.jsonl";
const outDir = "output/imagegen/storybook";
const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const apiKey = process.env.OPENAI_API_KEY;
const concurrency = Number(process.env.IMAGEGEN_CONCURRENCY || 3);
const maxAttempts = Number(process.env.IMAGEGEN_MAX_ATTEMPTS || 3);
const timeoutMs = Number(process.env.IMAGEGEN_TIMEOUT_MS || 180000);
const modelOverride = process.env.IMAGEGEN_MODEL;
const sizeOverride = process.env.IMAGEGEN_SIZE;
const qualityOverride = process.env.IMAGEGEN_QUALITY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required.");
}

mkdirSync(outDir, { recursive: true });

const jobs = readFileSync(inputPath, "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));

async function generate(job, index) {
  const outputName = job.out || `page-${String(index + 1).padStart(2, "0")}.png`;
  const outputPath = join(outDir, outputName);
  const body = {
    model: modelOverride || job.model || "gpt-image-2",
    prompt: job.prompt,
    size: sizeOverride || job.size || "1536x1024",
    quality: qualityOverride || job.quality || "high",
    output_format: job.output_format || "png",
  };

  if (existsSync(outputPath) && statSync(outputPath).size > 0) {
    console.log(`[job ${index + 1}/${jobs.length}] skipping existing ${outputPath}`);
    return;
  }

  console.log(`[job ${index + 1}/${jobs.length}] starting ${outputName}`);

  let response;
  let text;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      response = await fetch(`${baseUrl}/images/generations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      text = await response.text();
      clearTimeout(timeout);
      break;
    } catch (error) {
      clearTimeout(timeout);
      if (attempt === maxAttempts) {
        throw error;
      }
      const delay = attempt * 2500;
      console.log(
        `[job ${index + 1}/${jobs.length}] attempt ${attempt}/${maxAttempts} failed (${error.message}); retrying`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  if (!response.ok) {
    throw new Error(`[job ${index + 1}] ${response.status} ${text.slice(0, 500)}`);
  }

  const json = JSON.parse(text);
  const item = json.data?.[0];
  const b64 = item?.b64_json;

  if (!b64) {
    throw new Error(`[job ${index + 1}] response did not include data[0].b64_json`);
  }

  writeFileSync(outputPath, Buffer.from(b64, "base64"));
  console.log(`[job ${index + 1}/${jobs.length}] wrote ${outputPath}`);
}

let next = 0;
const workers = Array.from({ length: Math.min(concurrency, jobs.length) }, async () => {
  while (next < jobs.length) {
    const index = next;
    next += 1;
    await generate(jobs[index], index);
  }
});

await Promise.all(workers);
