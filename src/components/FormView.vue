<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />
    <form
      id="user-form"
      @submit="page === 'register' ? register($event) : update($event)"
    >
      <input type="hidden" name="id" id="id" v-model="id" />
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
          v-model="password"
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
import { mapMutations } from "vuex";

export default {
  name: "RegisterForm",
  components: { inputSubmit, Message },
  props: ["user", "page", "btnText"],
  data() {
    return {
      id: this.user._id || null,
      name: this.user.name || null,
      email: this.user.email || null,
      password: null,
      confirmPassword: null,
      msg: null,
      msgClass: null,
    };
  },
  methods: {
    ...mapMutations(["authenticate"]),
    async register(event) {
      event.preventDefault();

      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      const jsonData = JSON.stringify(data);

      await fetch("httplocalhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: jsonData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          let auth = false;

          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            auth = true;
            this.msg = data.message;
            this.msgClass = "success";

            this.$store.commit("authenticate", {
              token: data.token,
              userId: data.userId,
            });
          }

          const getToken = localStorage.getItem("vuex");
          const { token } = JSON.parse(getToken);

          setTimeout(() => {
            if (!token) {
              this.msg = null;
            } else {
              this.$router.push("dashboard");
            }
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async update(event) {
      event.preventDefault();
      const data = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      const jsonData = JSON.stringify(data);
      const token = this.$store.getters.token;

      await fetch(`http://localhost:3000/api/user`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: jsonData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            this.msg = "Usuário atualizado com sucesso !";
            this.msgClass = "success";
          }
          setTimeout(() => {
            this.msg = null;
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#user-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  border-radius: 20px;
  padding: 1.7%;

  background: #f5f5f5;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #f2f2f2;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
}

.input-container label {
  margin-bottom: 10px;
  color: #555;
}

.input-container input {
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
}
</style>
