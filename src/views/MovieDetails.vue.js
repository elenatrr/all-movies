import { getMovieDetailsData, getRecommendedMoviesData } from '@/api/axios';
import { formatNumber } from '@/utils/formatNumber';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'MovieDetails',
    setup() {
        const movieDetails = ref(null);
        const recommendedMovies = ref([]);
        const route = useRoute();
        const formattedVoteCount = ref('');
        onMounted(async () => {
            try {
                const movieDetailesResponse = await getMovieDetailsData(String(route.params.id));
                const recommendedMoviesResponse = await getRecommendedMoviesData(String(route.params.id));
                movieDetails.value = movieDetailesResponse;
                recommendedMovies.value = recommendedMoviesResponse.results;
                formattedVoteCount.value = formatNumber(movieDetailesResponse.vote_count);
            }
            catch (error) {
                console.error(`Error fetching movie detailes: ${error}`);
            }
        });
        return { movieDetails, recommendedMovies, formattedVoteCount };
    }
});
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    if (__VLS_ctx.movieDetails) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-3xl font-bold mb-2") }, });
        (__VLS_ctx.movieDetails.original_title);
        // @ts-ignore
        [movieDetails, movieDetails,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4 flex gap-8") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-1/3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ class: ("w-full mb-4 rounded-lg shadow-lg") }, src: ((`https://image.tmdb.org/t/p/w500/${__VLS_ctx.movieDetails.backdrop_path}`)), alt: ((__VLS_ctx.movieDetails.original_title)), });
        // @ts-ignore
        [movieDetails, movieDetails,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("w-2/3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        (__VLS_ctx.movieDetails.vote_average.toFixed(1));
        (__VLS_ctx.formattedVoteCount);
        // @ts-ignore
        [movieDetails, formattedVoteCount,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-lg") }, });
        (__VLS_ctx.movieDetails.overview);
        // @ts-ignore
        [movieDetails,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-bold mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4") }, });
        for (const [recommendedMovie] of __VLS_getVForSourceType((__VLS_ctx.recommendedMovies))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((recommendedMovie.id)), ...{ class: ("video-tile") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ class: ("w-full mb-4") }, src: ((`https://image.tmdb.org/t/p/w500/${recommendedMovie.poster_path}`)), alt: ((recommendedMovie.original_title)), });
            // @ts-ignore
            [recommendedMovies,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-2") }, });
            (recommendedMovie.original_title);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-2") }, });
            (recommendedMovie.overview);
        }
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-8'];
        __VLS_styleScopedClasses['w-1/3'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-lg'];
        __VLS_styleScopedClasses['w-2/3'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['grid-cols-1'];
        __VLS_styleScopedClasses['sm:grid-cols-2'];
        __VLS_styleScopedClasses['md:grid-cols-3'];
        __VLS_styleScopedClasses['lg:grid-cols-4'];
        __VLS_styleScopedClasses['gap-4'];
        __VLS_styleScopedClasses['video-tile'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['mt-2'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = 'MovieDetails';
    let __VLS_internalComponent;
}
//# sourceMappingURL=MovieDetails.vue.js.map