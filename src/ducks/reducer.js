const initialState = {
    sideDrawerOpen: false
}

const UPDATE_SIDEDRAWEROPEN = 'UPDATE_SIDEDRAWEROPEN';

function reducer( state = initialState, action) {
    
    switch( action.type ){
        case UPDATE_SIDEDRAWEROPEN:
            return Object.assign( {}, state, { sideDrawerOpen: !state.sideDrawerOpen });

            default: return state
    }
}

export function updateSideDrawerOpen (){
    return {
        type: UPDATE_SIDEDRAWEROPEN,
        payload: null
    };
}

export default reducer;