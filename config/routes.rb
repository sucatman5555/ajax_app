Rails.application.routes.draw do
  root to: 'posts#index'
  # get 'posts/new', to: 'posts#new' ←削除
  post 'posts', to: 'posts#create'
  # queryパラメーターを使用した場合、/posts/?id=1とリクエストを行うと、params[:id]にてパラメーターを取得することができます。
  # get 'posts', to: 'posts#checked'
  # 既読機能のエンドポイントは、queryパラメーターで設定しました。しかし、今回のように渡す情報が一意の情報であればpathパラメーターの方が適しています。
  # pathパラメーターで扱えるように修正しましょう。
  get 'posts/:id', to: 'posts#checked'
end
