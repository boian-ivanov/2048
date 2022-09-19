<script setup lang="ts">
import { SwipeDirection, usePointerSwipe } from '@vueuse/core'
import { ref, reactive, computed } from 'vue';
import Grid from "~/helpers/grid";

// initialize a grid of 6x6 cells
let gridSize = 6;
const gridObject = reactive(new Grid(gridSize, gridSize));
gridObject.init();
let grid = computed(() => gridObject.get());

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
        <div class="w-full h-full flex flex-col justify-center items-center relative z-20">
            <div class="flex flex-col mb-1">
                <span class="text-indigo-500 text-4xl text-center">2048 Game</span>
            </div>
            <div class="score">
                <div class="text-2xl">Score : {{ gridObject.getScore() }}</div>
            </div>
            <div
                ref="el"
                class="game w-[291px] relative mb-3"
            >
                <div class="grid-container z-10 gap-0">
                    <div
                        v-for="(row, index) in grid"
                        :key="index"
                        class="row grid grid-cols-6 gap-0"
                    >
                        <div
                            v-for="(value, i) in row"
                            :key="i"
                            class="col w-12 h-12 rounded flex items-center justify-center border border-black"
                        >
                            <div class="text-2xl">{{ value }}</div>
                        </div>
                    </div>
                </div>
                <!--                <div class="tiles absolute z-20">-->
                <!--                    <div-->

                <!--                        class="border border-black flex h-12 items-center justify-center rounded tile tile-position-0-0 w-12 bg-orange-100 tile-merged"-->
                <!--                    >-->
                <!--                        <div class="text-2xl"> 4</div>-->
                <!--                    </div>-->
                <!--                    <div-->

                <!--                        class="border border-black flex h-12 items-center justify-center rounded tile w-12 bg-orange-400 tile-merged tile-position-0-1"-->
                <!--                    >-->
                <!--                        <div class="text-2xl"> 32</div>-->
                <!--                    </div>-->
                <!--                    <div-->

                <!--                        class="border border-black flex h-12 items-center justify-center rounded tile w-12 bg-orange-100 tile-merged tile-position-0-2"-->
                <!--                    >-->
                <!--                        <div class="text-2xl"> 4</div>-->
                <!--                    </div>-->
                <!--                    <div-->

                <!--                        class="border border-black flex h-12 items-center justify-center rounded tile tile-position-0-3 w-12 bg-orange-200 tile-merged"-->
                <!--                    >-->
                <!--                        <div class="text-2xl"> 8</div>-->
                <!--                    </div>-->
                <!--                    <div-->

                <!--                        class="border border-black flex h-12 items-center justify-center rounded tile w-12 bg-orange-200 tile-merged tile-position-1-3"-->
                <!--                    >-->
                <!--                        <div class="text-2xl"> 8</div>-->
                <!--                    </div>-->
                <!--                    <div-->

                <!--                        class="border border-black flex h-12 items-center justify-center rounded tile tile-position-2-0 w-12 bg-gray-100 tile-appear"-->
                <!--                    >-->
                <!--                        <div class="text-2xl"> 2</div>-->
                <!--                    </div>-->
                <!--                    <div-->

                <!--                        class="border border-black flex h-12 items-center justify-center rounded tile tile-position-2-3 w-12 bg-gray-100 tile-appear"-->
                <!--                    >-->
                <!--                        <div class="text-2xl"> 2</div>-->
                <!--                    </div>-->
                <!--                </div>-->
            </div>
        </div>
    </div>
</template>
