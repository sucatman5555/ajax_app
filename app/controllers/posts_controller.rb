class PostsController < ApplicationController

  def index  # indexアクションを定義した
    # @post = Post.find(1)  # 1番目のレコードを@postに代入
    # @posts = Post.all  # すべてのレコードを@postsに代入
    @posts = Post.all.order(id: "DESC")
  end

  # def new
  # end

  def create
    # 既読や未読の情報を追加したため「メモ作成時に未読の情報を保存するようにしたこと」と、
    # Ajaxを実現するため「レスポンスをJSONに変更したこと」です。
    # Post.create(content: params[:content])
    # redirect_to action: :index
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  # 下記のように、posts_controller.rbにcheckedというアクションを定義しましょう。checkedアクションは、「既読」の操作を行ったときに実行されるアクションです
  def checked
    # ここで一度、メモをクリックした際に/posts/:idというエンドポイントへアクセスされているか確認してみましょう。
    # gem pry-railsを導入し、postsコントローラーのcheckedアクションにbinding.pryを記述して、メモをクリックした時に処理が止まるかを確認しましょう。
    # binding.pry
    # 先ほど設定したURLパラメーターから、既読したメモのidが渡されるように設定するので、そのidを使用して該当するレコードを取得しています。
    post = Post.find(params[:id])
    # if文で、post.checkedという既読であるか否かを判定するプロパティを指定し、既読であれば「既読を解除するためにfalseへ変更」し、
    # 既読でなければ「既読にするためtrueへ変更」します。
    # この時はupdateというActiveRecordのメソッドを使用して更新しています。
    if post.checked 
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    # 最後に、更新したレコードをitem = Post.find(params[:id])で取得し直し、
    # render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却しています。
    item = Post.find(params[:id])
    render json: { post: item }
  end

end
