<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />
    <form action="" id="user-form">
      <div class="input-container">
        <label for="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="name"
          placeholder="Digite seu nome"
        />
      </div>
      <div class="input-container">
        <label for="email">E-mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="email"
          placeholder="Digite seu e-mail"
        />
      </div>
      <div class="input-container">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="name"
          placeholder="Digite sua senha"
        />
      </div>
      <div class="input-container">
        <label for="confirmPassword">Senha:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirme sua senha"
        />
      </div>
      <inputSubmit :text="btnText" />
    </form>
  </div>
</template>

<script>
import inputSubmit from "./form/inputSubmit.vue";
import Message from "./MessageView.vue";

export default {
  name: "RegisterForm",
  components: { inputSubmit, Message },
  props: ["user", "page", "btnText"],
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      msg: null,
      msgClass: null,
    };
  },
};
</script>

<style scoped></style>
