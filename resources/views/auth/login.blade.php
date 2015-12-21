<div ng-controller="AuthController as auth">
<div class="col-sm-4 col-sm-offset-4">
    <div class="well">
        <h3>登录</h3>
        <form>
            <div class="form-group">
                <input type="email" class="form-control" placeholder="登录邮箱" ng-model="auth.email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="密码" ng-model="auth.password">
            </div>
            <div ng-show="auth.loginError">
              登录失败,用户名或密码错误
            </div>
            <button class="btn btn-primary" ng-click="auth.login()">登录</button>
        </form>
    </div>
</div>
</div>
