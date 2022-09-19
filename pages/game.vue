<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GameInstance from "~/components/GameInstance.vue";

// initialize a grid of 6x6 cells
let gridSize = 6;

const hasWon = ref(false);
const hasLost = ref(false);
const score = ref(0);

const restartGame = () => window.location.reload();

onMounted(() => {
    document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive:false });
})
</script>

<template>
    <div>
        <div v-show="hasLost">
            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="max-w-sm p-6 bg-white ">
                    <div class="flex flex-col items-center justify-between">
                        <h3 class="text-2xl">Game Over</h3>
                        <h4 class="text-xl">Your score: {{ score }}</h4>
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
        <div v-show="hasWon">
            <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="max-w-sm p-6 bg-white ">
                    <div class="flex flex-col items-center justify-between">
                        <h3 class="text-2xl">You have won! 🎉</h3>
                        <h4 class="text-xl">Your score: {{ score }}</h4>
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
            <game-instance
                @won="hasWon = true"
                @lost="hasLost = true"
                @score="score = $event"
                :gridSize="gridSize"
            />
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
