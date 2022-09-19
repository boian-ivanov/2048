<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import Grid from "~/helpers/grid";
import { SwipeDirection, usePointerSwipe } from "@vueuse/core";

const props = defineProps<{
    gridSize: number,
    id?: number,
}>()

const emit = defineEmits<{
    (e: 'won', value: boolean): void
    (e: 'lost', value: boolean): void
    (e: 'score', value: number): void
}>()

const gridObject = reactive(new Grid(props.gridSize, props.gridSize));
let grid = computed(() => gridObject.get());

watch(gridObject, () => {
    emit('score', gridObject.getScore());
    if (gridObject.isGameWon()) {
        emit('won', true);
    }
    if (gridObject.isGameOver()) {
        emit('lost', true);
    }
});

// add swipe actions
const el = ref(null);
const { isSwiping, direction } = usePointerSwipe(el, {
    onSwipeEnd(e: PointerEvent, direction: SwipeDirection) {
        gridObject.move(direction);
    },
});
</script>

<template>
    <div>
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
</template>
