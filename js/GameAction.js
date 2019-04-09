class GameAction {
    static NEXT_LEVEL = () => {
        if (levels[actualLevel+1]) {
            actualLevel ++;
            perso.reload();
        }
    };
    static PREV_LEVEL = () => {
        actualLevel --;
    };
}
