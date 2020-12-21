// function memo() {
//   // FormDataとsendを使用して、メモ投稿のフォームに入力された情報を送信しましょう。
//   const formData = new FormData(document.getElementById("form"));
//   // <%= form.submit '投稿する' , id: "submit" %>に注目してください。idがありますので、
//   // getElementByIdを用いて「投稿する」ボタンの情報を取得しましょう。
//   const submit = document.getElementById("submit");
//   // addEventListenerを使用して、投稿するボタンを「click」した場合に実行される関数を定義しましょう。
//   submit.addEventListener("click", (e) => {
//     // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成しましょう。
//     const XHR = new XMLHttpRequest();
//     // openメソッドを使用して、リクエストの内容を引数へ追記しましょう。
//     // HTTPメソッドはPOST、パスは/posts、非同期通信はtrueと設定します。
//     XHR.open("POST", "/posts", true);
//     // 今回も返却されるデータ形式はJSONになりますので、jsonを指定しましょう
//     XHR.responseType = "json";

//     XHR.send(formData);

//     XHR.onload = () => {
//       // 既読機能の実装時と同じように200以外のHTTPステータスが返却された場合の処理を書いておきましょう。
//       if (XHR.status != 200) {
//         alert(`Error ${XHR.status}: ${XHR.statusText}`);
//         return null;
//       }
//       // itemは、レスポンスとして返却されたメモのレコードデータを取得しています。
//       const item = XHR.response.post;
//       // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
//       const list = document.getElementById("list");
//       // formTextを取得する理由は、メモの入力フォームをリセットするためです。この処理が終了した時に、
//       // 入力フォームの文字は入力されたままになってしまうため、リセットする必要があります。
//       // ここではリセット対象の要素であるcontentという要素を取得しています。
//       const formText = document.getElementById("content");

//       // このコードは、「メモとして描画する部分のHTML」を定義しています。
//       // HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画されるわけです。
//       const HTML = `
//         <div class="post" data-id=${item.id}>
//           <div class="post-date">
//             投稿日時：${item.created_at}
//           </div>
//           <div class="post-content">
//           ${item.content}
//           </div>
//         </div>`;
//       // listという要素に対して、insertAdjacentHTMLでHTMLを追加します。
//       // 第一引数にafterendを指定することで、要素listの直後に挿入できます。
//       list.insertAdjacentHTML("afterend", HTML);
//       // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組みです。
//       formText.value = "";
//     };
//     // 今回は「非同期通信」の実装なので、「submitボタンでclickする」というイベントを阻止する
//     e.preventDefault();
//   });
// }

// // window.addEventListener("load", memo);で、既読機能と同様にwindow（ページ）を
// // load（読み込み）時に実行されるように記述します。
// window.addEventListener("load", memo);

function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
 }
 window.addEventListener("load", memo);