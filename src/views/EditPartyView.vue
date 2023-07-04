<template>
  <div class="editParty">
    <PartyForm
      :party="party"
      page="editparty"
      btnText="Editar Festa"
      :key="componentKey"
    />
  </div>
</template>

<script>
import PartyForm from "../components/PartyForm.vue";

export default {
  components: {
    PartyForm,
  },
  data() {
    return {
      party: {},
      componentKey: 0,
    };
  },
  created() {
    this.getParty();
  },
  methods: {
    async getParty() {
      const id = this.$route.params.id;
      const token = this.$store.getters.token;

      await fetch(`http://localhost:3000/api/party/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.party = data;

          this.party.partyDate = this.party.partyDate;

          this.party.photos.forEach((photo, index) => {
            this.party.photos[index] = photo.replace(
              "public",
              "http://localhost:3000"
            );

            this.componentKey += 1;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.editParty {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
}

.editParty h1 {
  margin-bottom: 40px;
}
</style>
