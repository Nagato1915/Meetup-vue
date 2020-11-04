<template>
    <div class="edit-box">
        <font-awesome-icon class="edit" icon="pen" />
    </div>
</template>

<style scoped>
.edit-box {
    width: 2.6rem;
    height: 2.6rem;
    background: rgba(203, 224, 233, 0.479);
    border-radius: 50%;
    box-shadow: 1px 2px 4px grey ;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
}

.edit-box:active {
    transform: scale(.95);
}

.edit {
    font-size: 1.4rem;
}


</style>