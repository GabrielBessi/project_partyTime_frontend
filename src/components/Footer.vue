<template>
  <footer>
    <h3>Party Time &copy; 2023</h3>
    <p>O melhor lugar para compartilhar seus eventos</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;

  background-color: #25282e;
  height: 300px;

  align-items: center;
  justify-content: center;
}

footer h3 {
  color: #fff;
  margin-bottom: 15px;
  font-weight: 300;
  font-size: 1.6rem;
}

footer p {
  color: #c1b696;
}
</style>
