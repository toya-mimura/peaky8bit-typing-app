# Peaky 8-bit Trainer

A browser-based chord typing trainer for **Peaky 8-bit** — an 8-key chord-input keyboard.
Practice chords in your browser before (or after) building the real thing. No install, no build step: it's a single HTML file.

**▶ Live demo: https://peaky8bit-typing-app.twc4.workers.dev**

*(日本語は下にあります / Japanese follows below)*

---

## Features

- **Two input modes**
  - **Simulation mode** — practice with a normal keyboard. `A S D F` = left-hand switches, `J K L ;` = right-hand switches. Just like the firmware, a chord is committed *the moment you release all held keys*.
  - **Real device mode** — plug in your Peaky 8-bit and practice with the actual hardware (turn your IME off / use direct input).
- **10 lessons** — letters (a–m / n–z / a–z), numbers, two symbol sets, capitals with Shift-arm (`0x88`), control keys, English words, and a mixed random drill.
- **Live bit readout** — an LED-style display shows the current chord as bits `b7–b0` plus its hex value, so the chord ↔ byte mapping sinks in as you type.
- **Stats** — accuracy, chords/min, streak, and miss count per session.
- **Hint modes** — always show the chord hint, show it only after a miss, or hide it entirely.
- **Reversible key order** — flip the on-screen switch order per hand to match how your build is oriented.
- **Bilingual UI** — switch between Japanese and English anytime.
- **Keymap CSV swap (dev)** — the trainer ships with **keymap v0.4** embedded. Paste a different `keymap_vXX.csv` into the dev panel to try a new map for the current session, or edit the `KEYMAP_CSV` constant in the HTML to make it permanent.

## Usage

1. Open the [live demo](https://peaky8bit-typing-app.twc4.workers.dev) (or just open `index.html` locally — it works offline too).
2. Pick a lesson and press **Start**.
3. In **Capitals** lessons, arm Shift with chord `0x88` (left SW1 + right SW1) first, then type the letter chord. Cancel an arm with `0x0E` (Esc). In real-device mode the device handles arming itself.

## Deploying your own copy

This repo deploys to **Cloudflare Workers (static assets)** via `wrangler.jsonc`:

```
npx wrangler deploy
```

Or connect the repo to a Workers project in the Cloudflare dashboard with deploy command `npx wrangler deploy`. `.assetsignore` keeps `.git` and config files out of the published assets.

---

# Peaky 8-bit Trainer（日本語）

8キーChord入力型キーボード **Peaky 8-bit** のための、ブラウザで動くタイピング練習アプリです。
実機を組み立てる前でも後でも、ブラウザだけでchord入力を練習できます。インストール不要・ビルド不要、HTMLファイル1枚で動きます。

**▶ デモ: https://peaky8bit-typing-app.twc4.workers.dev**

## 特徴

- **2つの入力モード**
  - **シミュレーション** — 普通のキーボードで練習。`A S D F` が左手スイッチ、`J K L ;` が右手スイッチに対応。実機のファームウェアと同じく、**押したキーをすべて離した瞬間**にchordが確定します。
  - **実機モード** — Peaky 8-bit本体を接続して練習（IMEはOFF/直接入力にしてください）。
- **10種類のレッスン** — 英字（a–m / n–z / 総合）、数字、記号2セット、大文字（Shift arm `0x88`）、制御キー、英単語、総合ランダム。
- **ビット表示** — 現在のchordを `b7–b0` のLED風表示＋16進数でリアルタイム表示。chordとバイト値の対応が体で覚えられます。
- **スタッツ** — 正確率、chords/min、連続正解、ミス数をセッションごとに記録。
- **ヒント切替** — 常に表示 / ミス時のみ / 非表示。
- **キー順反転** — 左右それぞれ画面上のスイッチ順を反転可能。実機の向きに合わせられます。
- **日英バイリンガルUI**
- **キーマップCSV差し替え（開発用）** — **keymap v0.4** を同梱。開発パネルに別の `keymap_vXX.csv` を貼り付ければ、そのセッション中だけ新しいマップで練習できます（恒久的に変えるにはHTML内の `KEYMAP_CSV` を書き換え）。

## 使い方

1. [デモページ](https://peaky8bit-typing-app.twc4.workers.dev)を開く（`index.html` をローカルで開いてもOK。オフラインでも動きます）。
2. レッスンを選んで「スタート」。
3. 大文字レッスンでは、まずchord `0x88`（左SW1+右SW1）でShiftをarmしてから文字のchordを入力します（2打）。armのキャンセルは `0x0E`（Esc）。実機モードでは本体側でarmされます。

## 自分でデプロイする場合

このリポジトリは `wrangler.jsonc` を使って **Cloudflare Workers（静的アセット）** にデプロイしています。

```
npx wrangler deploy
```

CloudflareダッシュボードでWorkersプロジェクトにリポジトリを連携し、デプロイコマンドを `npx wrangler deploy` にする方法でもOKです。`.assetsignore` によって `.git` や設定ファイルは公開対象から除外されます。
