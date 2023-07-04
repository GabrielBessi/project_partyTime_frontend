<template>
  <div class="party-form">
    <Message :msg="msg" :msgClass="msgClass" />
    <form
      id="party-form"
      enctype="multipart/form-data"
      @submit="page === 'newparty' ? createParty($event) : update($event)"
    >
      <input type="hidden" name="id" id="id" v-model="id" />
      <input type="hidden" name="user_id" user_id="user_id" v-model="user_id" />
      <div class="input-container">
        <label for="title">Título do evento</label>
        <input
          type="text"
          name="title"
          id="title"
          v-model="title"
          placeholder="Digite o título"
        />
      </div>
      <div class="input-container">
        <label for="description">Descrição:</label>
        <textarea
          name="description"
          id="description"
          v-model="description"
          placeholder="Descrição do evento"
        ></textarea>
        <div class="input-container">
          <label for="party_date">Data da festa:</label>
          <input
            type="date"
            name="party_date"
            id="party_date"
            v-model="party_date"
          />
        </div>
        <div class="input-container">
          <label for="photos">Imagens:</label>
          <input
            type="file"
            multiple="multiple"
            name="photos"
            id="photos"
            ref="file"
            @change="onChange"
          />
        </div>
        <div v-if="page === 'editparty' && showMiniImages" class="mini-images">
          <p>Imagens atuais:</p>
          <img
            v-for="(photo, index) in photos"
            :src="`${photo}`"
            alt=""
            :key="index"
          />
        </div>
        <div class="input-container checkbox-container">
          <label for="privacy">Evento privado:</label>
          <input
            type="checkbox"
            name="privacy"
            id="privacy"
            v-model="privacy"
          />
        </div>
      </div>
      <inputSubmit :text="btnText" />
    </form>
  </div>
</template>

<script>
import Message from "./MessageView.vue";
import inputSubmit from "./form/inputSubmit.vue";

export default {
  name: "PartyForm",
  props: ["party", "page", "btnText"],
  components: {
    inputSubmit,
    Message,
  },
  data() {
    return {
      id: this.party._id || null,
      title: this.party.title || null,
      description: this.party.description || null,
      party_date: this.party.partyDate || null,
      photos: this.party.photos || [],
      privacy: this.party.privacy || false,
      user_id: this.party.userId || null,
      msg: null,
      msgClass: null,
      showMiniImages: true,
    };
  },
  methods: {
    async createParty(event) {
      event.preventDefault();

      const id = this.$store.getters.userId;
      const token = this.$store.getters.token;

      if (!token) {
        this.$router.push("login");
      }

      const formData = new FormData();

      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("partyDate", this.party_date);
      formData.append("privacy", this.privacy);

      console.log(formData);

      if (this.photos.length > 0) {
        for (const i of Object.keys(this.photos)) {
          formData.append("photos", this.photos[i]);
        }
      }

      await fetch("http://localhost:3000/api/party", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            this.msg = data.message;
            this.msgClass = "success";
          }

          setTimeout(() => {
            this.msg = null;

            if (!data.error) {
              this.$router.push("dashboard");
            }
          }, 2000);
        });
    },

    onChange(event) {
      this.photos = event.target.files;
      this.showMiniImages = false;
    },

    async update(event) {
      event.preventDefault();
      const id = this.$store.getters.userId;
      const token = this.$store.getters.token;

      if (!token) {
        this.$router.push("login");
      }
      const formData = new FormData();
      console.log(this);

      formData.append("id", this.id);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("partyDate", this.party_date);
      formData.append("privacy", this.privacy);
      formData.append("user_id", this.user_id);

      if (this.photos.length > 0) {
        for (const i of Object.keys(this.photos)) {
          formData.append("photos", this.photos[i]);
        }
      }

      await fetch("http://localhost:3000/api/party", {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            this.msg = data.message;
            this.msgClass = "success";
          }

          setTimeout(() => {
            this.msg = null;
          }, 2000);
        });
    },
  },
};
</script>

<style scoped>
#party-form {
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

.input-container input,
.input-container textarea {
  padding: 10px;
  border: 1px solid #e8e8e8;

  border-radius: 20px;
}

.checkbox-container {
  flex-direction: row;
}

.checkbox-container input {
  margin-left: 12px;
  margin-top: 3px;
}

.mini-images {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0px;
}

.mini-images p {
  width: 100%;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
}

.mini-images img {
  height: 50px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
