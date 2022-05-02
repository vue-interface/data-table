<template>
    <tbody>
        <tr>
            <td :colspan="colspan">
                <div class="data-table-placeholder">
                    <h3 v-if="title" class="data-table-placeholder-title">
                        {{ title }}
                    </h3>
                    <h4 v-if="subtitle" class="data-table-placeholder-subtitle">
                        {{ subtitle }}
                    </h4>
                    <div class="data-table-placeholder-content">
                        <slot />
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        colspan: Number,
        title: String,
        subtitle: String,
    }
};
</script>

<style>
.data-table-placeholder {
    text-align: center;
    padding: 2rem 0;
}
.data-table-placeholder .data-table-placeholder-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
}
.data-table-placeholder .data-table-placeholder-subtitle {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 1rem;
}
.data-table-placeholder-content {
    display: flex;
    justify-content: center;
}
</style>