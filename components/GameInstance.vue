<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import Grid from "~/helpers/grid";
import { SwipeDirection, usePointerSwipe } from "@vueuse/core";

const props = defineProps<{
    gridSize: number,
    id?: number,
    reset?: boolean,
}>()

const emit = defineEmits<{
    (e: 'won', value: boolean): void
    (e: 'lost', value: boolean): void
    (e: 'score', value: number): void
    (e: 'update:reset', value: boolean): void
}>()

const data = reactive({
    gridObject: {
        grid: Grid.createEmptyGrid(props.gridSize, props.gridSize),
        getScore: () => 0,
        isGameWon: () => false,
        isGameOver: () => false,
        move: () => {
        },
    } as Grid,
});

onMounted(() => {
    if (localStorage.getItem('grid')) { // todo: use id for different sessions `grid-${props.id}`
        data.gridObject = new Grid(props.gridSize, props.gridSize, localStorage.getItem('grid') as string);
    } else {
        data.gridObject = new Grid(props.gridSize, props.gridSize);
    }

    watch(data.gridObject, () => {
        emit('score', data.gridObject.getScore());
        localStorage.setItem('grid', JSON.stringify({
            grid: data.gridObject.grid,
            score: data.gridObject.getScore(),
        }));
        if (data.gridObject.isGameWon()) {
            emit('won', true);
            localStorage.removeItem('grid');
        }
        if (data.gridObject.isGameOver()) {
            emit('lost', true);
            localStorage.removeItem('grid');
        }
    });
});

watch(() => props.reset, (value) => {
    if (value) {
        localStorage.removeItem('grid');
        data.gridObject = new Grid(props.gridSize, props.gridSize);
        emit('update:reset', false);
    }
});

// add swipe actions
const el = ref(null);
const { isSwiping, direction } = usePointerSwipe(el, {
    onSwipeEnd(e: PointerEvent, direction: SwipeDirection) {
        data.gridObject.move(direction);
    },
});
</script>

<template>
    <div>
        <div class="score">
            <div class="text-2xl">Score : {{ data.gridObject.getScore() }}</div>
        </div>
        <div
            ref="el"
            class="game w-auto relative"
        >
            <div class="grid-container gap-1">
                <div
                    v-for="(row, i) in data.gridObject.grid"
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
