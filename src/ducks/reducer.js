const initialState = {
    sideDrawerOpen: false,
    inputBar: null,
    room: "",
}

const UPDATE_SIDEDRAWEROPEN = 'UPDATE_SIDEDRAWEROPEN';
const UPDATE_INPUTBAR = 'UPDATE_INPUTBAR';
const UPDATE_ROOM = 'UPDATE_ROOM';

function reducer( state = initialState, action) {
    console.log('REDUCER HIT: Action ->', action );
    switch( action.type ){
        case UPDATE_SIDEDRAWEROPEN:
            return Object.assign( {}, state, { sideDrawerOpen: !state.sideDrawerOpen });

        case UPDATE_INPUTBAR:
            return Object.assign( {}, state, {inputBar: action.payload });

        case UPDATE_ROOM:
            return Object.assign( {}, state, {room: action.payload });

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

export function updateRoom (room){
    return{
        type: UPDATE_ROOM,
        payload: room
    }
}

export default reducer;