# Storybook Art

The React app uses local SVG illustrations:

- `page-01.svg`
- `page-02.svg`
- `page-03.svg`
- `page-04.svg`
- `page-05.svg`
- `page-06.svg`
- `page-07.svg`
- `page-08.svg`
- `page-09.svg`

Regenerate them without external services:

```bash
npm run art:local
```

The older OpenAI image-generation scripts are still available if you want higher-detail PNG art later:

```bash
npm run imagegen:storybook
npm run imagegen:publish
```

Those PNG scripts require `OPENAI_API_KEY`.
