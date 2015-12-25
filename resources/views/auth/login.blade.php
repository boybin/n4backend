<div ng-controller="AuthController as auth">
<div class="col-sm-4 col-sm-offset-4">
    <div class="well" style="margin-top:100px;">
        <h4>沈阳世佳物流有限公司租赁管理系统</h4>
        <h3>登录</h3>
        <form>
            <div class="form-group">
                <input type="email" class="form-control" placeholder="登录邮箱" ng-model="auth.email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="密码" ng-model="auth.password">
            </div>
            <div ng-show="auth.loginError" style="color:red">
              登录失败,用户名或密码错误
            </div>
            <button class="btn btn-primary" ng-click="auth.login()">登录</button>
        </form>
    </div>
</div>
</div>
