<template>
  <div class="dashboard">
    <div class="title-container">
      <h1>Gerencie seus eventos</h1>
      <router-link to="/newparty" class="btn">Cadastrar Festa</router-link>
    </div>
    <div v-if="parties.length > 0">
      <data-table :parties="parties" />
    </div>
    <div v-else>
      <p>
        Você ainda não tem festas cadastradas,
        <router-link to="/newparty"
          >Clique aqui para adicionar evento</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";

export default {
  components: { DataTable },
  data() {
    return {
      parties: [],
    };
  },
  created() {
    this.getParties();
  },
  methods: {
    async getParties() {
      const token = this.$store.getters.token;

      if (!token) {
        this.$router.push("login");
      }

      await fetch("http://localhost:3000/api/party/userparties", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.parties = data.parties;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 50px;
  padding-bottom: 100px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.btn {
  padding: 10px 16px;
  background-color: #000;
  color: #fff;
  margin: 5px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: 0.5s;
  border-radius: 20px;
}

.btn:hover {
  background-color: #141619;
}
</style>
