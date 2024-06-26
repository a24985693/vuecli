<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <Form v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="inputEmail" class="form-label">Email</label>
          <Field type="email" class="form-control" id="inputEmail"
            :class="{ 'is-invalid': errors['email'] }"
            rules="email|required" name="email"
            placeholder="請輸入Email"
            v-model="form.user.email"></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="inputName" class="form-label">收件人姓名</label>
          <Field type=" text" class="form-control" id="inputName"
            :class="{ 'is-invalid': errors['姓名'] }"
            rules="required" name="姓名"
            placeholder="請輸入姓名"
            v-model="form.user.name"></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="inputPhone" class="form-label">收件人電話</label>
          <Field type="tel" class="form-control" id="inputPhone"
            :class="{ 'is-invalid': errors['電話'] }"
            rules="required" name="電話"
            placeholder="請輸入電話"
            v-model="form.user.tel"></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="inputAddress" class="form-label">收件人地址</label>
          <Field type="text" class="form-control" id="inputAddress"
            :class="{ 'is-invalid': errors['地址'] }"
            rules="required" name="地址"
            placeholder="請輸入地址"
            v-model="form.user.address"></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="inputComment" class="form-label">留言</label>
          <textarea type="email" class="form-control" id="inputComment"
            v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary">送出表單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    createOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, { data: this.form })
        .then((res) => {
          console.log(res);
          this.$router.push(`/user/checkout/${res.data.orderId}`);
        });
    },
  },
  created() {
  },
};
</script>
