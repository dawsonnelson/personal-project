const initialState = {
    sideDrawerOpen: false,
    inputBar: null,
}

const UPDATE_SIDEDRAWEROPEN = 'UPDATE_SIDEDRAWEROPEN';
const UPDATE_INPUTBAR = 'UPDATE_INPUTBAR';

function reducer( state = initialState, action) {
    console.log('REDUCER HIT: Action ->', action );
    switch( action.type ){
        case UPDATE_SIDEDRAWEROPEN:
            return Object.assign( {}, state, { sideDrawerOpen: !state.sideDrawerOpen });

        case UPDATE_INPUTBAR:
            return Object.assign( {}, state, {inputBar: action.payload });

            default: return state
    }
}

export function updateSideDrawerOpen (){
    return {
        type: UPDATE_SIDEDRAWEROPEN,
        payload: null
    };
}

export function updateInputBar (inputBar){
    return{
        type: UPDATE_INPUTBAR,
        payload: inputBar
    }
}

export default reducer;