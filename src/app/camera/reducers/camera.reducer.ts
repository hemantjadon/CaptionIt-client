import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as coreCameraActions from '../../core/actions/camera.actions';

export interface State {
  doCapture: boolean;
}

export const initialState: State = {
  doCapture: false
};

export function reducer(
  state = initialState,
  action: coreCameraActions.CameraActions
): State {
  switch (action.type) {
    case coreCameraActions.CameraActionTypes.CAPTURE_IMAGE: {
      return Object.assign({}, state, {
        doCapture: true
      });
    }

    case coreCameraActions.CameraActionTypes.CAPTURE_IMAGE_SUCCESS:
    case coreCameraActions.CameraActionTypes.CAPTURE_IMAGE_FAIL: {
      return Object.assign({}, state, {
        doCapture: false
      });
    }

    default:
      return state;
  }
}

export const getCameraState = createFeatureSelector<State>('camera/camera');

export const selectDoCapture = (state: State) => state.doCapture;

export const getDoCapture =  createSelector(getCameraState, selectDoCapture);
