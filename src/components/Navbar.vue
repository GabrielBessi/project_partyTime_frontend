<template>
  <div id="nav">
    <RouterLink to="/">
      <img src="../../public/img/partytimelogo.png" alt="Party time" />
    </RouterLink>
    <h2 id="nav-title">Party Time</h2>
    <div id="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/login" v-show="!authenticated">Entrar</router-link>
      <router-link to="/register" v-show="!authenticated"
        >Cadastrar</router-link
      >
      <router-link to="/dashboard" v-show="authenticated"
        >Dashboard</router-link
      >
      <router-link to="/profile" v-show="authenticated"
        >Confgurações</router-link
      >
      <button @click="logout($event)" v-show="authenticated">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  methods: {
    logout(event) {
      event.preventDefault();
      this.$store.commit("logout");

      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(["authenticated"]),
  },
};
</script>

<style scoped>
#nav {
  display: flex;

  align-items: center;
  justify-content: space-between;
  padding: 20px;

  border-bottom: 1px solid #eee;
}

#nav a {
  text-decoration: none;
  margin-right: 15px;
}

#nav img {
  width: 35px;
}

#nav-title {
  font-size: 3rem;
  font-weight: 300;
}

/* #logo-container,
#nav-links {
  width: 400px;
} */

#nav-links {
  display: flex;
  justify-content: flex-end;
}

button {
  background-color: #fff;
  border: none;

  font-size: 16px;
  cursor: pointer;
}

bottom:hover {
  color: #c1b696;
}
</style>
