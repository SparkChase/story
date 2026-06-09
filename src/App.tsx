import { useEffect, useMemo, useState } from "react";
import { storyPages } from "./story";

const firstIndex = 0;
const lastIndex = storyPages.length - 1;

export default function App() {
  const [current, setCurrent] = useState(firstIndex);
  const page = storyPages[current];
  const progress = useMemo(() => ((current + 1) / storyPages.length) * 100, [current]);

  const goToPage = (index: number) => {
    setCurrent(Math.min(Math.max(index, firstIndex), lastIndex));
  };

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
  }, [current]);

  return (
    <main className={`app-shell tone-${page.tone}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">
          <span>心</span>
        </div>
        <h1>重点不是你看到了什么，而是我心里的样子</h1>
        <div className="page-count" aria-label={`第${current + 1}页，共${storyPages.length}页`}>
          {String(current + 1).padStart(2, "0")} / {String(storyPages.length).padStart(2, "0")}
        </div>
      </header>

      <section className="reader" aria-live="polite">
        <div className="art-stage">
          <img className="storybook-image" src={page.image} alt={`第${page.id}页绘本插图：${page.title}`} />
          <div className="floating-charm charm-a" aria-hidden="true">
            星
          </div>
          <div className="floating-charm charm-b" aria-hidden="true">
            心
          </div>
        </div>

        <article className="story-copy">
          <p className="chapter-label">第{page.id}页</p>
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
          ‹
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
                title={`第${item.id}页`}
                aria-label={`跳到第${item.id}页`}
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
          ›
        </button>
      </nav>
    </main>
  );
}
