# Astral Drift Landing Page

GitHub Pages 向けに構成した、ダークテーマ + アニメーション重視の 1 ページランディングです。Vite / React / Tailwind CSS / Motion for React で実装しています。

## セットアップ

```bash
npm install
npm run dev
```

## 本番ビルド

```bash
npm run build
npm run preview
```

## GitHub Pages で公開する手順

1. このリポジトリ名を `REPO_NAME` に置き換えてください。
   - `vite.config.js` の `GITHUB_PAGES_REPO` 既定値
   - `.github/workflows/deploy-pages.yml` の `GITHUB_PAGES_REPO`
2. GitHub リポジトリの **Settings > Pages** で **GitHub Actions** を選択します。
3. `main` ブランチに push すると workflow が走り、`dist/` が Pages にデプロイされます。
4. Production では Vite の `base` が `/REPO_NAME/` になるので、プロジェクトページとしてそのまま公開できます。

## 実装メモ

- ルーティングなしのシングルページ構成です。
- Motion for React で Hero / セクション reveal / stagger / hover を統一したテンポで実装しています。
- プレースホルダーのダミー画像領域とダミーテキストを含んでいます。
