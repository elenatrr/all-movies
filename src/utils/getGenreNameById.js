export function getGenreNameById(genres, id) {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : null;
}
//# sourceMappingURL=getGenreNameById.js.map