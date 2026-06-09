import { useCallback, useEffect, useMemo, useState } from "react";
import { storyPages } from "./story";

const firstIndex = 0;
const lastIndex = storyPages.length - 1;

export default function App() {
  const [current, setCurrent] = useState(firstIndex);
  const page = storyPages[current];
  const progress = useMemo(() => ((current + 1) / storyPages.length) * 100, [current]);

  const goToPage = useCallback((index: number) => {
    setCurrent(Math.min(Math.max(index, firstIndex), lastIndex));
  }, []);

  useEffect(() => {
    const nextPage = storyPages[current + 1];
    if (!nextPage) {
      return;
    }

    const image = new Image();
    image.src = nextPage.image;
  }, [current]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToPage(current + 1);
      }

      if (event.key === "ArrowLeft") {
        goToPage(current - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, goToPage]);

  return (
    <main className={`app-shell tone-${page.tone}`}>
      <header className="topbar">
        <a className="skip-link" href="#story">
          跳到故事内容
        </a>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            心
          </span>
          <div>
            <p className="eyebrow">给莉莉的小绘本</p>
            <h1>重点不是你看到了什么，而是我心里的样子</h1>
          </div>
        </div>
        <div className="page-count" aria-label={`第 ${current + 1} 页，共 ${storyPages.length} 页`}>
          {String(current + 1).padStart(2, "0")}
          <span>/</span>
          {String(storyPages.length).padStart(2, "0")}
        </div>
      </header>

      <section className="reader" id="story" aria-live="polite">
        <figure className="art-panel">
          <img className="storybook-image" src={page.image} alt={`第 ${page.id} 页插图：${page.title}`} />
          <figcaption>
            <span>Chapter {String(page.id).padStart(2, "0")}</span>
            <strong>{page.title}</strong>
          </figcaption>
        </figure>

        <article className="story-copy">
          <p className="chapter-label">第 {page.id} 页</p>
          <h2>{page.title}</h2>
          <div className="story-lines">
            {page.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </article>
      </section>

      <nav className="controls" aria-label="故事翻页">
        <button
          className="icon-button"
          type="button"
          title="上一页"
          aria-label="上一页"
          onClick={() => goToPage(current - 1)}
          disabled={current === firstIndex}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="progress-wrap" aria-hidden="true">
          <div className="progress-track">
            <span className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="dots">
            {storyPages.map((item, index) => (
              <button
                key={item.id}
                className={index === current ? "dot is-active" : "dot"}
                type="button"
                title={`第 ${item.id} 页`}
                aria-label={`跳到第 ${item.id} 页`}
                aria-current={index === current ? "page" : undefined}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>
        </div>

        <button
          className="icon-button"
          type="button"
          title="下一页"
          aria-label="下一页"
          onClick={() => goToPage(current + 1)}
          disabled={current === lastIndex}
        >
          <span aria-hidden="true">›</span>
        </button>
      </nav>
    </main>
  );
}
