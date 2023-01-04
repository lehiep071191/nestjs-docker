
export const getSort = (sortLabel: string) => {
    const sort: any = {

    }
    if(sortLabel[0] === '-') {
        let sortName = sortLabel.substring(1, sortLabel.length)
        sort[sortName] = -1
    } else {
        sort[sortLabel] = 1
    }

    return sort
}