// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

// style.scssの監視タスクを作成する
gulp.task("default", () => {
  // ★ style.scssファイルを監視
  return gulp.watch("css/style.scss", () => {
    // style.scssの更新があった場合の処理

    // style.scssファイルを取得
    return (
      gulp
        .src("css/style.scss")
        // Sassのコンパイルを実行
        .pipe(
          sass({
            outputStyle: "expanded",
          })
          // Sassのコンパイルエラーを表示
          // (これがないと自動的に止まってしまう)
          .on("error", sass.logError)
        )
        // cssフォルダー以下に保存
        .pipe(gulp.dest("css"))
    );
  });
});

// browser-syncのプラグインの読み込み
const browserSync = require("browser-sync");

// タスクの設定
gulp.task("browserSyncTask", function () {
  browserSync({
    server: {
      baseDir: "src", // ルートとなるディレクトリを指定
    },
  });

  // srcフォルダ以下のファイルを監視
  gulp.watch("src/**", function () {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
  });
});