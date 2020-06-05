class GameAction {
    static NEXT_LEVEL = 0;
    static PREV_LEVEL = 1;

    static getById(action) {
        if (action == 0) {
            return () => {
                // if (levels[actualLevel+1]) {
                //     actualLevel ++;
                //     perso.reload();
                // }
            };
        } else if (action == 1) {
            () => {
                // if (levels[actualLevel+1]) {
                //     actualLevel --;
                //     perso.reload();
                // }
            };
        }
        return null;
    }
}
