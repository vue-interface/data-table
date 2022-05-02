<template>
    <tbody>
        <tr>
            <td :colspan="colspan">
                <div class="data-table-placeholder">
                    <h3 v-if="title">
                        {{ title }}
                    </h3>
                    <h4 v-if="subtitle" class="font-weight-light">
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
.data-table-placeholder > h3 {
    font-size: 2.5rem;
}
.data-table-placeholder > h4 {
    font-size: 1.5rem;
    font-weight: normal;
}
.data-table-placeholder-content {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
}
</style>