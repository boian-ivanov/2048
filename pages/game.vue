<script setup lang="ts">
import { SwipeDirection, usePointerSwipe } from '@vueuse/core'
import { ref, reactive, computed } from 'vue';
import Grid from "~/helpers/grid";

// initialize a grid of 6x6 cells
let gridSize = 6;
const gridObject = reactive(new Grid(gridSize, gridSize));
let grid = computed(() => gridObject.get());

// add swipe actions
const el = ref(null);
const { isSwiping, direction } = usePointerSwipe(el, {
    onSwipeEnd(e: PointerEvent, direction: SwipeDirection) {
        gridObject.move(direction);
    },
});

const restartGame = () => window.location.reload();
</script>

<template>
    <div>
        <div v-show="gridObject.isGameOver()">
            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="max-w-sm p-6 bg-white ">
                    <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Game Over</h3>
                    </div>
                    <div class="mt-4">
                        <button
                            class="px-4 py-2 text-white bg-green-600 rounded"
                            @click="restartGame"
                        >
                            Play again
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="gridObject.isGameWon()">
            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="max-w-sm p-6 bg-white ">
                    <div class="flex flex-col items-center justify-between">
                        <h3 class="text-2xl">You have won! 🎉</h3>
                        <h4 class="text-xl">Your score: {{ gridObject.getScore() }}</h4>
                    </div>
                    <div class="mt-4">
                        <button
                            class="px-4 py-2 text-white bg-green-600 rounded"
                            @click="restartGame"
                        >
                            Play again
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-full flex flex-col justify-center items-center relative z-20">
            <div class="flex flex-col mb-1">
                <span class="text-indigo-500 text-4xl text-center">2048</span>
            </div>
            <div class="score">
                <div class="text-2xl">Score : {{ gridObject.getScore() }}</div>
            </div>
            <div
                ref="el"
                class="game w-auto relative"
            >
                <div class="grid-container gap-1">
                    <div
                        v-for="(row, i) in grid"
                        :key="`row-${i}`"
                        class="row grid grid-cols-6 gap-1 mb-1"
                    >
                        <div
                            v-for="(value, j) in row"
                            :key="`${i}-${j}`"
                            :class="`col w-12 h-12 rounded flex items-center justify-center tile-${value}`"
                        >
                            <div class="text-2xl text-white select-none">{{ value }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.fade-in-enter-active {
  transition: all 0.5s ease;
}

.fade-in-leave-active {
  transition: all 0.5s ease;
}

.fade-in-enter, .fade-in-leave-to {
  position: absolute; /* add for smooth transition between elements */
  opacity: 0;
}

$tiles: (
        "null": #89B6A2,
        1: #78AD62,
        2: #00AB9F,
        4: #0073B7,
        8: #24338E,
        16: #B480AD,
        32: #94218C,
        64: #12B075,
        128: #F7C242,
        256: #F7A642,
        512: #F77F42,
        1024: #F75F42,
        2048: #F73F42,
);

@each $key, $value in $tiles {
  .tile-#{$key} {
    background-color: $value;
  }
}
</style>
