<template>
  <div class="el-row">
    <div class="el-col el-col-24">
      <div class="comp">
        <div class="tmpl routeanimate">
          <div class="section">
            <div class="location">
              <span>当前位置：</span>
              <a href="/index.html">首页</a> &gt;
              <router-link to="/vipCenter">会员中心</router-link>
            </div>
          </div>
          <div class="section clearfix">
            <div class="left-260">
              <div class="bg-wrap">
                <div class="avatar-box">
                  <a href="/user/center/avatar.html" class="img-box">
                    <i class="iconfont icon-user-full"></i>
                  </a>
                  <h3>ivanyb</h3>
                  <p>
                    <b>注册会员</b>
                  </p>
                </div>
                <div class="center-nav">
                  <ul>
                    <li>
                      <h2>
                        <i class="iconfont icon-order"></i>
                        <span>订单管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <router-link to="myOrder" class>
                            <i class="iconfont icon-arrow-right"></i>交易订单
                          </router-link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>
                        <i class="iconfont icon-user"></i>
                        <span>账户管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <router-link to="accountInfo" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>账户资料
                          </router-link>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置
                          </a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>修改密码
                          </a>
                        </p>
                        <p>
                          <a href="javascript:void(0)">
                            <i class="iconfont icon-arrow-right"></i>退出登录
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="right-auto">
              <div class="bg-wrap" style="min-height: 765px;">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
