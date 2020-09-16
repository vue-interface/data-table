<template>
    <div class="data-table-animated-gradient" :class="{ pulse, rounded, wave }" />
</template>

<script>
import { unit } from '@vue-interface/utils';

export default {
    props: {
        pulse: Boolean,
        wave: Boolean,
        rounded: Boolean,
        height: [String, Number]
    }
};
</script>

<style>
@keyframes data-table-animated-gradient-pulse {
  0%{
    background-color: rgba(165, 165, 165, .1);
  }
  50%{
    background-color: rgba(165, 165, 165, .3);
  }
  100%{
    background-color: rgba(165, 165, 165, .1);
  }
}

@keyframes data-table-animated-gradient-wave {
    100% {
        transform: translateX(100%);
    }
}

.data-table-animated-gradient {
    height: 1.5rem;
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
}


.data-table-animated-gradient.rounded{
    border-radius: .25rem;
}

.data-table-animated-gradient.pulse {
    animation: data-table-animated-gradient-pulse 1s infinite ease-in-out;
}
.data-table-animated-gradient.wave {
    background:rgba(0, 0, 0, .025); 
}

.data-table-animated-gradient.wave::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(90deg, rgba(255, 255, 255, .05) 5%, rgba(0, 0, 0, .1), rgba(255, 255, 255, .05) 95%);
    animation: data-table-animated-gradient-wave 1.5s infinite ease-in-out;
}
</style>