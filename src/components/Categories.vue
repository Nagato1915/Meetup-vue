<template>

    <div v-if="categories" class="categories-container" >
        <div class="category" v-for="category in categories" :key="category.id" @click="to(category.id)">
            <div class="category-img-box">
                <img class="category-img" :src="category.img" :alt="category.title">
            </div>
            <h4 class="category-title">{{ category.title }}</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Categories',
    props: ['id'],
    computed: {
        categories() {
            return this.$store.getters.categories
        }
    },
    methods: {
        to(categoryId) {
            this.$router.push('/categories/' + categoryId)
        }
    }
}
</script>

<style scoped>

.categories-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
}

.category {
    margin: .5rem auto;
    cursor: pointer;
    transition: all .2s;
}

.category:hover {
    transform: translateY(-5px);
}

.category-img-box {
    width: 250px;
    height: 170px;
    margin-bottom: .3rem;
}

.category-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}

</style>