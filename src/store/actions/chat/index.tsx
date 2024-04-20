import {ChatTypes} from '../../../constants';

export function readMessage(index: number) {
  return async function (dispatch: any, getState: any) {
    dispatch(readMessageSuccess(index));
  };
}

function readMessageSuccess(payload: any) {
  return {
    type: ChatTypes.READ_MESSAGE,
    payload,
  };
}
