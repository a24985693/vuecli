<template>
  <footer class="bg-info mt-5">
    <div class="container py-5">
      <div class="row justify-content-center align-items-center mb-5">
        <div class="col-2">
          <img src="../assets/images/footerLogo.png" alt="" width="150px">
        </div>
        <div class="col-5">
          <ul class="list-unstyled fs-5">
            <li class="mb-3">huahuaworld@gmail.com</li>
            <li>0955-555-123</li>
          </ul>
          <div class="fs-4">
            <a href="#" class="link-dark">
              <i class="bi bi-line mx-2"></i>
              <span class="d-none">1</span>
            </a>
            <a href="#" class="link-dark">
              <i class="bi bi-facebook mx-2"></i>
              <span class="d-none">1</span>
            </a>
            <a href="#" class="link-dark">
              <i class="bi bi-instagram mx-2"></i>
              <span class="d-none">1</span>
            </a>
          </div>
        </div>
        <div class="col">
          <h3 class="fw-bold">想收到最新消息嗎?</h3>
          <h3 class="fw-bold mb-3">立即訂閱!</h3>
          <div class="input-group">
            <input type="text" class="form-control"
              placeholder="請輸入電子信箱">
            <button class="btn btn-secondary">訂閱</button>
          </div>
        </div>
      </div>
      <div class="text-center">
          ⓒ 2024 huahuaworld All rights reserved. 練習用無商業用途 |
          <router-link class="link-dark" to="/login">後台登入</router-link>
      </div>
    </div>
  </footer>
</template>
