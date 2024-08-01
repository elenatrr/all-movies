import MovieTile from '@/components/MovieTile.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { getMoviesData } from '@/api/axios';
export default defineComponent({
    name: 'MovieList',
    components: { MovieTile },
    setup() {
        const movies = ref([]);
        const currentPage = ref(1);
        const totalPages = ref(1);
        const isLoading = ref(false);
        const category = ref('popular');
        const fetchMovies = async (page = 1) => {
            if (isLoading.value || currentPage.value > totalPages.value) {
                return;
            }
            isLoading.value = true;
            try {
                const moviesData = await getMoviesData(category.value, page);
                if (page === 1) {
                    movies.value = moviesData.results;
                }
                else {
                    movies.value = [...movies.value, ...moviesData.results];
                }
                currentPage.value = page;
                totalPages.value = moviesData.total_pages;
            }
            catch (error) {
                console.error(`Error fetching movies: ${error}`);
            }
            finally {
                isLoading.value = false;
            }
        };
        const loadMoreMovies = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                fetchMovies(currentPage.value + 1);
            }
        };
        onMounted(() => {
            fetchMovies();
            window.addEventListener('scroll', loadMoreMovies);
        });
        return { movies, isLoading, fetchMovies };
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-2xl mb-6 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6") }, });
    for (const [movie] of __VLS_getVForSourceType((__VLS_ctx.movies))) {
        // @ts-ignore
        const __VLS_0 = {}
            .MovieTile;
        ({}.MovieTile);
        __VLS_components.MovieTile;
        // @ts-ignore
        [MovieTile,];
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ key: ((movie.id)), movie: ((movie)), }));
        const __VLS_2 = __VLS_1({ key: ((movie.id)), movie: ((movie)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ key: ((movie.id)), movie: ((movie)), }));
        const __VLS_5 = __VLS_nonNullable(__VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2));
        // @ts-ignore
        [movies,];
    }
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-center mt-4") }, });
        // @ts-ignore
        [isLoading,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['mb-6'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['grid-cols-1'];
        __VLS_styleScopedClasses['sm:grid-cols-2'];
        __VLS_styleScopedClasses['md:grid-cols-3'];
        __VLS_styleScopedClasses['lg:grid-cols-4'];
        __VLS_styleScopedClasses['xl:grid-cols-5'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['mt-4'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = { MovieTile };
    const __VLS_name = 'MovieList';
    let __VLS_internalComponent;
}
//# sourceMappingURL=MovieList.vue.js.map