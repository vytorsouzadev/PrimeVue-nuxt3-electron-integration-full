<template>
    <div >
        <!-- <Transition name="fade">
        <div v-if="loadingStore.isLoading" class="is-loading-progress-bar">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>
        </Transition> -->
             <!-- Using animate.css classes directly -->
              <Transition 
            enter-active-class="animate__animated animate__fadeIn animate__slower animate__delay-1s"
            leave-active-class="animate__animated animate__fadeOut animate__slower animate__delay-1s">
            <div v-if="loadingStore.isLoading" class="is-loading-progress-bar">
                <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
            </div>
        </Transition>
    </div>
</template>

<script setup>

const loadingStore = useLoadingStore()

</script>


// <style scoped lang="scss">

@import 'animate.css';
// .fade-enter-active,
// .fade-leave-active {
//     transition: opacity 0.3s ease;
// }

// .fade-enter-from,
// .fade-leave-to {
//     opacity: 0;
// }

// .is-loading-progress-bar {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     z-index: 9999;
// }


</style>