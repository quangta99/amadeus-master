import { FECTH_GAME, ORDER_GAME, SEARCH_GAME } from "./type";
export const  fetchGames = () => async(dispacth) => {
    const res = await fetch("https://amadeuss.herokuapp.com/products");
    const data = await res.json();
    dispacth({
        type: FECTH_GAME,
        payload: data,
    })
}
export const sortGames =(filteredGame, sort) => (dispacth) => {
    const sortedGames = filteredGame;
    if(sort === "highest") {
        sortedGames.sort((a,b) => (a.price < b.price ? 1 : -1 ));
    }
    else if(sort === "lowest") {
        sortedGames.sort((a,b) => (a.price > b.price ? 1 : -1));
    }
    dispacth({
        type: ORDER_GAME,
        payload: {
            items: sortedGames
        }
    })
}
export const searhGames = (filteredGame, searchKey) => (dispacth) => {
    const games = filteredGame;
    let resultList = [];
    games.forEach(item => {
        if(item.name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())){
            resultList.push(item);
        }
    })
    if(resultList.length === 0) {
        resultList = games;
    }
    dispacth({
        type: SEARCH_GAME,
        payload: resultList
    })
}