<template>
  <div class="register">
    <h1>Criar uma conta</h1>
    <FormView :user="{}" page="register" btnText="Cadastrar" />
  </div>
</template>

<script>
import FormView from "../components/FormView.vue";

export default {
  name: "Register",
  components: { FormView },
};
</script>

<style scoped>
.register {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
}

.register h1 {
  margin-bottom: 40px;
}
</style>
