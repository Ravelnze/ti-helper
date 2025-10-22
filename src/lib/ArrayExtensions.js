/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

Array.prototype.exclude = function (existing) {
    return this.filter((t) => !existing.map((e) => e.id).includes(t.id));
};

Array.prototype.excludeSingle = function (existing) {
    return this.filter(
        (t) => !existing.map(([k, v]) => v[0].id).includes(t.id) || t.multiple
    );
};

Array.prototype.sortFactionTitles = function () {
    return this.sort((a, b) => {
        const aTitleParts = a.title.split("The ");
        const aTitle = aTitleParts.length > 1 ? aTitleParts[1] : a.title;

        const bTitleParts = b.title.split("The ");
        const bTitle = bTitleParts.length > 1 ? bTitleParts[1] : b.title;

        return aTitle > bTitle;
    });
};
