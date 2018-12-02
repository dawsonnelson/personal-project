const initialState = {
    sideDrawerOpen: false,
    inputBar: null,
    room: "",
    userName: "",
    passWord: "",
    userId: 0,
    showButton: true,
    roomMessages: []
}

const UPDATE_SIDEDRAWEROPEN = 'UPDATE_SIDEDRAWEROPEN';
const UPDATE_INPUTBAR = 'UPDATE_INPUTBAR';
const UPDATE_ROOM = 'UPDATE_ROOM';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const RESET_INPUT = 'RESET_INPUT';
const UPDATE_SHOWBUTTON = 'UPDATE_SHOWBUTTON';
const UPDATE_ROOMMESSAGES = 'UPDATE_ROOMMESSAGES';
const UPDATE_USERID = 'UPDATE_USERID';

function reducer( state = initialState, action) {
    console.log('REDUCER HIT: Action ->', action );
    switch( action.type ){
        case UPDATE_SIDEDRAWEROPEN:
            return Object.assign( {}, state, { sideDrawerOpen: !state.sideDrawerOpen });

        case UPDATE_INPUTBAR:
            return Object.assign( {}, state, {inputBar: action.payload });

        case UPDATE_ROOM:
            return Object.assign( {}, state, {room: action.payload });

        case UPDATE_USERNAME:
            return Object.assign( {}, state, {userName: action.payload});

        case UPDATE_PASSWORD:
            return Object.assign( {}, state, {passWord: action.payload});

        case UPDATE_SHOWBUTTON:
            return Object.assign( {}, state, {showButton: !state.showButton});

        case UPDATE_ROOMMESSAGES:
            return Object.assign( {}, state, {roomMessages: action.payload});

        case UPDATE_USERID:
            return Object.assign({}, state, {userId: action.payload});

        case RESET_INPUT:
            return initialState

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
    export function updateUserName (userName){
        return{
            type: UPDATE_USERNAME,
            payload: userName
        }
    }

    export function updatePassWord (passWord){
        return{
            type: UPDATE_PASSWORD,
            payload: passWord
        }
    }

    export function updateShowButton (){
        return{
            type: UPDATE_SHOWBUTTON,
            payload: null
        }
    }

    export function updateRoomMessages (roomMessages){
        return{
            type: UPDATE_ROOMMESSAGES,
            payload: roomMessages
        }
    }

    export function resetInput(){
        return{
            type: RESET_INPUT
        }
    }

    export function updateUserId(userId){
        return{
            type: UPDATE_USERID,
            payload: userId
        }
    }
    

export default reducer;