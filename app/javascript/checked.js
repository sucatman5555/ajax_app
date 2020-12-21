// function check() {
//   // querySelectorAllメソッドで、postをクラス名にもつ要素を取得できます。
//   // postというクラス名を持つ要素はメモの数だけ存在します。
//   const posts = document.querySelectorAll(".post");

//   // 要素1つずつに対して、「クリック」した際に動作する処理を記述します。まずは、forEachを記述して、それぞれの要素への処理を記述する場所を用意します。
//   posts.forEach(function (post) { 
//     if (post.getAttribute("data-load") != null) {
//       return null;
//     }
//     post.setAttribute("data-load", "true");
//     // addEventListenerメソッドを使用し、引数にclickの指定をします。
//     // これで、「要素1つずつに対して、『クリック』した際に動作するイベント駆動」を設定することができました。
//     post.addEventListener("click", () => { 
//       // ここにクリックした時に行う「何らかの処理」を記述していく
//       // 続いて、「何らかの処理」の部分へ、ルーティングで設定したget 'posts/:id', to: 'posts#checked'により生成された
//       // /posts/:idというエンドポイントへのリクエスト処理を記述します。
      
//       // getAttributeで属性値を取得することができるので、メモのidを取得することができました。
//       const postId = post.getAttribute("data-id");
//       // エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行います。
//       // まず、オブジェクトを生成する必要がありますのでconst XHR = new XMLHttpRequest();のように記述しましょう。
//       const XHR = new XMLHttpRequest();
//       // 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをbooleanで記述します。
//       XHR.open("GET", `/posts/${postId}`, true);
//       // リクエストを送る際にあらかじめ、レスポンスとして欲しい情報の形式を指定する必要があります。
//       // 今回のレスポンスはJSON形式のデータです。その場合はXHR.responseType = "json";のように指定します
//       XHR.responseType = "json";
//       // 引数の指定はとくに必要ありません。sendメソッドを記述することで、はじめてリクエストが行えます
//       XHR.send();
//       // XHR.responseでレスポンスされてきたJSONにアクセスできます。
//       // 下記のcheckedアクションで返却したitemは、XHR.response.postで取得できます。
//       XHR.onload = () => {
//         // HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理が行われます。
//         // XHR.statusTextによって、エラーが生じたオブジェクトに含まれるエラーメッセージが表示されます。
//         // また、return null;を定義しています。return null;によってJavaScriptの処理から抜け出すことができます。
//         // これはエラーが出た場合に、以降に記述されている処理を行わないようにすることが目的です。
//         if (XHR.status != 200) {
//           alert(`Error ${XHR.status}: ${XHR.statusText}`);
//           return null;          
//         }

//         const item = XHR.response.post;
//         if (item.checked === true) {
//           post.setAttribute("data-check", "true");
//         } else if (item.checked === false) {
//           post.removeAttribute("data-check");
//         }
//       };
//     });
//   });
// }
// // window.addEventListener("load", check);
// setInterval(check, 1000);

function check() {
  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
     if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスのタイプを指定する
      XHR.responseType = "json";
      // sendでリクエストを送信する
      XHR.send();
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了している
          return null;          
        }
        // レスポンスされたデータを変数itemに代入している
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);