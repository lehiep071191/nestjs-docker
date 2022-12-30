
export const getSort = (sortLabel: string) => {
    if(sortLabel[0] === '-') {
        const sort = sortLabel
        return {
            sort: -1
        }
    } else {
        return {
            sortLabel: 1
        }
    }
}