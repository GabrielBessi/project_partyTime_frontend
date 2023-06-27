<template>
  <div class="profile">
    <h1>Edite seu perfil</h1>
    <RegisterForm
      page="profile"
      :user="user"
      btnText="Editar"
      :key="componentKey"
    />
  </div>
</template>

<script>
import RegisterForm from "../components/FormView.vue";

export default {
  components: { RegisterForm },
  data() {
    return {
      user: {},
      componentKey: 0,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const id = this.$store.getters.userId;
      const token = this.$store.getters.token;

      if (!token) {
        this.$router.push("login");
      }

      await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.user = data;
          this.componentKey += 1;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.profile {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
}

.profile h1 {
  margin-bottom: 40px;
}
</style>
