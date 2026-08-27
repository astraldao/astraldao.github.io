# 分子合成メモリズム

文化祭の物理展示（Raspberry Pi Pico・LEDマトリクス・物理ボタン）に先立ち、ルール、テンポ、UIを検証するためのブラウザ版ゲームです。光った元素・反応条件を同じ順で入力し、生成物を3択から回答します。1プレイは3問、最大750点です。

## ローカル起動

Node.js 20以降を推奨します。

```bash
npm install
npm run dev
```

Viteが表示するURLをブラウザで開いてください。本番ビルドは次のコマンドで確認できます。

```bash
npm run build
npm run preview
```

## 操作

- `START`（または Enter）→ `EASY` / `NORMAL` を選択
- 記憶表示が終わり `INPUT NOW` になったら、盤面または数字キー `1`〜`9` で同じ順番を入力
- `WHAT MADE?` では選択肢または `A`〜`C` キーで回答
- 右上の `SOUND ON/OFF` でミュート切り替え

入力成功100点、生成物正解100点、入力速度ボーナス最大50点を各問で獲得できます。ゲーム内の反応は学習用に単純化したもので、実際の合成手順ではありません。

## GitHub Pagesへの公開

`vite.config.ts` は相対 `base` を使用しているため、ユーザーPagesとProject Pagesのどちらでもアセットを解決できます。リポジトリの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選択してください。

`main` ブランチへのpushで `.github/workflows/deploy.yml` が以下を自動実行します。

1. `npm install`
2. `npm run build`
3. `dist/` をGitHub Pages artifactとしてアップロード
4. GitHub Pagesへデプロイ

## 開発コマンド

```bash
npm run dev     # 開発サーバー
npm test        # scoringのユニットテスト
npm run build   # 型検査と本番ビルド
npm run preview # 本番ビルドのローカル確認
```
